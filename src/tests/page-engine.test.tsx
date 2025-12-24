import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageEngine } from "../components/sitebuilder/page/components/PageEngine";
import { PixelatedClientConfigProvider } from '../components/config/config.client';

describe('PageEngine', () => {
	const mockOnEditComponent = vi.fn();
	const mockOnSelectComponent = vi.fn();
	const mockOnDeleteComponent = vi.fn();
	const mockOnMoveUp = vi.fn();
	const mockOnMoveDown = vi.fn();

	const mockPageData = {
		components: [
			{
				component: 'Callout',
				props: {
					title: 'Test Callout',
					content: 'Test content'
				},
				children: []
			},
			{
				component: 'Page Section',
				props: {
					items: []
				},
				children: [
					{
						component: 'Callout',
						props: {
							title: 'Child Callout',
							content: 'Child content'
						},
						children: []
					}
				]
			}
		]
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render components without edit UI when editMode is false', () => {
		render(
			<PixelatedClientConfigProvider config={{ cloudinary: { product_env: 'test' } }}>
				<PageEngine
					pageData={mockPageData}
					editMode={false}
				/>
			</PixelatedClientConfigProvider>
		);

		// Should render the components but no edit buttons
		expect(screen.getByText('Test Callout')).toBeInTheDocument();
		expect(screen.queryByTitle('Edit properties')).not.toBeInTheDocument();
	});

	it('should render unknown component message for invalid components', () => {
		const invalidPageData = {
			components: [
				{
					component: 'InvalidComponent',
					props: {},
					children: []
				}
			]
		};

		render(
			<PixelatedClientConfigProvider config={{ cloudinary: { product_env: 'test' } }}>
				<PageEngine
					pageData={invalidPageData}
					editMode={false}
				/>
			</PixelatedClientConfigProvider>
		);

		expect(screen.getByText('Unknown component: InvalidComponent')).toBeInTheDocument();
	});

	it('should handle empty pageData gracefully', () => {
		render(
			<PixelatedClientConfigProvider config={{}}>
				<PageEngine
					pageData={{ components: [] }}
					editMode={false}
				/>
			</PixelatedClientConfigProvider>
		);

		// Should render nothing but not crash
		expect(screen.queryByText('Test Callout')).not.toBeInTheDocument();
	});
});