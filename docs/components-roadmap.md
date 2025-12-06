# Component Roadmap

Requested next components to accelerate development:

- Hero Banner: headline, subtext, CTA, background image/video, overlay.
- **IN PROGRESS** - Testimonial Block (Nextdoor/Yelp/Google): ingest review feeds + render carousel/grid.
- FAQ Accordion: accessible collapsible list with deep-linking.
- **DONE** - Sidebar Panel: slide-in left/right, full height; accordion menu variant.
- Tabs Control: accessible tabs/pills with keyboard support.
- **DONE** - Blog Post Summary: add `count` prop to limit items.
- Team Member Card: vertical/horizontal variants with avatar, role, socials.

Notes:
- Align typography to `--font-sizeN` clamp variables.
- Provide Cloudinary transforms presets for image components.
- Add Storybook stories and sample data for each.

## Testing & Reliability
- Add unit test suite for all components (Vitest/Jest). Prioritize essentials: layout, forms, pagebuilder, and seo helpers.
- Add CI workflow to run tests and lints on pull requests.
- Add integration tests for Contentful and WordPress helpers (mocked API responses).
	- Add unit tests to validate all `generate*` sitemap helpers (createPageURLs, createImageURLsFromJSON, createWordPressURLs, createContentfulURLs, createContentfulImageURLs).
	- Validate `SitemapEntry`/`MetadataRoute.Sitemap` type compatibility across components and project consumers.

## Sitemap & SEO Enhancements
- Centralize sitemap generator in `components/seo/sitemap.ts` and export `generateSitemap` for use by Next.js sites.
- Ensure `generateSitemap` and helper functions return `MetadataRoute.Sitemap` typed entries so site routes don't need extra normalization.
 - Minimal `createContentfulImageURLs` implementation: return a single `/images` sitemap entry using `getContentfulAssetURLs` (for now).
 - Hold off on per-page Contentful image mapping until Contentful helpers/docs are reviewed: then implement an optional `perPage` mode. Add a dedicated review task to inspect and document Contentful helper functions (`getContentfulAssetURLs`, `getContentfulImagesFromEntries`, `getContentfulEntriesByType`) to ensure they provide the data needed for per-page mapping.
 - Implement `createContentfulImageURLs` per-page mapping (as `perPage: true`), which will require Contentful `contentType` & `pageField` config.
- Add tests for all sitemap helpers and example usage in `docs/`.

### Implementation Notes / UX
- Use `MetadataRoute.Sitemap[number]` as the canonical `SitemapEntry` for Next.js consumers. Provide adapter helpers for non-Next consumers (optional).
- Add a `getOriginFromHeaders` helper and examples showing how to pass `origin` when calling `generateSitemap` from a Next.js route.

## Future Performance Improvements (TODO)
- Add caching and retry logic for external providers (Contentful, WordPress) with TTL and stale-while-revalidate semantics.
- Provide a CLI helper to regenerate sitemaps and an optional GitHub Action for scheduled rebuilds.
- Integrate sitemap generation into `pixelated-template` and add an example `sitemap` config in that template's `README.md`.
- Add a GitHub Action to run daily to regenerate sitemap or use a scheduled build, and add a test workflow to validate sitemap XML format.
