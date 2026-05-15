"use client";
import { useRef, useState, useMemo } from "react";
import { useTranslation } from "@/shared/hooks/use-translation";
import CanvasScrollytelling from "./CanvasScrollytelling";

const FRAME_COUNT = 96;

// Push-back starts at this scroll progress value (0-1)
const PUSH_START = 0.75;

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

  // Bloom: color appears immediately on first scroll (0 → 0.15)
  const bloom = Math.max(0, Math.min(1, progress / 0.15));
  const grayscale = 1 - bloom;

  // Push-back: kicks in after PUSH_START, completes at progress=1
  // This makes RealitySection appear to slide OVER the hero in 3D
  const pushProgress = Math.max(0, (progress - PUSH_START) / (1 - PUSH_START));
  const pushScale = 1 - pushProgress * 0.08;         // 1 → 0.92
  const pushTranslateY = pushProgress * -4;           // 0 → -4vh (sinks slightly)
  const pushOpacity = Math.max(0, 1 - pushProgress);  // 1 → 0

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 h-screen w-full overflow-hidden bg-background"
    >
      {/* Canvas layer — grayscale→color bloom + push-back compositing */}
      <div
        className="absolute inset-0"
        style={{
          filter: `grayscale(${grayscale}) contrast(${1 + bloom * 0.05}) saturate(${0.6 + bloom * 1.4})`,
          // Push-back uses GPU transform, never modifies layout
          transform: `scale(${pushScale}) translateY(${pushTranslateY}vh)`,
          opacity: pushOpacity,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
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

      {/* Ambient bloom overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--sage) ${bloom * 30}%, transparent) 0%, transparent ${20 + bloom * 40}%)`,
          opacity: bloom * pushOpacity,
          mixBlendMode: "screen",
        }}
      />

      {/* Headline */}
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
