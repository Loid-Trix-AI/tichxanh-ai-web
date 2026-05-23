import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/shared/supabase";
import { useAuthStore } from "@/core/auth/authStore";
import { useTranslation } from "@/shared/hooks/use-translation";
import { toast } from "sonner";
import { Leaf, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const { t, locale, changeLanguage } = useTranslation();

  // If already logged in, redirect to home
  useEffect(() => {
    if (session) {
      navigate({ to: "/", replace: true });
    }
  }, [session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(t.auth.loginSuccess);
        navigate({ to: "/", replace: true });
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || t.auth.loginError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03130d] text-white">
      {/* Floating Language Switcher */}
      <div className="absolute right-6 top-6 z-50">
        <button
          onClick={() => changeLanguage(locale === "en" ? "vi" : "en")}
          className="text-[10px] font-bold uppercase tracking-widest text-emerald-100/60 hover:text-primary transition-colors px-3 py-1.5 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md"
        >
          {locale === "en" ? "VI" : "EN"}
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,197,94,0.28),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,rgba(5,46,22,0.95),rgba(2,6,23,0.98))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/80 to-transparent" />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="hidden lg:block">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-emerald-100 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl transition hover:border-emerald-300/50 hover:bg-white/10"
          >
            <Leaf className="h-4 w-4 text-primary" />
            TichXanh AI
          </Link>

          <div className="mt-10 max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-emerald-200 ring-1 ring-emerald-300/20">
              <Sparkles className="h-3.5 w-3.5" />
              {t.auth.sidebarDashboard}
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tighter text-white xl:text-7xl">
              {t.auth.loginSidebarTitle}
            </h1>
            <p className="max-w-lg text-base leading-7 text-emerald-50/70">
              {t.auth.loginSidebarSubtitle}
            </p>

            <div className="grid max-w-lg grid-cols-2 gap-3 pt-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black text-primary">0đ</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-100/60">
                  {t.auth.pointsCardLabel}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-3xl font-black text-cyan-200">2x</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-emerald-100/60">
                  {t.auth.syncCardLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="rounded-[1.6rem] border border-white/10 bg-[#061b13]/80 p-6 sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-black shadow-lg shadow-primary/20">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                    {t.auth.login}
                  </h1>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-emerald-100/55">
                    {t.auth.welcomeBack}
                  </p>
                </div>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-100">
                  {t.auth.secureBadge}
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100/70"
                  >
                    {t.auth.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-2xl border-white/10 bg-black/30 text-white placeholder:text-emerald-100/30 focus-visible:ring-primary/70"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100/70"
                  >
                    {t.auth.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 rounded-2xl border-white/10 bg-black/30 text-white placeholder:text-emerald-100/30 focus-visible:ring-primary/70"
                  />
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-primary text-sm font-black uppercase tracking-[0.18em] text-black shadow-lg shadow-primary/20 hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? t.auth.signingIn : t.auth.login}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/45">
                  {t.auth.or}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-2xl border-emerald-300/20 bg-emerald-300/5 text-sm font-black uppercase tracking-[0.14em] text-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-300/10"
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    await signInWithGoogle();
                  } catch (error) {
                    const err = error as Error;
                    toast.error(err.message || t.auth.googleError);
                    setIsLoading(false);
                  }
                }}
              >
                {t.auth.google}
              </Button>

              <div className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-xs leading-5 text-emerald-50/65">{t.auth.antiCheatText}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-between">
                <Link
                  to="/signup"
                  className="text-xs font-black uppercase tracking-[0.18em] text-primary transition hover:text-emerald-200"
                >
                  {t.auth.noAccount}
                </Link>
                <Link
                  to="/"
                  className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-100/45 transition hover:text-white"
                >
                  {t.auth.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
