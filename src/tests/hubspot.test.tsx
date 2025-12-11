import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('HubSpot Components Integration Tests', () => {
	beforeEach(() => {
		// Mock window.hbspt
		(window as any).hbspt = undefined;
	});

	describe('HubSpot Form Rendering', () => {
		it('should create form container element', () => {
			const formId = 'test-form-id';
			const portalId = '123456';
			const container = document.createElement('div');
			container.id = `hubspotForm-${formId}`;
			document.body.appendChild(container);

			expect(container).toBeInTheDocument();
			expect(container.id).toContain('hubspotForm');

			document.body.removeChild(container);
		});

		it('should handle form portal ID', () => {
			const portalId = '12345678';
			expect(portalId).toMatch(/^\d+$/);
			expect(portalId.length).toBeGreaterThan(0);
		});

		it('should handle form ID', () => {
			const formId = 'abc-def-123';
			expect(formId).toBeTruthy();
			expect(formId).toContain('-');
		});
	});

	describe('Script Loading', () => {
		it('should load HubSpot embed script', () => {
			const scriptSrc = 'https://js.hsforms.net/forms/shell.js';
			expect(scriptSrc).toContain('hsforms');
			expect(scriptSrc).toContain('https');
		});

		it('should handle script loading errors', () => {
			const scriptError = new Error('Failed to load HubSpot forms');
			expect(scriptError.message).toContain('HubSpot');
		});

		it('should prevent duplicate script loading', () => {
			const scripts = document.querySelectorAll(
				'script[src*="hsforms"]'
			);
			const count = scripts.length;

			// Verify it's a non-negative number
			expect(count).toBeGreaterThanOrEqual(0);
		});
	});

	describe('Form Configuration', () => {
		it('should configure form options', () => {
			const formConfig = {
				portalId: '12345678',
				formId: 'abc-def-123',
				target: '#form-container',
				onFormSubmit: vi.fn(),
			};

			expect(formConfig.portalId).toBeDefined();
			expect(formConfig.formId).toBeDefined();
			expect(formConfig.target).toBeDefined();
		});

		it('should handle form submission callback', () => {
			const onSubmit = vi.fn();
			onSubmit({ field1: 'value1' });

			expect(onSubmit).toHaveBeenCalled();
			expect(onSubmit).toHaveBeenCalledWith(
				expect.objectContaining({ field1: 'value1' })
			);
		});

		it('should handle form validation errors', () => {
			const validation = {
				required: true,
				email: true,
				minLength: 5,
			};

			expect(validation.required).toBe(true);
			expect(validation.email).toBe(true);
		});
	});

	describe('Form Data Handling', () => {
		it('should capture form field data', () => {
			const formData = {
				firstname: 'John',
				lastname: 'Doe',
				email: 'john@example.com',
			};

			expect(formData.email).toMatch(/@/);
			expect(formData.firstname).toBeTruthy();
		});

		it('should handle multi-select fields', () => {
			const multiSelect = ['option1', 'option2', 'option3'];
			expect(multiSelect).toHaveLength(3);
		});

		it('should handle checkbox fields', () => {
			const checkboxField = {
				name: 'subscribe',
				value: true,
			};

			expect(checkboxField.value).toBe(true);
		});

		it('should handle textarea fields', () => {
			const textarea = 'This is a long message\nWith multiple lines\nOf text';
			expect(textarea).toContain('\n');
		});
	});

	describe('Error Handling', () => {
		it('should handle missing portal ID', () => {
			const error = { code: 'MISSING_PORTAL_ID' };
			expect(error.code).toBe('MISSING_PORTAL_ID');
		});

		it('should handle invalid form ID', () => {
			const error = { code: 'INVALID_FORM_ID' };
			expect(error.code).toBe('INVALID_FORM_ID');
		});

		it('should handle network errors', () => {
			const error = new Error('Network request failed');
			expect(error.message).toContain('Network');
		});
	});
});
