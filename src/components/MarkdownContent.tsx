import Image from "next/image";
import Link from "next/link";
import IMAGE_MANIFEST from "@/lib/generated/image-manifest.json";
import { imageUrl } from "@/lib/image-url";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
	className?: string;
	content: string;
	resolveHref?: (href: string) => string | null;
};

function cleanHeadingText(text: string) {
	return text.replace(/^\s*\d+[\s.、．-]*/g, "").trim();
}

const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*]\([^)]+\)/g;
const RESOURCE_PATH_PATTERN =
	/(?:\/|public\/)?(?:assets|老师|校区|honors|address|daishi-site\/uploads)\/[^\s`，。；、）)\]]+\.(?:jpg|jpeg|png|webp|gif)/gi;

function cleanInlineText(text: string) {
	return text
		.replace(MARKDOWN_IMAGE_PATTERN, "")
		.replace(RESOURCE_PATH_PATTERN, "")
		.replace(/\s+([，。；、])/g, "$1")
		.replace(/[：:]\s*$/g, "")
		.trim();
}

const AVAILABLE_IMAGE_PATHS = new Set<string>(IMAGE_MANIFEST);

function canRenderImage(src: string) {
	if (/^https?:\/\//i.test(src)) {
		return true;
	}

	if (!src.startsWith("/")) {
		return false;
	}

	try {
		return AVAILABLE_IMAGE_PATHS.has(decodeURI(src));
	} catch {
		return false;
	}
}

function parseInline(
	text: string,
	resolveHref: MarkdownContentProps["resolveHref"],
) {
	const cleanedText = cleanInlineText(text);
	const parts = cleanedText.split(/(\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g);
	const occurrences = new Map<string, number>();

	return parts.map((part) => {
		const occurrence = occurrences.get(part) ?? 0;
		occurrences.set(part, occurrence + 1);
		const key = `${part}-${occurrence}`;

		if (part.startsWith("**") && part.endsWith("**")) {
			const strongText = part.slice(2, -2);
			const strongLinkMatch = strongText.match(/^\[([^\]]+)]\(([^)]+)\)$/);
			if (strongLinkMatch) {
				const [, label = "", href = ""] = strongLinkMatch;
				const resolvedHref = resolveHref?.(href) ?? href;

				if (resolvedHref.startsWith("http")) {
					return (
						<a
							href={resolvedHref}
							key={key}
							rel="noopener noreferrer"
							target="_blank"
						>
							{label}
						</a>
					);
				}

				return (
					<Link href={resolvedHref} key={key}>
						{label}
					</Link>
				);
			}

			return <strong key={key}>{strongText}</strong>;
		}

		const linkMatch = part.match(/^\[([^\]]+)]\(([^)]+)\)$/);
		if (linkMatch) {
			const [, label = "", href = ""] = linkMatch;
			const resolvedHref = resolveHref?.(href) ?? href;

			if (resolvedHref.startsWith("http")) {
				return (
					<a
						href={resolvedHref}
						key={key}
						rel="noopener noreferrer"
						target="_blank"
					>
						{label}
					</a>
				);
			}

			return (
				<Link href={resolvedHref} key={key}>
					{label}
				</Link>
			);
		}

		return part;
	});
}

function MarkdownTable({
	lines,
	resolveHref,
}: {
	lines: string[];
	resolveHref: MarkdownContentProps["resolveHref"];
}) {
	const rows = lines
		.map((line) =>
			line
				.trim()
				.replace(/^\|/, "")
				.replace(/\|$/, "")
				.split("|")
				.map((cell) => cell.trim()),
		)
		.filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)));

	const [headers = [], ...bodyRows] = rows;

	return (
		<div className="typeset-scroll">
			<table>
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{bodyRows.map((row) => (
						<tr key={row.join("|")}>
							{row.map((cell) => (
								<td key={`${row.join("|")}-${cell}`}>
									{parseInline(cell, resolveHref)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function MarkdownContent({
	className,
	content,
	resolveHref,
}: MarkdownContentProps) {
	const lines = content.split("\n");
	const elements: React.ReactNode[] = [];
	let index = 0;

	while (index < lines.length) {
		const line = lines[index]?.trimEnd() ?? "";

		if (!line.trim()) {
			index += 1;
			continue;
		}

		if (/^-{3,}$/.test(line.trim())) {
			elements.push(<hr key={`divider-${index}`} />);
			index += 1;
			continue;
		}

		const imageMatch = line.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
		if (imageMatch) {
			const [, alt = "", src = ""] = imageMatch;
			if (!canRenderImage(src)) {
				index += 1;
				continue;
			}

			elements.push(
				<figure key={`image-${index}`}>
					<Image
						alt={alt}
						className="h-auto max-h-130 w-full object-contain"
						height={900}
						src={imageUrl(src)}
						unoptimized
						width={1200}
					/>
					{alt ? <figcaption>{alt}</figcaption> : null}
				</figure>,
			);
			index += 1;
			continue;
		}

		if (line.startsWith("|")) {
			const tableLines: string[] = [];
			while (
				index < lines.length &&
				(lines[index]?.trim().startsWith("|") ?? false)
			) {
				tableLines.push(lines[index] ?? "");
				index += 1;
			}
			elements.push(
				<MarkdownTable
					key={`table-${index}`}
					lines={tableLines}
					resolveHref={resolveHref}
				/>,
			);
			continue;
		}

		if (line.startsWith("- ")) {
			const items: string[] = [];
			while (
				index < lines.length &&
				(lines[index]?.trim().startsWith("- ") ?? false)
			) {
				const item = cleanInlineText((lines[index] ?? "").trim().slice(2));
				if (item) {
					items.push(item);
				}
				index += 1;
			}

			if (items.length === 0) {
				continue;
			}

			elements.push(
				<ul key={`list-${index}`}>
					{items.map((item) => (
						<li key={item}>{parseInline(item, resolveHref)}</li>
					))}
				</ul>,
			);
			continue;
		}

		if (/^\d+[.)、]\s+/.test(line.trim())) {
			const items: string[] = [];
			while (
				index < lines.length &&
				/^\d+[.)、]\s+/.test(lines[index]?.trim() ?? "")
			) {
				const item = cleanInlineText(
					(lines[index] ?? "").trim().replace(/^\d+[.)、]\s+/, ""),
				);
				if (item) {
					items.push(item);
				}
				index += 1;
			}

			if (items.length === 0) {
				continue;
			}

			elements.push(
				<ol key={`ordered-list-${index}`}>
					{items.map((item) => (
						<li key={item}>{parseInline(item, resolveHref)}</li>
					))}
				</ol>,
			);
			continue;
		}

		const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
		if (headingMatch) {
			const [, marks = "", heading = ""] = headingMatch;
			const level = marks.length;
			const Heading = `h${Math.min(level, 4)}` as "h1" | "h2" | "h3" | "h4";
			elements.push(
				<Heading key={`heading-${index}`}>
					{parseInline(cleanHeadingText(heading), resolveHref)}
				</Heading>,
			);
			index += 1;
			continue;
		}

		const paragraphLines = [line];
		index += 1;
		while (
			index < lines.length &&
			lines[index]?.trim() &&
			!lines[index]?.trim().startsWith("#") &&
			!lines[index]?.trim().startsWith("- ") &&
			!/^\d+[.)、]\s+/.test(lines[index]?.trim() ?? "") &&
			!lines[index]?.trim().startsWith("|") &&
			!lines[index]?.trim().startsWith("![")
		) {
			paragraphLines.push(lines[index] ?? "");
			index += 1;
		}

		const paragraph = paragraphLines.join(" ").trim();
		const cleanParagraph = cleanInlineText(paragraph);
		if (!cleanParagraph) {
			continue;
		}
		elements.push(
			<p key={`paragraph-${index}`}>
				{parseInline(cleanParagraph, resolveHref)}
			</p>,
		);
	}

	return (
		<div className={cn("typeset typeset-article", className)}>{elements}</div>
	);
}
