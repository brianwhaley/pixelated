
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Coverage][coverage-shield]][coverage-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brianwhaley/pixelated-components">
    <img src="https://www.pixelated.tech/images/pix/pix-bg-512.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pixelated Components</h3>

  <p align="center">
    A comprehensive React component library for modern web development, featuring CMS integrations, UI components, SEO optimization tools, and accessibility-first design.
    <br />
    <a href="https://github.com/brianwhaley/pixelated-components"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/brianwhaley/pixelated-components">View Demo</a>
    &middot;
    <a href="https://github.com/brianwhaley/pixelated-components/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/brianwhaley/pixelated-components/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a library of components I have found useful to build web sites quickly.  



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Storybook][Storybook.js]][Storybook-url]
* [![Calendly][Calendly.com]][Calendly-url]
* [![Contentful][Contentful.com]][Contentful-url]
* [![Cloudinary][Cloudinary.com]][Cloudinary-url]
* [![Flickr][Flickr.com]][Flickr-url]
* [![Gravatar][Gravatar.com]][Gravatar-url]
* [![Hubspot][Hubspot.com]][Hubspot-url]
* [![Instagram][Instagram.com]][Instagram-url]
* [![PayPal][PayPal.com]][PayPal-url]
* [![Wordpress][Wordpress.com]][Wordpress-url]
* [![Github][Github.com]][Github-url]
* [![npm][npm.org]][npm-url]




## ♿ Accessibility

Pixelated Components is committed to creating inclusive web experiences. All components are built with accessibility in mind and include:

- **WCAG 2.1 AA compliance** - Components meet web accessibility guidelines
- **Keyboard navigation** - Full keyboard support for all interactive elements
- **Screen reader support** - Proper ARIA labels, roles, and semantic HTML
- **Focus management** - Clear focus indicators and logical tab order
- **Color contrast** - High contrast ratios for text and interactive elements
- **Semantic HTML** - Proper use of headings, landmarks, and structural elements

### Accessibility Features
- Automatic ARIA label generation
- Focus trap management for modals and overlays
- Skip links for keyboard users
- Reduced motion support for users with vestibular disorders
- High contrast mode compatibility




## 📦 Installation & Setup

### Requirements
- **React**: 18.0 or higher
- **Next.js**: 13.0 or higher (recommended)
- **Node.js**: 18.0 or higher
- **TypeScript**: 4.9 or higher (optional, but recommended)

### Basic Installation

```bash
# npm
npm install @pixelated-tech/components

# yarn
yarn add @pixelated-tech/components

# pnpm
pnpm add @pixelated-tech/components
```

### Peer Dependencies

This library requires the following peer dependencies (install if not already present):

```bash
npm install react react-dom prop-types
```

### TypeScript Support

This library is written in TypeScript and provides full type definitions. No additional setup required.

### Reference Implementation

For a complete working example of Pixelated Components in action, check out the [pixelated-admin](https://github.com/brianwhaley/pixelated-admin) project. This admin interface demonstrates:

- **Component Integration**: Real-world usage of all major components
- **Configuration Management**: Dynamic site configuration with ConfigBuilder
- **Page Building**: Visual page construction with PageBuilderUI
- **Authentication**: NextAuth.js integration for secure admin access
- **Deployment Ready**: Production-ready setup with HTTPS and optimized builds

```bash
# Clone the reference implementation
git clone https://github.com/brianwhaley/pixelated-admin.git
cd pixelated-admin
npm install
npm run dev
```

Visit `http://localhost:3006` to explore the admin interface and see components in action.

### General Components
Reusable UI components for common patterns:
- **Accordion** - Expandable content sections using native `<details>` elements
- **Callout** - Flexible content highlight blocks with image support
- **CSS** - Dynamic CSS utilities and styling helpers
- **Image** - Advanced image component with lazy loading and optimization
- **Loading** - Progress indicators and loading states
- **MicroInteractions** - Subtle animations and interaction effects
- **Modal** - Dialog overlays and popups
- **Semantic** - Semantic HTML structure components
- **SidePanel** - Slide-out panel component for additional content
- **Table** - Data display and table components

### CMS Integration
Headless CMS and content management components:
- **WordPress** - Blog post integration and display with automatic Photon CDN URL processing
- **Contentful** - Headless CMS components and utilities with delivery and management APIs
- **PageBuilder** - Dynamic page construction from JSON
- **PageEngine** - Advanced page rendering with Contentful integration

### UI Components
User interface and interaction components:
- **Carousel** - Image and content sliders (Hero, Reviews, Portfolio)
- **Forms** - Form builder, validation, and emailer components
- **FormBuilder** - Advanced form construction and configuration
- **FormComponents** - Individual form field components and utilities
- **FormEngine** - Form rendering and processing engine
- **Menu** - Navigation components (Simple, Accordion, Expando)
- **Tab** - Tabbed interface component for organizing content
- **Tiles** - Image grid and tile layouts

### Development Tools
Components for development, configuration, and site building:
- **ComponentPropertiesForm** - Form for editing component properties
- **ComponentSelector** - Component selection interface
- **ComponentTree** - Visual component hierarchy display
- **ConfigBuilder** - Interactive configuration builder for site settings, metadata, routes, and visual design tokens
- **PageBuilderUI** - User interface for page building
- **SaveLoadSection** - Save and load functionality for configurations

### SEO & Schema
Search engine optimization and structured data:
- **404** - Custom 404 error page component
- **GoogleAnalytics** - Google Analytics integration
- **GoogleMap** - Interactive Google Maps component
- **GoogleSearch** - Google Custom Search integration
- **JSON-LD** - Structured data schemas (LocalBusiness, Recipe, BlogPosting, etc.)
- **Manifest** - Web app manifest generation
- **MetaTags** - Dynamic meta tag injection
- **SchemaBlogPosting** - Blog post structured data
- **SchemaLocalBusiness** - Local business structured data
- **SchemaRecipe** - Recipe structured data
- **SchemaServices** - Services structured data
- **SchemaWebsite** - Website structured data
- **Sitemap** - XML sitemap generation
- **Social Cards** - Open Graph and Twitter card generation
- **BuzzwordBingo** - Interactive buzzword bingo game
- **Markdown** - Markdown rendering component
- **Recipe** - Recipe display component
- **Resume** - Resume/CV display component
- **Timeline** - Timeline visualization component

### Third-Party Integrations
External service integrations:
- **Calendly** - Scheduling and appointment booking
- **Cloudinary** - Image optimization and delivery
- **GoogleReviews** - Google business reviews integration
- **Gravatar** - User avatar integration
- **HubSpot** - CRM and marketing automation
- **Instagram** - Social media image integration
- **Flickr** - Photo sharing integration
- **PayPal** - Payment processing
- **ShoppingCart** - E-commerce shopping cart functionality
- **eBay** - Store listings and shopping cart
- **NerdJokes** - Entertainment content integration
- **Yelp** - Business reviews and ratings


## 🎨 Visual Design Configuration

The ConfigBuilder now includes a **Visual Design** tab that allows users to configure visual design tokens such as colors, fonts, spacing, and other design system variables. These tokens are stored in the `routes.json` file under the `visualdesign` object and can be used throughout your application for consistent theming.

### Features:
- **Color Management**: Primary, secondary, accent colors with color picker inputs
- **Typography**: Font family and base font size settings
- **Spacing & Layout**: Border radius, box shadows, transitions
- **Form-Based Editing**: User-friendly form interface powered by FormEngine
- **JSON Storage**: Design tokens stored as flattened key-value pairs in routes.json

### Usage:
```tsx
import { ConfigBuilder } from '@pixelated-tech/components';

function MyConfigPage() {
  return <ConfigBuilder />;
}
```

The visual design tokens can be accessed in your components via the config context or directly from the routes.json file.


## � Quick Start

Get up and running in minutes:

```bash
# Install the package
npm install @pixelated-tech/components

# Import and use components
import { Accordion, Callout } from '@pixelated-tech/components';
```

For detailed usage examples and API documentation, see the [Component Reference Guide](README.COMPONENTS.md).

### Storybook Interactive Demos

Explore all components with live, interactive examples:

```bash
# Start Storybook development server
npm run storybook
```

**Access locally at:** `http://localhost:6006`


<!-- ROADMAP -->
## Roadmap

### New Components
- [ ] **IN PROGRESS** - Testimonial Block (Nextdoor/Yelp/Google): ingest review feeds + render carousel/grid.
- [ ] **ON HOLD** LinkedIn Recommendations Integration (Not possible with current LinkedIn API)
- [ ] **ON HOLD** eBay Feedback Integration - requires user OAuth login
- [ ] **ON HOLD** Yelp Recommendations integration (Cost Prohibitive)
- [ ] Instagram Image Integration for Carousels
- [ ] Shopify Integration
- [ ] Quickbooks Integration
- [ ] Buffer Integration (or Sendible, Sprout Social, Hootsuite)
- [ ] Zapier Integration
- [ ] Hero Banner: headline, subtext, CTA, background image/video, overlay.
- [ ] Accessibility Enhancer: wrapper component that automatically improves accessibility across Pixelated sites by adding ARIA labels, roles, and states to existing components. Includes color contrast checking, keyboard navigation helpers, alt-text suggestions for images, and automated accessibility audits.
- [ ] SEO Dashboard with AI Integration: component that analyzes site content, suggests optimizations, integrates with AI for meta descriptions and keyword research.

### CI / CD Improvements
- [ ] Add CI workflow to run tests and lints on pull requests.

### Component Improvements
- [ ] Implement minimal `createContentfulImageURLs` with single `/images` sitemap entry.
- [ ] Review Contentful helper functions for per-page mapping capability.
- [ ] Implement `createContentfulImageURLs` per-page mapping with `contentType` & `pageField` config.
- [ ] Align typography to `--font-sizeN` clamp variables.
- [ ] Provide Cloudinary transforms presets for image components.
- [ ] find a better solution than to generate image via build script in amplify for json for sitemap creation
- [ ] **SocialCards Component**: Fix state initialization to track prop changes properly.
- [ ] **Modal Component**: Clarify content source pattern (accepts both `modalContent` and `children`).
- [ ] **Carousel Component**: Fix active card state reset when `props.cards` changes.
- [ ] **NerdJoke Component**: Add props to useEffect dependencies if endpoint becomes configurable.
- [ ] **GoogleReviews Component**: Add carousel/grid display modes.
- [ ] **GoogleReviews Component**: Add API key to config provider instead of hardcoding.
- [ ] **Instagram Component**: Add accessToken and userId to config provider for centralized API credentials.
- [ ] **Critters Integration**: Explore adding critters CSS inlining tool for improved page load performance and critical CSS optimization.

### Platform Enhancements
- [ ] **Project Scaffolding CLI**: Interactive CLI tool that generates complete Next.js projects with pixelated-components pre-configured, including routes.json, layout.tsx, package.json, and basic page structure
- [ ] **Template Marketplace**: Pre-built industry-specific templates (restaurant, law firm, contractor, etc.) that users can clone and customize
- [ ] **Configuration Wizard**: Step-by-step setup wizard that collects business info, generates site configuration, and creates initial content structure
- [ IP ] **Site Health Monitoring**: Automated monitoring dashboard that checks site performance, broken links, SEO scores, and security vulnerabilities across all sites
- [ ] **Content Migration Tools**: Automated importers for WordPress, Squarespace, Wix, and other platforms to migrate content to pixelated sites
- [ ] **A/B Testing Framework**: Built-in experimentation system for testing different layouts, content, and CTAs with automatic winner selection
- [ ] **Personalization Engine**: Dynamic content delivery based on user behavior, location, and preferences
- [ ] **Hot Module Replacement for Configs**: Live preview of configuration changes without full rebuilds
- [ ] **Automated Dependency Updates**: Smart update system that tests component changes across all sites before deployment
- [ ] **Rollback System**: One-click rollback to previous versions with automatic database and asset restoration
- [ ] **Performance Budget Tracker**: Automated monitoring of Core Web Vitals with alerts when sites exceed performance budgets
- [ ] **ConfigBuilder SEO Enhancement**: Upgrade ConfigBuilder with AI-powered meta description generation, keyword optimization suggestions, and automated schema markup
- [ ] **Conversion Funnel Builder**: Visual funnel creation with automated tracking, A/B testing, and optimization recommendations
- [ ] **Automated Security Scanner**: Regular security audits with vulnerability detection and automated fixes
- [ ] **GDPR Compliance Toolkit**: Automated cookie consent, data mapping, and privacy policy generation
- [ ] **API Gateway**: Unified API management for connecting to CRM, email marketing, payment processors, and other business tools
- [ ] **Webhook Automation**: Event-driven automation for form submissions, new content, user registrations, and business workflows
- [ ] **Third-Party Sync Engine**: Bidirectional sync with tools like HubSpot, Mailchimp, QuickBooks, and project management systems
- [ ] **Testing Strategy for Config Failure Scenarios**: Comprehensive testing framework for config-dependent components and error handling
  - Test components with missing config providers
  - Test error pages without config dependencies  
  - Test app initialization with invalid environment variables
  - Include chaos engineering tests that simulate config failures
- [ ] **Documentation Auto-Generator**: Automatically generated API docs, component usage guides, and deployment instructions


See the [open issues](https://github.com/brianwhaley/pixelated-components/issues) for a full list of proposed features (and known issues).




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request






### Top contributors:

<a href="https://github.com/brianwhaley/pixelated-components/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=brianwhaley/pixelated-components" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.




<!-- CONTACT -->
## Contact

Brian Whaley - [@brianwhaley](https://twitter.com/@brianwhaley) - brian.whaley@gmail.com

Project Link: [https://github.com/brianwhaley/pixelated-components](https://github.com/brianwhaley/pixelated-components)






## 🧪 Testing

### Overview

**Current Status**: ✅ 2,370 tests passing across 77 test files

| Metric | Value |
|--------|-------|
| Test Files | 77 |
| Total Tests | 2,370 |
| Coverage (Statements) | 76.98% |
| Coverage (Lines) | 79.55% |
| Coverage (Functions) | 78.09% |
| Coverage (Branches) | 67.57% |
| Test Framework | Vitest 4.x |
| Testing Library | @testing-library/react + jsdom |

### Quick Start

```bash
npm run test              # Watch mode
npm run test:ui          # Interactive UI dashboard
npm run test:coverage    # Generate coverage reports
npm run test:run         # Single run (for CI)
```

### Component Coverage

**Component Coverage Summary**

#### Component Coverage (Sorted by Statement Coverage)
- **site-health-cache.ts**: 100% statements *(new shared caching utility)*
- **sites.integration.ts**: 100% statements *(new site management functions)*
- **site-health-indicators.ts**: 100% statements
- **tiles.tsx**: 100% statements
- **google.reviews.functions.ts**: 100% statements
- **accordion.tsx**: 100% statements
- **modal.tsx**: 100% statements
- **tab.tsx**: 100% statements
- **ComponentPropertiesForm.tsx**: 100% statements
- **ComponentSelector.tsx**: 100% statements
- **ComponentTree.tsx**: 100% statements
- **formvalidations.tsx**: 100% statements
- **googlesearch.tsx**: 100% statements
- **schema-localbusiness.tsx**: 100% statements
- **schema-recipe.tsx**: 100% statements
- **schema-services.tsx**: 100% statements
- **schema-website.tsx**: 100% statements
- **schema-blogposting.tsx**: 100% statements
- **buzzwordbingo.tsx**: 100% statements
- **markdown.tsx**: 100% statements
- **timeline.tsx**: 100% statements
- **sidepanel.tsx**: 97.5% statements
- **config.server.tsx**: 50% statements
- **config.ts**: 96.55% statements
- **google.reviews.components.tsx**: 95.83% statements
- **schema-blogposting.tsx**: 95.24% statements
- **recipe.tsx**: 94.59% statements
- **resume.tsx**: 94.38% statements
- **contentful.delivery.ts**: 92.5% statements
- **css.tsx**: 91.43% statements
- **functions.ts**: 90.91% statements
- **menu-expando.tsx**: 90.12% statements
- **config.client.tsx**: 100% statements
- **loading.tsx**: 85.71% statements
- **SaveLoadSection.tsx**: 84.85% statements
- **table.tsx**: 84.48% statements
- **ConfigBuilder.tsx**: 83.52% statements
- **cloudinary.ts**: 83.33% statements
- **formcomponents.tsx**: 83.33% statements
- **form.tsx**: 83.2% statements
- **shoppingcart.functions.ts**: 81.7% statements
- **callout.tsx**: 80% statements
- **microinteractions.tsx**: 80% statements
- **smartimage.tsx**: 82.75% statements
- **sitemap.ts**: 76.06% statements
- **manifest.tsx**: 75% statements
- **carousel.tsx**: 71.7% statements
- **nerdjoke.tsx**: 69.44% statements
- **menu-accordion.tsx**: 68.47% statements
- **semantic.tsx**: 63.51% statements
- **componentMap.tsx**: 60% statements
- **propTypeIntrospection.tsx**: 60% statements
- **wordpress.functions.ts**: 51.43% statements
- **PageEngine.tsx**: 48% statements
- **componentGeneration.tsx**: 38.89% statements
- **socialcard.tsx**: 29.51% statements
- **PageBuilderUI.tsx**: 26.67% statements

### Testing Next Steps

#### Integration Testing Gaps
- [ ] **Cross-component interactions** - Test how components work together (e.g., forms with validation, carousels with loading states)
- [ ] **Form validation edge cases** - Test URL validation, required fields, and complex validation rules under various conditions
- [ ] **CMS API integrations** - Test API failures, rate limiting, authentication errors, and network timeouts
- [ ] **Responsive design breakpoints** - Test component behavior across different screen sizes and device types
- [ ] **Accessibility (a11y) compliance** - Test keyboard navigation, screen reader compatibility, and ARIA attributes

### Test Configuration


**Coverage Targets** (configured in `vitest.config.ts`):
- **Statements**: 70% threshold
- **Lines**: 70% threshold
- **Functions**: 70% threshold
- **Branches**: 60% threshold

**Coverage Thresholds in vitest.config.ts**:
- Lines: 70% threshold
- Functions: 70% threshold
- Branches: 60% threshold
- Statements: 70% threshold

**Test Environment**: jsdom with @testing-library/react  
**Test Pattern**: Data-focused validation + behavioral testing

### Tools & Dependencies

| Tool | Purpose |
|------|---------|
| Vitest 4.x | Test runner |
| @testing-library/react | Component testing utilities |
| jsdom | DOM environment for tests |
| v8 | Coverage reporting |





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/brianwhaley/pixelated-components.svg?style=for-the-badge
[contributors-url]: https://github.com/brianwhaley/pixelated-components/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/brianwhaley/pixelated-components.svg?style=for-the-badge
[forks-url]: https://github.com/brianwhaley/pixelated-components/network/members

[stars-shield]: https://img.shields.io/github/stars/brianwhaley/pixelated-components.svg?style=for-the-badge
[stars-url]: https://github.com/brianwhaley/pixelated-components/stargazers

[issues-shield]: https://img.shields.io/github/issues/brianwhaley/pixelated-components.svg?style=for-the-badge
[issues-url]: https://github.com/brianwhaley/pixelated-components/issues

[license-shield]: https://img.shields.io/github/license/brianwhaley/pixelated-components.svg?style=for-the-badge
[license-url]: https://github.com/brianwhaley/pixelated-components/blob/master/LICENSE.txt

[coverage-shield]: https://img.shields.io/badge/coverage-77%25-brightgreen?style=for-the-badge
[coverage-url]: https://github.com/brianwhaley/pixelated-components

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/brianwhaley

[product-screenshot]: images/screenshot.png

[Calendly.com]: https://img.shields.io/badge/Calendly-006bff
[Calendly-url]: https://cloudinary.com

[Cloudinary.com]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com

[Contentful.com]: https://img.shields.io/badge/Contentful-2478CC?logo=contentful&logoColor=fff
[Contentful-url]: https://contentful.com

[Flickr.com]: https://img.shields.io/static/v1?style=for-the-badge&message=Flickr&color=0063DC&logo=Flickr&logoColor=FFFFFF
[Flickr-url]: https://flickr.com

[GitHub.com]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white
[Github-url]: https://www.github.com

[Gravatar.com]: https://img.shields.io/badge/Gravatar-1d4fc4
[Gravatar-url]: https://www.github.com

[Hubspot.com]: https://img.shields.io/badge/HubSpot-YES-brightgreen?style=plastic&logo=hubspot
[Hubspot-url]: https://www.github.com

[Instagram.com]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[Instagram-url]: https://www.github.com

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[npm.org]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff
[npm-url]: https://www.npmjs.org

[PayPal.js]: https://img.shields.io/badge/PayPal-Support_Us-003087?logo=paypal&logoColor=fff
[PayPal-url]: https://reactjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Storybook.js]: https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white
[Storybook-url]: https://storybook.js.org

[WordPress.com]: https://img.shields.io/badge/WordPress-%2321759B.svg?logo=wordpress&logoColor=white
[Wordpress-url]: http://www.wordpress.com
