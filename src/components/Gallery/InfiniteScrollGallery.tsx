'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import styles from './InfiniteScrollGallery.module.css';

interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
}

interface InfiniteScrollGalleryProps {
  images: GalleryImage[];
  isMobile?: boolean;
}

/**
 * InfiniteScrollGallery - Responsive gallery component
 * Desktop: Standard grid layout
 * Mobile/Tablet: Automatic horizontal infinite marquee with film-strip effect
 * 
 * @param images - Array of image objects with id, src, and alt text
 */
export const InfiniteScrollGallery = ({ images }: InfiniteScrollGalleryProps) => {
  // Double the images array for seamless looping on mobile
  const doubledImages = useMemo(() => [...images, ...images], [images]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryWrapper}>
        {doubledImages.map((image, index) => (
          <div key={`${image.id}-${index}`} className={styles.galleryItem}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 280px, 300px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={index < images.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
