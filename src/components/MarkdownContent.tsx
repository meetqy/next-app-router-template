import IMAGE_MANIFEST from "@/lib/generated/image-manifest.json";
import { imageUrl } from "@/lib/image-url";
import tencentImageLoader from "@/lib/tencent-image-loader";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
	className?: string;
	content: string;
	resolveHref?: (href: string) => string | null;
};

const MARKDOWN_IMAGE_PATTERN = /!\[[^\]]*]\([^)]+\)/g;
const RESOURCE_PATH_PATTERN =
	/(?:\/|public\/)?(?:assets|老师|校区|honors|address|daishi-site\/uploads)\/[^\s`，。；、）)\]]+\.(?:jpg|jpeg|png|webp|gif)/gi;
const AVAILABLE_IMAGE_PATHS = new Set<string>(IMAGE_MANIFEST);

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function cleanHeadingText(text: string) {
	return text.replace(/^\s*\d+[\s.、．-]*/g, "").trim();
}

function createHeadingId(text: string, occurrence: number) {
	const base = cleanHeadingText(text)
		.toLowerCase()
		.replace(/[^\p{Script=Han}a-z0-9]+/gu, "-")
		.replace(/^-+|-+$/g, "");

	return occurrence > 1 ? `${base}-${occurrence}` : base;
}

function cleanInlineText(text: string) {
	return text
		.replace(MARKDOWN_IMAGE_PATTERN, "")
		.replace(RESOURCE_PATH_PATTERN, "")
		.replace(/\s+([，。；、])/g, "$1")
		.replace(/[：:]\s*$/g, "")
		.trim();
}

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

function isSafeHref(href: string) {
	return (
		/^https?:\/\//i.test(href) ||
		/^\/(?!\/)/.test(href) ||
		href.startsWith("#") ||
		href.startsWith("./") ||
		href.startsWith("../")
	);
}

function renderLink(
	label: string,
	href: string,
	resolveHref: MarkdownContentProps["resolveHref"],
) {
	const resolvedHref = resolveHref ? resolveHref(href) : href;
	const safeLabel = escapeHtml(label);

	if (!resolvedHref || !isSafeHref(resolvedHref)) {
		return safeLabel;
	}

	const externalAttributes = /^https?:\/\//i.test(resolvedHref)
		? ' rel="noopener noreferrer" target="_blank"'
		: "";

	return `<a href="${escapeHtml(resolvedHref)}"${externalAttributes}>${safeLabel}</a>`;
}

function renderInline(
	text: string,
	resolveHref: MarkdownContentProps["resolveHref"],
) {
	const cleanedText = cleanInlineText(text);
	const parts = cleanedText.split(/(\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g);

	return parts
		.map((part) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				const strongText = part.slice(2, -2);
				const strongLinkMatch = strongText.match(
					/^\[([^\]]+)]\(([^)]+)\)$/,
				);
				if (strongLinkMatch) {
					const [, label = "", href = ""] = strongLinkMatch;
					return renderLink(label, href, resolveHref);
				}

				return `<strong>${escapeHtml(strongText)}</strong>`;
			}

			const linkMatch = part.match(/^\[([^\]]+)]\(([^)]+)\)$/);
			if (linkMatch) {
				const [, label = "", href = ""] = linkMatch;
				return renderLink(label, href, resolveHref);
			}

			return escapeHtml(part);
		})
		.join("");
}

function renderTable(
	lines: string[],
	resolveHref: MarkdownContentProps["resolveHref"],
) {
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
	const headerHtml = headers
		.map((header) => `<th>${renderInline(header, resolveHref)}</th>`)
		.join("");
	const bodyHtml = bodyRows
		.map(
			(row) =>
				`<tr>${row
					.map((cell) => `<td>${renderInline(cell, resolveHref)}</td>`)
					.join("")}</tr>`,
		)
		.join("");

	return `<div class="typeset-scroll"><table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

function renderImage(alt: string, src: string) {
	const publicSrc = imageUrl(src);
	const optimizedSrc = tencentImageLoader({
		quality: 75,
		src: publicSrc,
		width: 1200,
	});
	const caption = alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : "";

	return `<figure><img alt="${escapeHtml(alt)}" class="h-auto max-h-130 w-full object-contain" decoding="async" height="900" loading="lazy" src="${escapeHtml(optimizedSrc)}" width="1200">${caption}</figure>`;
}

function renderMarkdownHtml(
	content: string,
	resolveHref: MarkdownContentProps["resolveHref"],
) {
	const lines = content.split("\n");
	const html: string[] = [];
	let index = 0;
	let pendingAnchorId: string | null = null;
	const headingOccurrences = new Map<string, number>();

	while (index < lines.length) {
		const line = lines[index]?.trimEnd() ?? "";

		if (!line.trim()) {
			index += 1;
			continue;
		}

		const anchorMatch = line.match(/^<!--\s*anchor:\s*([a-z0-9-]+)\s*-->$/i);
		if (anchorMatch) {
			pendingAnchorId = anchorMatch[1] ?? null;
			index += 1;
			continue;
		}

		if (/^-{3,}$/.test(line.trim())) {
			html.push("<hr>");
			index += 1;
			continue;
		}

		const imageMatch = line.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
		if (imageMatch) {
			const [, alt = "", src = ""] = imageMatch;
			if (canRenderImage(src)) {
				html.push(renderImage(alt, src));
			}
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
			html.push(renderTable(tableLines, resolveHref));
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
			if (items.length > 0) {
				html.push(
					`<ul>${items
						.map((item) => `<li>${renderInline(item, resolveHref)}</li>`)
						.join("")}</ul>`,
				);
			}
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
			if (items.length > 0) {
				html.push(
					`<ol>${items
						.map((item) => `<li>${renderInline(item, resolveHref)}</li>`)
						.join("")}</ol>`,
				);
			}
			continue;
		}

		const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
		if (headingMatch) {
			const [, marks = "", heading = ""] = headingMatch;
			const level = Math.min(marks.length, 4);
			const cleanedHeading = cleanHeadingText(heading);
			const occurrence = (headingOccurrences.get(cleanedHeading) ?? 0) + 1;
			headingOccurrences.set(cleanedHeading, occurrence);
			const headingId =
				pendingAnchorId ?? createHeadingId(cleanedHeading, occurrence);
			pendingAnchorId = null;
			html.push(
				`<h${level} id="${escapeHtml(headingId)}">${renderInline(cleanedHeading, resolveHref)}</h${level}>`,
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

		const paragraph = cleanInlineText(paragraphLines.join(" ").trim());
		if (paragraph) {
			html.push(`<p>${renderInline(paragraph, resolveHref)}</p>`);
		}
	}

	return html.join("");
}

export function MarkdownContent({
	className,
	content,
	resolveHref,
}: MarkdownContentProps) {
	return (
		<div
			className={cn("typeset typeset-article", className)}
			dangerouslySetInnerHTML={{
				__html: renderMarkdownHtml(content, resolveHref),
			}}
		/>
	);
}
