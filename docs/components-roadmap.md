# Component Roadmap

Requested next components to accelerate development:

- Hero Banner: headline, subtext, CTA, background image/video, overlay.
- **IN PROGRESS** - Testimonial Block (Nextdoor/Yelp/Google): ingest review feeds + render carousel/grid.
- **DONE** - Accordion: basic collapsible component using native HTML details/summary.
- **DONE** - Sidebar Panel: slide-in left/right, full height; accordion menu variant.
- Tabs Control: accessible tabs/pills with keyboard support.
- **DONE** - Blog Post Summary: add `count` prop to limit items.
- **DONE** Team Member Card: vertical/horizontal variants with avatar, role, socials.
- LinkedIn Recommendation fetcher: finish OAuth flow, stabilize recommendations component (current JS helper needs migration + validation).

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

## Recommended Component Improvements (from testing)

### High Priority
- **Recipe Component** (`src/components/structured/recipe.tsx`):
  - TODO #9: Implement deep linking to specific recipes (currently not supported).
  - TODO #22: Convert component to full TypeScript (currently mixing type definitions).
  - FIX: `recipeElems` initialized in `useState` doesn't track prop changes. Add `useEffect` to regenerate when `props.recipeData` or `props.recipeCategories` change.

- **Resume Component** (`src/components/structured/resume.tsx`):
  - FIX: Add defensive prop access with optional chaining. Currently accesses `props.data.items[0].properties` directly without null checks. Can crash if data is missing.
  - Pattern: Use `props.data?.items?.[0]?.properties?.name || 'No Name Provided'` throughout component.

### Medium Priority
- **SocialCards Component** (`src/components/structured/socialcard.tsx`):
  - FIX: Uses `mergeDeep` to initialize state from props but this prevents tracking prop changes. Consider using `useCallback` or extracting merge logic for consistency.

- **Modal Component** (`src/components/general/modal.tsx`):
  - CLARIFY: Component accepts both `props.modalContent` and `children`. Define single content source pattern.

- **All Form Components** (`src/components/pagebuilder/form/*.tsx`):
  - FIX: Validation state doesn't reset when input props change. Add `useEffect` to reset validation when input `props` change.

- **Carousel Component** (`src/components/carousel/carousel.tsx`):
  - FIX: Carousel doesn't reset active card state when `props.cards` changes. Add state reset logic or track card changes in `useEffect`.

### Low Priority (Documentation)
- **NerdJoke Component** (`src/components/structured/nerdjoke.tsx`):
  - Add `props` to useEffect dependencies if endpoint becomes configurable via props (currently hardcoded).

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
