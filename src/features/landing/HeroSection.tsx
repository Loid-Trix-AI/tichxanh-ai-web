import { useRef, useMemo, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";
import CanvasScrollytelling from "./CanvasScrollytelling";

const FRAME_COUNT = 96;

// Push-back starts at this scroll progress value (0-1)
const PUSH_START = 0.75;

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);

  const frames = useMemo(
    () =>
      Array.from(
        { length: FRAME_COUNT },
        (_, i) =>
          `/seq/processed_Bottle_cracks_morphing_into_plastic_202605151159_${String(
            i + 1,
          ).padStart(3, "0")}.jpg`,
      ),
    [],
  );

  // Bloom: color appears immediately on first scroll (0 → 0.15)
  const grayscale = useTransform(progress, [0, 0.15], [1, 0]);
  const bloom = useTransform(progress, [0, 0.15], [0, 1]);

  // Push-back: kicks in after PUSH_START, completes at progress=1
  const pushScale = useTransform(progress, [PUSH_START, 1], [1, 0.92]);
  const pushTranslateY = useTransform(progress, [PUSH_START, 1], [0, -4]); // vh
  const pushOpacity = useTransform(progress, [PUSH_START, 1], [1, 0]);
  
  // Text animations
  const textOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const textY = useTransform(progress, [0, 0.05], [0, -40]);
  const textBlur = useTransform(progress, [0, 0.05], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 h-screen w-full overflow-hidden bg-background"
    >
      {/* Canvas layer — grayscale→color bloom + push-back compositing */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: useTransform(grayscale, (v) => `grayscale(${v})`),
          transform: useTransform(
            [pushScale, pushTranslateY],
            ([s, y]) => `scale(${s}) translateY(${y}vh)`
          ),
          opacity: pushOpacity,
          transformOrigin: "50% 50%",
        }}
      >
        <CanvasScrollytelling
          frames={frames}
          pinTargetRef={sectionRef}
          scrollDistance="+=150%"
          onProgress={(p) => progress.set(p)}
          className="h-full w-full"
        />
      </motion.div>

      {/* Ambient bloom overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(bloom, (v) => 
            `radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--sage) ${v * 30}%, transparent) 0%, transparent ${20 + v * 40}%)`
          ),
          opacity: useTransform([bloom, pushOpacity], ([b, o]) => (b as number) * (o as number)),
          mixBlendMode: "screen",
        }}
      />

      {/* Headline */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between px-6 pb-16 pt-32 sm:px-10">
        <div /> {/* Spacer for Navbar */}
        <motion.h1
          className="font-display text-center text-[11vw] font-bold leading-[0.88] sm:text-[8vw] md:text-[6.5vw]"
          style={{
            opacity: textOpacity,
            transform: useTransform(textY, (y) => `translateY(${y}px)`),
            filter: useTransform(textBlur, (b) => `blur(${b}px)`),
          }}
        >
          {t.hero.redefine}
          <br />
          <span className="italic font-light tracking-tight">{t.hero.value}</span>
          <br />
          <span className="text-[oklch(0.8_0.2_145)] text-glow-sage">{t.hero.waste}</span>
        </motion.h1>
        <motion.div
          className="flex w-full flex-col items-center gap-3"
          style={{ opacity: textOpacity }}
        >
          <div className="h-[1px] w-32 bg-foreground/20" />
          <p className="text-xs uppercase tracking-[0.4em] text-foreground/50">{t.hero.scroll}</p>
        </motion.div>
      </div>
    </section>
  );
}
