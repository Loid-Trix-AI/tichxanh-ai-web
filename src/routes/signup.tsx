import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useState, useEffect } from "react";
import { supabase } from "@/shared/supabase";
import { useAuthStore } from "@/core/auth/authStore";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupComponent,
});

function SignupComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);

  // If already logged in, redirect to home
  useEffect(() => {
    if (session) {
      navigate({ to: "/", replace: true });
    }
  }, [session, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        navigate({ to: "/", replace: true });
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Sign Up</h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            Join the green revolution
          </p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="text-center">
            <Link
              to="/login"
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
