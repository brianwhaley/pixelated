import "./pixelated.wordpress.css";
import React from 'react';
import type { BlogPostType } from './pixelated.wordpress.functions';


function decodeString(s: string){
	let temp: HTMLParagraphElement | null = document.createElement('p');
	temp.innerHTML = s;
	const str = temp.textContent || temp.innerText;
	temp = null;
	return str;
}


export function BlogPostSummary(props: BlogPostType) {
	const myCategoryImages = Object.entries(props.categories).map(
		([category, index]) => [category.trim().toLowerCase().replace(/[ /]+/g, '-'), index]
	).sort();

	const myExcerpt = decodeString(props.excerpt).replace(/\[…\]/g, '<a href="' + props.URL + '" target="_blank" rel="noopener noreferrer">[…]</a>');
	return (
		<div className="blogPostSummary">
			<article className="h-entry">
				<h2 className="p-name">
					<a className="u-url blog-post-url" href={props.URL} target="_blank" rel="noopener noreferrer">
						{decodeString(props.title)}
					</a>
				</h2>
				<div className="dt-published">Published: {new Date(props.date).toLocaleDateString()}</div>
				<div className="p-summary" dangerouslySetInnerHTML={{ __html: myExcerpt }} />
				<div>Categories: 
					{ myCategoryImages.map(([categoryImg, index]) => (
						<span className="p-category" key={categoryImg + "-" + index}>
							<img src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)} />
						</span>
					))}
				</div>
			</article>
		</div>
	);
}



export function BlogPostCategories(props: { categories: string[] }) {
	if(!props.categories || props.categories.length === 0) {
		return null;
	}
	const myCategoryImages = props.categories.map(
		(category) => (category !== "Uncategorized") 
			? category.trim().toLowerCase().replace(/[ /]+/g, '-') 
			: undefined
	).sort();
	return (
		<div className="blogPostCategories">
			<div>Categories: </div>
			{ myCategoryImages.map((categoryImg, index) => 
				categoryImg ? (
					<span className="p-category" key={categoryImg + "-" + index}>
						<img src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)} />
					</span>
				) : null
			)}
		</div>
	);
}