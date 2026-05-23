import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "@/shared/hooks/use-translation";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils/utils";
import { X, Menu } from "lucide-react";
import { useAuthStore } from "@/core/auth/authStore";

/** A single nav link using TanStack Router's Link to avoid full-page reloads and preserve SPA behavior. */
const NavLink = ({
  href,
  label,
  hash,
  onClick,
}: {
  href?: string;
  label: string;
  hash?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  if (href) {
    return (
      <Link
        to={href}
        className="group relative inline-flex items-center text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        activeProps={{ className: "text-primary" }}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      to="/"
      hash={hash?.substring(1)}
      onClick={onClick}
      className="group relative inline-flex items-center text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      {label}
    </Link>
  );
};

export const Navbar = () => {
  const { t, locale, changeLanguage } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(18, 18, 18, 0)", "rgba(18, 18, 18, 0.95)"],
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.1)"],
  );

  /** Navigate to an anchor on the home page from anywhere. */
  const handleHashNav = (item: { hash?: string; path?: string }) => {
    if (item.path) {
      navigate({ to: item.path });
      setMobileOpen(false);
      return;
    }

    if (item.hash) {
      if (isHome) {
        const el = document.querySelector(item.hash);
        el?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", item.hash);
      } else {
        navigate({ to: "/", hash: item.hash.substring(1) });
      }
      setMobileOpen(false);
    }
  };

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", hash);
    }
  };

  const navLinks = [
    { label: t.nav.home || "Home", hash: "#hero" },
    { label: t.nav.reality, hash: "#reality" },
    { label: t.nav.features, hash: "#features" },
    { label: t.nav.downloads, path: "/download" },
  ];

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter: backdropBlur, borderBottom }}
        className="fixed top-0 left-0 right-0 z-[100] flex h-20 items-center px-6 md:px-12"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-foreground">
              TICHXANH <span className="text-primary">AI</span>
              <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-black text-background">
                PRO
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.label}
              href={item.path}
              hash={item.hash}
              label={item.label}
              onClick={(e) => {
                if (item.hash) {
                  handleHashClick(e, item.hash);
                }
              }}
            />
          ))}
        </div>

        {/* Right actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            onClick={() => changeLanguage(locale === "en" ? "vi" : "en")}
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors px-2 py-1 border border-white/10 rounded-md bg-white/5"
          >
            {locale === "en" ? "VI" : "EN"}
          </button>

          {session ? (
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-primary/20 hover:border-primary/50 text-primary bg-primary/5"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              LOGOUT
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider h-9"
                onClick={() => navigate({ to: "/login" })}
              >
                {t.auth.login}
              </Button>
              <Button
                variant="outline"
                className="border-primary/20 hover:border-primary/50 text-primary bg-primary/5 text-xs font-bold uppercase tracking-wider h-9 rounded-xl"
                onClick={() => navigate({ to: "/signup" })}
              >
                {t.auth.signup}
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid place-items-center rounded-md p-1.5 md:hidden hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-[99] border-b border-white/10 bg-[rgba(18,18,18,0.97)] px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleHashNav(item)}
                  className="group relative flex items-center w-fit text-left text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
              {session ? (
                <button
                  onClick={async () => {
                    await signOut();
                    setMobileOpen(false);
                    navigate({ to: "/" });
                  }}
                  className="mt-2 w-fit rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90 text-left"
                >
                  LOGOUT
                </button>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate({ to: "/login" });
                    }}
                    className="w-full text-left text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground py-2"
                  >
                    {t.auth.login}
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate({ to: "/signup" });
                    }}
                    className="w-full text-center rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
                  >
                    {t.auth.signup}
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
