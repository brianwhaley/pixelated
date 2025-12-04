import React from 'react';
import { GoogleReviewsCard } from '../components/cms/google.reviews.components';

export default {
	title: 'CMS',
	component: GoogleReviewsCard,
};

export const ReviewsByPlaceId = () => (
	<GoogleReviewsCard
		placeId="ChIJPbCLBDfb0IkREeS_RNxKIbw"
		language="en"
		maxReviews={5}
		proxyBase="https://proxy.pixelated.tech/prod/proxy?url="
	/>
);
ReviewsByPlaceId.storyName = 'Google Reviews by place_id';
