

export async function getStoryBlokCards(){
	const base_url = "https://api.storyblok.com/v2/cdn/stories?";
	const content_type = "CarouselCard";
	const version = "published";
	const access_token = "2nf5ujReQSsH3qU8fIuLEgtt";
	const full_url = base_url + "content_type=" + content_type + "&version=" + version + "&token=" + access_token ;
	try {
		const response = await fetch(full_url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log(json);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}
	}    
}
// getStoryBlokCards();
/* 
https://www.storyblok.com/docs/api/content-delivery/v2/stories/retrieve-multiple-stories
*/
