import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { LocalBusinessSchema, type LocalBusinessSchemaProps } from '../components/seo/schema-localbusiness';

describe('LocalBusinessSchema', () => {
	const defaultProps: LocalBusinessSchemaProps = {
		name: 'Test Business',
		streetAddress: '123 Main St',
		addressLocality: 'Springfield',
		addressRegion: 'IL',
		postalCode: '62701',
		addressCountry: 'United States',
		telephone: '+1-217-555-0123',
		url: 'https://testbusiness.com',
		logo: 'https://testbusiness.com/logo.png',
		image: 'https://testbusiness.com/image.png'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render script tag with application/ld+json type', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		expect(scriptTag).toBeTruthy();
	});

	it('should include required schema.org context', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData['@context']).toBe('https://schema.org');
		expect(schemaData['@type']).toBe('LocalBusiness');
	});

	it('should include all required business information', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.name).toBe(defaultProps.name);
		expect(schemaData.telephone).toBe(defaultProps.telephone);
		expect(schemaData.url).toBe(defaultProps.url);
	});

	it('should include properly formatted address', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		const address = schemaData.address;
		expect(address['@type']).toBe('PostalAddress');
		expect(address.streetAddress).toBe(defaultProps.streetAddress);
		expect(address.addressLocality).toBe(defaultProps.addressLocality);
		expect(address.addressRegion).toBe(defaultProps.addressRegion);
		expect(address.postalCode).toBe(defaultProps.postalCode);
		expect(address.addressCountry).toBe(defaultProps.addressCountry);
	});

	it('should include logo and image when provided', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.logo).toBe(defaultProps.logo);
		expect(schemaData.image).toBe(defaultProps.image);
	});

	it('should exclude logo when not provided', () => {
		const { logo, ...propsWithoutLogo } = defaultProps;
		const { container } = render(<LocalBusinessSchema {...propsWithoutLogo} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.logo).toBeUndefined();
	});

	it('should exclude image when not provided', () => {
		const { image, ...propsWithoutImage } = defaultProps;
		const { container } = render(<LocalBusinessSchema {...propsWithoutImage} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.image).toBeUndefined();
	});

	it('should include opening hours when provided', () => {
		const props = {
			...defaultProps,
			openingHours: 'Mo-Fr 09:00-17:00'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.openingHours).toBe(props.openingHours);
	});

	it('should include multiple opening hours as array', () => {
		const openingHours = ['Mo-Fr 09:00-17:00', 'Sa 10:00-14:00'];
		const props = {
			...defaultProps,
			openingHours
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.openingHours).toEqual(openingHours);
	});

	it('should include description when provided', () => {
		const props = {
			...defaultProps,
			description: 'A great local business'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.description).toBe(props.description);
	});

	it('should exclude description when not provided', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.description).toBeUndefined();
	});

	it('should include email when provided', () => {
		const props = {
			...defaultProps,
			email: 'info@testbusiness.com'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.email).toBe(props.email);
	});

	it('should include priceRange when provided', () => {
		const props = {
			...defaultProps,
			priceRange: '$$'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.priceRange).toBe(props.priceRange);
	});

	it('should include social media profiles in sameAs', () => {
		const sameAs = [
			'https://facebook.com/testbusiness',
			'https://twitter.com/testbusiness',
			'https://instagram.com/testbusiness'
		];
		const props = {
			...defaultProps,
			sameAs
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.sameAs).toEqual(sameAs);
	});

	it('should exclude sameAs when empty array provided', () => {
		const props = {
			...defaultProps,
			sameAs: []
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.sameAs).toBeUndefined();
	});

	it('should default addressCountry to United States when not provided', () => {
		const { addressCountry, ...propsWithoutCountry } = defaultProps;
		const { container } = render(<LocalBusinessSchema {...propsWithoutCountry} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.address.addressCountry).toBe('United States');
	});

	it('should use custom addressCountry when provided', () => {
		const props = {
			...defaultProps,
			addressCountry: 'Canada'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.address.addressCountry).toBe('Canada');
	});

	it('should generate valid JSON', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		
		expect(() => {
			JSON.parse(scriptTag?.textContent || '{}');
		}).not.toThrow();
	});

	it('should handle special characters in business name', () => {
		const props = {
			...defaultProps,
			name: "O'Brien's Coffee & Bakery"
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.name).toBe(props.name);
	});

	it('should handle international phone numbers', () => {
		const props = {
			...defaultProps,
			telephone: '+44-20-7946-0958'
		};
		const { container } = render(<LocalBusinessSchema {...props} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		expect(schemaData.telephone).toBe(props.telephone);
	});

	it('should render without crashing with minimal required props', () => {
		const minimalProps: LocalBusinessSchemaProps = {
			name: 'Business',
			streetAddress: '123 St',
			addressLocality: 'City',
			addressRegion: 'State',
			postalCode: '12345',
			telephone: '+1-555-0123',
			url: 'https://example.com'
		};
		
		expect(() => {
			render(<LocalBusinessSchema {...minimalProps} />);
		}).not.toThrow();
	});

	it('should not include undefined optional fields in JSON output', () => {
		const { container } = render(<LocalBusinessSchema {...defaultProps} />);
		const scriptTag = container.querySelector('script[type="application/ld+json"]');
		const schemaData = JSON.parse(scriptTag?.textContent || '{}');
		
		// Check that undefined fields are not in the output
		expect(Object.values(schemaData).some(val => val === undefined)).toBe(false);
	});
});
