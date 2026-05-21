import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/shared/supabase";
import { useAuthStore } from "@/core/auth/authStore";
import { useTranslation } from "@/shared/hooks/use-translation";
import { toast } from "sonner";

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
  const { t } = useTranslation();

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
        toast.success("Successfully logged in!");
        navigate({ to: "/", replace: true });
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">{t.auth.login}</h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            {t.auth.welcomeBack}
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t.auth.signingIn : t.auth.login}
          </Button>
          <div className="text-center">
            <Link
              to="/signup"
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              {t.auth.noAccount}
            </Link>
          </div>
        </form>
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full border-primary/20 text-primary bg-primary/5 hover:border-primary/50"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              await signInWithGoogle();
            } catch (error) {
              const err = error as Error;
              toast.error(err.message || "Google login failed.");
              setIsLoading(false);
            }
          }}
        >
          {t.auth.google}
        </Button>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.auth.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
