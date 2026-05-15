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

  // Animation windows
  const scanProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.2)); // 0.2 -> 0.4
  const checkmarkProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.1)); // 0.4 -> 0.5

  // Color blooms immediately upon scrolling (0 -> 0.15)
  const bloom = Math.max(0, Math.min(1, progress / 0.15));
  const grayscale = 1 - bloom;
  const treeScale = Math.max(0, Math.min(1, (progress - 0.55) / 0.35));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Image-sequence canvas, grayscale fades to color at the climax. */}
      <div
        className="absolute inset-0 transition-[filter] duration-300"
        style={{
          filter: `grayscale(${grayscale}) contrast(${1 + bloom * 0.05}) saturate(${0.6 + bloom * 1.4})`,
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

      {/* Scanning Overlay */}
      {scanProgress > 0 && scanProgress < 1 && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative h-[40vh] w-[20vh] border border-primary/20 bg-primary/5 backdrop-blur-[2px]">
            <motion.div
              className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(132,169,140,0.8)]"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      )}

      {/* Checkmark Overlay */}
      {checkmarkProgress > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          style={{ opacity: 1 - bloom }}
        >
          <svg viewBox="0 0 52 52" className="h-24 w-24 text-primary">
            <motion.circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: checkmarkProgress }}
            />
            <motion.path
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.max(0, (checkmarkProgress - 0.5) * 2) }}
            />
          </svg>
        </div>
      )}

      {/* Color bloom radial mask emerging from center at the climax. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--sage) ${bloom * 30}%, transparent) 0%, transparent ${20 + bloom * 40}%)`,
          opacity: bloom,
          mixBlendMode: "screen",
        }}
      />

      {/* Sprouting virtual tree SVG */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[34vh] w-[34vh] -translate-x-1/2"
        style={{
          opacity: treeScale,
          transform: `translate(-50%, 0) scale(${0.4 + treeScale * 0.8})`,
          transformOrigin: "50% 100%",
        }}
      >
        <path
          d="M100 200 L100 90"
          stroke="var(--sage)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="120"
          strokeDashoffset={120 - 120 * treeScale}
        />
        <circle cx="78" cy="92" r={10 * treeScale} fill="var(--sage)" opacity="0.85" />
        <circle cx="122" cy="92" r={10 * treeScale} fill="var(--sage)" opacity="0.85" />
        <circle cx="100" cy="72" r={12 * treeScale} fill="oklch(0.84 0.08 145)" />
      </svg>

      {/* Headline overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between px-6 pb-16 pt-32 sm:px-10">
        <div /> {/* Spacer for Navbar */}
        <h1
          className="font-display text-center text-[14vw] font-bold leading-[0.88] sm:text-[10vw] md:text-[8.5vw]"
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
