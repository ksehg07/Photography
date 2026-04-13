import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import WorkShowcase from "../components/WorkShowcase";
import GearSection from "../components/GearSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STUDIO. — Capturing The Unseen" },
      { name: "description", content: "Award-winning photography and direction. Commercial, portrait, and documentary work across four continents." },
      { property: "og:title", content: "STUDIO. — Capturing The Unseen" },
      { property: "og:description", content: "Award-winning photography and direction portfolio." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <WorkShowcase />
      <GearSection />
    </main>
  );
}
