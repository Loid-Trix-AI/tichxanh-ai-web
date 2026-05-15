"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/shared/hooks/use-translation";

export default function FounderSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      // Background color shift charcoal -> beige
      gsap.fromTo(
        el,
        { backgroundColor: "oklch(0.18 0 0)", color: "oklch(0.96 0.01 90)" },
        {
          backgroundColor: "oklch(0.95 0.01 80)",
          color: "oklch(0.18 0.01 155)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
        },
      );

      // Subtle float
      gsap.to(".founder-float", {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.from(".founder-quote span", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 60%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-32 sm:px-10 lg:py-48"
      style={{
        backgroundColor: "oklch(0.18 0 0)",
        color: "oklch(0.96 0.01 90)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="founder-float relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-current/5" />
          <img
            src="/images/founder.jpg"
            alt={`Portrait of ${t.founder.name}, TichXanh AI founder`}
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-[3/4] w-full rounded-2xl object-cover grayscale"
          />
          <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] opacity-70">
            <span>
              {t.founder.name} — {t.founder.title}
            </span>
            <span>{t.founder.location}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.4em] opacity-60">{t.founder.sectionLabel}</p>
          <blockquote className="founder-quote font-display mt-6 flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] text-3xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl cursor-default">
            {t.founder.quote.split(" ").map((w: string, i: number) => (
              <motion.span
                key={i}
                className="transition-colors duration-300 hover:text-primary"
                whileHover={{ scale: 1.05 }}
              >
                {w}
              </motion.span>
            ))}
          </blockquote>
          <div className="mt-10 flex items-center gap-4 text-sm opacity-70">
            <div className="h-px w-10 bg-current opacity-40" />
            <span>{t.founder.tagline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
