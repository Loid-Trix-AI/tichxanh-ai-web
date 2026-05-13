"use client";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/shared/hooks/use-translation";

export default function QRDownloadBlock() {
  const { t } = useTranslation();

  return (
    <div
      id="downloads"
      className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
    >
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <Download className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {t.downloads.ready}
            </span>
          </div>
          <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
            {t.downloads.headline}
            <br />
            <span className="text-2xl opacity-80">{t.downloads.subheadline}</span>
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-foreground/60">{t.downloads.body}</p>
          <div className="mt-4">
            <Link to="/download">
              <button className="group flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-bold text-background transition-all hover:scale-105 hover:bg-primary/90">
                {t.downloads.button}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-40 shrink-0 rounded-3xl border border-white/20 bg-white p-3 shadow-2xl md:w-48">
          <div className="h-full w-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://tichxanh.ai/download')] bg-cover opacity-90 grayscale contrast-125" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-xl bg-background p-1.5 shadow-xl">
              <div className="h-full w-full bg-primary rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
