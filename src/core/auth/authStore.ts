import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/shared/supabase";
import { trackEvent } from "@/core/services/analytics";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  setSession: (session) => set({ session, user: session?.user ?? null, isLoading: false }),
  initialize: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session, user: session?.user ?? null, isLoading: false });
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null, isLoading: false });
    });
  },
  signInWithGoogle: async () => {
    void trackEvent({ name: "auth_google_start" });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      void trackEvent({ name: "auth_google_error", metadata: { message: error.message } });
      throw error;
    }
  },
  signOut: async () => {
    void trackEvent({ name: "auth_signout" });
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
