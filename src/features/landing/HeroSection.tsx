"use client";
import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";
import CanvasScrollytelling from "./CanvasScrollytelling";

const FRAME_COUNT = 96;

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const frames = useMemo(
    () =>
      Array.from(
        { length: FRAME_COUNT },
        (_, i) => `/seq/processed_Bottle_cracks_morphing_into_plastic_202605151159_${String(i + 1).padStart(3, "0")}.jpg`,
      ),
    [],
  );

  // Color blooms immediately upon scrolling (0 -> 0.15)
  const bloom = Math.max(0, Math.min(1, progress / 0.15));
  const grayscale = 1 - bloom;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div
        className="absolute inset-0 transition-[filter,opacity] duration-300"
        style={{
          filter: `grayscale(${grayscale}) contrast(${1 + bloom * 0.05}) saturate(${0.6 + bloom * 1.4})`,
          opacity: Math.max(0, 1 - Math.max(0, progress - 0.9) * 10),
        }}
      >
        <CanvasScrollytelling
          frames={frames}
          pinTargetRef={sectionRef}
          scrollDistance="+=200%"
          onProgress={setProgress}
          className="h-full w-full"
        />
      </div>

      {/* Removed old scanning/checkmark overlays here */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--sage) ${bloom * 30}%, transparent) 0%, transparent ${20 + bloom * 40}%)`,
          opacity: bloom,
          mixBlendMode: "screen",
        }}
      />

      {/* Headline overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between px-6 pb-16 pt-32 sm:px-10">
        <div /> {/* Spacer for Navbar */}
        <h1
          className="font-display text-center text-[11vw] font-bold leading-[0.88] sm:text-[8vw] md:text-[6.5vw]"
          style={{
            opacity: 1 - Math.min(1, progress * 10),
            transform: `translateY(${progress * -40}px)`,
            filter: `blur(${progress * 20}px)`,
          }}
        >
          {t.hero.redefine}
          <br />
          <span className="italic font-light tracking-tight">{t.hero.value}</span>
          <br />
          <span className="text-[oklch(0.8_0.2_145)] text-glow-sage">{t.hero.waste}</span>
        </h1>
        <div 
          className="flex w-full flex-col items-center gap-3"
          style={{ opacity: 1 - Math.min(1, progress * 10) }}
        >
          <div className="h-[1px] w-32 bg-foreground/20" />
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">{t.hero.scroll}</p>
        </div>
      </div>
    </section>
  );
}
