'use client';

import styles from './page.module.css';
import { InfiniteFeed } from '@/components/Feed/InfiniteFeed';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Visual Storytelling</h1>
      </header>
      <main className={styles.main}>
        <InfiniteFeed />
      </main>
    </>
  );
}
