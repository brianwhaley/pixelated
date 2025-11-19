import React from 'react';
import { PageSection, GridItem, FlexItem } from '../components/general/pixelated.layout';

export default {
	title: 'Page Layout',
	component: PageSection,
	parameters: {
		docs: {
			description: {
				component: 'Unified layout component that supports both CSS Grid and Flexbox layouts. Replaces the old SectionContainer, GridSection, and FlexSection components.',
			},
		},
	},
	argTypes: {
		layoutType: {
			options: ['grid', 'flex', 'none'],
			control: { type: 'select' },
			description: 'The type of layout to use',
		},
		columns: {
			control: { type: 'number', min: 1, max: 12 },
			description: 'Number of grid columns (grid only)',
			if: { arg: 'layoutType', eq: 'grid' },
		},
		gap: {
			control: 'text',
			description: 'Gap between items (e.g., "1rem", "20px")',
		},
		maxWidth: {
			control: 'text',
			description: 'Maximum width of content (e.g., "1024px")',
		},
		direction: {
			options: ['row', 'column', 'row-reverse', 'column-reverse'],
			control: { type: 'select' },
			description: 'Flex direction (flex only)',
			if: { arg: 'layoutType', eq: 'flex' },
		},
		justifyContent: {
			options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
			control: { type: 'select' },
			description: 'Justify content along main axis (flex only)',
			if: { arg: 'layoutType', eq: 'flex' },
		},
		alignItems: {
			options: ['start', 'center', 'end', 'stretch', 'baseline'],
			control: { type: 'select' },
			description: 'Align items along cross axis',
		},
	},
};

// Demo item component
const DemoItem = ({ children, style }) => (
	<div style={{
		background: '#f7fafc',
		padding: '2rem',
		borderRadius: '8px',
		border: '2px solid #e2e8f0',
		minHeight: '120px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		...style
	}}>
		{children}
	</div>
);

export const GridLayout = {
	name: 'Grid Layout (3 Columns)',
	args: {
		layoutType: 'grid',
		columns: 3,
		gap: '2rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<DemoItem>Column 1</DemoItem>
			<DemoItem>Column 2</DemoItem>
			<DemoItem>Column 3</DemoItem>
			<DemoItem>Column 4</DemoItem>
			<DemoItem>Column 5</DemoItem>
			<DemoItem>Column 6</DemoItem>
		</PageSection>
	),
};

export const GridWithSpans = {
	name: 'Grid with Column Spans',
	args: {
		layoutType: 'grid',
		columns: 4,
		gap: '1.5rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<GridItem columnSpan={2}>
				<DemoItem>Spans 2 Columns</DemoItem>
			</GridItem>
			<GridItem columnSpan={1}>
				<DemoItem>1 Column</DemoItem>
			</GridItem>
			<GridItem columnSpan={1}>
				<DemoItem>1 Column</DemoItem>
			</GridItem>
			<GridItem columnSpan={1}>
				<DemoItem>1 Column</DemoItem>
			</GridItem>
			<GridItem columnSpan={3}>
				<DemoItem>Spans 3 Columns</DemoItem>
			</GridItem>
		</PageSection>
	),
};

export const FlexLayout = {
	name: 'Flex Layout (Space Between)',
	args: {
		layoutType: 'flex',
		direction: 'row',
		justifyContent: 'space-between',
		gap: '2rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<DemoItem style={{ flex: '0 0 30%' }}>Left 30%</DemoItem>
			<DemoItem style={{ flex: '0 0 30%' }}>Center 30%</DemoItem>
			<DemoItem style={{ flex: '0 0 30%' }}>Right 30%</DemoItem>
		</PageSection>
	),
};

export const FlexWithItems = {
	name: 'Flex Items with Custom Sizing',
	args: {
		layoutType: 'flex',
		direction: 'row',
		gap: '1.5rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<FlexItem flex="1">
				<DemoItem>Flex: 1 (grows)</DemoItem>
			</FlexItem>
			<FlexItem flex="0 0 200px">
				<DemoItem>Fixed 200px</DemoItem>
			</FlexItem>
			<FlexItem flex="2">
				<DemoItem>Flex: 2 (grows 2x)</DemoItem>
			</FlexItem>
		</PageSection>
	),
};

export const ResponsiveGrid = {
	name: 'Responsive Grid (Desktop 3, Tablet 2, Mobile 1)',
	args: {
		layoutType: 'grid',
		columns: 3,
		gap: '2rem',
		maxWidth: '1200px',
		responsive: { desktop: 3, tablet: 2, mobile: 1 },
	},
	render: (args) => (
		<PageSection {...args}>
			{[1, 2, 3, 4, 5, 6].map(num => (
				<div key={num} style={{
					background: 'white',
					padding: '1.5rem',
					borderRadius: '8px',
					boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
				}}>
					<h3>Card {num}</h3>
					<p>Responsive card in grid layout</p>
				</div>
			))}
		</PageSection>
	),
	parameters: {
		docs: {
			description: {
				story: 'Grid that adapts to screen size: 3 columns on desktop, 2 on tablet, 1 on mobile. Resize your browser to see the effect.',
			},
		},
	},
};

export const CenteredContent = {
	name: 'Centered Content',
	args: {
		layoutType: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: '800px',
		padding: '4rem 0',
	},
	render: (args) => (
		<PageSection {...args}>
			<div style={{
				background: 'white',
				padding: '3rem',
				borderRadius: '8px',
				boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
				textAlign: 'center',
			}}>
				<h2 style={{ marginTop: 0 }}>Centered Content</h2>
				<p>Perfect for CTAs, testimonials, or featured content.</p>
				<button style={{ 
					padding: '0.75rem 2rem', 
					background: '#667eea', 
					color: 'white', 
					border: 'none', 
					borderRadius: '4px',
					cursor: 'pointer',
					marginTop: '1rem',
					fontSize: '1rem',
				}}>
					Call to Action
				</button>
			</div>
		</PageSection>
	),
};

export const TwoColumnLayout = {
	name: 'Two Column Layout (60/40 Split)',
	args: {
		layoutType: 'flex',
		direction: 'row',
		gap: '3rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<FlexItem flex="0 0 60%">
				<DemoItem style={{ minHeight: '300px' }}>
					<div>
						<h3>Main Content (60%)</h3>
						<p>Primary content area</p>
					</div>
				</DemoItem>
			</FlexItem>
			<FlexItem flex="0 0 calc(40% - 3rem)">
				<DemoItem style={{ minHeight: '300px' }}>
					<div>
						<h3>Sidebar (40%)</h3>
						<p>Secondary content</p>
					</div>
				</DemoItem>
			</FlexItem>
		</PageSection>
	),
};

export const NestedLayouts = {
	name: 'Nested Layouts',
	args: {
		layoutType: 'grid',
		columns: 2,
		gap: '2rem',
		maxWidth: '1200px',
	},
	render: (args) => (
		<PageSection {...args}>
			<div style={{
				background: 'white',
				padding: '1.5rem',
				borderRadius: '8px',
				boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
			}}>
				<h3>Feature Section</h3>
				<PageSection layoutType="flex" direction="column" gap="1rem">
					<DemoItem>Feature 1</DemoItem>
					<DemoItem>Feature 2</DemoItem>
					<DemoItem>Feature 3</DemoItem>
				</PageSection>
			</div>
			<div style={{
				background: 'white',
				padding: '1.5rem',
				borderRadius: '8px',
				boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
			}}>
				<h3>Stats Grid</h3>
				<PageSection layoutType="grid" columns={2} gap="1rem">
					<DemoItem>Stat 1</DemoItem>
					<DemoItem>Stat 2</DemoItem>
					<DemoItem>Stat 3</DemoItem>
					<DemoItem>Stat 4</DemoItem>
				</PageSection>
			</div>
		</PageSection>
	),
	parameters: {
		docs: {
			description: {
				story: 'PageSection components can be nested to create complex layouts. This example shows a grid containing both flex and grid child layouts.',
			},
		},
	},
};

export const MasonryGrid = {
	name: 'Masonry-style Grid (Dense Auto Flow)',
	args: {
		layoutType: 'grid',
		columns: 4,
		gap: '1rem',
		maxWidth: '1200px',
		autoFlow: 'dense',
		responsive: { desktop: 4, tablet: 2, mobile: 1 },
	},
	render: (args) => (
		<PageSection {...args}>
			<GridItem columnSpan={2} rowSpan={2}>
				<DemoItem style={{ minHeight: '250px', background: '#e3f2fd' }}>
					<div>
						<strong>2x2 Large</strong>
						<p>Spans 2 columns and 2 rows</p>
					</div>
				</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem columnSpan={2}>
				<DemoItem style={{ background: '#f3e5f5' }}>
					<strong>2x1 Wide</strong>
				</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem columnSpan={1} rowSpan={2}>
				<DemoItem style={{ minHeight: '250px', background: '#fff3e0' }}>
					<div>
						<strong>1x2 Tall</strong>
						<p>Spans 2 rows</p>
					</div>
				</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem>
				<DemoItem>1x1</DemoItem>
			</GridItem>
			<GridItem columnSpan={3}>
				<DemoItem style={{ background: '#e8f5e9' }}>
					<strong>3x1 Extra Wide</strong>
				</DemoItem>
			</GridItem>
		</PageSection>
	),
	parameters: {
		docs: {
			description: {
				story: 'A masonry-style grid layout using `autoFlow="dense"` to fill gaps automatically. Items with different column and row spans create a dynamic, Pinterest-like layout. The grid packs items tightly, filling empty spaces with smaller items.',
			},
		},
	},
};
