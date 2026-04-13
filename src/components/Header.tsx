import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "oklch(0.99 0.005 80 / 85%)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.85 0.03 20 / 30%)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="text-display text-xl tracking-widest text-foreground">
          STUDIO.
        </Link>
        <div className="flex items-center gap-8 text-body text-sm font-medium tracking-wide">
          <Link
            to="/"
            className="text-foreground/70 transition-colors duration-300 hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <a
            href="/#work"
            className="text-foreground/70 transition-colors duration-300 hover:text-foreground"
          >
            Work
          </a>
          <a
            href="/#gear"
            className="text-foreground/70 transition-colors duration-300 hover:text-foreground"
          >
            Gear
          </a>
          <Link
            to="/about"
            className="text-foreground/70 transition-colors duration-300 hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            About Me
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
