import { useTranslationContext } from "@/core/TranslationProvider";

/**
 * Convenience hook. Must be used inside `<TranslationProvider>`.
 * All consumers share the same locale state — changing language in one component
 * triggers a re-render everywhere that calls this hook.
 */
export function useTranslation() {
  return useTranslationContext();
}
