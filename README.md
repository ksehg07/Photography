# Photographer & Director Portfolio

A cinematic, minimalist portfolio website for photographers and filmmakers built with **Next.js 14**, **TypeScript**, and **Vanilla CSS Modules**.

## 🎬 Features

- **Visual-First Design**: Minimalist, cinematic aesthetic with custom color palette
- **Responsive Layout**: Desktop grid gallery and mobile infinite scroll marquee
- **Smooth Animations**: Framer Motion-powered fade-in effects on viewport entry
- **Sticky Navigation**: Persistent navbar with smooth link transitions
- **App Router**: Modern Next.js 14 App Router architecture
- **TypeScript**: Fully typed for type safety and better DX
- **CSS Modules**: Scoped styling with vanilla CSS (no utility frameworks)

## 🎨 Design System

The project uses a carefully curated color palette for a sophisticated, warm aesthetic:

```css
:root {
  --color-bg-main: #fffcf7;        /* Warm cream background */
  --color-text-primary: #594545;   /* Deep brown text */
  --color-text-secondary: #815B5B; /* Medium brown text */
  --color-accent: #9E7676;         /* Warm accent color */
}
```

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css              # Global styles with design tokens
│   ├── layout.tsx               # Root layout with Navbar
│   ├── page.tsx                 # Home page with hero, gallery, and about sections
│   └── page.module.css          # Page-specific styles
│
├── components/
│   ├── Animations/
│   │   └── FadeInView.tsx        # Reusable Framer Motion animation wrapper
│   │
│   ├── Gallery/
│   │   ├── InfiniteScrollGallery.tsx      # Responsive gallery component
│   │   └── InfiniteScrollGallery.module.css # Grid/marquee styles
│   │
│   └── Navigation/
│       ├── Navbar.tsx            # Sticky navbar with links
│       └── Navbar.module.css     # Navbar styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the project directory:
```bash
cd photographer-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 📱 Component Guide

### FadeInView
A reusable wrapper component that triggers a fade-in and upward emerge animation when an element enters the viewport.

```tsx
import { FadeInView } from '@/components/Animations/FadeInView';

<FadeInView delay={0.2} duration={0.6}>
  <h1>Content to animate</h1>
</FadeInView>
```

**Props:**
- `children` (ReactNode): Content to animate
- `delay` (number, optional): Delay in seconds before animation starts (default: 0)
- `duration` (number, optional): Animation duration in seconds (default: 0.6)

### InfiniteScrollGallery
Responsive gallery component with two modes:

- **Desktop**: Grid layout with hover zoom effect
- **Mobile/Tablet**: Horizontal infinite marquee with film-strip effect

```tsx
import { InfiniteScrollGallery } from '@/components/Gallery/InfiniteScrollGallery';

const images = [
  { id: 1, src: '/image1.jpg', alt: 'Portrait' },
  { id: 2, src: '/image2.jpg', alt: 'Landscape' },
];

<InfiniteScrollGallery images={images} />
```

**Props:**
- `images` (GalleryImage[]): Array of image objects with `id`, `src`, and `alt`
- `isMobile` (boolean, optional): Force mobile view (auto-detected by default)

**Image Object Shape:**
```typescript
interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
}
```

## 🎯 Navigation Links

The Navbar includes the following links (update in `src/components/Navigation/Navbar.tsx`):

- Home (`/`)
- Portraits (`/portraits`)
- Interviews (`/interviews`)
- Documentary Films (`/documentary`)
- Blogs (`/blogs`)
- Lifestyle (`/lifestyle`)

## ✨ Customization

### Updating Colors
Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --color-bg-main: #fffcf7;        /* Background color */
  --color-text-primary: #594545;   /* Primary text color */
  --color-text-secondary: #815B5B; /* Secondary text color */
  --color-accent: #9E7676;         /* Accent color */
}
```

### Updating Gallery Images
Replace the `sampleGalleryImages` array in `src/app/page.tsx` with your actual portfolio images.

### Adding New Pages
Create new routes in the `src/app` directory following Next.js App Router conventions:

```typescript
// src/app/portraits/page.tsx
export default function PortraitsPage() {
  return <div>Portraits Gallery</div>;
}
```

## 📦 Dependencies

- **next**: 16.1.1 - React framework
- **react**: 19.0 - UI library
- **framer-motion**: Latest - Animation library
- **typescript**: 5 - Type safety

## 🔧 Development Tips

1. **CSS Modules**: Each component has its own `.module.css` file. Import and use class names:
   ```tsx
   import styles from './Component.module.css';
   <div className={styles.className}>Content</div>
   ```

2. **Animations**: Use `FadeInView` wrapper for viewport-triggered animations throughout the site.

3. **Responsive Design**: Media queries are defined in CSS modules. Key breakpoints:
   - 768px: Tablet/Mobile threshold
   - 480px: Small mobile devices

4. **Images**: Use Next.js `<Image>` component with `fill` prop and `sizes` attribute for optimal performance.

## 🎨 Mobile Marquee Animation

The infinite scroll gallery on mobile uses a CSS `@keyframes` animation that translates the gallery wrapper. The animation:
- Runs continuously at 30 seconds per loop
- Pauses on hover
- Duplicates images for seamless looping
- Achieves a cinematic "film-strip" effect

## 📝 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and customize this template for your portfolio needs.

---

**Built with ❤️ for visual storytellers**
