"use client";

import React from "react";
import PropTypes, { InferProps } from "prop-types";
import "./pixelated.layout.scss";

/* ==================== LAYOUT COMPONENTS ====================
Reusable, scalable layout components for grid and flex layouts.
These components can be used in the pagebuilder to create
responsive, customizable page sections.
==================== ==================== */

// Define option arrays - used by both PropTypes and form generation
export const layoutTypes = ['grid', 'flex', 'none'] as const;
export const autoFlowValues = ['row', 'column', 'dense', 'row dense', 'column dense'] as const;
export const justifyItemsValues = ['start', 'center', 'end', 'stretch'] as const;
export const flexDirections = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
export const flexWraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export const justifyContentValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'] as const;
export const alignItemsValues = ['start', 'center', 'end', 'stretch', 'baseline'] as const;

// ========== PAGE SECTION ==========
PageSection.propTypes = {
	id: PropTypes.string,
	layoutType: PropTypes.oneOf([...layoutTypes]),
	// Common props
	gap: PropTypes.string,
	maxWidth: PropTypes.string,
	padding: PropTypes.string,
	background: PropTypes.string,
	backgroundImage: PropTypes.string,
	// Grid-specific props
	columns: PropTypes.number,
	autoFlow: PropTypes.oneOf([...autoFlowValues]),
	justifyItems: PropTypes.oneOf([...justifyItemsValues]),
	responsive: PropTypes.shape({
		mobile: PropTypes.number,
		tablet: PropTypes.number,
		desktop: PropTypes.number,
	}),
	// Flex-specific props
	direction: PropTypes.oneOf([...flexDirections]),
	wrap: PropTypes.oneOf([...flexWraps]),
	justifyContent: PropTypes.oneOf([...justifyContentValues]),
	// Shared alignment
	alignItems: PropTypes.oneOf([...alignItemsValues]),
	children: PropTypes.node,
};
export type PageSectionType = InferProps<typeof PageSection.propTypes>;
export function PageSection({
	id,
	layoutType = 'grid',
	gap = '10px',
	maxWidth = '1024px',
	padding = '0 20px',
	background,
	backgroundImage,
	// Grid props
	columns = 12,
	autoFlow = 'row',
	justifyItems = 'stretch',
	responsive = { mobile: 1, tablet: 2, desktop: 3 },
	// Flex props
	direction = 'row',
	wrap = 'wrap',
	justifyContent = 'start',
	// Shared
	alignItems = 'stretch',
	children,
}: PageSectionType) {
	const sectionStyle: React.CSSProperties = {
		...(background && { background }),
	};
	const contentStyle: React.CSSProperties = {
		...(maxWidth && { maxWidth }),
		margin: '0 auto',
		...(padding && { padding }),
	};
	// Add layout-specific styles
	if (layoutType === 'grid') {
		const responsiveClass = `grid-responsive-${responsive?.mobile || 1}-${responsive?.tablet || 2}-${responsive?.desktop || columns}`;
		return (
			<section id={id || undefined} className={`page-section page-section-grid ${responsiveClass}`} style={sectionStyle}>
				{backgroundImage && <SectionBackgroundImage backgroundImage={backgroundImage} id={id} />}
				<div 
					className="page-section-content"
					style={{
						...contentStyle,
						display: 'grid',
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
						...(gap && { gap }),
						...(autoFlow && { gridAutoFlow: autoFlow }),
						...(alignItems && { alignItems }),
						...(justifyItems && { justifyItems }),
					}}
				>
					{children}
				</div>
			</section>
		);
	}
	if (layoutType === 'flex') {
		return (
			<section id={id || undefined} className="page-section page-section-flex" style={sectionStyle}>
				{backgroundImage && <SectionBackgroundImage backgroundImage={backgroundImage} id={id} />}
				<div 
					className="page-section-content"
					style={{
						...contentStyle,
						display: 'flex',
						...(direction && { flexDirection: direction as React.CSSProperties['flexDirection'] }),
						...(wrap && { flexWrap: wrap as React.CSSProperties['flexWrap'] }),
						...(gap && { gap }),
						...(alignItems && { alignItems: alignItems as React.CSSProperties['alignItems'] }),
						...(justifyContent && { justifyContent: justifyContent as React.CSSProperties['justifyContent'] }),
					}}
				>
					{children}
				</div>
			</section>
		);
	}
	// layoutType === 'none'
	return (
		<section id={id || undefined} className="page-section page-section-none" style={sectionStyle}>
			{backgroundImage && <SectionBackgroundImage backgroundImage={backgroundImage} id={id} />}
			<div className="page-section-content" style={contentStyle}>
				{children}
			</div>
		</section>
	);
}



// ========== GRID ITEM ==========
GridItem.propTypes = {
	columnSpan: PropTypes.number,
	rowSpan: PropTypes.number,
	columnStart: PropTypes.number,
	columnEnd: PropTypes.number,
	rowStart: PropTypes.number,
	rowEnd: PropTypes.number,
	alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
	justifySelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
	children: PropTypes.node,
};
export type GridItemType = InferProps<typeof GridItem.propTypes>;
export function GridItem({
	columnSpan,
	rowSpan,
	columnStart,
	columnEnd,
	rowStart,
	rowEnd,
	alignSelf,
	justifySelf,
	children,
}: GridItemType) {
	const itemStyle: React.CSSProperties = {
		...(columnSpan && { gridColumn: ` span ${columnSpan}` }),
		...(columnStart && columnEnd && { gridColumn: ` ${columnStart} / ${columnEnd}` }),
		...(rowSpan && { gridRow: ` span ${rowSpan}` }),
		...(rowStart && rowEnd && { gridRow: ` ${rowStart} / ${rowEnd}` }),
		...(alignSelf && { alignSelf }),
		...(justifySelf && { justifySelf }),
	};
	return (
		<div className="grid-item" style={itemStyle}>
			{children}
		</div>
	);
}



// ========== FLEX ITEM ==========
FlexItem.propTypes = {
	flex: PropTypes.string,
	order: PropTypes.number,
	alignSelf: PropTypes.oneOf(['auto', 'start', 'center', 'end', 'stretch', 'baseline']),
	children: PropTypes.node,
};
export type FlexItemType = InferProps<typeof FlexItem.propTypes>;
export function FlexItem({
	flex = '1',
	order,
	alignSelf,
	children,
}: FlexItemType) {
	const itemStyle: React.CSSProperties = {
		...(flex && { flex }),
		...(order !== undefined && order !== null && { order }),
		...(alignSelf && { alignSelf: alignSelf as React.CSSProperties['alignSelf'] }),
	};
	return (
		<div className="flex-item" style={itemStyle}>
			{children}
		</div>
	);
}


// ========== SECTION BACKGROUND IMAGE ==========
SectionBackgroundImage.propTypes = {
	backgroundImage: PropTypes.string.isRequired,
	id: PropTypes.string,
};
export type SectionBackgroundImageType = InferProps<typeof SectionBackgroundImage.propTypes>;
export function SectionBackgroundImage(props: SectionBackgroundImageType) {
	return (
		<img src={props.backgroundImage} 
			className="section-background-image" 
			id={props.id ? `${props.id}-background-image` : undefined} 
			// name={props.id ? `${props.id} background image` : undefined}
			title={props.id ? `${props.id} background image` : undefined} 
			alt={props.id ? `${props.id} background image` : undefined} />
	);
}