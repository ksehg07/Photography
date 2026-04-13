import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1920&q=80"
          alt="Cinematic hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </motion.div>
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <motion.h1
          className="text-display text-5xl leading-tight tracking-[0.12em] text-primary-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          CAPTURING
          <br />
          THE UNSEEN
        </motion.h1>
        <motion.p
          className="text-body mt-6 text-sm font-light tracking-[0.3em] text-primary-foreground/70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Photography &bull; Direction &bull; Vision
        </motion.p>
      </motion.div>
    </section>
  );
}
