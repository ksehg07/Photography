# 🚀 Quick Start Guide

## Project Location
```
d:\_Work-2024\LMS-Traverse\Sarthak-Portfolio\VSC-AI\photographer-portfolio
```

## Start Development
```bash
cd photographer-portfolio
npm run dev
```
→ Open [http://localhost:3000](http://localhost:3000)

---

## 📦 What You Got

### 4 Main Components Ready to Use:

#### 1. **FadeInView.tsx** - Animation Wrapper
```tsx
import { FadeInView } from '@/components/Animations/FadeInView';

<FadeInView delay={0.2} duration={0.6}>
  <h1>Your content here</h1>
</FadeInView>
```
- Fades in + slides up on viewport entry
- `delay` and `duration` fully customizable

#### 2. **InfiniteScrollGallery.tsx** - Responsive Gallery
```tsx
import { InfiniteScrollGallery } from '@/components/Gallery/InfiniteScrollGallery';

<InfiniteScrollGallery images={galleryImages} />
```
- Desktop: Grid layout
- Mobile: Auto-scrolling marquee (film-strip effect)

#### 3. **Navbar.tsx** - Sticky Navigation
```tsx
import { Navbar } from '@/components/Navigation/Navbar';

// Already included in root layout
// Links: Home, Portraits, Interviews, Documentary Films, Blogs, Lifestyle
```

#### 4. **globals.css** - Design System
```css
--color-bg-main: #fffcf7        /* Warm cream */
--color-text-primary: #594545   /* Deep brown */
--color-text-secondary: #815B5B /* Medium brown */
--color-accent: #9E7676         /* Warm accent */
```

---

## 🎯 Quick Customization

### Change Colors
Edit `src/app/globals.css`:
```css
:root {
  --color-bg-main: #your-color;
  --color-text-primary: #your-color;
  --color-text-secondary: #your-color;
  --color-accent: #your-color;
}
```

### Update Gallery Images
Edit `src/app/page.tsx`:
```typescript
const sampleGalleryImages = [
  { id: 1, src: 'your-image.jpg', alt: 'Description' },
  // ... more images
];
```

### Modify Navigation Links
Edit `src/components/Navigation/Navbar.tsx`:
```typescript
const navLinks = [
  { label: 'Home', href: '/' },
  // Add/remove links
];
```

### Adjust Animation Speed
Edit `src/components/Gallery/InfiniteScrollGallery.module.css`:
```css
animation: scroll-left 30s linear infinite;  /* Change 30s duration */
```

---

## 📂 File Structure
```
src/
├── app/
│   ├── globals.css           ← Design tokens
│   ├── layout.tsx            ← Root layout
│   └── page.tsx              ← Home page
│
└── components/
    ├── Animations/
    │   └── FadeInView.tsx
    ├── Gallery/
    │   ├── InfiniteScrollGallery.tsx
    │   └── InfiniteScrollGallery.module.css
    └── Navigation/
        ├── Navbar.tsx
        └── Navbar.module.css
```

---

## ✅ Build & Deploy

### Test Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## 📚 Documentation Files
- **README.md** - Full project documentation
- **SETUP_SUMMARY.md** - Implementation details
- **DELIVERY_CHECKLIST.md** - Requirements verification

---

## 🎬 Animation Features

**FadeInView:**
- Opacity: 0 → 1
- Y Position: 30px → 0
- Triggered on viewport entry
- One-time animation

**Gallery Marquee (Mobile):**
- Infinite horizontal scroll
- 30-second loop duration
- Pause on hover
- Seamless due to image duplication

---

## 🎨 Responsive Breakpoints

| Breakpoint | Device | Gallery Mode |
|-----------|--------|-------------|
| 769px+ | Desktop | CSS Grid |
| 481px-768px | Tablet | Marquee |
| ≤480px | Mobile | Marquee |

---

## 💡 Pro Tips

1. Use `FadeInView` to wrap any section for automatic entrance animations
2. Replace sample Unsplash images with real portfolio photos
3. Create new pages in `src/app/` following Next.js conventions
4. CSS Modules are scoped—no naming conflicts!
5. TypeScript catches errors before runtime

---

## 🆘 Common Tasks

### Add a New Page
Create `src/app/portraits/page.tsx`:
```tsx
export default function PortraitsPage() {
  return <h1>Portraits</h1>;
}
```

### Add Animation to Component
Wrap with `FadeInView`:
```tsx
<FadeInView delay={0.3}>
  <YourComponent />
</FadeInView>
```

### Create Image Gallery Array
```typescript
interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  { id: 1, src: '/photo1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/photo2.jpg', alt: 'Photo 2' },
];
```

---

**Everything is set up and ready to go! 🚀**

Start building your portfolio now with:
```bash
npm run dev
```
