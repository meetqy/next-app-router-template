import path from "node:path";
import ADMISSION_CELEBRATION_MANIFEST from "@/lib/generated/admission-celebration-manifest.json";
import IMAGE_MANIFEST from "@/lib/generated/image-manifest.json";

const CELEBRATIONS_PATH_PREFIX = "/喜报/";

export type AdmissionCelebrationImage = {
	alt: string;
	fileName: string;
	height: number;
	src: string;
	width: number;
};

type GeneratedAdmissionCelebrationImage = {
	height: number;
	path: string;
	width: number;
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

const ADMISSION_CELEBRATION_IMAGE_BY_PATH = new Map(
	(ADMISSION_CELEBRATION_MANIFEST as GeneratedAdmissionCelebrationImage[]).map(
		(image) => [image.path, image],
	),
);

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
				.flatMap((fileName, index) => {
					const src = `/喜报/${year}/${fileName}`;
					const manifestImage = ADMISSION_CELEBRATION_IMAGE_BY_PATH.get(src);
					if (!manifestImage) return [];

					return [
						{
							alt: `${year}年大学录取案例第${index + 1}张`,
							fileName,
							height: manifestImage.height,
							src,
							width: manifestImage.width,
						},
					];
				}),
			label: `${year}年大学录取案例`,
			year,
		}))
		.filter((item) => item.images.length > 0);
}
