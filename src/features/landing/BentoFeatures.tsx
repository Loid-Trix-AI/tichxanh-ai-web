"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScanLine, Sprout, Gift, Cpu } from "lucide-react";
import QRDownloadBlock from "./QRDownloadBlock";
import { HackerText } from "@/shared/ui/HackerText";
import { useTranslation } from "@/shared/hooks/use-translation";

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
  const phoneRef = useRef<HTMLDivElement | null>(null);

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
    if (!sectionRef.current || !phoneRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax phone
      gsap.to(phoneRef.current, {
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
        {/* Left — floating phone mockup */}
        <div className="relative">
          <div
            ref={phoneRef}
            className="sticky top-24 mx-auto w-full max-w-[340px] perspective-1000"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <PhoneMock />
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

function PhoneMock() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400", // Plastic bottles
    "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400", // Litter
    "https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&q=80&w=400", // Cans
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[9/19] w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[oklch(0.24_0.02_155)] to-[oklch(0.16_0.01_155)] p-3 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] isolation-auto" style={{ clipPath: "inset(0 round 2.5rem)" }}>
      <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[oklch(0.13_0.01_155)]">
        {/* Background Image Switcher */}
        <AnimatePresence mode="wait">
          <motion.div
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={images[imageIndex]}
              alt="Waste detection background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.01_155)] via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Faux app UI */}
        <div className="absolute inset-0 z-10 grid grid-rows-[auto_1fr_auto] p-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
            <span>09:41</span>
            <span>· · ·</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative grid h-32 w-32 place-items-center rounded-full">
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--primary), var(--accent), var(--primary))",
                  padding: "2px",
                }}
              />
              <div className="grid h-28 w-28 place-items-center rounded-full bg-[oklch(0.13_0.01_155)] relative z-10">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Detected</p>
              <p className="font-display mt-1 text-lg font-semibold">
                {imageIndex === 0
                  ? "PET · Plastic #1"
                  : imageIndex === 1
                    ? "Mixed Litter"
                    : "Aluminum Can"}
              </p>
              <p className="text-[11px] text-white/50">
                +{imageIndex === 0 ? "12" : imageIndex === 1 ? "5" : "8"} g CO₂ saved
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-white/60">
            <div className="rounded-xl border border-white/10 p-2 text-center bg-black/20 backdrop-blur-md">
              <div className="font-display text-base text-foreground">
                <AnimatedCounter value={128} />
              </div>
              Scans
            </div>
            <div className="rounded-xl border border-white/10 p-2 text-center bg-black/20 backdrop-blur-md">
              <div className="font-display text-base text-foreground">
                <AnimatedCounter value={3.2} suffix="kg" />
              </div>
              CO₂
            </div>
            <div className="rounded-xl border border-white/10 p-2 text-center bg-black/20 backdrop-blur-md">
              <div className="font-display text-base text-accent">
                <AnimatedCounter value={7} />
              </div>
              Trees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
