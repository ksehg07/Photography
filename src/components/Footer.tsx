import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <Link to="/" className="text-display text-lg tracking-widest text-foreground">STUDIO.</Link>
        <p className="text-body text-xs text-muted-foreground tracking-wider">
          © 2026 — All Rights Reserved
        </p>
        <div className="flex gap-6 text-body text-xs text-muted-foreground">
          <span className="cursor-pointer transition-colors hover:text-foreground">Instagram</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">Vimeo</span>
          <span className="cursor-pointer transition-colors hover:text-foreground">Contact</span>
        </div>
      </div>
    </footer>
  );
}
