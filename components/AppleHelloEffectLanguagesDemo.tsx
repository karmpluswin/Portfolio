"use client";

import { motion } from "motion/react";

import { AppleHelloEffectEnglish } from "@/components/apple-hello-effect/apple-hello-effect-english";

export type AppleHelloEffectLanguagesDemoProps = {
  onSequenceComplete?: () => void;
};

export default function AppleHelloEffectLanguagesDemo({
  onSequenceComplete,
}: AppleHelloEffectLanguagesDemoProps) {
  const svgClassName = "h-[180px] w-[min(1009px,92vw)]";

  return (
    <div className="flex w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22 }}
        className="text-[var(--text)]"
      >
        <AppleHelloEffectEnglish
          className={svgClassName}
          onAnimationComplete={onSequenceComplete}
        />
      </motion.div>
    </div>
  );
}
