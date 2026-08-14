import fs from "node:fs";
import path from "node:path";
import { SITE_FULL_NAME } from "@/lib/constants/site";

const BROCHURE_PATH_CANDIDATES = [
	path.join(process.cwd(), "素材资源", "招生简章"),
	path.join(process.cwd(), "招生简章"),
];

const BUILT_IN_BROCHURE_YEARS = ["2027", "2026"] as const;

function getBrochuresPath() {
	return BROCHURE_PATH_CANDIDATES.find((candidate) => fs.existsSync(candidate));
}

type BrochureSummary = {
	year: string;
	title: string;
	fileName: string;
};

function createBrochureMeta(year: string): BrochureSummary {
	return {
		year,
		title: `${year} 届${SITE_FULL_NAME}招生简章`,
		fileName: `${year}.md`,
	};
}

export function getAllBrochures(): BrochureSummary[] {
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
