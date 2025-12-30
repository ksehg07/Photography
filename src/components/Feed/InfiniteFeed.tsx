'use client';

import { useRef, useEffect, useState } from 'react';
import { FeedItem } from './FeedItem';
import styles from './InfiniteFeed.module.css';
import { mockFeedItems, type FeedItem as FeedItemType } from '@/data/mockData';

export const InfiniteFeed = () => {
  const [items, setItems] = useState<(FeedItemType & { uniqueId: string })[]>(
    mockFeedItems.map((item, idx) => ({
      ...item,
      uniqueId: `${item.id}-0`,
    }))
  );
  const [generation, setGeneration] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setGeneration((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (generation > 0) {
      setItems((prev) => [
        ...prev,
        ...mockFeedItems.map((item, idx) => ({
          ...item,
          uniqueId: `${item.id}-${generation}`,
        })),
      ]);
    }
  }, [generation]);

  return (
    <section className={styles.infiniteFeed}>
      {items.map((item) => (
        <FeedItem
          key={item.uniqueId}
          src={item.src}
          aspectRatio={item.aspectRatio}
        />
      ))}
      <div ref={sentinelRef} className={styles.sentinel} />
    </section>
  );
};
