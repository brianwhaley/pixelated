
// const wpSite = "pixelatedviews.wordpress.com";
// const wpSite = "19824045";
// const wpSite = "blog.pixelated.tech";
const wpApiURL = "https://public-api.wordpress.com/rest/v1/sites/";
const wpPostsPath = "/posts?number=100";
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

export async function getWordPressItems(props: { site: string }){
	const wpPostsURL = wpApiURL + props.site + wpPostsPath ; 
	const posts: BlogPostType[] = [];
	let page = 1;
	let totalPages = 1;  // Initialize to 1 for the first request
	while (page <= totalPages) {
		try {
			const response = await fetch(`${wpPostsURL}&page=${page}`);
			const data = await response.json();
			// Check for total pages on the first page
			if (page === 1) {
				totalPages = Math.ceil(data.found / 100); // Assuming 100 posts per page
			}
			posts.push(...data.posts);
			page++; // Increment gets next page or breaks the while loop
		} catch (error) {
			console.error("Error fetching WP posts:", error);
			return;
		}
	}
	return posts; // Return the complete list of posts
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

