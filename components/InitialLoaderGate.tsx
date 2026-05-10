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
  const [showLoader, setShowLoader] = useState(true);
  const [mounted, setMounted] = useState(false);

  const shouldShow = useMemo(() => {
    if (!mounted) return true; // Assume true on server to prevent blink
    if (prefersReducedMotion()) return false;
    return showLoader;
  }, [mounted, showLoader]);

  useEffect(() => {
    setMounted(true);
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
      handleComplete();
    }, 9000);
    return () => window.clearTimeout(t);
  }, [shouldShow]);

  const handleComplete = () => {
    try {
      document.documentElement.classList.remove("initial-loading");
    } catch {}
    setShowLoader(false);
  };

  return (
    <>
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

      {/* Render children unconditionally so they exist in DOM (SEO), but they are hidden via CSS until loader finishes */}
      {children}
    </>
  );
}
