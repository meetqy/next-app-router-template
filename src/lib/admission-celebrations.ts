import path from "node:path";
import IMAGE_MANIFEST from "@/lib/generated/image-manifest.json";

const CELEBRATIONS_PATH_PREFIX = "/喜报/";

export type AdmissionCelebrationImage = {
	alt: string;
	fileName: string;
	src: string;
};

export type AdmissionCelebrationYear = {
	images: AdmissionCelebrationImage[];
	label: string;
	year: string;
};

function sortByNumericFileName(a: string, b: string) {
	const aName = path.parse(a).name;
	const bName = path.parse(b).name;
	const aNumber = Number(aName);
	const bNumber = Number(bName);

	if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber) && aNumber !== bNumber) {
		return aNumber - bNumber;
	}

	return aName.localeCompare(bName, "zh-Hans-CN", { numeric: true });
}

function sortYearsDescending(a: string, b: string) {
	const aYear = Number(a);
	const bYear = Number(b);

	if (!Number.isNaN(aYear) && !Number.isNaN(bYear) && aYear !== bYear) {
		return bYear - aYear;
	}

	return b.localeCompare(a, "zh-Hans-CN", { numeric: true });
}

export async function getAdmissionCelebrationYears(): Promise<
	AdmissionCelebrationYear[]
> {
	const fileNamesByYear = new Map<string, string[]>();

	for (const assetPath of IMAGE_MANIFEST as string[]) {
		if (!assetPath.startsWith(CELEBRATIONS_PATH_PREFIX)) {
			continue;
		}

		const [year, fileName, ...rest] = assetPath
			.slice(CELEBRATIONS_PATH_PREFIX.length)
			.split("/");

		if (!year || !fileName || rest.length > 0) {
			continue;
		}

		const fileNames = fileNamesByYear.get(year) ?? [];
		fileNames.push(fileName);
		fileNamesByYear.set(year, fileNames);
	}

	return [...fileNamesByYear.keys()]
		.sort(sortYearsDescending)
		.map((year) => ({
			images: (fileNamesByYear.get(year) ?? [])
				.sort(sortByNumericFileName)
				.map((fileName, index) => ({
					alt: `${year}年大学录取喜报第${index + 1}张`,
					fileName,
					src: `/喜报/${year}/${fileName}`,
				})),
			label: `${year}年大学录取喜报`,
			year,
		}))
		.filter((item) => item.images.length > 0);
}
