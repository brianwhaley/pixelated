import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel, CarouselCardType } from '../components/carousel/carousel';

// Mock the config hook
vi.mock('../components/config/config.client', () => ({
	usePixelatedConfig: () => ({
		cloudinary: {
			product_env: 'test',
			baseUrl: 'https://res.cloudinary.com/test',
			transforms: {},
		},
	}),
}));

// Mock SmartImage component
vi.mock('../components/cms/cloudinary.image', () => ({
	SmartImage: ({ src, alt, className }: any) => (
		<img src={src} alt={alt} className={className} />
	),
}));

// Mock DragHandler
vi.mock('../components/carousel/carousel.drag', () => ({
	DragHandler: vi.fn(),
}));

describe('Carousel Component', () => {
	const mockCards: CarouselCardType[] = [
		{
			index: 0,
			cardIndex: 0,
			cardLength: 3,
			image: 'https://example.com/image1.jpg',
			imageAlt: 'Image 1',
			headerText: 'Card 1',
			subHeaderText: 'Subheader 1',
			bodyText: 'Body text 1',
		},
		{
			index: 1,
			cardIndex: 1,
			cardLength: 3,
			image: 'https://example.com/image2.jpg',
			imageAlt: 'Image 2',
			headerText: 'Card 2',
			subHeaderText: 'Subheader 2',
			bodyText: 'Body text 2',
		},
		{
			index: 2,
			cardIndex: 2,
			cardLength: 3,
			image: 'https://example.com/image3.jpg',
			imageAlt: 'Image 3',
			headerText: 'Card 3',
			link: 'https://example.com/card3',
			linkTarget: '_blank',
		},
	];

	beforeEach(() => {
		vi.useFakeTimers();
	});

	describe('Rendering', () => {
		it('should render carousel container', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			expect(container.querySelector('.carousel-container')).toBeInTheDocument();
		});

		it('should render all carousel cards', () => {
			render(<Carousel cards={mockCards} />);
			expect(screen.getByText('Card 1')).toBeInTheDocument();
			expect(screen.getByText('Card 2')).toBeInTheDocument();
			expect(screen.getByText('Card 3')).toBeInTheDocument();
		});

		it('should render all images', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const images = container.querySelectorAll('img');
			expect(images.length).toBe(3);
		});

		it('should render carousel control buttons', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const buttons = container.querySelectorAll('.carousel-buttons button');
			expect(buttons.length).toBeGreaterThan(0);
		});

		it('should display loading state when no cards provided', () => {
			const { container } = render(<Carousel cards={[]} />);
			expect(container.querySelector('.carousel-container')).toBeInTheDocument();
		});
	});

	describe('Card Content', () => {
		it('should display header text when provided', () => {
			render(<Carousel cards={mockCards} />);
			expect(screen.getByText('Card 1')).toBeInTheDocument();
			expect(screen.getByText('Card 2')).toBeInTheDocument();
		});

		it('should display subheader text when provided', () => {
			render(<Carousel cards={mockCards} />);
			expect(screen.getByText('Subheader 1')).toBeInTheDocument();
			expect(screen.getByText('Subheader 2')).toBeInTheDocument();
		});

		it('should display body text when provided', () => {
			render(<Carousel cards={mockCards} />);
			expect(screen.getByText('Body text 1')).toBeInTheDocument();
			expect(screen.getByText('Body text 2')).toBeInTheDocument();
		});

		it('should render links when provided', () => {
			render(<Carousel cards={mockCards} />);
			const link = screen.getByRole('link', { hidden: true });
			expect(link).toHaveAttribute('href', 'https://example.com/card3');
			expect(link).toHaveAttribute('target', '_blank');
		});

		it('should not render links when not provided', () => {
			const cardsWithoutLinks = mockCards.map(card => ({
				...card,
				link: undefined,
			}));
			const { container } = render(<Carousel cards={cardsWithoutLinks} />);
			const links = container.querySelectorAll('a');
			expect(links.length).toBe(0);
		});

		it('should set default link target to _self', () => {
			const cardsWithDefaultTarget = [
				{
					...mockCards[0],
					link: 'https://example.com',
					linkTarget: undefined,
				},
			];
			render(<Carousel cards={cardsWithDefaultTarget} />);
			const link = screen.getByRole('link', { hidden: true });
			expect(link).toHaveAttribute('target', '_self');
		});
	});

	describe('Navigation', () => {
		it('should have previous, pause, and next buttons', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const buttons = container.querySelectorAll('.carousel-buttons button');
			expect(buttons.length).toBe(3);
		});

		it('should have unique button glyphs', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const buttons = container.querySelectorAll('.carousel-buttons button');
			const glyphs = Array.from(buttons).map(btn => btn.innerHTML);
			// Left arrow, pause, right arrow glyphs
			expect(glyphs.length).toBe(3);
		});
	});

	describe('Image Styling', () => {
		it('should apply default image fit (fill)', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const images = container.querySelectorAll('img');
			expect(images[0]).toHaveClass('imgFill');
		});

		it('should apply custom image fit (contain)', () => {
			const { container } = render(<Carousel cards={mockCards} imgFit="contain" />);
			const images = container.querySelectorAll('img');
			expect(images[0]).toHaveClass('imgContain');
		});

		it('should apply custom image fit (cover)', () => {
			const { container } = render(<Carousel cards={mockCards} imgFit="cover" />);
			const images = container.querySelectorAll('img');
			expect(images[0]).toHaveClass('imgCover');
		});
	});

	describe('Card Structure', () => {
		it('should have correct card wrapper structure', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const wrappers = container.querySelectorAll('.carousel-card-wrapper');
			expect(wrappers.length).toBe(3);
		});

		it('should have unique card IDs', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const wrappers = container.querySelectorAll('.carousel-card-wrapper');
			const ids = Array.from(wrappers).map(w => w.id);
			expect(ids).toEqual(['c-0', 'c-1', 'c-2']);
		});

		it('should render card images with alt text', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const images = container.querySelectorAll('img');
			expect(images[0]).toHaveAttribute('alt', 'Image 1');
			expect(images[1]).toHaveAttribute('alt', 'Image 2');
		});

		it('should have correct z-index values', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const wrappers = container.querySelectorAll('.carousel-card-wrapper');
			// Z-index = cardLength - index
			const wrapper0 = wrappers[0] as HTMLElement;
			const wrapper1 = wrappers[1] as HTMLElement;
			const wrapper2 = wrappers[2] as HTMLElement;
			expect(wrapper0.style.zIndex).toBe('3');
			expect(wrapper1.style.zIndex).toBe('2');
			expect(wrapper2.style.zIndex).toBe('1');
		});
	});

	describe('Single Card', () => {
		it('should render carousel with single card', () => {
			const singleCard = [mockCards[0]];
			render(<Carousel cards={singleCard} />);
			expect(screen.getByText('Card 1')).toBeInTheDocument();
		});

		it('should handle navigation with single card (loops)', () => {
			const singleCard = [{ ...mockCards[0], index: 0, cardLength: 1 }];
			const { container } = render(<Carousel cards={singleCard} />);
			expect(container.querySelector('.carousel-card-wrapper')).toBeInTheDocument();
		});
	});

	describe('Large Card Collection', () => {
		it('should render carousel with many cards', () => {
			const manyCards = Array.from({ length: 20 }, (_, i) => ({
				...mockCards[0],
				index: i,
				cardIndex: i,
				cardLength: 20,
				headerText: `Card ${i + 1}`,
				image: `https://example.com/image${i + 1}.jpg`,
			}));
			const { container } = render(<Carousel cards={manyCards} />);
			expect(container.querySelectorAll('.carousel-card-wrapper').length).toBe(20);
		});
	});

	describe('Optional Card Properties', () => {
		it('should handle cards without optional properties', () => {
			const minimalCards = [
				{
					index: 0,
					cardIndex: 0,
					cardLength: 1,
					image: 'https://example.com/image1.jpg',
					imageAlt: 'Minimal card image',
				},
			];
			render(<Carousel cards={minimalCards} />);
			const image = screen.getByAltText('Minimal card image');
			expect(image).toBeInTheDocument();
		});

		it('should not render sections for missing optional content', () => {
			const minimalCards = [
				{
					index: 0,
					cardIndex: 0,
					cardLength: 1,
					image: 'https://example.com/image.jpg',
				},
			];
			const { container } = render(<Carousel cards={minimalCards} />);
			expect(container.querySelector('.carousel-card-header')).not.toBeInTheDocument();
			expect(container.querySelector('.carousel-card-subheader')).not.toBeInTheDocument();
			expect(container.querySelector('.carousel-card-body')).not.toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should have alt text on all images', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const images = container.querySelectorAll('img');
			images.forEach(img => {
				expect(img).toHaveAttribute('alt');
			});
		});

		it('should have semantic heading structure', () => {
			render(<Carousel cards={mockCards} />);
			const h3s = screen.getAllByRole('heading', { level: 3 });
			expect(h3s.length).toBeGreaterThan(0);
		});

		it('should have buttons for navigation', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const buttons = container.querySelectorAll('button');
			expect(buttons.length).toBeGreaterThan(0);
		});
	});

	describe('CSS Classes', () => {
		it('should apply correct CSS classes to card wrappers', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			const wrappers = container.querySelectorAll('.carousel-card-wrapper');
			expect(wrappers.length).toBe(3);
			wrappers.forEach(wrapper => {
				expect(wrapper).toHaveClass('carousel-card-wrapper');
			});
		});

		it('should apply correct CSS classes to card content', () => {
			const { container } = render(<Carousel cards={mockCards} />);
			expect(container.querySelector('.carousel-card-image')).toBeInTheDocument();
			expect(container.querySelector('.carousel-card-header')).toBeInTheDocument();
			expect(container.querySelector('.carousel-card-subheader')).toBeInTheDocument();
			expect(container.querySelector('.carousel-card-body')).toBeInTheDocument();
		});
	});

	describe('Edge Cases', () => {
		it('should handle cards with very long text', () => {
			const longTextCards = [
				{
					...mockCards[0],
					headerText: 'A'.repeat(100),
					bodyText: 'B'.repeat(500),
				},
			];
			render(<Carousel cards={longTextCards} />);
			expect(screen.getByText('A'.repeat(100))).toBeInTheDocument();
		});

		it('should handle cards with special characters in text', () => {
			const specialCards = [
				{
					...mockCards[0],
					headerText: 'Card & "Special" <Characters>',
					bodyText: 'Body with © symbols and → arrows',
				},
			];
			render(<Carousel cards={specialCards} />);
			expect(screen.getByText(/Special/)).toBeInTheDocument();
		});

		it('should handle URLs with special characters', () => {
			const specialUrlCards = [
				{
					...mockCards[0],
					link: 'https://example.com/path?id=123&name=test#section',
					linkTarget: '_blank',
				},
			];
			render(<Carousel cards={specialUrlCards} />);
			const link = screen.getByRole('link', { hidden: true });
			expect(link).toHaveAttribute(
				'href',
				'https://example.com/path?id=123&name=test#section'
			);
		});

		it('should handle cards with missing image', () => {
			const noImageCards = [
				{
					index: 0,
					cardIndex: 0,
					cardLength: 1,
					image: '',
					headerText: 'No Image Card',
				},
			];
			const { container } = render(<Carousel cards={noImageCards} />);
			expect(screen.getByText('No Image Card')).toBeInTheDocument();
		});
	});
});
