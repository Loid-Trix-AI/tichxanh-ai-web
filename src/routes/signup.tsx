import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";

export const Route = createFileRoute("/signup")({
  component: SignupComponent,
});

function SignupComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Sign Up</h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            Join the green revolution
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full">Create Account</Button>
          <div className="text-center">
            <Link
              to="/login"
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
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
