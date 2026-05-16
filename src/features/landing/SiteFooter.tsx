"use client";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";

const Social = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d={d} />
  </svg>
);
const GH =
  "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z";
const TW =
  "M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.02-9.16L1 2h7.02l4.85 6.41L18.244 2zm-2.4 18h1.9L7.27 4H5.27l10.575 16z";
const LI =
  "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.83v2.18h.05c.53-1 1.84-2.18 3.78-2.18 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.1c0-1.69-.03-3.86-2.35-3.86-2.36 0-2.72 1.84-2.72 3.74V24h-4V8z";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-foreground/10 bg-background px-6 py-14 sm:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="font-display text-2xl font-bold tracking-tight">
            {siteConfig.shortName}
            <span className="text-primary">.</span>AI
          </div>
          <p className="mt-2 max-w-sm text-sm text-foreground/60">{siteConfig.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover-lift grid h-10 w-10 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground/5"
          >
            <Social d={GH} />
          </a>
          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="hover-lift grid h-10 w-10 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground/5"
          >
            <Social d={TW} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover-lift grid h-10 w-10 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground/5"
          >
            <Social d={LI} />
          </a>
          <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary">
            <Cpu className="h-3.5 w-3.5" /> Built with {siteConfig.poweredBy}
          </span>
        </div>
      </motion.div>

      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between text-xs text-foreground/40">
        <span>
          © {siteConfig.year} {siteConfig.name}
        </span>
        <span>
          <a href={siteConfig.links.privacy} className="hover:text-foreground transition-colors">
            Privacy
          </a>
          {" · "}
          <a href={siteConfig.links.terms} className="hover:text-foreground transition-colors">
            Terms
          </a>
        </span>
      </div>
    </footer>
  );
}
