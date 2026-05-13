import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            Welcome back to TichXanh AI
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full">Sign In</Button>
          <div className="text-center">
            <Link
              to="/signup"
              className="text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Don't have an account? Sign up
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
