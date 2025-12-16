# Component Reference Guide

This guide provides detailed API documentation and usage examples for all Pixelated Components.

## 📋 Table of Contents

### General Components
- [Accordion](#accordion)
- [Callout](#callout)
- [Loading](#loading)
- [Modal](#modal)
- [SidePanel](#sidepanel)
- [SmartImage](#smartimage)
- [Table](#table)

### CMS Integration
- [Calendly](#calendly)
- [CloudinaryImage](#cloudinaryimage)
- [ContentfulItems](#contentfulitems)
- [GoogleReviews](#googlereviews)
- [Gravatar](#gravatar)
- [HubSpot](#hubspot)
- [Instagram](#instagram)
- [WordPress](#wordpress)

### UI Components
- [Carousel](#carousel)
- [Forms](#forms)
- [Menu](#menu)
- [Tables](#tables)
- [Tiles](#tiles)

### PageBuilder Components
- [ComponentPropertiesForm](#componentpropertiesform)
- [ComponentSelector](#componentselector)
- [ComponentTree](#componenttree)
- [PageBuilderUI](#pagebuilderui)
- [PageEngine](#pageengine)
- [SaveLoadSection](#saveloadsection)

### SEO & Schema
- [404 Page](#404-page)
- [GoogleAnalytics](#googleanalytics)
- [GoogleMap](#googlemap)
- [GoogleSearch](#googlesearch)
- [JSON-LD Schemas](#json-ld-schemas)
- [MetadataComponents](#metadatacomponents)

### Shopping Cart
- [eBay Components](#ebay-components)
- [PayPal](#paypal)
- [ShoppingCart](#shoppingcart)

### Structured Content
- [BuzzwordBingo](#buzzwordbingo)
- [Markdown](#markdown)
- [Recipe](#recipe)
- [Resume](#resume)
- [SocialCard](#socialcard)
- [Timeline](#timeline)

### Entertainment
- [NerdJoke](#nerdjoke)

---

## 📖 Usage Examples

### Basic Component Usage

```tsx
import { Accordion, Callout, SmartImage } from '@pixelated-tech/components';

function MyApp() {
  return (
    <div>
      <Accordion items={[
        { title: 'How it works', content: 'This component uses native HTML details elements...' },
        { title: 'Why use it', content: 'Accessible, lightweight, and SEO-friendly...' }
      ]} />

      <Callout
        title="Welcome!"
        content="This is a highlighted callout message"
        variant="boxed"
      />

      <SmartImage
        src="/path/to/image.jpg"
        alt="Description"
        aboveFold={true}
      />
    </div>
  );
}
```

### Storybook Interactive Demos

For interactive component exploration:

```bash
# Start Storybook development server
npm run storybook
```

**Storybook provides:**
- ✅ **Live component playground** - Try different props and see results instantly
- ✅ **Multiple variants** - See components in different states and configurations
- ✅ **Responsive testing** - Check how components behave on different screen sizes
- ✅ **Accessibility testing** - Built-in a11y checks and guidelines
- ✅ **Component documentation** - Auto-generated from TypeScript interfaces

**Access locally at:** `http://localhost:6006`

---

## General Components

### Accordion

Expandable content component using native `<details>` elements for accessibility and SEO.

```tsx
import { Accordion } from '@pixelated-tech/components';

const items = [
  {
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.'
  },
  {
    title: 'How does it work?',
    content: 'React uses a component-based architecture and virtual DOM.'
  }
];

<Accordion items={items} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{title: string, content: string \| ReactNode}>` | - | Array of accordion items |
| `className` | `string` | - | Additional CSS classes |

#### Features
- ✅ **Accessible** - Uses semantic HTML with proper ARIA attributes
- ✅ **SEO-friendly** - Content is crawlable when expanded
- ✅ **Lightweight** - No JavaScript required for basic functionality
- ✅ **Customizable** - Full CSS customization support

---

### Callout

Flexible content highlight component with image and button support.

```tsx
import { Callout } from '@pixelated-tech/components';

<Callout
  title="Important Notice"
  content="This is a highlighted message"
  variant="boxed"
  img="/path/to/image.jpg"
  url="/learn-more"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Callout title |
| `content` | `string \| ReactNode` | - | Callout content |
| `variant` | `'default' \| 'boxed' \| 'full' \| 'grid' \| 'overlay' \| 'split'` | `'default'` | Visual style variant |
| `boxShape` | `'square' \| 'bevel' \| 'squircle' \| 'round'` | `'squircle'` | Border radius style |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Content layout |
| `direction` | `'left' \| 'right'` | `'left'` | Image position (when layout is horizontal) |
| `gridColumns` | `{left: number, right: number}` | `{left: 1, right: 2}` | Grid column distribution |
| `img` | `string` | - | Image URL |
| `imgAlt` | `string` | - | Image alt text |
| `imgShape` | `'square' \| 'bevel' \| 'squircle' \| 'round'` | `'square'` | Image border radius |
| `imgClick` | `(event: MouseEvent, url?: string) => void` | - | Image click handler |
| `url` | `string` | - | Link URL for the entire callout |
| `buttonText` | `string` | - | Custom button text |
| `subtitle` | `string` | - | Subtitle text |
| `aboveFold` | `boolean` | - | Image optimization hint |

#### Variants
- **`default`**: Simple layout with optional border
- **`boxed`**: Border around entire callout
- **`full`**: Full-width layout with minimal margins
- **`grid`**: CSS Grid layout with configurable columns
- **`overlay`**: Image overlay with text positioning
- **`split`**: Full-width split layout

---

### Loading

Progress indicator component with multiple animation styles.

```tsx
import { Loading } from '@pixelated-tech/components';

// Default spinner
<Loading />

// Custom message
<Loading message="Loading data..." />

// Different variants
<Loading variant="dots" />
<Loading variant="pulse" />
<Loading variant="bars" />
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'bars'` | `'spinner'` | Animation style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `message` | `string` | - | Loading message text |
| `color` | `string` | - | Custom color (CSS color value) |

### Modal

Dialog overlay component with accessibility features.

```tsx
import { Modal } from '@pixelated-tech/components';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
  <button onClick={() => setIsOpen(false)}>Cancel</button>
  <button onClick={handleConfirm}>Confirm</button>
</Modal>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Modal visibility |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Modal title |
| `children` | `ReactNode` | - | Modal content |
| `size` | `'small' \| 'medium' \| 'large' \| 'fullscreen'` | `'medium'` | Modal size |
| `closeOnOverlay` | `boolean` | `true` | Close when clicking overlay |

### SidePanel

Slide-out panel component for additional content.

```tsx
import { SidePanel } from '@pixelated-tech/components';

<SidePanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  title="Settings"
>
  <div>Panel content goes here</div>
</SidePanel>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Panel visibility |
| `onClose` | `() => void` | - | Close handler |
| `position` | `'left' \| 'right'` | `'right'` | Slide direction |
| `title` | `string` | - | Panel title |
| `children` | `ReactNode` | - | Panel content |
| `width` | `string` | `'300px'` | Panel width |

### SmartImage

Optimized image component with lazy loading and responsive features.

```tsx
import { SmartImage } from '@pixelated-tech/components';

<SmartImage
  src="/path/to/image.jpg"
  alt="Description"
  aboveFold={false}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Alt text |
| `aboveFold` | `boolean` | `false` | Above-the-fold hint for loading |
| `sizes` | `string` | - | Responsive sizes attribute |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading strategy |
| `width` | `number` | - | Image width |
| `height` | `number` | - | Image height |

---

## CMS Integration

### WordPress Components

#### BlogPostList

Displays a list of WordPress blog posts with pagination support.

```tsx
import { BlogPostList } from '@pixelated-tech/components';

<BlogPostList
  site="blog.pixelated.tech"
  count={10}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `site` | `string` | - | WordPress site identifier (e.g., 'your-blog.wordpress.com') |
| `count` | `number` | - | Number of posts to fetch (undefined = all) |
| `posts` | `BlogPostType[]` | - | Pre-fetched posts array |
| `showCategories` | `boolean` | `true` | Whether to display post categories |

#### BlogPostSummary

Individual blog post display component.

```tsx
import { BlogPostSummary } from '@pixelated-tech/components';

<BlogPostSummary
  ID="123"
  title="Blog Post Title"
  date="2024-01-01"
  excerpt="Post excerpt..."
  URL="https://blog.example.com/post"
  categories={['tech', 'react']}
/>
```

### Calendly

Scheduling integration component for Calendly bookings.

```tsx
import { Calendly } from '@pixelated-tech/components';

<Calendly
  url="https://calendly.com/username/meeting"
  styles={{ height: '600px' }}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | - | Calendly booking URL |
| `styles` | `object` | - | Inline styles for iframe |

### CloudinaryImage

Optimized image delivery with Cloudinary transformations.

```tsx
import { SmartImage } from '@pixelated-tech/components';

<SmartImage
  src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
  alt="Cloudinary image"
  transformations="w_400,h_300,c_fill,f_auto"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Cloudinary image URL |
| `alt` | `string` | - | Alt text |
| `transformations` | `string` | - | Cloudinary transformation string |
| `aboveFold` | `boolean` | `false` | Loading priority |

### ContentfulItems

Contentful headless CMS integration for displaying content.

```tsx
import { ContentfulItems } from '@pixelated-tech/components';

<ContentfulItems
  spaceId="your-space-id"
  accessToken="your-access-token"
  contentType="blogPost"
  limit={10}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spaceId` | `string` | - | Contentful space ID |
| `accessToken` | `string` | - | Contentful access token |
| `contentType` | `string` | - | Content type to fetch |
| `limit` | `number` | `10` | Number of items to fetch |

### GoogleReviews

Google Business Profile reviews integration.

```tsx
import { GoogleReviews } from '@pixelated-tech/components';

<GoogleReviews
  placeId="ChIJ1234567890abcdef"
  apiKey="your-google-api-key"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeId` | `string` | - | Google Place ID |
| `apiKey` | `string` | - | Google API key |
| `maxReviews` | `number` | `5` | Maximum reviews to display |

### Gravatar

User avatar integration with Gravatar service.

```tsx
import { Gravatar } from '@pixelated-tech/components';

<Gravatar
  email="user@example.com"
  size={100}
  defaultImage="identicon"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `email` | `string` | - | User email for Gravatar lookup |
| `size` | `number` | `80` | Avatar size in pixels |
| `defaultImage` | `string` | `'identicon'` | Default image type |

### HubSpot

CRM integration for HubSpot forms and tracking.

```tsx
import { HubSpot } from '@pixelated-tech/components';

<HubSpot
  portalId="1234567"
  formId="abcd-1234-5678-efgh"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `portalId` | `string` | - | HubSpot portal ID |
| `formId` | `string` | - | HubSpot form ID |
| `onFormSubmit` | `function` | - | Form submission callback |

### Instagram

Instagram feed integration for displaying posts.

```tsx
import { Instagram } from '@pixelated-tech/components';

<Instagram
  username="instagram"
  accessToken="your-access-token"
  limit={6}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `username` | `string` | - | Instagram username |
| `accessToken` | `string` | - | Instagram API access token |
| `limit` | `number` | `6` | Number of posts to display |

---



## UI Components

### Carousel

Image and content slider with multiple variants.

#### CarouselHero

Full-width hero carousel for landing pages.

```tsx
import { CarouselHero } from '@pixelated-tech/components';

const slides = [
  {
    image: '/hero1.jpg',
    title: 'Welcome',
    subtitle: 'To our platform',
    buttonText: 'Get Started',
    buttonUrl: '/signup'
  }
];

<CarouselHero slides={slides} />
```

#### CarouselReviews

Customer testimonial carousel.

```tsx
import { CarouselReviews } from '@pixelated-tech/components';

const reviews = [
  {
    name: 'John Doe',
    company: 'Tech Corp',
    review: 'Great product!',
    avatar: '/john.jpg'
  }
];

<CarouselReviews reviews={reviews} />
```

### Forms

Dynamic form builder that generates forms from JSON configuration.

#### FormEngine

Complete form rendering engine with validation and submission handling.

```tsx
import { FormEngine } from '@pixelated-tech/components';

const formConfig = {
  fields: [
    {
      type: 'text',
      props: {
        name: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true
      }
    },
    {
      type: 'textarea',
      props: {
        name: 'message',
        label: 'Message',
        placeholder: 'Enter your message',
        rows: 4
      }
    }
  ]
};

<FormEngine
  formData={formConfig}
  onSubmitHandler={(data) => console.log('Form submitted:', data)}
  method="POST"
/>
```

#### Form Components

Individual form field components for custom form building.

```tsx
import * as FC from '@pixelated-tech/components';

function CustomForm() {
  return (
    <form>
      <FC.TextInput
        name="username"
        label="Username"
        required={true}
        placeholder="Enter username"
      />
      <FC.EmailInput
        name="email"
        label="Email"
        required={true}
      />
      <FC.TextArea
        name="bio"
        label="Bio"
        rows={4}
        placeholder="Tell us about yourself"
      />
    </form>
  );
}
```

### Menu

Navigation components with multiple interaction patterns.

#### MenuSimple

Basic horizontal navigation menu with automatic active state detection.

```tsx
import { MenuSimple } from '@pixelated-tech/components';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];

<MenuSimple menuItems={menuItems} />
```

#### MenuAccordion

Expandable navigation menu with nested items and groups.

```tsx
import { MenuAccordion } from '@pixelated-tech/components';

const menuData = {
  home: { name: 'Home', path: '/' },
  services: {
    name: 'Services',
    routes: {
      webdev: { name: 'Web Development', path: '/services/web-dev' },
      design: { name: 'Design', path: '/services/design' },
      consulting: { name: 'Consulting', path: '/services/consulting' }
    }
  },
  about: { name: 'About', path: '/about' }
};

<MenuAccordion menuItems={menuData} />
```

#### MenuExpando

Expandable menu with smooth animations and toggle states.

```tsx
import { MenuExpando } from '@pixelated-tech/components';

const menuItems = [
  {
    name: 'Products',
    path: '/products',
    routes: [
      { name: 'Software', path: '/products/software' },
      { name: 'Hardware', path: '/products/hardware' }
    ]
  },
  { name: 'Support', path: '/support' }
];

<MenuExpando menuItems={menuItems} />
```

### Tables

Data display component with sorting and image support.

```tsx
import { Table } from '@pixelated-tech/components';

const userData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar1.jpg',
    role: 'Admin'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar2.jpg',
    role: 'User'
  }
];

<Table
  data={userData}
  id="users-table"
  sortable={true}
/>
```

### Tiles

Image grid layout component for displaying card-based content.

```tsx
import { Tiles } from '@pixelated-tech/components';

const cards = [
  {
    image: '/project1.jpg',
    imageAlt: 'Project 1',
    bodyText: 'Portfolio project description',
    link: '/projects/1'
  },
  {
    image: '/project2.jpg',
    imageAlt: 'Project 2',
    bodyText: 'Another portfolio project',
    link: '/projects/2'
  }
];

<Tiles
  cards={cards}
  rowCount={3}
/>
```

---

## PageBuilder Components

### ComponentPropertiesForm

Form for editing component properties in the page builder.

```tsx
import { ComponentPropertiesForm } from '@pixelated-tech/components';

<ComponentPropertiesForm
  component={selectedComponent}
  onChange={handlePropertyChange}
  onSave={handleSave}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `component` | `ComponentType` | - | Component being edited |
| `onChange` | `function` | - | Property change handler |
| `onSave` | `function` | - | Save handler |

### ComponentSelector

Component picker for adding new components to pages.

```tsx
import { ComponentSelector } from '@pixelated-tech/components';

<ComponentSelector
  onSelect={handleComponentSelect}
  category="general"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | `function` | - | Component selection handler |
| `category` | `string` | - | Component category filter |

### ComponentTree

Visual tree representation of page components.

```tsx
import { ComponentTree } from '@pixelated-tech/components';

<ComponentTree
  components={pageComponents}
  onSelect={handleComponentSelect}
  selectedId={selectedComponentId}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `components` | `ComponentType[]` | - | Page components array |
| `onSelect` | `function` | - | Component selection handler |
| `selectedId` | `string` | - | Currently selected component ID |

### PageBuilderUI

Main page builder interface component.

```tsx
import { PageBuilderUI } from '@pixelated-tech/components';

<PageBuilderUI
  initialPage={pageData}
  onSave={handleSave}
  availableComponents={componentLibrary}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialPage` | `PageType` | - | Initial page data |
| `onSave` | `function` | - | Save handler |
| `availableComponents` | `ComponentType[]` | - | Available components |

### PageEngine

Runtime page rendering engine.

```tsx
import { PageEngine } from '@pixelated-tech/components';

<PageEngine
  pageData={pageData}
  context={pageContext}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageData` | `PageType` | - | Page structure data |
| `context` | `object` | - | Runtime context |

### SaveLoadSection

Save and load functionality for page builder.

```tsx
import { SaveLoadSection } from '@pixelated-tech/components';

<SaveLoadSection
  onSave={handleSave}
  onLoad={handleLoad}
  onNew={handleNew}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSave` | `function` | - | Save handler |
| `onLoad` | `function` | - | Load handler |
| `onNew` | `function` | - | New page handler |

---

## SEO & Schema

### JSON-LD Schemas

Structured data components for SEO.

#### LocalBusiness

```tsx
import { LocalBusinessSchema } from '@pixelated-tech/components';

<LocalBusinessSchema
  name="My Business"
  address={{
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'State',
    postalCode: '12345'
  }}
  telephone="(555) 123-4567"
/>
```

#### Recipe

```tsx
import { RecipeSchema } from '@pixelated-tech/components';

<RecipeSchema
  name="Chocolate Chip Cookies"
  author="Chef Name"
  prepTime="PT15M"
  cookTime="PT10M"
  ingredients={[
    '2 cups flour',
    '1 cup butter',
    '1 cup sugar'
  ]}
  instructions={[
    {
      text: 'Mix dry ingredients',
      position: 1
    }
  ]}
/>
```

#### Services

```tsx
import { ServicesSchema } from '@pixelated-tech/components';

<ServicesSchema
  name="Web Development Services"
  description="Professional web development and design services"
  provider={{
    name: "My Company",
    url: "https://example.com"
  }}
  serviceType="Web Development"
  areaServed="Global"
/>
```

#### Website

```tsx
import { WebsiteSchema } from '@pixelated-tech/components';

<WebsiteSchema
  name="My Website"
  url="https://example.com"
  description="Website description"
  publisher={{
    name: "My Company",
    logo: "https://example.com/logo.png"
  }}
/>
```

#### BlogPosting

```tsx
import { BlogPostingSchema } from '@pixelated-tech/components';

<BlogPostingSchema
  headline="Blog Post Title"
  author={{
    name: "Author Name",
    url: "https://example.com/author"
  }}
  datePublished="2024-01-01"
  dateModified="2024-01-15"
  articleBody="Full blog post content..."
  image="https://example.com/blog-image.jpg"
/>
```

### 404 Page

Custom 404 error page component.

```tsx
import { NotFound } from '@pixelated-tech/components';

<NotFound
  title="Page Not Found"
  message="The page you're looking for doesn't exist."
  homeUrl="/"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'404 - Page Not Found'` | Page title |
| `message` | `string` | - | Error message |
| `homeUrl` | `string` | `'/'` | Home page URL |

### GoogleAnalytics

Google Analytics tracking component.

```tsx
import { GoogleAnalytics } from '@pixelated-tech/components';

<GoogleAnalytics
  trackingId="GA_MEASUREMENT_ID"
  debug={false}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trackingId` | `string` | - | Google Analytics tracking ID |
| `debug` | `boolean` | `false` | Enable debug mode |

### GoogleMap

Embedded Google Maps component.

```tsx
import { GoogleMap } from '@pixelated-tech/components';

<GoogleMap
  apiKey="your-google-api-key"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={12}
  markers={[{ position: { lat: 40.7128, lng: -74.0060 }, title: 'New York' }]}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | - | Google Maps API key |
| `center` | `LatLng` | - | Map center coordinates |
| `zoom` | `number` | `10` | Map zoom level |
| `markers` | `Marker[]` | - | Map markers array |

### GoogleSearch

Google Custom Search integration.

```tsx
import { GoogleSearch } from '@pixelated-tech/components';

<GoogleSearch
  searchEngineId="your-search-engine-id"
  apiKey="your-api-key"
  placeholder="Search our site..."
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchEngineId` | `string` | - | Google Custom Search Engine ID |
| `apiKey` | `string` | - | Google API key |
| `placeholder` | `string` | `'Search...'` | Search input placeholder |

### MetadataComponents

Dynamic meta tag injection for SEO.

```tsx
import { MetadataComponents } from '@pixelated-tech/components';

<MetadataComponents
  title="Page Title"
  description="Page description for SEO"
  keywords="keyword1, keyword2"
  ogImage="/social-image.jpg"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Page title |
| `description` | `string` | - | Meta description |
| `keywords` | `string` | - | Meta keywords |
| `ogImage` | `string` | - | Open Graph image URL |

---

## Shopping Cart

### eBay Components

eBay store integration and product listings.

```tsx
import { eBay } from '@pixelated-tech/components';

<eBay
  storeId="your-store-id"
  keywords="electronics"
  limit={12}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storeId` | `string` | - | eBay store ID |
| `keywords` | `string` | - | Search keywords |
| `limit` | `number` | `10` | Number of items to display |

### PayPal

PayPal payment integration component.

```tsx
import { PayPal } from '@pixelated-tech/components';

<PayPal
  amount={29.99}
  currency="USD"
  itemName="Premium Plan"
  onSuccess={handlePaymentSuccess}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | `number` | - | Payment amount |
| `currency` | `string` | `'USD'` | Currency code |
| `itemName` | `string` | - | Item description |
| `onSuccess` | `function` | - | Success callback |

### ShoppingCart

Shopping cart functionality with item management.

```tsx
import { ShoppingCart } from '@pixelated-tech/components';

<ShoppingCart
  items={cartItems}
  onUpdateQuantity={handleQuantityChange}
  onRemoveItem={handleRemoveItem}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CartItem[]` | - | Cart items array |
| `onUpdateQuantity` | `function` | - | Quantity change handler |
| `onRemoveItem` | `function` | - | Item removal handler |

---

## Structured Content

### BuzzwordBingo

Interactive buzzword bingo game component.

```tsx
import { BuzzwordBingo } from '@pixelated-tech/components';

<BuzzwordBingo
  words={['synergy', 'paradigm', 'leverage', 'optimize']}
  size={5}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string[]` | - | Array of buzzwords |
| `size` | `number` | `5` | Grid size (NxN) |

### Markdown

Markdown rendering component with syntax highlighting.

```tsx
import { Markdown } from '@pixelated-tech/components';

<Markdown
  content="# Hello World\n\nThis is **markdown** content."
  allowHtml={false}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | Markdown content |
| `allowHtml` | `boolean` | `false` | Allow HTML in markdown |

### Recipe

Recipe display component with structured data.

```tsx
import { Recipe } from '@pixelated-tech/components';

<Recipe
  title="Chocolate Chip Cookies"
  ingredients={['2 cups flour', '1 cup sugar', '1 cup chocolate chips']}
  instructions={['Mix dry ingredients', 'Add wet ingredients', 'Bake at 350°F']}
  prepTime="15 min"
  cookTime="12 min"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Recipe title |
| `ingredients` | `string[]` | - | Ingredient list |
| `instructions` | `string[]` | - | Cooking instructions |
| `prepTime` | `string` | - | Preparation time |
| `cookTime` | `string` | - | Cooking time |

### Resume

Professional resume/CV display component.

```tsx
import { Resume } from '@pixelated-tech/components';

<Resume
  personalInfo={{ name: 'John Doe', email: 'john@example.com' }}
  experience={workExperience}
  education={educationHistory}
  skills={['React', 'TypeScript', 'Node.js']}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `personalInfo` | `object` | - | Personal information |
| `experience` | `Experience[]` | - | Work experience |
| `education` | `Education[]` | - | Education history |
| `skills` | `string[]` | - | Skills list |

### SocialCard

Social media card component for sharing.

```tsx
import { SocialCard } from '@pixelated-tech/components';

<SocialCard
  title="Check out this article"
  description="An interesting article about React components"
  image="/article-image.jpg"
  url="https://example.com/article"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `description` | `string` | - | Card description |
| `image` | `string` | - | Card image URL |
| `url` | `string` | - | Link URL |

### Timeline

Timeline component for displaying chronological events.

```tsx
import { Timeline } from '@pixelated-tech/components';

<Timeline
  events={[
    { date: '2020-01-01', title: 'Started Company', description: 'Founded XYZ Corp' },
    { date: '2021-06-15', title: 'First Product', description: 'Launched flagship product' }
  ]}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `TimelineEvent[]` | - | Array of timeline events |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Timeline orientation |

---

## Entertainment

### NerdJoke

Random nerd joke generator component.

```tsx
import { NerdJoke } from '@pixelated-tech/components';

<NerdJoke
  category="programming"
  refreshInterval={30000}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `string` | `'random'` | Joke category |
| `refreshInterval` | `number` | - | Auto-refresh interval (ms) |

---

## Configuration Examples

### PixelatedClientConfigProvider Setup

For components that use external services, wrap your app with the configuration provider:

```tsx
// app/layout.tsx (Next.js 13+ App Router)
import { PixelatedClientConfigProvider } from '@pixelated-tech/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PixelatedClientConfigProvider config={{
          cloudinary: {
            product_env: 'production',
            baseUrl: 'https://res.cloudinary.com/your-account',
            transforms: 'f_auto,q_auto,w_auto'
          },
          wordpress: {
            site: 'your-blog.wordpress.com'
          },
          // Add other service configurations as needed
        }}>
          {children}
        </PixelatedClientConfigProvider>
      </body>
    </html>
  );
}
```

### Cloudinary Configuration

```tsx
const cloudinaryConfig = {
  product_env: 'production',           // Environment identifier
  baseUrl: 'https://res.cloudinary.com/your-account',  // Your Cloudinary URL
  transforms: 'f_auto,q_auto,w_auto'   // Default transformations
};
```

### WordPress Configuration

```tsx
const wordpressConfig = {
  site: 'your-blog.wordpress.com',     // WordPress site URL
  apiVersion: '1.1'                    // API version (optional)
};
```

### Contentful Configuration

```tsx
const contentfulConfig = {
  spaceId: 'your-space-id',            // Contentful space ID
  accessToken: 'your-access-token',    // Contentful access token
  environment: 'master'                // Contentful environment
};
```

### Other Service Configurations

```tsx
const config = {
  calendly: {
    username: 'your-calendly-username'
  },
  hubspot: {
    portalId: 'your-portal-id',
    formId: 'your-form-id'
  },
  instagram: {
    accessToken: 'your-access-token'
  }
};
```

---

## TypeScript Support

All components include full TypeScript definitions:

```tsx
import type {
  CalloutType,
  BlogPostType,
  CarouselSlide,
  PixelatedConfig
} from '@pixelated-tech/components';
```

## CDN Usage (Not Recommended)

```html
<script src="https://unpkg.com/@pixelated-tech/components@latest/dist/index.js"></script>
```

**Note**: CDN usage is not recommended for production as it doesn't support tree-shaking and may include unnecessary code.

## Contributing

When adding new components, please:
1. Add TypeScript interfaces to `src/index.d.ts`
2. Create Storybook stories in `src/stories/`
3. Add comprehensive documentation here
4. Include usage examples and prop tables

---

*For more examples and advanced usage, check the [Storybook interactive demos](https://your-storybook-url).*


---

*This documentation is automatically updated when components are modified. Last updated: $(date)*