'use client';

import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './MarqueeHero.module.css';

interface MarqueeImage {
  id: number;
  src: string;
  aspectRatio: string;
  alt: string;
}

interface MarqueeHeroProps {
  images: MarqueeImage[];
}

export const MarqueeHero = ({ images }: MarqueeHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const doubledImages = [...images, ...images];
  const itemWidth = containerWidth / images.length;
  const totalWidth = itemWidth * doubledImages.length;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images.length]);

  useAnimationFrame((time) => {
    if (isDragging) return;

    const currentX = x.get();
    const speed = 0.5;
    const newX = currentX - speed;

    if (newX <= -totalWidth / 2) {
      x.set(0);
    } else {
      x.set(newX);
    }
  });

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleExplore = () => {
    const element = document.getElementById('gallery-start');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.marqueeContainer} ref={containerRef}>
      <motion.div
        ref={trackRef}
        className={styles.marqueeTrack}
        style={{ x }}
        drag="x"
        dragElastic={0.2}
        dragMomentum={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {doubledImages.map((image, index) => {
          const [width, height] = image.aspectRatio.split('/').map(Number);
          const aspectRatio = width / height;

          return (
            <div
              key={`${image.id}-${index}`}
              className={styles.marqueeItem}
              style={{ aspectRatio }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="auto"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority={index < images.length}
              />
            </div>
          );
        })}
      </motion.div>

      <button className={styles.exploreButton} onClick={handleExplore}>
        Explore
      </button>
    </section>
  );
};
