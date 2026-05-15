import { createFileRoute } from "@tanstack/react-router";
import SmoothScroll from "@/features/landing/SmoothScroll";
import { Navbar } from "@/shared/ui/Navbar";
import HeroSection from "@/features/landing/HeroSection";
import RealitySection from "@/features/landing/RealitySection";
import BentoFeatures from "@/features/landing/BentoFeatures";
import ImpactGallerySection from "@/features/landing/ImpactGallerySection";
import FounderSection from "@/features/landing/FounderSection";
import SiteFooter from "@/features/landing/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TichXanh AI — Loid AI for Waste, Reimagined" },
      {
        name: "description",
        content:
          "TichXanh AI uses on-device Loid AI to classify waste, gamify carbon tracking, and reward sustainable habits in the real world.",
      },
      { name: "theme-color", content: "#121212" },
      { property: "og:title", content: "TichXanh AI — Loid AI for Waste, Reimagined" },
      {
        property: "og:description",
        content:
          "Scan. Sort. Sprout. An OLED-dark, gamified eco-tech app that turns every plastic bottle into a virtual tree.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="relative grain bg-background text-foreground">
        <HeroSection />
        <RealitySection />
        <ImpactGallerySection />
        <BentoFeatures />
        <FounderSection />
        <SiteFooter />
      </main>
    </>
  );
}
