"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanLine, Sprout, Gift, Cpu, Recycle } from "lucide-react";
import QRDownloadBlock from "./QRDownloadBlock";
import { HackerText } from "@/shared/ui/HackerText";
import { useTranslation } from "@/shared/hooks/use-translation";
import { type Dictionary } from "@/core/services/DictionaryService";
import { TREE_IMAGES } from "@/config/assets";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Number(latest).toFixed(value % 1 !== 0 ? 1 : 0) + suffix;
      }
    });
  }, [springValue, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function BentoFeatures() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const treeRef = useRef<HTMLDivElement | null>(null);

  const localizedFeatures = [
    {
      icon: ScanLine,
      title: t.features.edge.title,
      body: t.features.edge.body,
      accent: "sage",
    },
    {
      icon: Sprout,
      title: t.features.carbon.title,
      body: t.features.carbon.body,
      accent: "sage",
    },
    {
      icon: Gift,
      title: t.features.rewards.title,
      body: t.features.rewards.body,
      accent: "terracotta",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !treeRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax Tree
      gsap.to(treeRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      // Card reveal — immediateRender:false prevents GSAP locking cards at
      // opacity:0 before ScrollTrigger fires (common pitfall with gsap.from).
      gsap.from(".bento-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden bg-background px-6 py-28 sm:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Left — floating Tree mockup */}
        <div className="relative">
          <div
            ref={treeRef}
            className="sticky top-24 mx-auto w-full max-w-[340px] perspective-1000"
          >
            <motion.div
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <TreeMock t={t} />
            </motion.div>
          </div>
        </div>

        {/* Right — copy + bento + QR */}
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            <HackerText text={t.features.label} />
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
            {t.features.headline}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-6">
            {localizedFeatures.map((f, i) => (
              <article
                key={f.title}
                className={`bento-card glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-primary/5 ${
                  i === 0 ? "sm:col-span-6" : "sm:col-span-3"
                }`}
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-transform duration-700 group-hover:scale-150"
                  style={{
                    background: f.accent === "terracotta" ? "var(--terracotta)" : "var(--sage)",
                  }}
                />
                <f.icon
                  className={`h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                    f.accent === "terracotta" ? "text-accent" : "text-primary"
                  }`}
                />
                <h3 className="font-display mt-5 text-xl font-semibold">
                  <HackerText text={f.title} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <QRDownloadBlock />
          </div>
        </div>
      </div>
    </section>
  );
}

function TreeMock({ t }: { t: Dictionary }) {
  const [level, setLevel] = useState(0);

  const TREE_IMAGE_STAGES = [
    TREE_IMAGES.seed,
    TREE_IMAGES.sprout,
    TREE_IMAGES.sapling,
    TREE_IMAGES.youngTree,
    TREE_IMAGES.matureTree,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative aspect-[9/19] w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[oklch(0.24_0.02_155)] to-[oklch(0.16_0.01_155)] p-3 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] isolation-auto"
      style={{ clipPath: "inset(0 round 2.5rem)" }}
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-3 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />

      {/* Screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black flex flex-col items-center justify-end pb-24">
        {/* Background Image Sequence */}
        <div className="absolute inset-0 z-10">
          <AnimatePresence>
            <motion.img
              key={level}
              src={TREE_IMAGE_STAGES[level]}
              alt={`Tree stage ${level}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/90" />
        </div>

        {/* Faux App Header */}
        <div className="absolute top-0 left-0 right-0 p-5 z-20 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/80">
          <span>09:41</span>
          <span>· · ·</span>
        </div>

        {/* Animated Drop Waste */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={level}
            initial={{ y: -200, opacity: 0, rotate: -20 }}
            animate={{ y: 20, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="absolute top-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(74,222,128,0.4)] z-20 border border-white/20"
          >
            <Recycle className="h-8 w-8 text-primary brightness-150 drop-shadow-md" />
          </motion.div>
        </AnimatePresence>

        {/* Stats Overlay */}
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 z-20">
          <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl transition-colors hover:bg-black/70">
            <p className="text-[10px] uppercase tracking-widest text-white/70">
              {t.treeMock.recycled}
            </p>
            <p className="font-display mt-1 text-2xl text-white">
              <AnimatedCounter value={level * 120} /> g
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl transition-colors hover:bg-black/70">
            <p className="text-[10px] uppercase tracking-widest text-white/70">
              {t.treeMock.treeLvl}
            </p>
            <p className="font-display mt-1 text-2xl text-primary drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
              {level + 1} / 5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
