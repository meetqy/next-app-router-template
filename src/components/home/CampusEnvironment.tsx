import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/image-url";
import { getTeachingEnvironmentCategoryImages } from "@/lib/teaching-environment";

const featuredImages = [
	...getTeachingEnvironmentCategoryImages("classroom").slice(0, 2),
	...getTeachingEnvironmentCategoryImages("daily-study").slice(0, 2),
	...getTeachingEnvironmentCategoryImages("assessment").slice(0, 2),
	...getTeachingEnvironmentCategoryImages("space").slice(0, 2),
];

export function CampusEnvironment() {
	return (
		<section className="bg-slate-50 py-20" id="jiao-xue-huan-jing">
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold text-3xl text-slate-900 md:text-4xl">
						看得见的教学环境
					</h2>
					<p className="mx-auto max-w-2xl text-slate-600">
						从课堂教学、学习日常、考试测评和空间环境四个方面，了解孩子在戴氏教育的真实学习场景。
					</p>
					<div className="mt-6 flex justify-center">
						<Button asChild className="rounded-xl px-6">
							<Link href="/jiao-xue-huan-jing">查看全部教学环境</Link>
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{featuredImages.map((image) => (
						<div
							className="relative aspect-video overflow-hidden rounded-lg"
							key={image.src}
						>
							<Image
								alt={image.alt}
								className="object-cover"
								fill
								sizes="(min-width: 1280px) 304px, (min-width: 768px) 25vw, 50vw"
								src={imageUrl(image.src)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
