import {
	JIA_ZHANG_ARTICLES,
	type JiaZhangArticle,
} from "@/lib/constants/jia-zhang-fu-wu";

export type JiaZhangArticleSummary = Omit<JiaZhangArticle, "content">;

/**
 * 获取所有家长服务文章列表（不含 content 字段，用于列表页与 sitemap）
 */
export function getAllJiaZhangArticles(): JiaZhangArticleSummary[] {
	return JIA_ZHANG_ARTICLES
		.map(({ content: _content, ...rest }) => rest)
		.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/**
 * 根据 slug 获取单篇文章
 */
export function getJiaZhangArticleBySlug(slug: string): JiaZhangArticle | null {
	return JIA_ZHANG_ARTICLES.find((article) => article.slug === slug) ?? null;
}
