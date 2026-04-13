import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden px-6 py-32 lg:px-12">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Photographer portrait"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 h-32 w-32 border-2 border-accent lg:-bottom-8 lg:-right-8 lg:h-48 lg:w-48" />
        </motion.div>
        <motion.div
          className="flex flex-col justify-center lg:pl-8"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-body text-xs font-medium tracking-[0.4em] text-accent uppercase">The Story</span>
          <h2 className="mt-4 text-display text-4xl leading-tight text-foreground lg:text-5xl">
            EVERY FRAME
            <br />
            TELLS A STORY
          </h2>
          <p className="text-body mt-8 text-base leading-relaxed text-muted-foreground">
            With over a decade behind the lens, I've learned that the most powerful
            images live in the spaces between poses — in the raw, unscripted moments
            that reveal who we truly are. My work spans commercial campaigns, intimate
            portraits, and documentary storytelling across four continents.
          </p>
          <p className="text-body mt-4 text-base leading-relaxed text-muted-foreground">
            I believe in letting light guide the narrative and trusting the chaos
            of real life to deliver something extraordinary.
          </p>
          <div className="mt-10 flex gap-12">
            {[
              { num: "12+", label: "Years" },
              { num: "400+", label: "Projects" },
              { num: "28", label: "Countries" },
            ].map((s) => (
              <div key={s.label}>
                <span className="text-display text-3xl text-foreground">{s.num}</span>
                <p className="text-body mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
