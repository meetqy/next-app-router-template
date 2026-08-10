import fs from "node:fs";
import path from "node:path";
import { SITE_FULL_NAME } from "@/lib/constants/site";

const BROCHURE_PATH_CANDIDATES = [
	path.join(process.cwd(), "素材资源", "招生简章"),
	path.join(process.cwd(), "招生简章"),
];

const BUILT_IN_BROCHURE_YEARS = ["2027", "2026"] as const;

const BUILT_IN_BROCHURE_CONTENT: Record<
	(typeof BUILT_IN_BROCHURE_YEARS)[number],
	string
> = {
	"2027": "2027 届招生简章专题页",
	"2026": "2026 届招生简章专题页",
};

function getBrochuresPath() {
	return BROCHURE_PATH_CANDIDATES.find((candidate) => fs.existsSync(candidate));
}

export interface Brochure {
	year: string;
	title: string;
	content: string;
	fileName: string;
}

function createBrochureMeta(year: string): Omit<Brochure, "content"> {
	return {
		year,
		title: `${year} 届${SITE_FULL_NAME}招生简章`,
		fileName: `${year}.md`,
	};
}

function createBrochure(year: string, content: string): Brochure {
	return {
		...createBrochureMeta(year),
		content,
	};
}

export function getAllBrochures(): Omit<Brochure, "content">[] {
	const brochuresPath = getBrochuresPath();
	const fileYears = brochuresPath
		? fs
				.readdirSync(brochuresPath)
				.filter((file) => file.endsWith(".md"))
				.map((file) => file.replace(/\.md$/, ""))
		: [];

	return [...new Set([...BUILT_IN_BROCHURE_YEARS, ...fileYears])]
		.map((year) => createBrochureMeta(year))
		.sort((a, b) => Number(b.year) - Number(a.year));
}

export function getBrochureByYear(year: string): Brochure | null {
	const brochuresPath = getBrochuresPath();

	if (brochuresPath) {
		const filePath = path.join(brochuresPath, `${year}.md`);
		if (fs.existsSync(filePath)) {
			const content = fs.readFileSync(filePath, "utf8");
			return createBrochure(year, content);
		}
	}

	if (year in BUILT_IN_BROCHURE_CONTENT) {
		return createBrochure(
			year,
			BUILT_IN_BROCHURE_CONTENT[year as keyof typeof BUILT_IN_BROCHURE_CONTENT],
		);
	}

	return null;
}
