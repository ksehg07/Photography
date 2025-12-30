# 📐 Dynamic Aspect Ratio Implementation Guide

## Overview

Your photographer portfolio now includes two new components designed with **aspect ratio safety** as the core principle. No images will be cropped or distorted, regardless of their original dimensions.

---

## ✨ Key Principle: "Aspect Ratio Safety"

### What This Means
- **No Fixed Heights** that crop images
- **Width-First Design** on mobile (100vw → 100% container)
- **Height-First Design** on desktop marquee (70vh fixed, width auto)
- **Panoramic shots** display wide, **portrait shots** display narrow
- **Every pixel** of the photographer's image is visible

---

## 📱 Component 1: FeedItem.tsx

**Location:** `src/components/Feed/FeedItem.tsx`

### Purpose
A single feed item that displays images with **automatic height adjustment** based on intrinsic aspect ratio.

### Key Features

✅ **No Fixed Heights**
- Container expands to fit the entire image
- Height adjusts automatically based on image dimensions

✅ **Dynamic Aspect Ratio Handling**
- Optional `aspectRatio` prop for explicit ratio (e.g., 16/9)
- If not provided, uses image's natural aspect ratio
- Uses padding-bottom trick for aspect ratio preservation

✅ **Responsive Image Sizing**
```typescript
// Mobile: 100vw
// Tablet: 90vw
// Desktop: 80vw
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
```

✅ **No Distortion**
- Uses `object-fit: contain` (not crop)
- Centers image with `object-position: center`
- Respects full image dimensions

### Props

```typescript
interface FeedItemProps {
  id: string | number;           // Unique identifier
  src: string;                   // Image URL
  alt: string;                   // Alt text for accessibility
  aspectRatio?: number;          // Optional: width/height ratio
}
```

### Usage

```tsx
import { FeedItem } from '@/components/Feed/FeedItem';

// Without aspect ratio - uses image's natural dimensions
<FeedItem 
  id={1}
  src="/portrait.jpg" 
  alt="Portrait" 
/>

// With explicit aspect ratio
<FeedItem 
  id={2}
  src="/landscape.jpg" 
  alt="Landscape"
  aspectRatio={16/9}
/>
```

### CSS Details

**FeedItem.module.css:**
- `.feedItem` - No fixed height, `overflow: visible`
- `.aspectRatioContainer` - Uses padding-bottom percentage for ratio
- `.imageWrapper` - Flexible sizing with `width: 100%; height: auto`

```css
.feedItem {
  width: 100%;
  overflow: visible; /* Allow full image */
}

.imageWrapper img {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}
```

---

## 🎬 Component 2: MarqueeHero.tsx

**Location:** `src/components/Hero/MarqueeHero.tsx`

### Purpose
A **horizontal infinite marquee** with **fixed height** and **dynamic width** for a cinematic hero section.

### Key Features

✅ **Fixed Height, Dynamic Width**
- Height constrained (default: `70vh`) for consistent viewport usage
- Width adjusts based on image aspect ratio
- Panoramic images expand wide, portraits stay narrow

✅ **Desktop: Infinite Horizontal Scroll**
- Continuous left-to-right animation
- 30-second loop (customizable via `speed` prop)
- Pauses on hover
- Images doubled for seamless looping

✅ **Mobile/Tablet: Vertical Feed**
- Switches to column layout
- No marquee animation (user-friendly)
- Full image visibility
- Touch-friendly scrolling

✅ **No Cropping**
- Uses `object-fit: cover` within fixed height
- Never distorts images
- Maintains aspect ratios

### Props

```typescript
interface MarqueeHeroProps {
  images: MarqueeImage[];  // Array of images
  height?: string;         // Fixed height (default: "70vh")
  speed?: number;          // Animation duration in seconds (default: 30)
}

interface MarqueeImage {
  id: string | number;
  src: string;
  alt: string;
}
```

### Usage

```tsx
import { MarqueeHero } from '@/components/Hero/MarqueeHero';

const images = [
  { id: 1, src: '/photo1.jpg', alt: 'Panoramic shot' },
  { id: 2, src: '/photo2.jpg', alt: 'Portrait' },
  { id: 3, src: '/photo3.jpg', alt: 'Square format' },
];

// Default: 70vh height, 30-second loop
<MarqueeHero images={images} />

// Custom: 80vh height, 45-second loop
<MarqueeHero 
  images={images} 
  height="80vh" 
  speed={45} 
/>

// Custom: 500px fixed height
<MarqueeHero 
  images={images} 
  height="500px" 
  speed={25} 
/>
```

### CSS Details

**MarqueeHero.module.css:**

**Desktop (769px+):**
```css
.marqueeContainer {
  height: var(--marquee-height, 70vh);
  overflow: hidden;
}

.marqueeTrack {
  animation: marqueeScroll var(--animation-duration, 30s) linear infinite;
}

.marqueeItem {
  height: 100%;
  width: auto; /* Adjusts based on image */
}

@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Mobile (≤768px):**
```css
.marqueeContainer {
  height: auto;
  overflow: visible;
}

.marqueeTrack {
  flex-direction: column;
  animation: none;
}

.marqueeItem {
  width: 100%;
  height: auto;
}
```

---

## 🎨 CSS Utility Classes (globals.css)

Two utility classes added for image handling:

```css
/* Use this for responsive images without distortion */
.img-auto-scale {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}

/* Use this for cover mode (crops to fit) */
.img-cover-center {
  object-fit: cover;
  object-position: center;
}
```

---

## 📊 Responsive Behavior Comparison

| Feature | FeedItem | MarqueeHero |
|---------|----------|-------------|
| **Desktop Layout** | Vertical feed (100% width) | Horizontal marquee |
| **Desktop Height** | Auto (image-dependent) | Fixed (e.g., 70vh) |
| **Desktop Width** | 80vw max | Auto per image |
| **Tablet Layout** | Vertical feed | Vertical stacked |
| **Mobile Layout** | Vertical feed | Vertical stacked |
| **Animation** | None (static) | Horizontal scroll (desktop) |
| **Aspect Ratio** | Preserved | Preserved |

---

## 🚀 Integration in Home Page

The `page.tsx` now uses both components:

```tsx
// Marquee Hero Section (Desktop: Horizontal scroll)
<MarqueeHero images={sampleMarqueeImages} height="70vh" speed={30} />

// Hero Text Section
<h1>Visual Storytelling</h1>
<p>Photography & Filmmaking | Cinematic Narratives</p>

// Portfolio Feed (All devices: Vertical stack with dynamic heights)
{sampleFeedImages.map((image) => (
  <FeedItem key={image.id} {...image} />
))}

// About Section
<h2>About</h2>
<p>Your bio...</p>
```

---

## 🎯 Implementation Checklist

✅ **FeedItem Component**
- [x] No fixed heights
- [x] Dynamic aspect ratio support
- [x] `width: 100%, height: auto` image sizing
- [x] `object-fit: contain` for no distortion
- [x] Responsive sizing via `sizes` prop
- [x] Mobile/Tablet/Desktop layouts

✅ **MarqueeHero Component**
- [x] Fixed height (customizable)
- [x] Dynamic width per image
- [x] Desktop: Horizontal marquee animation
- [x] Mobile: Vertical stacked feed
- [x] Pause on hover
- [x] No image cropping

✅ **CSS Utilities**
- [x] `.img-auto-scale` for contain mode
- [x] `.img-cover-center` for cover mode
- [x] Aspect ratio preservation

✅ **Page Integration**
- [x] Updated `page.tsx` with new components
- [x] Updated `page.module.css` with new sections
- [x] FadeInView animations on all sections
- [x] Responsive at all breakpoints

---

## 🔧 Customization Guide

### Change Marquee Height
```tsx
<MarqueeHero 
  images={images}
  height="80vh"  // Was 70vh
  speed={30}
/>
```

### Change Animation Speed
```tsx
<MarqueeHero 
  images={images}
  height="70vh"
  speed={45}  // Slower: 45 seconds (was 30)
/>
```

### Force Aspect Ratio on Feed Items
```tsx
<FeedItem
  id={1}
  src="/image.jpg"
  alt="Image"
  aspectRatio={3/2}  // Force 3:2 ratio
/>
```

### Customize Feed Spacing
Edit `page.module.css`:
```css
.feed {
  gap: 2rem;  /* Space between items (was 2rem) */
}
```

---

## ⚠️ Common Pitfalls to Avoid

❌ **Don't use fixed heights on FeedItem**
```tsx
// BAD: This crops the image
<div style={{ height: '400px' }}>
  <FeedItem src="/image.jpg" />
</div>
```

✅ **Do let FeedItem expand naturally**
```tsx
// GOOD: Height auto-adjusts
<FeedItem src="/image.jpg" />
```

---

❌ **Don't use `object-fit: cover` on feed items**
```tsx
// BAD: Crops the image
style={{ objectFit: 'cover' }}
```

✅ **Do use `object-fit: contain`**
```tsx
// GOOD: Full image visible
style={{ objectFit: 'contain' }}
```

---

❌ **Don't remove the marquee height constraint**
```tsx
// BAD: Marquee expands indefinitely
height="auto"
```

✅ **Do set a fixed marquee height**
```tsx
// GOOD: Constrained, balanced layout
height="70vh"
```

---

## 📐 Aspect Ratio Examples

### FeedItem with Different Ratios

```tsx
// Portrait (9:16)
<FeedItem src="/portrait.jpg" alt="Portrait" aspectRatio={9/16} />

// Square (1:1)
<FeedItem src="/square.jpg" alt="Square" aspectRatio={1} />

// Landscape (16:9)
<FeedItem src="/landscape.jpg" alt="Landscape" aspectRatio={16/9} />

// Panoramic (21:9)
<FeedItem src="/panorama.jpg" alt="Panorama" aspectRatio={21/9} />

// Natural (no ratio - uses image's intrinsic aspect ratio)
<FeedItem src="/natural.jpg" alt="Natural" />
```

---

## 🎬 Performance Notes

✅ **Images are optimized by Next.js**
- Automatic format conversion (WebP, etc.)
- Responsive sizing via `sizes` prop
- Lazy loading by default

✅ **Animations are GPU-accelerated**
- Marquee uses CSS `transform` (smooth 60fps)
- No JavaScript repainting

✅ **No layout shift**
- Aspect ratio is preserved
- Containers don't resize unexpectedly

---

## 📝 Summary

**FeedItem:** For flexible, image-responsive vertical feeds
- Perfect for portfolios with mixed image dimensions
- No cropping, no distortion
- Mobile-first, touch-friendly

**MarqueeHero:** For cinematic horizontal scrolling hero sections
- Eye-catching desktop experience
- Reverts to feed on mobile/tablet
- Respects image aspect ratios

Together, they create a **photographer-friendly portfolio** that showcases images exactly as intended! 🎬

