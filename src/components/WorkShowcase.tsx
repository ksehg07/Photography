import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    title: "COMMERCIAL",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80",
    count: "48 Projects",
  },
  {
    title: "PORTRAIT",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80",
    count: "126 Projects",
  },
  {
    title: "DOCUMENTARY",
    image: "https://images.unsplash.com/photo-1504600770771-fb03a7ce58be?w=900&q=80",
    count: "32 Projects",
  },
  {
    title: "EDITORIAL",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80",
    count: "67 Projects",
  },
  {
    title: "FINE ART",
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=900&q=80",
    count: "21 Projects",
  },
];

export default function WorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Auto-scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const speed = 0.5; // px per frame

    const tick = () => {
      if (el && !isPaused) {
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
        el.scrollLeft += speed;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused]);

  // Duplicate for seamless loop
  const items = [...categories, ...categories];

  return (
    <section id="work" ref={containerRef} className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-body text-xs font-medium tracking-[0.4em] text-accent uppercase">Selected Work</span>
          <h2 className="text-display mt-3 text-4xl text-foreground lg:text-6xl">THE PORTFOLIO</h2>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 overflow-x-auto scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex gap-6 px-6 lg:px-12 w-max">
          {items.map((cat, i) => (
            <div
              key={`${cat.title}-${i}`}
              className="group relative flex-shrink-0"
              style={{ width: "clamp(300px, 35vw, 500px)" }}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/20" />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <h3 className="text-display text-xl tracking-wider text-foreground">{cat.title}</h3>
                  <p className="text-body mt-1 text-xs text-muted-foreground">{cat.count}</p>
                </div>
                <span className="text-body text-xs text-accent transition-transform duration-300 group-hover:translate-x-1">
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-12">
        <p className="text-body text-xs text-muted-foreground tracking-wider">AUTO-SCROLLING · HOVER TO PAUSE & SCROLL MANUALLY</p>
      </div>
    </section>
  );
}
