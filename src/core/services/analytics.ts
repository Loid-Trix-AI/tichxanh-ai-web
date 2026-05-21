import { supabase } from "@/shared/supabase";

export type AnalyticsEventName =
  | "page_view"
  | "auth_google_start"
  | "auth_google_error"
  | "auth_signout"
  | "language_change"
  | "download_cta_click";

interface TrackEventOptions {
  name: AnalyticsEventName;
  path?: string;
  metadata?: Record<string, unknown>;
}

function getBrowserContext() {
  if (typeof window === "undefined") {
    return {
      path: "/",
      referrer: null,
      userAgent: null,
      viewport: null,
    };
  }

  return {
    path: window.location.pathname + window.location.search + window.location.hash,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };
}

/**
 * Best-effort product analytics backed by Supabase.
 * Never blocks UI: failures are logged in dev and ignored in production UX.
 */
export async function trackEvent({ name, path, metadata = {} }: TrackEventOptions) {
  const context = getBrowserContext();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("web_analytics_events").insert({
      user_id: user?.id ?? null,
      event_name: name,
      path: path ?? context.path,
      metadata: {
        ...metadata,
        referrer: context.referrer,
        userAgent: context.userAgent,
        viewport: context.viewport,
      },
    });

    if (error && import.meta.env.DEV) {
      console.warn("Failed to track analytics event", error.message);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Failed to track analytics event", error);
    }
  }
}
