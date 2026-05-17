import React from "react";
import { motion } from "framer-motion";
import { HackerText } from "@/shared/ui/HackerText";
import { useTranslation } from "@/shared/hooks/use-translation";
import { IMPACT_IMAGES } from "@/config/assets";

export default function ImpactGallerySection() {
  const { t } = useTranslation();

  const GALLERY_ITEMS = [
    {
      id: 1,
      title: t.impact.items[0].title,
      desc: t.impact.items[0].desc,
      img: IMPACT_IMAGES[0],
      colSpan: "md:col-span-8",
      rowSpan: "md:row-span-2",
    },
    {
      id: 2,
      title: t.impact.items[1].title,
      desc: t.impact.items[1].desc,
      img: IMPACT_IMAGES[1],
      colSpan: "md:col-span-4",
      rowSpan: "md:row-span-1",
    },
    {
      id: 3,
      title: t.impact.items[2].title,
      desc: t.impact.items[2].desc,
      img: IMPACT_IMAGES[2],
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
    {
      id: 4,
      title: t.impact.items[3].title,
      desc: t.impact.items[3].desc,
      img: IMPACT_IMAGES[3],
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
    },
  ];

  return (
    <section className="relative w-full bg-background py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            <HackerText text={t.impact.label} />
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl text-foreground">
            {t.impact.headline}{" "}
            <span className="text-accent italic">{t.impact.headlineHighlight}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.impact.subheadline}</p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 ${item.colSpan} ${item.rowSpan} min-h-[250px]`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="font-display text-xl font-bold text-white md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 max-w-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
