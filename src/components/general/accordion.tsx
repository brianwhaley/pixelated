'use client';

import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import './accordion.css';

export interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
  open?: boolean | null;
}

Accordion.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
			open: PropTypes.bool,
		})
	).isRequired,
	onToggle: PropTypes.func,
};
export type AccordionType = InferProps<typeof Accordion.propTypes>;
export function Accordion({ items, onToggle }: AccordionType) {
	return (
		<div className="accordion">
			{items?.map((item, index) => (
				item ? (
					<details 
						key={index} 
						className="accordion-item" 
						open={item.open ?? undefined}
						onToggle={onToggle ? (e) => onToggle(index, (e.target as HTMLDetailsElement).open) : undefined}
					>
						<summary className="accordion-title">
							<h3 id={`accordion-header-${index}`}>
								{item.title}
							</h3>
						</summary>
						<div 
							className="accordion-content"
							role="region"
							aria-labelledby={`accordion-header-${index}`}
						>
							{typeof item.content === 'string' ? (
								<p>{item.content}</p>
							) : (
								item.content
							)}
						</div>
					</details>
				) : null
			))}
		</div>
	);
}

