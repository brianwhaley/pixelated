import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuExpando, MenuExpandoButton } from '../components/menu/menu-expando';

describe('MenuExpando Component', () => {
	const mockMenuItems = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about', routes: [{ name: 'Team', path: '/team' }, { name: 'History', path: '/history' }] },
		{ name: 'Services', path: '/services' },
		{ name: 'Contact', path: '/contact' },
	];

	const objectMenuItems = {
		Home: '/',
		About: '/about',
		Services: '/services',
		Contact: '/contact',
	};

	describe('Rendering', () => {
		it('should render the menu component', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const menuExpando = container.querySelector('.menuExpando');
			expect(menuExpando).toBeInTheDocument();
		});

		it('should render with empty summary', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const summary = container.querySelector('summary');
			expect(summary).toBeInTheDocument();
			expect(summary?.textContent).toBe('');
		});

		it('should render all menu items from array format', () => {
			render(<MenuExpando menuItems={mockMenuItems} />);
			expect(screen.getByText('Home')).toBeInTheDocument();
			expect(screen.getByText('About')).toBeInTheDocument();
			expect(screen.getByText('Services')).toBeInTheDocument();
			expect(screen.getByText('Contact')).toBeInTheDocument();
		});

		it('should render all menu items from object format', () => {
			render(<MenuExpando menuItems={objectMenuItems} />);
			expect(screen.getByText('Home')).toBeInTheDocument();
			expect(screen.getByText('About')).toBeInTheDocument();
			expect(screen.getByText('Services')).toBeInTheDocument();
		});

		it('should render nested menu items for items with routes', () => {
			render(<MenuExpando menuItems={mockMenuItems} />);
			expect(screen.getByText('Team')).toBeInTheDocument();
			expect(screen.getByText('History')).toBeInTheDocument();
		});
	});

	describe('Menu Links', () => {
		it('should have correct href attributes on menu items', () => {
			render(<MenuExpando menuItems={mockMenuItems} />);
			const homeLink = screen.getByText('Home').closest('a');
			expect(homeLink).toHaveAttribute('href', '/');
		});

		it('should handle nested item links correctly', () => {
			render(<MenuExpando menuItems={mockMenuItems} />);
			const teamLink = screen.getByText('Team').closest('a');
			expect(teamLink).toHaveAttribute('href', '/team');
		});

		it('should render correct number of links', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const links = container.querySelectorAll('a');
			// 4 main items (Home, About, Services, Contact) + 2 nested (Team, History) = 6
			// But About link is in both main and nested, so 6 total
			expect(links.length).toBeGreaterThanOrEqual(5);
		});
	});

	describe('Structure', () => {
		it('should have details wrapper element', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const details = container.querySelector('details.menuExpandoWrapper');
			expect(details).toBeInTheDocument();
		});

		it('should have ul element for main menu items', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const ul = container.querySelector('details.menuExpandoWrapper > ul');
			expect(ul).toBeInTheDocument();
		});

		it('should have nested details for items with routes', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const nestedDetails = container.querySelectorAll('details.menuExpandoNested');
			expect(nestedDetails.length).toBeGreaterThan(0);
		});

		it('should have proper li structure for menu items', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const lis = container.querySelectorAll('li');
			expect(lis.length).toBeGreaterThan(0);
		});
	});

	describe('Accessibility', () => {
		it('should have semantic HTML structure', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			expect(container.querySelector('details')).toBeInTheDocument();
			expect(container.querySelector('summary')).toBeInTheDocument();
			expect(container.querySelector('ul')).toBeInTheDocument();
		});

		it('should have anchor tags with text content', () => {
			render(<MenuExpando menuItems={mockMenuItems} />);
			const links = screen.getAllByRole('link');
			links.forEach(link => {
				expect(link.textContent).toBeTruthy();
			});
		});
	});

	describe('Styling', () => {
		it('should apply correct CSS classes', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			expect(container.querySelector('.menuExpando')).toBeInTheDocument();
			expect(container.querySelector('.menuExpandoWrapper')).toBeInTheDocument();
		});

		it('should have nested menu specific classes', () => {
			const { container } = render(<MenuExpando menuItems={mockMenuItems} />);
			const nested = container.querySelector('.menuExpandoNested');
			expect(nested).toBeInTheDocument();
		});
	});
});

describe('MenuExpandoButton Component', () => {
	it('should render the button component', () => {
		const { container } = render(<MenuExpandoButton />);
		const button = container.querySelector('.menuExpandoButton');
		expect(button).toBeInTheDocument();
	});

	it('should have an image element', () => {
		const { container } = render(<MenuExpandoButton />);
		const img = container.querySelector('img');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', '/images/icons/mobile-menu2.png');
		expect(img).toHaveAttribute('alt', 'Mobile Menu');
	});

	it('should have correct title attribute', () => {
		const { container } = render(<MenuExpandoButton />);
		const img = container.querySelector('img');
		expect(img).toHaveAttribute('title', 'Mobile Menu');
	});
});

describe('MenuExpando Edge Cases', () => {
	it('should handle empty menu items array', () => {
		const { container } = render(<MenuExpando menuItems={[]} />);
		const ul = container.querySelector('ul');
		expect(ul).toBeInTheDocument();
	});

	it('should handle items with empty routes array', () => {
		const itemsWithEmptyRoutes = [
			{ name: 'Home', path: '/', routes: [] },
			{ name: 'About', path: '/about' },
		];
		render(<MenuExpando menuItems={itemsWithEmptyRoutes} />);
		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('About')).toBeInTheDocument();
	});

	it('should handle items with special characters in names', () => {
		const specialItems = [
			{ name: 'Home & Services', path: '/' },
			{ name: 'FAQ\'s', path: '/faq' },
		];
		render(<MenuExpando menuItems={specialItems} />);
		expect(screen.getByText('Home & Services')).toBeInTheDocument();
		expect(screen.getByText('FAQ\'s')).toBeInTheDocument();
	});

	it('should handle very long menu item names', () => {
		const longNameItems = [
			{ name: 'This is a very long menu item name that might wrap', path: '/' },
		];
		render(<MenuExpando menuItems={longNameItems} />);
		expect(screen.getByText('This is a very long menu item name that might wrap')).toBeInTheDocument();
	});
});
