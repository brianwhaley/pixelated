import React, { useState, useEffect } from "react";
import { Carousel } from "@brianwhaley/pixelated-components";
import { getContentfulEntriesByType } from "@brianwhaley/pixelated-components";
import '../css/pixelated.global.css';

export default {
	title: 'CMS',
	component: Carousel
};


const FeedbackGallery = () => {
	const [ feedbackCards , setFeedbackCards ] = useState([]);
	const apiProps = {
		base_url: "https://cdn.contentful.com",
		space_id: "soi9w77t7027",
		environment: "master",
		access_token: "muY9LfpCt4qoXosDsnRkkoH3DAVVuUFEuB0WRKRdBUM",
	};
	useEffect(() => {
		async function getFeedbackCards() {
			const contentType = "feedback"; 
			const typeCards = await getContentfulEntriesByType({ apiProps: apiProps, contentType: contentType }); 
			const items = typeCards.items.filter((card) => card.sys.contentType.sys.id === contentType);
			const cardLength = items.length;
			const reviewCards = items.map(function (card, index) {
				return {
					headerText: card.fields.feedbackText,
					bodyText: "- " + card.fields.name,
					index: index,
					cardIndex: index,
					cardLength: cardLength,
				};
			});
			setFeedbackCards(reviewCards);
		}
		getFeedbackCards();
	}, []);
	
	return (
		<>
			<section className="section-alt" id="feedback-section">
				<div className="section-container">
					<Carousel 
						cards={feedbackCards} 
						draggable={false}
						imgFit='contain' />
				</div>
			</section>
		</>
	);
};

export const Contentful = () => <FeedbackGallery />;
