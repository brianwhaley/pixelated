import React from 'react';
import { Callout } from '../callout/callout';

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export default function UnderConstruction({
	title = "Under Construction",
	message = "We're working hard to bring you something amazing. Check back soon!"
}: UnderConstructionProps) {
	return (
		<Callout
			variant="full"
			title={title}
			content={message}
		/>
	);
}