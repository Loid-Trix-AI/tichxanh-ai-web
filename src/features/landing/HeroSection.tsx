import { useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";
import CanvasScrollytelling from "./CanvasScrollytelling";

const FRAME_COUNT = 96;

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);

  const frames = useMemo(
    () =>
      Array.from(
        { length: FRAME_COUNT },
        (_, i) =>
          `/seq/processed_Bottle_cracks_morphing_into_plastic_202605151159_${String(i + 1).padStart(
            3,
            "0",
          )}.jpg`,
      ),
    [],
  );

  // Bloom: color appears immediately on first scroll (0 → 0.1)
  const grayscale = useTransform(progress, [0, 0.1], [1, 0]);
  const bloom = useTransform(progress, [0, 0.1], [0, 1]);

  // Video push-back and fade starts towards the end
  const pushScale = useTransform(progress, [0.8, 1], [1, 0.9]);
  const pushTranslateY = useTransform(progress, [0.8, 1], [0, -5]); // vh
  const pushOpacity = useTransform(progress, [0.85, 1], [1, 0]);

  // Initial text animations (the "REDEFINE the value of WASTE")
  const textOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const textY = useTransform(progress, [0, 0.05], [0, -40]);
  const textBlur = useTransform(progress, [0, 0.05], [0, 40]);

  // Ending sequence animations
  const endingBgOpacity = useTransform(progress, [0.85, 0.95], [0, 1]); // Fades to black
  const endingOpacity = useTransform(progress, [0.85, 0.95], [0, 1]); // Text fades in
  const endingScale = useTransform(progress, [0.85, 1], [0.8, 1]); // Text scales up
  const endingBlur = useTransform(progress, [0.85, 0.95], [20, 0]); // Text blur resolves

  // Split text effect ("TICHXANH" <-> "AI")
  const splitLeftX = useTransform(progress, [0.9, 1], [60, 0]);
  const splitRightX = useTransform(progress, [0.9, 1], [-60, 0]);

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
            ([s, y]) => `scale(${s}) translateY(${y}vh)`,
          ),
          opacity: pushOpacity,
          transformOrigin: "50% 50%",
        }}
      >
        <CanvasScrollytelling
          frames={frames}
          pinTargetRef={sectionRef}
          scrollDistance="+=200%"
          videoEndProgress={0.9}
          onProgress={(p) => progress.set(p)}
          className="h-full w-full"
        />
      </motion.div>

      {/* Ambient bloom overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: useTransform(
            bloom,
            (v) =>
              `radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--sage) ${(v as number) * 30}%, transparent) 0%, transparent ${20 + (v as number) * 40}%)`,
          ),
          opacity: useTransform([bloom, pushOpacity], ([b, o]) => (b as number) * (o as number)),
          mixBlendMode: "screen",
        }}
      />

      {/* Headline */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between px-6 pb-16 pt-32 sm:px-10 z-20">
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

      {/* Ending Sequence Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-black z-30"
        style={{ opacity: endingBgOpacity }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-6 z-40"
        style={{
          opacity: endingOpacity,
          filter: useTransform(endingBlur, (b) => `blur(${b}px)`),
          transform: useTransform(endingScale, (s) => `scale(${s})`),
        }}
      >
        <div className="flex gap-4 sm:gap-8 font-display text-5xl sm:text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white">
          <motion.span style={{ x: splitLeftX }}>TICHXANH</motion.span>
          <motion.span style={{ x: splitRightX }} className="text-primary">
            AI
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
