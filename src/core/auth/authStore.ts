import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/shared/supabase";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => void;
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
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
