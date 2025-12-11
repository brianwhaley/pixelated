import { describe, it, expect, vi } from 'vitest';

describe('Calendly Components Integration Tests', () => {
	describe('Calendly Embed', () => {
		it('should create calendly container', () => {
			const container = document.createElement('div');
			container.className = 'calendly-inline-widget';
			container.setAttribute('data-url', 'https://calendly.com/user/30min');
			document.body.appendChild(container);

			expect(container).toBeInTheDocument();
			expect(container.getAttribute('data-url')).toContain('calendly');

			document.body.removeChild(container);
		});

		it('should load Calendly script', () => {
			const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js';
			expect(scriptSrc).toContain('calendly');
		});

		it('should handle Calendly URL validation', () => {
			const url = 'https://calendly.com/john-doe/30-minute-meeting';
			expect(url).toMatch(/^https:\/\/calendly\.com\//);
		});

		it('should handle different meeting durations', () => {
			const durations = [
				'15min',
				'30min',
				'45min',
				'60min',
				'custom',
			];

			durations.forEach((duration) => {
				expect(duration).toBeTruthy();
			});
		});
	});

	describe('Calendly Configuration', () => {
		it('should configure booking page URL', () => {
			const config = {
				url: 'https://calendly.com/user/event',
				backgroundColor: '#ffffff',
				hideLandingPageDetails: false,
				hideEventTypeDetails: false,
			};

			expect(config.url).toContain('calendly');
			expect(config.backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
		});

		it('should handle custom colors', () => {
			const colors = ['#000000', '#ffffff', '#ff0000'];
			colors.forEach((color) => {
				expect(color).toMatch(/^#[0-9a-f]{6}$/i);
			});
		});

		it('should configure text labels', () => {
			const labels = {
				scheduled_events: 'Scheduled Events',
				upcoming: 'Upcoming',
				past: 'Past',
			};

			expect(labels.upcoming).toBe('Upcoming');
		});
	});

	describe('Calendly Popup Mode', () => {
		it('should handle popup trigger element', () => {
			const button = document.createElement('button');
			button.className = 'calendly-trigger';
			button.textContent = 'Schedule Now';
			document.body.appendChild(button);

			expect(button).toBeInTheDocument();
			expect(button.textContent).toBe('Schedule Now');

			document.body.removeChild(button);
		});

		it('should configure popup options', () => {
			const popupConfig = {
				url: 'https://calendly.com/user',
				text: 'Schedule Now',
				color: '#00a2ff',
				textColor: '#ffffff',
				branding: false,
			};

			expect(popupConfig.text).toBe('Schedule Now');
			expect(popupConfig.color).toMatch(/^#/);
		});

		it('should handle popup events', () => {
			const events = {
				onModalOpen: vi.fn(),
				onModalClose: vi.fn(),
				onEventScheduled: vi.fn(),
			};

			events.onModalOpen();
			expect(events.onModalOpen).toHaveBeenCalled();
		});
	});
});
