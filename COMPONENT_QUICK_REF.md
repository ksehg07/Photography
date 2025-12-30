# 🎯 FeedItem & MarqueeHero - Quick Reference

## At a Glance

| Component | Purpose | Layout | Height | Width |
|-----------|---------|--------|--------|-------|
| **FeedItem** | Portfolio feed item | Vertical stack | Auto (image-dependent) | 80vw max |
| **MarqueeHero** | Cinematic hero | Desktop: Horizontal marquee / Mobile: Vertical feed | Fixed (70vh default) | Auto per image |

---

## 🚀 Quick Start

### Import Components
```tsx
import { FeedItem } from '@/components/Feed/FeedItem';
import { MarqueeHero } from '@/components/Hero/MarqueeHero';
```

### Use FeedItem
```tsx
<FeedItem 
  id={1}
  src="/photo.jpg"
  alt="Photo description"
/>
```

### Use MarqueeHero
```tsx
<MarqueeHero 
  images={[
    { id: 1, src: '/photo1.jpg', alt: 'Photo 1' },
    { id: 2, src: '/photo2.jpg', alt: 'Photo 2' },
  ]}
  height="70vh"
  speed={30}
/>
```

---

## 📱 FeedItem Details

### What It Does
- Displays a single image in a feed
- Auto-adjusts height based on image aspect ratio
- No cropping or distortion
- Responsive: 100vw (mobile) → 90vw (tablet) → 80vw (desktop)

### Props
```typescript
{
  id: string | number;           // Required: unique ID
  src: string;                   // Required: image URL
  alt: string;                   // Required: alt text
  aspectRatio?: number;          // Optional: width/height (e.g., 16/9)
}
```

### Files
- Component: `src/components/Feed/FeedItem.tsx`
- Styles: `src/components/Feed/FeedItem.module.css`

### Example: Different Ratios
```tsx
// Portrait (9:16)
<FeedItem id={1} src="/portrait.jpg" alt="Portrait" aspectRatio={9/16} />

// Square (1:1)
<FeedItem id={2} src="/square.jpg" alt="Square" aspectRatio={1} />

// Landscape (16:9)
<FeedItem id={3} src="/landscape.jpg" alt="Landscape" aspectRatio={16/9} />

// Natural (no cropping, uses image's natural ratio)
<FeedItem id={4} src="/natural.jpg" alt="Natural" />
```

---

## 🎬 MarqueeHero Details

### What It Does
- **Desktop (769px+):** Horizontal infinite scrolling marquee
- **Mobile/Tablet (≤768px):** Vertical stacked feed
- Fixed height (e.g., 70vh) constrains vertical space
- Width adjusts per image (panoramas wide, portraits narrow)
- Pauses animation on hover

### Props
```typescript
{
  images: Array<{
    id: string | number;
    src: string;
    alt: string;
  }>;                            // Required: image array
  height?: string;               // Optional: fixed height (default: "70vh")
  speed?: number;                // Optional: animation duration in seconds (default: 30)
}
```

### Files
- Component: `src/components/Hero/MarqueeHero.tsx`
- Styles: `src/components/Hero/MarqueeHero.module.css`

### Example: Different Sizes
```tsx
// Default: 70vh, 30-second loop
<MarqueeHero images={images} />

// Smaller: 50vh, faster
<MarqueeHero images={images} height="50vh" speed={20} />

// Larger: 90vh, slower
<MarqueeHero images={images} height="90vh" speed={40} />

// Fixed pixel height
<MarqueeHero images={images} height="600px" speed={30} />
```

---

## 🎨 CSS Classes

### Utility Classes (in globals.css)

```css
/* For responsive images without cropping */
.img-auto-scale {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}

/* For images that fill space (may crop) */
.img-cover-center {
  object-fit: cover;
  object-position: center;
}
```

### Module Classes

**FeedItem.module.css:**
- `.feedItem` - Container (no fixed height)
- `.imageWrapper` - Image wrapper
- `.aspectRatioContainer` - For aspect ratio preservation

**MarqueeHero.module.css:**
- `.marqueeContainer` - Main container (fixed height)
- `.marqueeTrack` - Animated track
- `.marqueeItem` - Individual image item
- `.pauseOverlay` - Hover pause handler

---

## 🔄 Responsive Behavior

### FeedItem
```
Mobile (≤640px):  100vw width,   auto height
Tablet (641-1024px): 90vw width, auto height
Desktop (1025px+):   80vw width, auto height
```

### MarqueeHero
```
Desktop (769px+):    Horizontal marquee, fixed height, auto width
Tablet (481-768px):  Vertical stack,    auto height
Mobile (≤480px):     Vertical stack,    auto height
```

---

## ✅ Key Principles

1. **No Fixed Heights on FeedItem** - Containers expand to fit images
2. **No Cropping** - Use `object-fit: contain`, not `cover`
3. **Fixed MarqueeHero Height** - Constrains to viewport with `height` prop
4. **Dynamic Widths** - Images adjust width based on aspect ratio
5. **Responsive Design** - Marquee → Feed on smaller screens

---

## 🎯 Common Tasks

### Display a Photo Feed
```tsx
const photos = [
  { id: 1, src: '/photo1.jpg', alt: 'Photo 1' },
  { id: 2, src: '/photo2.jpg', alt: 'Photo 2' },
];

<div className={styles.feed}>
  {photos.map((photo) => (
    <FeedItem key={photo.id} {...photo} />
  ))}
</div>
```

### Create a Hero Marquee
```tsx
<MarqueeHero 
  images={heroPhotos}
  height="70vh"
  speed={30}
/>
```

### Wrap with FadeInView Animation
```tsx
import { FadeInView } from '@/components/Animations/FadeInView';

<FadeInView delay={0.2}>
  <FeedItem id={1} src="/photo.jpg" alt="Photo" />
</FadeInView>
```

### Customize in page.module.css
```css
.feed {
  gap: 2rem;  /* Space between feed items */
  max-width: 1200px;
  margin: 0 auto;
}
```

---

## 🚨 Don't Do This

```tsx
// ❌ Fixed height on FeedItem (crops the image)
<div style={{ height: '400px' }}>
  <FeedItem {...props} />
</div>

// ❌ Using object-fit: cover on FeedItem (crops the image)
<FeedItem src="/image.jpg" alt="Image" />
// (CSS uses contain, not cover)

// ❌ No height on MarqueeHero (takes full page height)
<MarqueeHero images={images} height="auto" />

// ❌ Empty images array (nothing to display)
<MarqueeHero images={[]} />
```

---

## ✅ Do This Instead

```tsx
// ✅ Let FeedItem expand naturally
<FeedItem id={1} src="/photo.jpg" alt="Photo" />

// ✅ Set explicit height on MarqueeHero
<MarqueeHero images={images} height="70vh" speed={30} />

// ✅ Use aspectRatio prop for control
<FeedItem 
  id={1} 
  src="/photo.jpg" 
  alt="Photo"
  aspectRatio={16/9}
/>

// ✅ Map over image array
<div>
  {images.map((img) => (
    <FeedItem key={img.id} {...img} />
  ))}
</div>
```

---

## 📐 Image Dimension Examples

| Image Type | Recommended Props | Result |
|-----------|------------------|--------|
| Portrait (1080×1620px) | `aspectRatio={2/3}` or default | Tall, narrow display |
| Landscape (1920×1080px) | `aspectRatio={16/9}` or default | Wide, short display |
| Panoramic (2560×1024px) | `aspectRatio={2.5}` or default | Very wide display |
| Square (1024×1024px) | `aspectRatio={1}` or default | Square display |

---

## 🎬 Animation Integration

Both components work with `FadeInView` for entrance animations:

```tsx
<FadeInView delay={0}>
  <MarqueeHero images={images} height="70vh" />
</FadeInView>

<FadeInView delay={0.2}>
  <h2>Portfolio Feed</h2>
</FadeInView>

{images.map((img, idx) => (
  <FadeInView key={img.id} delay={0.1 + idx * 0.05}>
    <FeedItem {...img} />
  </FadeInView>
))}
```

---

## 📊 Current Page Structure

```
Home Page (page.tsx)
├── Marquee Hero Section
│   └── MarqueeHero (images, height="70vh", speed=30)
├── Hero Text Section
│   ├── Title: "Visual Storytelling"
│   └── Subtitle: "Photography & Filmmaking..."
├── Portfolio Feed Section
│   ├── h2: "Portfolio Feed"
│   └── Feed Container
│       ├── FeedItem (portrait)
│       ├── FeedItem (landscape)
│       ├── FeedItem (square)
│       └── ... more items
└── About Section
    ├── h2: "About"
    └── Bio text
```

---

## 🆘 Troubleshooting

**Issue:** Images appear cropped or distorted
- **Check:** FeedItem should have no fixed height
- **Solution:** Remove any `height:` CSS from parent container

**Issue:** MarqueeHero doesn't animate on desktop
- **Check:** Ensure screen width is 769px+
- **Solution:** Test in desktop viewport or use DevTools responsive mode

**Issue:** Images don't load
- **Check:** Image `src` path is correct
- **Solution:** Ensure images exist in `/public` folder

**Issue:** Marquee animation is janky
- **Check:** Not an issue - CSS `transform` is GPU-accelerated
- **Solution:** None needed, performance is optimized

---

## 📚 Full Documentation

For complete details, see [ASPECT_RATIO_GUIDE.md](ASPECT_RATIO_GUIDE.md)

---

**Happy coding! 🎬**
