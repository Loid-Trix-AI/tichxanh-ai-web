import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";
import { Apple, Recycle, Package, Skull, Trash2 } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Number(latest).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const CATEGORY_COLORS = [
  "from-emerald-500 to-green-400",
  "from-blue-500 to-cyan-400",
  "from-amber-500 to-yellow-400",
  "from-red-500 to-orange-400",
  "from-slate-500 to-gray-400"
];

const CATEGORY_ICONS = [Apple, Recycle, Package, Skull, Trash2];

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

          {/* Daily CO2 Emissions Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 border-t border-foreground/10 pt-16"
          >
            <h3 className="mb-10 text-xl font-bold uppercase tracking-widest text-foreground">
              Daily CO₂ Emissions from Waste (Tons)
            </h3>
            <div className="space-y-8">
              {[
                { label: "Vietnam", value: 60000, max: 800000, color: "bg-emerald-500" },
                { label: "European Union", value: 700000, max: 800000, color: "bg-blue-500" },
                { label: "United States", value: 800000, max: 800000, color: "bg-red-500" }
              ].map((item, idx) => (
                <div key={item.label} className="relative">
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold uppercase tracking-wider">
                    <span>{item.label}</span>
                    <span className="font-display text-lg text-primary"><AnimatedCounter value={item.value} /> Tons</span>
                  </div>
                  <div className="h-4 w-full overflow-hidden rounded-full bg-foreground/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 1.5, delay: 0.2 + idx * 0.2, ease: "easeOut" }}
                      className={`h-full ${item.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_COLORS[idx]} opacity-20 transition-opacity duration-500 group-hover:opacity-40`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {React.createElement(CATEGORY_ICONS[idx], {
                      className: "h-20 w-20 text-foreground transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12",
                      strokeWidth: 1.5
                    })}
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${CATEGORY_COLORS[idx]}`} />
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
