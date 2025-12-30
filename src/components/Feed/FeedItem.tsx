'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './FeedItem.module.css';

interface FeedItemProps {
  src: string;
  aspectRatio: number;
}

export const FeedItem = ({ src, aspectRatio }: FeedItemProps) => {
  return (
    <motion.article
      className={styles.feedItem}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, margin: '-50px' }}
    >
      <div
        className={styles.imageContainer}
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt="Portfolio item"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority={false}
        />
      </div>
    </motion.article>
  );
};
