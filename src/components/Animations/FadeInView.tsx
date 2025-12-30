'use client';

import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

/**
 * FadeInView - A reusable animation wrapper component
 * Triggers a subtle "emerge upwards and fade in" animation when the element enters the viewport
 * 
 * @param children - The content to be animated
 * @param delay - Delay before animation starts (in seconds)
 * @param duration - Duration of the animation (in seconds)
 */
export const FadeInView = ({
  children,
  delay = 0,
  duration = 0.6,
}: FadeInViewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};
