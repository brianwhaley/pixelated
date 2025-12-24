import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SmartImage } from '../components/cms/smartimage';

// Mock the usePixelatedConfig hook
vi.mock('../components/config/config.client', () => ({
usePixelatedConfig: vi.fn(),
}));

// Mock the buildCloudinaryUrl function
vi.mock('../components/cms/cloudinary', () => ({
buildCloudinaryUrl: vi.fn(),
}));

import { usePixelatedConfig } from '../components/config/config.client';
import { buildCloudinaryUrl } from '../components/cms/cloudinary';

const mockUsePixelatedConfig = vi.mocked(usePixelatedConfig);
const mockBuildCloudinaryUrl = vi.mocked(buildCloudinaryUrl);

describe('SmartImage Component', () => {
	beforeEach(() => {
		// Reset mocks
		vi.clearAllMocks();

		// Default mock config
		mockUsePixelatedConfig.mockReturnValue({
cloudinary: {
product_env: 'test-env',
baseUrl: 'https://res.cloudinary.com/test/',
transforms: 'f_auto,c_limit,q_auto,dpr_auto',
},
});

		// Default mock Cloudinary URL builder
		mockBuildCloudinaryUrl.mockReturnValue('https://res.cloudinary.com/test/image/upload/f_auto,c_limit,q_75/https://example.com/test-image.jpg');
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('Basic Rendering', () => {
		it('should render an image element', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" />);
			const img = screen.getByAltText('Test image');
			expect(img).toBeInTheDocument();
		});

		it('should apply alt text correctly', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Descriptive alt text" />);
			const img = screen.getByAltText('Descriptive alt text');
			expect(img).toBeInTheDocument();
		});

		it('should set default dimensions', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('width', '500');
			expect(img).toHaveAttribute('height', '500');
		});

		it('should accept custom dimensions', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" width={800} height={600} />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('width', '800');
			expect(img).toHaveAttribute('height', '600');
		});
	});

	describe('Variants', () => {
		it('should render plain img tag for img variant', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="img" />);
			const img = screen.getByAltText('Test image');
			expect(img.tagName).toBe('IMG');
			expect(img).not.toHaveAttribute('data-nimg');
		});

		it('should use Next.js Image for nextjs variant', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="nextjs" />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('data-nimg');
		});

		it('should use Cloudinary for cloudinary variant when config available', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="cloudinary" />);
			expect(mockBuildCloudinaryUrl).toHaveBeenCalled();
		});

		it('should not use Cloudinary for img variant', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="img" />);
			expect(mockBuildCloudinaryUrl).not.toHaveBeenCalled();
		});

		it('should not use Cloudinary for nextjs variant', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="nextjs" />);
			expect(mockBuildCloudinaryUrl).not.toHaveBeenCalled();
		});

		it('should use Cloudinary URLs with Next.js Image for cloudinary variant', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="cloudinary" />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('data-nimg');
			expect(mockBuildCloudinaryUrl).toHaveBeenCalledWith({
				src: 'https://example.com/test-image.jpg',
				productEnv: 'test-env',
				cloudinaryDomain: 'https://res.cloudinary.com/test/',
				quality: 75,
				width: 500,
				transforms: 'f_auto,c_limit,q_auto,dpr_auto',
			});
		});

		it('should fall back to Next.js Image when Cloudinary config unavailable for cloudinary variant', () => {
			mockUsePixelatedConfig.mockReturnValue({});
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" variant="cloudinary" />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('data-nimg');
			expect(mockBuildCloudinaryUrl).not.toHaveBeenCalled();
		});

		it('should default to cloudinary variant when no variant specified', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" />);
			expect(mockBuildCloudinaryUrl).toHaveBeenCalled();
		});
	});

	describe('Accessibility', () => {
		it('should mark decorative images correctly', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="" variant="img" />);
			const img = screen.getByAltText('');
			expect(img).toHaveAttribute('aria-hidden', 'true');
			expect(img).toHaveAttribute('role', 'presentation');
		});
	});

	describe('Performance', () => {
		it('should set loading to eager for aboveFold images', () => {
			render(<SmartImage src="https://example.com/test-image.jpg" alt="Test image" aboveFold variant="img" />);
			const img = screen.getByAltText('Test image');
			expect(img).toHaveAttribute('loading', 'eager');
			expect(img).toHaveAttribute('fetchpriority', 'high');
		});
	});
});
