import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTranslation } from "@/shared/hooks/use-translation";
import {
  Apple,
  Recycle,
  Package,
  Skull,
  Trash2,
  X,
  BotMessageSquare,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

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
        ref.current.textContent =
          Number(latest)
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function RealitySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedCatIdx, setSelectedCatIdx] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Handle category click and typing simulation
  const handleCategoryClick = (idx: number) => {
    setSelectedCatIdx(idx);
    setIsTyping(true);
    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const closeModal = () => {
    setSelectedCatIdx(null);
    setIsTyping(false);
  };

  // Body scroll lock
  useEffect(() => {
    if (selectedCatIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCatIdx]);

  return (
    <section
      id="reality"
      ref={sectionRef}
      className="relative z-20 min-h-screen w-full bg-background py-24 overflow-hidden rounded-t-[3rem] border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
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
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.4 },
              },
            }}
            className="mt-20 border-t border-foreground/10 pt-16"
          >
            <h3 className="mb-12 text-xl font-bold uppercase tracking-widest text-foreground">
              {t.reality.co2Title}
            </h3>
            <div className="space-y-12">
              {[
                { label: t.reality.countries.vn, total: 20, recycled: 10, landfill: 90 },
                { label: t.reality.countries.eu, total: 230, recycled: 48, landfill: 52 },
                { label: t.reality.countries.usa, total: 290, recycled: 32, landfill: 68 },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="relative"
                >
                  <div className="mb-3 flex flex-col md:flex-row md:items-end justify-between">
                    <div>
                      <span className="text-xl font-bold uppercase tracking-wider text-foreground">
                        {item.label}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1 font-display">
                        <span className="text-primary font-bold inline-block min-w-[3ch] text-right tabular-nums">
                          <AnimatedCounter value={item.total} />
                        </span>{" "}
                        {t.reality.stat1Sub}
                      </p>
                    </div>
                    <div className="flex gap-4 text-xs font-semibold uppercase mt-3 md:mt-0 tracking-widest">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />{" "}
                        {t.reality.wasteStats.recycled}: {item.recycled}%
                      </span>
                      <span className="text-red-400 flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(248,113,113,0.5)]" />{" "}
                        {t.reality.wasteStats.landfill}: {item.landfill}%
                      </span>
                    </div>
                  </div>
                  {/* Segmented Progress Bar */}
                  <div className="h-6 w-full flex overflow-hidden rounded-full bg-foreground/5 relative border border-white/5">
                    <motion.div
                      variants={{
                        hidden: { scaleX: 0 },
                        show: { scaleX: 1 },
                      }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative flex items-center justify-center overflow-hidden origin-left will-change-transform"
                      style={{ width: `${item.recycled}%` }}
                    />
                    <motion.div
                      variants={{
                        hidden: { scaleX: 0 },
                        show: { scaleX: 1 },
                      }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-red-500/80 to-red-600/80 relative overflow-hidden origin-left border-l border-white/10 will-change-transform"
                      style={{ width: `${item.landfill}%` }}
                    />
                  </div>
                </motion.div>
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
            {t.reality.categories.map(
              (
                cat: {
                  name: string;
                  label: string;
                  desc: string;
                  guide: string;
                  examples: string;
                  impact: string;
                },
                idx: number,
              ) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => handleCategoryClick(idx)}
                  className="group hover-lift relative flex min-w-[280px] flex-col overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl transition-all hover:bg-white/10 snap-center md:min-w-0 md:flex-1 cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${WASTE_CATEGORIES_CONFIG[idx].color} opacity-20 transition-opacity duration-500 group-hover:opacity-40`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {React.createElement(WASTE_CATEGORIES_CONFIG[idx].icon, {
                        className:
                          "h-20 w-20 text-foreground transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12",
                        strokeWidth: 1.5,
                      })}
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r ${WASTE_CATEGORIES_CONFIG[idx].color}`}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold leading-tight text-foreground">{cat.name}</h4>
                    <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {cat.label}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* AI Chatbot Popup Modal (Rendered in Portal to avoid clipping) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedCatIdx !== null && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 isolate">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#151515] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col md:flex-row z-10 max-h-[90vh]"
                >
                  {/* Left Side: Visual / Image Slideshow */}
                  <div
                    className={`relative flex items-center justify-center bg-gradient-to-br ${WASTE_CATEGORIES_CONFIG[selectedCatIdx].color} w-full md:w-2/5 min-h-[250px] md:min-h-auto overflow-hidden`}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.img
                        key={slideIdx}
                        src={WASTE_CATEGORIES_CONFIG[selectedCatIdx].images[slideIdx]}
                        alt={t.reality.categories[selectedCatIdx].name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/40" />
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      {React.createElement(WASTE_CATEGORIES_CONFIG[selectedCatIdx].icon, {
                        className: "h-28 w-28 text-white drop-shadow-2xl",
                        strokeWidth: 1.5,
                      })}
                    </motion.div>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                      {WASTE_CATEGORIES_CONFIG[selectedCatIdx].images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === slideIdx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Chatbot UI */}
                  <div className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto bg-gradient-to-b from-[#111] to-[#151515]">
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2.5 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full bg-black/20 backdrop-blur-md z-20 border border-white/5"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <BotMessageSquare className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg tracking-tight">
                          Loid AI Assistant
                        </h3>
                        <p className="text-xs text-primary/80 font-mono">
                          Status: Active · Processing
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 flex-1">
                      {/* User Message Simulation */}
                      <div className="flex justify-end">
                        <div className="bg-white/5 border border-white/10 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm md:text-[15px] shadow-md">
                          Phân loại:{" "}
                          <span className="font-bold text-primary">
                            {t.reality.categories[selectedCatIdx].name}
                          </span>
                          ?
                        </div>
                      </div>

                      {/* AI Response Simulation */}
                      <div className="flex justify-start">
                        <div className="bg-primary/5 border border-primary/20 text-white px-5 py-5 rounded-2xl rounded-tl-sm max-w-[95%] text-sm md:text-[15px] shadow-lg">
                          {isTyping ? (
                            <div className="flex items-center gap-1.5 h-6 px-2">
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                              />
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                              />
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                              />
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="space-y-5 leading-relaxed"
                            >
                              <p className="text-white/90 font-medium">
                                {t.reality.categories[selectedCatIdx].desc}
                              </p>

                              <div className="bg-black/40 rounded-xl p-5 border border-white/5 space-y-4">
                                <div>
                                  <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2 font-bold flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Guide
                                  </p>
                                  <p className="text-white/80 text-sm">
                                    {t.reality.categories[selectedCatIdx].guide}
                                  </p>
                                </div>

                                <div className="h-px w-full bg-white/10" />

                                <div>
                                  <p className="text-xs uppercase tracking-widest text-amber-400 mb-2 font-bold flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4" /> Examples
                                  </p>
                                  <p className="text-white/80 text-sm italic">
                                    "{t.reality.categories[selectedCatIdx].examples}"
                                  </p>
                                </div>

                                <div className="h-px w-full bg-white/10" />

                                <div>
                                  <p className="text-xs uppercase tracking-widest text-blue-400 mb-2 font-bold flex items-center gap-2">
                                    <Recycle className="w-4 h-4" /> Impact
                                  </p>
                                  <p className="text-white/80 text-sm">
                                    {t.reality.categories[selectedCatIdx].impact}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
