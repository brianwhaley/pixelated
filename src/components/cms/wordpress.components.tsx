import React from 'react';
import { useOptionalPixelatedConfig } from "../config/config.client";
import { SmartImage } from './cloudinary.image';
import type { BlogPostType } from './wordpress.functions';
import "./wordpress.css";

// https://microformats.org/wiki/h-entry

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
	const config = useOptionalPixelatedConfig();
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
				{ props.featured_image ? (
					<div className="article-body row-12col">
						<div className="article-featured-image grid-s1-e4">
							<SmartImage className="u-photo" src={props.featured_image} alt={decodeString(props.title)} title={decodeString(props.title)}
								style={{borderRadius: '20px'}}
								cloudinaryEnv={config?.cloudinary?.product_env ?? undefined}
								cloudinaryDomain={config?.cloudinary?.baseUrl ?? undefined}
								cloudinaryTransforms={config?.cloudinary?.transforms ?? undefined} />
						</div>
						<div className="article-excerpt grid-s4-e13">
							<div className="p-summary" dangerouslySetInnerHTML={{ __html: myExcerpt }} />
						</div>
					</div>
				) : 
					<div className="article-excerpt grid-s1-e13">
						<div className="p-summary" dangerouslySetInnerHTML={{ __html: myExcerpt }} />
					</div>
				}
				<div>Categories: 
					{ myCategoryImages.map(([categoryImg, index]) => (
						<span className="p-category" key={categoryImg + "-" + index}>
							{ /* <img src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)} /> */ }
							<SmartImage src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)} 
								cloudinaryEnv={config?.cloudinary?.product_env ?? undefined}
								cloudinaryDomain={config?.cloudinary?.baseUrl ?? undefined}
								cloudinaryTransforms={config?.cloudinary?.transforms ?? undefined} />
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
	const config = useOptionalPixelatedConfig();
	return (
		<div className="blogPostCategories">
			<div>Categories: </div>
			{ myCategoryImages.map((categoryImg, index) => 
				categoryImg ? (
					<span className="p-category" key={categoryImg + "-" + index}>
						{ /* <img src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)} /> */ }
						<SmartImage className="u-photo" src={`/images/icons/${categoryImg}.png`} title={String(categoryImg)} alt={String(categoryImg)}
							cloudinaryEnv={config?.cloudinary?.product_env ?? undefined}
							cloudinaryDomain={config?.cloudinary?.baseUrl ?? undefined}
							cloudinaryTransforms={config?.cloudinary?.transforms ?? undefined} />
					</span>
				) : null
			)}
		</div>
	);
}