import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";

/** Dot colors matched to the waste category spectrum — intentionally semantic. */
const CATEGORY_COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#9ca3af"] as const;

const CATEGORY_IMAGES = [
  "https://images.unsplash.com/photo-1542601906970-34f97e610fd9?auto=format&fit=crop&q=80&w=400", // Organic
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400", // Recyclables
  "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400", // Plastic
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", // Hazardous
  "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=400", // Other
];

export default function RealitySection() {
  const { t } = useTranslation();

  return (
    <section
      id="reality"
      className="relative min-h-screen w-full bg-background py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Brutalist Stats */}
        <div className="mb-24 space-y-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-foreground md:text-[8vw]"
          >
            {t.reality.stat1}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-right"
          >
            <span className="text-[6vw] font-bold uppercase text-[oklch(0.8_0.2_145)] md:text-[4vw]">
              {t.reality.stat1Label}
            </span>
            <p className="text-xl font-medium text-muted-foreground uppercase tracking-widest">
              {t.reality.stat1Sub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-foreground text-background p-6 md:p-12"
          >
            <h3 className="text-[10vw] font-black uppercase leading-none md:text-[6vw]">
              {t.reality.stat2}
            </h3>
            <p className="text-2xl font-bold uppercase tracking-tighter md:text-4xl">
              {t.reality.stat2Label}
            </p>
          </motion.div>
        </div>

        {/* 5-Level Waste Sorting Guide */}
        <div className="mb-32">
          <h3 className="mb-12 text-2xl font-bold uppercase tracking-widest text-foreground">
            {t.reality.guideTitle}
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar md:gap-6">
            {t.reality.categories.map((cat: { name: string; label: string }, idx: number) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group hover-lift relative flex min-w-[280px] flex-col overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10 snap-center md:min-w-0 md:flex-1"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[idx]}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div
                    className="absolute bottom-0 left-0 h-1.5 w-full"
                    style={{ backgroundColor: CATEGORY_COLORS[idx] }}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold leading-tight text-foreground">{cat.name}</h4>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {cat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
