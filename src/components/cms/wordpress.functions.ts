
// const wpSite = "pixelatedviews.wordpress.com";
// const wpSite = "19824045";
// const wpSite = "blog.pixelated.tech";
const wpApiURL = "https://public-api.wordpress.com/rest/v1/sites/";
const wpCategoriesPath = "/categories";

export type BlogPostType = {
    ID: string;
    title: string;
    date: string;
    modified?: string;
    author?: string;
    excerpt: string;
    content?: string;
    URL: string;
    categories: string[];
	featured_image?: string;
};

export async function getWordPressItems(props: { site: string; count?: number }){
	const requested = props.count; // undefined means fetch all available
	const posts: BlogPostType[] = [];
	let page = 1;
	while (true) {
		const remaining = requested ? Math.max(requested - posts.length, 0) : 100;
		const number = Math.min(remaining || 100, 100);
		const wpPostsURL = `${wpApiURL}${props.site}/posts?number=${number}&page=${page}`;
		try {
			const response = await fetch(wpPostsURL);
			const data = await response.json();
			const batch: BlogPostType[] = Array.isArray(data.posts) ? data.posts : [];
			if (batch.length === 0) {
				break; // no more posts
			}
			posts.push(...batch);
			if (requested && posts.length >= requested) {
				break; // collected enough
			}
			page++;
		} catch (error) {
			console.error("Error fetching WP posts:", error);
			return;
		}
	}
	return posts;
}


export type BlogPostCategoryType = {
	id: number;
	name: string;
	slug: string;
	description: string;
	post_count: number;
	feed_url: string;
};

export async function getWordPressCategories(props: { site: string }){
	const wpCategoriesURL = wpApiURL + props.site + wpCategoriesPath ;
	const categories = [];
	try {
		const response = await fetch(wpCategoriesURL);
		const data = await response.json();
		// Check for total pages on the first page
		const myCategories = data.categories.map((category: BlogPostCategoryType) => ( category.name ));
		categories.push(...myCategories);
	} catch (error) {
		console.error("Error fetching WP categories:", error);
		return;
	}
	return categories; // Return the complete list of categories
}

