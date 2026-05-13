import { createFileRoute } from "@tanstack/react-router";
import { Download, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/shared/ui/Navbar";
import SiteFooter from "@/features/landing/SiteFooter";

export const Route = createFileRoute("/download")({
  component: DownloadPage,
});

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function DownloadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary">
            <Download className="h-10 w-10" />
          </div>
          <h1 className="group font-display text-5xl font-bold tracking-tight sm:text-7xl cursor-default">
            Choose your{" "}
            <span className="text-primary italic transition-all duration-500 group-hover:font-mono group-hover:tracking-widest">
              platform
            </span>
            .
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Experience the future of waste management on your mobile device.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-8 py-5 text-lg font-bold text-background transition-transform hover:scale-105 sm:w-auto"
            >
              <Play className="h-6 w-6" />
              Google Play
            </a>
            <a
              href="https://github.com/Loid-Trix-AI/tichxanh-ai/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-foreground/20 px-8 py-5 text-lg font-bold text-foreground transition-transform hover:scale-105 hover:bg-foreground/5 sm:w-auto"
            >
              <GithubIcon className="h-6 w-6" />
              Download Mirror
            </a>
          </div>

          <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Beta Access
            </p>
            <h2 className="mt-4 text-2xl font-bold">Early Access Program</h2>
            <p className="mt-2 text-muted-foreground">
              Interested in testing our upcoming features? Join our TestFlight or Android Beta
              program.
            </p>
            <button className="mt-6 text-sm font-bold uppercase tracking-widest text-foreground underline decoration-primary underline-offset-8 transition-colors hover:text-primary">
              Apply for Beta
            </button>
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
