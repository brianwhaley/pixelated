
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brianwhaley/pixelated-components">
    <img src="https://www.pixelated.tech/images/pix/pix-bg-512.jpg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pixelated Components</h3>

  <p align="center">
    A comprehensive React component library for modern web development, featuring CMS integrations, UI components, and SEO optimization tools.
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



## 🧩 Component Categories

### General Components
Reusable UI components for common patterns:
- **Accordion** - Expandable content sections using native `<details>` elements
- **Callout** - Flexible content highlight blocks with image support
- **Modal** - Dialog overlays and popups
- **Loading** - Progress indicators and loading states
- **Panel** - Content containers with various layouts

### CMS Integration
Headless CMS and content management components:
- **WordPress** - Blog post integration and display with automatic Photon CDN URL processing
- **Contentful** - Headless CMS components and utilities
- **PageBuilder** - Dynamic page construction from JSON
- **PageEngine** - Advanced page rendering with Contentful integration

### UI Components
User interface and interaction components:
- **Carousel** - Image and content sliders (Hero, Reviews, Portfolio)
- **Forms** - Form builder and validation components
- **Menu** - Navigation components (Simple, Accordion, Expando)
- **Tables** - Data display and table components
- **Tiles** - Image grid and tile layouts

### SEO & Schema
Search engine optimization and structured data:
- **JSON-LD** - Structured data schemas (LocalBusiness, Recipe, BlogPosting, etc.)
- **MetaTags** - Dynamic meta tag injection
- **Sitemap** - XML sitemap generation
- **Social Cards** - Open Graph and Twitter card generation

### Third-Party Integrations
External service integrations:
- **Calendly** - Scheduling and appointment booking
- **Cloudinary** - Image optimization and delivery
- **HubSpot** - CRM and marketing automation
- **PayPal** - Payment processing
- **Instagram** - Social media image integration
- **Flickr** - Photo sharing integration
- **Gravatar** - User avatar integration
- **Google** - Analytics, Maps, and Search integration
- **eBay** - Store listings and shopping cart
- **NerdJokes** - Entertainment content integration



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
- [ ] Accessibility Enhancer: wrapper component that automatically improves accessibility across Pixelated sites by adding ARIA labels, roles, and states to existing components. Includes color contrast checking, keyboard navigation helpers, and alt-text suggestions for images.
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
- [ ] **Form Components**: Fix validation state reset when input props change.
- [ ] **Carousel Component**: Fix active card state reset when `props.cards` changes.
- [ ] **NerdJoke Component**: Add props to useEffect dependencies if endpoint becomes configurable.
- [ ] **GoogleReviews Component**: Add carousel/grid display modes.
- [ ] **GoogleReviews Component**: Add API key to config provider instead of hardcoding.
- [ ] **Instagram Component**: Add accessToken and userId to config provider for centralized API credentials.

### SSR Fixes
- [ ] **cloudinary.image.tsx** (`SmartImage`): Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **wordpress.components.tsx** (`BlogPostList`, etc.): Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts  
- [ ] **pagebuilder/form/formcomponents.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **cms/hubspot.components.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **cms/gravatar.components.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **structured/recipe.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **structured/timeline.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts
- [ ] **structured/markdown.tsx**: Add `"use client"` or refactor to avoid `usePixelatedConfig` in server contexts

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

**Current Status**: ✅ 2,210 tests passing across 65 test files

| Metric | Value |
|--------|-------|
| Test Files | 65 |
| Total Tests | 2,210 |
| Coverage (Statements) | 77.92% |
| Coverage (Lines) | 81.09% |
| Coverage (Functions) | 81.27% |
| Coverage (Branches) | 67.31% |
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
- **config.server.tsx**: 100% statements
- **modal.tsx**: 100% statements
- **accordion.tsx**: 100% statements
- **tiles.tsx**: 100% statements
- **googlesearch.tsx**: 100% statements
- **formvalidations.tsx**: 100% statements
- **buzzwordbingo.tsx**: 100% statements
- **timeline.tsx**: 100% statements
- **markdown.tsx**: 100% statements
- **ComponentPropertiesForm.tsx**: 100% statements
- **ComponentSelector.tsx**: 100% statements
- **ComponentTree.tsx**: 100% statements
- **schema-localbusiness.tsx**: 100% statements
- **schema-recipe.tsx**: 100% statements
- **schema-services.tsx**: 100% statements
- **schema-website.tsx**: 100% statements
- **google.reviews.functions.ts**: 100% statements
- **sidepanel.tsx**: 97.5% statements
- **config.ts**: 96.55% statements
- **google.reviews.components.tsx**: 95.83% statements
- **schema-blogposting.tsx**: 95.23% statements
- **recipe.tsx**: 94.59% statements
- **resume.tsx**: 94.38% statements
- **contentful.delivery.ts**: 92.5% statements
- **css.tsx**: 91.42% statements
- **functions.ts**: 90.9% statements
- **config.client.tsx**: 90% statements
- **menu-expando.tsx**: 90.12% statements
- **cloudinary.ts**: 83.33% statements
- **form.tsx**: 83.2% statements
- **shoppingcart.functions.ts**: 81.69% statements
- **callout.tsx**: 80% statements
- **microinteractions.tsx**: 80% statements
- **sitemap.ts**: 76.05% statements
- **manifest.tsx**: 75% statements
- **carousel.tsx**: 71.69% statements
- **nerdjoke.tsx**: 69.44% statements
- **menu-accordion.tsx**: 68.13% statements
- **semantic.tsx**: 63.51% statements
- **flickr.ts**: 51.42% statements
- **PageEngine.tsx**: 48% statements
- **SaveLoadSection.tsx**: 84.84% statements
- **table.tsx**: 84.48% statements
- **loading.tsx**: 85.71% statements
- **socialcard.tsx**: 29.5% statements
- **PageBuilderUI.tsx**: 26.66% statements

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
