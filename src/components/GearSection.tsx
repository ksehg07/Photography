import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Film, Aperture, Focus, Sun, Monitor } from "lucide-react";

const gear = [
  { icon: Camera, name: "RED KOMODO 6K", category: "Cinema Camera" },
  { icon: Film, name: "SONY A7R V", category: "Mirrorless" },
  { icon: Aperture, name: "PRIME CINEMA LENSES", category: "Optics" },
  { icon: Focus, name: "DJI RONIN 4D", category: "Stabilization" },
  { icon: Sun, name: "APUTURE 600D PRO", category: "Lighting" },
  { icon: Monitor, name: "ATOMOS NINJA V+", category: "Monitoring" },
];

export default function GearSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gear" ref={ref} className="bg-inverted px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-body text-xs font-medium tracking-[0.4em] uppercase opacity-50">Technical Arsenal</span>
          <h2 className="text-display mt-3 text-4xl lg:text-6xl">THE GEAR</h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-px border border-current/10 sm:grid-cols-2 lg:grid-cols-3">
          {gear.map((item, i) => (
            <motion.div
              key={item.name}
              className="group relative border border-current/10 p-8 transition-colors duration-500 hover:bg-current/5 lg:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <item.icon className="mb-6 h-8 w-8 opacity-40 transition-opacity duration-300 group-hover:opacity-80" strokeWidth={1} />
              <h3 className="text-display text-lg tracking-wider">{item.name}</h3>
              <p className="text-body mt-2 text-xs tracking-[0.2em] uppercase opacity-40">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
