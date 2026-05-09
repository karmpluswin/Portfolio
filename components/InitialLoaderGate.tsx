"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import AppleHelloEffectLanguagesDemo from "@/components/AppleHelloEffectLanguagesDemo";

type InitialLoaderGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "portfolio:introSeen:v1";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

export default function InitialLoaderGate({
  children,
}: InitialLoaderGateProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [mounted, setMounted] = useState(false);

  const shouldShow = useMemo(() => {
    if (!mounted) return false;
    if (prefersReducedMotion()) return false;
    return showLoader;
  }, [mounted, showLoader]);

  useEffect(() => {
    setMounted(true);

    try {
      const seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
      if (!seen && !prefersReducedMotion()) setShowLoader(true);
    } catch {
      // If storage is blocked, still show once.
      if (!prefersReducedMotion()) setShowLoader(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldShow]);

  // If the loader should not show (e.g., already seen or reduced motion),
  // ensure the startup class is removed so content becomes visible.
  useEffect(() => {
    try {
      if (!shouldShow && typeof document !== "undefined") {
        document.documentElement.classList.remove("initial-loading");
      }
    } catch {}
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) return;
    // Safety net: never block the UI indefinitely.
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setShowLoader(false);
    }, 9000);
    return () => window.clearTimeout(t);
  }, [shouldShow]);

  const handleComplete = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      try {
        document.documentElement.classList.remove("initial-loading");
      } catch {}
    } catch {}
    setShowLoader(false);
  };

  return (
    <>
      {children}

      <AnimatePresence>
        {shouldShow ? (
          <motion.div
            data-initial-loader
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "var(--background)", color: "var(--text)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <AppleHelloEffectLanguagesDemo
              onSequenceComplete={() => {
                try {
                  document.documentElement.classList.remove("initial-loading");
                } catch {}
                handleComplete();
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
