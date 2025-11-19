# PageBuilder Documentation

## Overview

The PageBuilder is a visual page construction tool that allows you to create pages by selecting components, configuring their properties, and arranging them hierarchically. It features automatic form generation from PropTypes, inline editing with visual feedback, and persistent storage.

## Quick Start

### Using PageBuilder in Your Next.js App

```typescript
// src/app/pagebuilder/page.tsx
import { PageBuilderUI } from '@brianwhaley/pixelated-components';

export default function PageBuilderPage() {
  return <PageBuilderUI />;
}
```

### Using PageEngine to Render Saved Pages

```typescript
// src/app/my-page/page.tsx
import { PageEngine } from '@brianwhaley/pixelated-components';
import pageData from '@/../../public/data/pages/my-page.json';

export default function MyPage() {
  return <PageEngine pageData={pageData} />;
}
```

## Documentation Structure

### Core Documentation
- **[Architecture](./architecture.md)** - Technical architecture, module structure, and dependency graph
- **[Features](./features.md)** - Detailed feature documentation (PropTypes introspection, inline editing, save/load)
- **[API Reference](./api-reference.md)** - Component APIs, hooks, and utility functions  
- **[Implementation Guide](./implementation.md)** - Step-by-step setup for new projects

## Key Features

### 1. PropTypes Introspection
Automatically generates appropriate form fields based on component PropTypes:
- `PropTypes.oneOf([...])` → Dropdown select
- `PropTypes.number` → Number input
- `PropTypes.bool` → Checkbox
- `PropTypes.string` → Text input

### 2. Inline Editing
Visual editing with floating action buttons that appear on hover:
- ✏️ Edit component properties
- ➕ Add child components (for layout components)
- 🗑️ Delete components
- Visual feedback with borders and highlighting

### 3. Save/Load Pages
Persistent storage with API routes:
- 💾 Save pages with custom names
- 📁 Load pages from dropdown
- 🗑️ Delete saved pages
- Stores JSON files in `public/data/pages/`

### 4. Single Source of Truth
Component definitions use const arrays that serve multiple purposes:
```typescript
// In component file
export const CALLOUT_STYLES = ['default', 'boxed', 'grid'] as const;

Callout.propTypes = {
  style: PropTypes.oneOf([...CALLOUT_STYLES]),  // Runtime validation
};

// Generates TypeScript type
export type CalloutType = InferProps<typeof Callout.propTypes>;

// Imported by metadata for forms
import { CALLOUT_STYLES } from './callout';
export const componentMetadata = {
  Callout: { style: { type: 'select', options: CALLOUT_STYLES } }
};
```

## Architecture Overview

```
pagebuilder/
├── lib/                              # Pure utility functions
│   ├── types.ts                      # TypeScript interfaces
│   ├── componentMap.ts               # Component registry
│   ├── componentMetadata.ts          # Form field metadata
│   ├── propTypeIntrospection.ts      # PropTypes → form fields
│   ├── componentGeneration.ts        # Form data generation
│   ├── pageStorage.ts                # File I/O operations
│   ├── pageStorageTypes.ts           # Storage type definitions
│   └── index.ts                      # Exports
├── components/                        # React components
│   ├── PageEngine.tsx                # Component renderer
│   ├── ComponentSelector.tsx         # Component type picker
│   ├── ComponentPropertiesForm.tsx   # Property editor
│   ├── SaveLoadSection.tsx           # Save/load UI
│   └── PageBuilderUI.tsx             # Main orchestrator
├── usePageBuilder.ts                 # State management hook
└── documentation/                     # This folder
```

## Component Flow

```
PageBuilderUI (orchestrator)
├─> SaveLoadSection (save/load/delete)
├─> ComponentSelector (select component type)
├─> ComponentPropertiesForm (edit properties)
└─> PageEngine (live preview)
      └─> Renders components with edit UI
```

## State Management

The `usePageBuilder` hook manages all state:
- `pageJSON` - Current page structure
- `editableComponent` - Component being edited
- `selectedPath` - Path to component for adding children
- `editMode` - Edit mode state (component + path)

## Getting Started

1. **Install package**:
   ```bash
   npm install @brianwhaley/pixelated-components
   ```

2. **Create PageBuilder page** (see Quick Start above)

3. **Set up API routes** (see [Implementation Guide](./implementation.md))

4. **Start building pages!**

## Next Steps

- Read the [Architecture Guide](./architecture.md) for technical details
- Explore [Features](./features.md) for in-depth feature documentation
- Check [API Reference](./api-reference.md) for component APIs
- Follow [Implementation Guide](./implementation.md) to set up a new project

## Examples

See the [Implementation Guide](./implementation.md) for complete examples of:
- Setting up API routes
- Creating pages with PageBuilder
- Rendering pages with PageEngine (4 different methods)
- Configuring storage locations
- Adding new components to the builder
