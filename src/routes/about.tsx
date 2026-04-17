import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Creative Chaos" },
      { name: "description", content: "Director, photographer, creative chaos. The unhinged side of the studio." },
      { property: "og:title", content: "About — The Creative Chaos" },
      { property: "og:description", content: "Meet the person behind the lens." },
    ],
  }),
  component: AboutPage,
});

const marqueeWords = ["DIRECTOR", "PHOTOGRAPHER", "CREATIVE", "CHAOS", "VISIONARY", "STORYTELLER"];

const filmImages = [
  [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=70",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=70",
    "https://images.unsplash.com/photo-1518173946687-a277db48d19f?w=400&q=70",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&q=70",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=70",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=70",
    "https://images.unsplash.com/photo-1518173946687-a277db48d19f?w=400&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=70",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=70",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=70",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=70",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=70",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=70",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=70",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=70",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=70",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=70",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&q=70",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=70",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=70",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=70",
  ],
];

const hoverAlts = [
  "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=400&q=70",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=70",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=70",
];

function HoverChaosImage({ src }: { src: string }) {
  const [hovered, setHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(src);
  const [rotation] = useState(() => (Math.random() - 0.5) * 10);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startChaos = useCallback(() => {
    setHovered(true);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      setCurrentImg(hoverAlts[idx % hoverAlts.length]);
      idx++;
    }, 150);
  }, []);

  const stopChaos = useCallback(() => {
    setHovered(false);
    setCurrentImg(src);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [src]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      className="h-48 w-36 flex-shrink-0 overflow-hidden sm:h-56 sm:w-44"
      onMouseEnter={startChaos}
      onMouseLeave={stopChaos}
      animate={hovered ? { scale: 1.15, rotate: rotation } : { scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={currentImg}
        alt="Film strip frame"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

function FilmStrip({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex gap-4"
        style={{
          animation: `${direction === "left" ? "film-left" : "film-right"} ${direction === "left" ? "20s" : "25s"} linear infinite`,
          width: "fit-content",
        }}
      >
        {doubled.map((img, i) => (
          <HoverChaosImage key={`${direction}-${i}`} src={img} />
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <main className="overflow-hidden pt-20">
      {/* Kinetic Marquee Hero */}
      <section className="relative py-16 sm:py-24">
        {[0, 1, 2].map((row) => (
          <div key={row} className="overflow-hidden py-2">
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: `${row % 2 === 0 ? "marquee-left" : "marquee-right"} ${12 + row * 3}s linear infinite`,
                width: "fit-content",
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="text-display mx-4 text-6xl sm:text-8xl lg:text-[10rem]"
                  style={{
                    WebkitTextStroke: row === 1 ? "2px currentColor" : "none",
                    color: row === 1 ? "transparent" : "var(--color-foreground)",
                    opacity: row === 2 ? 0.15 : 1,
                  }}
                >
                  {marqueeWords[(i + row * 2) % marqueeWords.length]}
                  <span className="mx-4 text-accent">//</span>
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Brutalist sticker elements */}
        <motion.div
          className="absolute right-8 top-12 -rotate-12 rounded-sm bg-accent px-5 py-2 text-display text-sm tracking-wider text-accent-foreground sm:right-20 sm:top-20"
          animate={{ rotate: [-12, -8, -12] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          EST. 2014
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-8 rotate-6 border-2 border-foreground px-5 py-2 text-display text-sm tracking-wider sm:left-20"
          animate={{ rotate: [6, 10, 6] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          BASED IN NYC
        </motion.div>
      </section>

      {/* Fast-paced film strips */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-body mb-8 text-xs font-medium tracking-[0.4em] text-accent uppercase">The Reel</p>
        </div>
        {filmImages.map((row, i) => (
          <FilmStrip key={i} images={row} direction={i % 2 === 0 ? "left" : "right"} />
        ))}
      </section>

      {/* Brutalist bio section */}
      <section className="relative px-6 py-32 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display text-5xl leading-tight text-foreground lg:text-7xl">
              I DON'T FOLLOW
              <br />
              <span className="text-accent">RULES.</span>
            </h2>
            <p className="text-body mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Chaos is my creative partner. Every shoot is an experiment. I mix
              film grain with digital precision, studio perfection with street
              rawness. The result? Images that hit different.
            </p>
            <p className="text-body mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              When I'm not behind a camera, I'm probably editing at 3 AM with
              too much coffee, or scouting locations in cities I can't pronounce.
            </p>
          </motion.div>

          {/* Overlapping text brutalist element */}
          <div className="relative mt-20">
            <span className="text-display text-[8rem] leading-none text-foreground/12 sm:text-[12rem] lg:text-[16rem]">
              WHY?
            </span>
            <motion.p
              className="text-body absolute left-4 top-1/2 max-w-md -translate-y-1/2 text-base text-foreground sm:left-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Because the world doesn't need more safe images.
              It needs ones that make you feel something.
            </motion.p>
          </div>
        </div>
      </section>
    </main>
  );
}
