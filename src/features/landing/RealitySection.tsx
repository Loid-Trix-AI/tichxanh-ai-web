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
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="reality"
      ref={sectionRef}
      className="relative z-20 min-h-screen w-full bg-background py-24 overflow-hidden rounded-t-[3rem] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
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

          {/* Annual Waste Distribution Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 border-t border-foreground/10 pt-16"
          >
            <h3 className="mb-12 text-xl font-bold uppercase tracking-widest text-foreground">
              {t.reality.co2Title}
            </h3>
            <div className="space-y-12">
              {[
                { label: t.reality.countries.vn, total: 20, recycled: 10, landfill: 90 },
                { label: t.reality.countries.eu, total: 230, recycled: 48, landfill: 52 },
                { label: t.reality.countries.usa, total: 290, recycled: 32, landfill: 68 }
              ].map((item, idx) => (
                <div key={item.label} className="relative">
                  <div className="mb-3 flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                      <span className="text-xl font-bold uppercase tracking-wider text-foreground">{item.label}</span>
                      <p className="text-sm text-muted-foreground mt-1 font-display">
                        <span className="text-primary font-bold"><AnimatedCounter value={item.total} /></span> {t.reality.stat1Sub}
                      </p>
                    </div>
                    <div className="flex gap-4 text-xs font-semibold uppercase mt-3 md:mt-0 tracking-widest">
                      <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"/> {t.reality.wasteStats.recycled}: {item.recycled}%</span>
                      <span className="text-red-400 flex items-center gap-1.5"><div className="w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.5)]"/> {t.reality.wasteStats.landfill}: {item.landfill}%</span>
                    </div>
                  </div>
                  {/* Segmented Progress Bar */}
                  <div className="h-6 w-full flex overflow-hidden rounded-full bg-foreground/5 relative shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.recycled}%` }}
                      transition={{ duration: 1.5, delay: 0.2 + idx * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative flex items-center justify-center overflow-hidden"
                    >
                       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50 mix-blend-overlay" />
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.landfill}%` }}
                      transition={{ duration: 1.5, delay: 0.2 + idx * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-500/80 to-red-600/80 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 5-Level Waste Sorting Guide */}
        <div className="mb-32 w-full overflow-hidden">
          <h3 className="mb-12 text-2xl font-bold uppercase tracking-widest text-foreground">
            {t.reality.guideTitle}
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6">
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
