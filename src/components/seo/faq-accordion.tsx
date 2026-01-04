import React, { useState, useMemo } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Accordion, AccordionItem } from '../general/accordion';
import './faq-accordion.css';

type CategoryKey = 'Getting Started' | 'Process & Timeline' | 'Technical Details' | 'Content & Management' | 'Support & Maintenance' | 'Ownership & Legal' | 'Services';

const categoryIcons: Record<CategoryKey, string> = {
	'Getting Started': '🚀',
	'Process & Timeline': '⏱️',
	'Technical Details': '⚙️',
	'Content & Management': '📝',
	'Support & Maintenance': '🛠️',
	'Ownership & Legal': '📋',
	'Services': '💼'
};

FAQAccordion.propTypes = {
	faqsData: PropTypes.shape({
		mainEntity: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				category: PropTypes.string,
				acceptedAnswer: PropTypes.shape({
					text: PropTypes.string,
				}),
			})
		),
	}).isRequired,
};
export type FAQAccordionType = InferProps<typeof FAQAccordion.propTypes>;
export function FAQAccordion({ faqsData }: FAQAccordionType) {
	const [searchTerm, setSearchTerm] = useState('');
	const [expandedStates, setExpandedStates] = useState<boolean[]>(
		faqsData.mainEntity?.map(() => false) || []
	);

	const filteredFaqs = useMemo(() => {
		if (!faqsData.mainEntity) return [];
		if (!searchTerm) return faqsData.mainEntity;
		return faqsData.mainEntity.filter((faq: any) =>
			faq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.acceptedAnswer.text.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [faqsData.mainEntity, searchTerm]);

	const expandAll = () => {
		setExpandedStates(expandedStates.map(() => true));
	};

	const collapseAll = () => {
		setExpandedStates(expandedStates.map(() => false));
	};

	const handleToggle = (index: number, open: boolean) => {
		setExpandedStates(prev => prev.map((state, i) => i === index ? open : state));
	};

	// Transform FAQ data to Accordion format
	const accordionItems: AccordionItem[] = filteredFaqs.map((faq: any, index: number) => {
		const content: React.ReactNode = <div dangerouslySetInnerHTML={{ __html: faq.acceptedAnswer.text }} />;
		return {
			title: `${categoryIcons[faq.category as CategoryKey] || '❓'} ${faq.name}`,
			content,
			open: expandedStates[index] || undefined
		};
	});

	return (
		<div className="faq-container" role="region" aria-label="Frequently Asked Questions">
			<div className="faq-toolbar">
				<div className="search-box">
					<input
						type="text"
						placeholder="Search FAQs..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="search-input"
						aria-describedby="search-help"
					/>
					<div id="search-help" className="sr-only">Search through frequently asked questions by typing keywords</div>
				</div>
				<div className="expand-buttons">
					<button
						onClick={expandAll}
						className="expand-button expand-all"
						aria-label="Expand all FAQ answers"
						title="Expand all answers"
					>
						+
					</button>
					<button
						onClick={collapseAll}
						className="expand-button collapse-all"
						aria-label="Collapse all FAQ answers"
						title="Collapse all answers"
					>
						−
					</button>
				</div>
			</div>
			<div className="faq-list" aria-live="polite" aria-atomic="false">
				<Accordion items={accordionItems} onToggle={handleToggle} />
			</div>
		</div>
	);
}