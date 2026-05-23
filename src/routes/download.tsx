import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Play, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/shared/ui/Navbar";
import SiteFooter from "@/features/landing/SiteFooter";
import { useTranslation } from "@/shared/hooks/use-translation";
import { trackEvent } from "@/core/services/analytics";
import { useAuthStore } from "@/core/auth/authStore";
import { Button } from "@/shared/ui/button";

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
  const { t } = useTranslation();
  const session = useAuthStore((state) => state.session);
  const navigate = useNavigate();

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
            {t.downloadPage.titlePrefix}{" "}
            <span className="text-primary italic transition-all duration-500 group-hover:font-mono group-hover:tracking-widest">
              {t.downloadPage.titleHighlight}
            </span>
            .
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">{t.downloadPage.body}</p>

          {!session ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                <ShieldAlert className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Authentication Required
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                To protect our release artifacts and ensure secure synchronization with the points
                ledger, you must be signed in to download the TichXanh AI application.
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => navigate({ to: "/login" })}
                  className="rounded-2xl bg-primary px-8 h-12 text-sm font-black uppercase tracking-widest text-background shadow-lg shadow-primary/20 hover:opacity-90 transition-transform duration-200 hover:scale-105"
                >
                  Log In to Unlock <ArrowRight className="ml-2 h-4 w-4 inline" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-8 py-5 text-lg font-bold text-background transition-transform hover:scale-105 sm:w-auto"
                  onClick={() =>
                    void trackEvent({
                      name: "download_cta_click",
                      metadata: { target: "google_play" },
                    })
                  }
                >
                  <Play className="h-6 w-6" />
                  {t.downloadPage.googlePlay}
                </a>
                <a
                  href="https://github.com/Loid-Trix-AI/tichxanh-ai/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-foreground/20 px-8 py-5 text-lg font-bold text-foreground transition-transform hover:scale-105 hover:bg-foreground/5 sm:w-auto"
                  onClick={() =>
                    void trackEvent({
                      name: "download_cta_click",
                      metadata: { target: "github_release" },
                    })
                  }
                >
                  <GithubIcon className="h-6 w-6" />
                  {t.downloadPage.mirror}
                </a>
              </div>

              <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">
                  {t.downloadPage.betaLabel}
                </p>
                <h2 className="mt-4 text-2xl font-bold">{t.downloadPage.betaTitle}</h2>
                <p className="mt-2 text-muted-foreground">{t.downloadPage.betaBody}</p>
                <button
                  onClick={() =>
                    void trackEvent({
                      name: "download_cta_click",
                      metadata: { target: "beta_apply" },
                    })
                  }
                  className="mt-6 text-sm font-bold uppercase tracking-widest text-foreground underline decoration-primary underline-offset-8 transition-colors hover:text-primary"
                >
                  {t.downloadPage.betaButton}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
