import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackEvent } from "@/core/services/analytics";

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    void trackEvent({
      name: "page_view",
      path: location.href,
    });
  }, [location.href]);

  return null;
}
