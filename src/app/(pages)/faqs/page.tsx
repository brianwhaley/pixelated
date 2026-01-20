"use client";

import React from 'react';
import { PageTitleHeader, PageSection } from '@pixelated-tech/components';
import { SchemaFAQ, FAQAccordion } from '@pixelated-tech/components';
import faqsData from '@/app/data/faqs.json';

export default function FAQs() {
	return (
		<>
			<SchemaFAQ faqsData={faqsData} />
			<PageTitleHeader title="Frequently Asked Questions" />
			<PageSection id="faq-section" columns={1} maxWidth="1024px">
				<p style={{ margin: "0 auto"}}>Find answers to common questions about our web design and development services</p>
				<FAQAccordion faqsData={faqsData} />
			</PageSection>
		</>
	);
}