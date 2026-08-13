import IMAGE_MANIFEST from "@/lib/generated/image-manifest.json";
import TEACHING_ENVIRONMENT_MANIFEST from "@/lib/generated/teaching-environment-manifest.json";

export const TEACHING_ENVIRONMENT_CATEGORIES = [
	{
		description: "老师授课、答疑、师生互动和板书讲解的现场照片。",
		id: "classroom",
		label: "课堂教学",
	},
	{
		description: "学生自习、课间、班级活动和日常学习状态的现场照片。",
		id: "daily-study",
		label: "学习日常",
	},
	{
		description: "考试、阶段测评、试卷讲评和学习检测的现场照片。",
		id: "assessment",
		label: "考试测评",
	},
	{
		description: "教室、走廊、门头、公共区域和教学设施的实景照片。",
		id: "space",
		label: "空间环境",
	},
] as const;

export type TeachingEnvironmentCategoryId =
	(typeof TEACHING_ENVIRONMENT_CATEGORIES)[number]["id"];

export type TeachingEnvironmentImage = {
	alt: string;
	category: TeachingEnvironmentCategoryId;
	fileName: string;
	height: number;
	src: string;
	width: number;
};

type GeneratedTeachingEnvironmentImage = {
	category: string;
	duplicate: boolean;
	height: number;
	path: string;
	width: number;
};

const CATEGORY_ID_BY_LABEL: Record<
	string,
	TeachingEnvironmentCategoryId
> = {
	课堂教学: "classroom",
	学习日常: "daily-study",
	考试测评: "assessment",
	空间环境: "space",
};

const TEACHING_ENVIRONMENT_IMAGE_BY_PATH = new Map(
	(TEACHING_ENVIRONMENT_MANIFEST as GeneratedTeachingEnvironmentImage[]).map(
		(image) => [image.path, image],
	),
);

function getCategoryLabel(category: TeachingEnvironmentCategoryId) {
	return TEACHING_ENVIRONMENT_CATEGORIES.find((item) => item.id === category)
		?.label;
}

export function getTeachingEnvironmentImages(): TeachingEnvironmentImage[] {
	const seenCategories = new Map<TeachingEnvironmentCategoryId, number>();

	return (IMAGE_MANIFEST as string[])
		.filter((path) => path.startsWith("/教学环境/"))
		.sort((left, right) =>
			left.localeCompare(right, "zh-Hans-CN", { numeric: true }),
		)
		.flatMap((path) => {
			const manifestImage = TEACHING_ENVIRONMENT_IMAGE_BY_PATH.get(path);
			if (!manifestImage || manifestImage.duplicate) return [];

			const [, , categoryLabel] = path.split("/");
			const category = CATEGORY_ID_BY_LABEL[categoryLabel ?? ""];
			if (!category) return [];
			const index = (seenCategories.get(category) ?? 0) + 1;
			seenCategories.set(category, index);
			const fileName = path.split("/").at(-1) ?? path;
			return [
				{
					alt: `${getCategoryLabel(category)}实景照片第${index}张`,
					category,
					fileName,
					height: manifestImage.height,
					src: path,
					width: manifestImage.width,
				},
			];
		});
}

export function getTeachingEnvironmentCategory(
	category: string | undefined,
): TeachingEnvironmentCategoryId | undefined {
	return TEACHING_ENVIRONMENT_CATEGORIES.some((item) => item.id === category)
		? (category as TeachingEnvironmentCategoryId)
		: undefined;
}

export function getTeachingEnvironmentCategoryImages(
	category: TeachingEnvironmentCategoryId,
) {
	return getTeachingEnvironmentImages().filter(
		(image) => image.category === category,
	);
}

export function getTeachingEnvironmentCategoryCount(
	category: TeachingEnvironmentCategoryId,
) {
	return getTeachingEnvironmentCategoryImages(category).length;
}
