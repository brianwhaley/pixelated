# PageBuilder Storage: File vs Contentful

The PageBuilder supports two storage backends: **File-based** (local/production filesystem) and **Contentful CMS**. Both use identical function signatures for easy switching.

---

## File-Based Storage (Default)

### Usage:
```typescript
import { 
  listPages, 
  loadPage, 
  savePage, 
  deletePage 
} from '@brianwhaley/pixelated-components/server';

// List all pages
const pages = await listPages();

// Load a page
const page = await loadPage('home');

// Save a page
const result = await savePage('home', pageData);

// Delete a page
const deleted = await deletePage('home');
```

### Storage Location:
- Default: `public/data/pages/`
- Configurable via `PAGES_DIR` environment variable

### Pros:
- ✅ Simple, no external dependencies
- ✅ Fast
- ✅ Version control friendly (commit JSON files)
- ✅ No API limits

### Cons:
- ❌ Not persistent on serverless (AWS Lambda/Amplify)
- ❌ Requires filesystem access
- ❌ No multi-user collaboration features

---

## Contentful Storage

### Setup:

1. **Create Content Type** in Contentful:
   - Name: `page`
   - Fields:
     - `pageName` (Short text, required) - Entry title
     - `pageData` (JSON object, required) - Page component data
     - `title` (Short text, optional) - Display title
     - `status` (Short text, optional) - "draft", "published", "archived"

2. **Get API Credentials:**
   - Space ID: Settings → General Settings
   - Management Token: Settings → API keys → Content management tokens

3. **Set Environment Variables (recommended unified blob):**
  - Preferred: set the full pixelated config as a single environment variable. You can supply either:
    - `PIXELATED_CONFIG_JSON` — a single-line JSON string, or
    - `PIXELATED_CONFIG_B64` — the base64-encoded JSON string.

  Example (base64):
  ```bash
  PIXELATED_CONFIG_B64=<base64-encoded-json-here>
  ```

### Usage:

```typescript
import { 
  listPages, 
  loadPage, 
  savePage, 
  deletePage 
} from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

// When running on the server, read the unified pixelated config instead of
// discrete CONTENTFUL_* env vars. Example using the package helper:
// import { getFullPixelatedConfig } from '@brianwhaley/pixelated-components/server';
// const cfg = getFullPixelatedConfig();
// const config: ContentfulConfig = cfg.contentful;

// List all pages
const pages = await listPages(config);

// Load a page
const page = await loadPage('home', config);

// Save a page (creates or updates)
const result = await savePage('home', pageData, config);

// Delete a page
const deleted = await deletePage('home', config);
```

### Pros:
- ✅ Persistent storage (survives deployments)
- ✅ Works on serverless platforms
- ✅ Multi-user collaboration
- ✅ Version history built-in
- ✅ Preview/publish workflow
- ✅ Free tier available

### Cons:
- ❌ External dependency
- ❌ API rate limits (free tier)
- ❌ Requires internet connection
- ❌ Slightly slower than file-based

---

## API Route Examples

### File-Based Storage:

```typescript
// src/app/api/pagebuilder/save/route.ts
import { NextResponse } from 'next/server';
import { savePage } from '@brianwhaley/pixelated-components/server';

export async function POST(request: Request) {
  const { name, data } = await request.json();
  
  if (!name || !data) {
    return NextResponse.json(
      { success: false, message: 'Name and data required' },
      { status: 400 }
    );
  }

  const result = await savePage(name, data);
  return NextResponse.json(result);
}
```

### Contentful Storage:

```typescript
// src/app/api/pagebuilder/save/route.ts
import { NextResponse } from 'next/server';
import { savePage } from '@brianwhaley/pixelated-components/server';
import type { ContentfulConfig } from '@brianwhaley/pixelated-components/server';

export async function POST(request: Request) {
  const { name, data } = await request.json();
  
  if (!name || !data) {
    return NextResponse.json(
      { success: false, message: 'Name and data required' },
      { status: 400 }
    );
  }

  // Server-side: prefer reading the unified `PIXELATED_CONFIG_JSON` / `PIXELATED_CONFIG_B64`.
  // Example:
  // import { getFullPixelatedConfig } from '@brianwhaley/pixelated-components/server';
  // const cfg = getFullPixelatedConfig();
  // const config: ContentfulConfig = cfg.contentful;
  // const result = await savePage(name, data, config);
  
  // Fallback (file-based) example shown earlier remains available.
  const result = await savePage(name, data);
  return NextResponse.json(result);
}
```

---

## Switching Between Storage Types

Simply change the import and add/remove the config parameter:

**File-based:**
```typescript
const result = await savePage('home', pageData);
```

**Contentful:**
```typescript
const result = await savePage('home', pageData, config);
```

All functions maintain the same return types, so your application code doesn't change.

---

## Complete API Routes (All 4 Operations)

See `/documentation/api-examples/` for complete implementations:
- `save-route-example.ts` - Save/create pages
- `load-route-example.ts` - Load pages
- `list-route-example.ts` - List all pages
- `delete-route-example.ts` - Delete pages

Each example shows both file-based and Contentful implementations side-by-side.

---

## Recommendation

- **Development:** File-based storage (fast, simple)
- **Production (static hosting):** File-based with git workflow
- **Production (serverless):** Contentful storage (persistent)
- **Production (CMS features):** Contentful storage (multi-user, preview)
