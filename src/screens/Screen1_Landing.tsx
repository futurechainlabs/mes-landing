import { motion } from "framer-motion";
import TypingEngine from "../engine/TypingEngine";
import type { StepId } from "../engine/useSequenceController";
import { useConfig } from "../config/ConfigContext";

interface Props {
  step: StepId;
  progress: number;
}

export default function Screen1_Landing({ step, progress }: Props) {
  const { content } = useConfig();

  const isTyping = step === "typing1";
  const isClick = step === "click1";
  const isTransition = step === "transition1";

  const isVisible =
    step === "landing" ||
    step === "typing1" ||
    step === "click1" ||
    step === "transition1";

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTransition ? 0 : 1,
        y: isTransition ? -60 : 0,
        scale: isTransition ? 0.95 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
    >
      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl z-10 space-y-8 text-center">
        {/* Heading */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
            {content.landing.badge}
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-on-background leading-tight">
            {content.landing.headingLine1} <br />
            <span className="text-primary">{content.landing.headingHighlight}</span>
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          className="relative group mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary-container/10 rounded-2xl blur opacity-25" />
          <div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-sm transition-all duration-300">
            <div className="pl-6 text-outline">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <div className="flex-1 px-6 py-6">
              <span className="text-xl font-medium text-on-surface-variant">
                {isTyping || isClick ? (
                  <TypingEngine
                    text={content.queries.q1}
                    progress={isClick ? 1 : progress}
                    active
                  />
                ) : (
                  <span className="text-outline-variant/60">
                    {content.landing.searchPlaceholder}
                  </span>
                )}
              </span>
            </div>
            <div className="pr-4">
              <motion.button
                className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                animate={{
                  scale: isClick && progress > 0.3 && progress < 0.7 ? 0.93 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span>{content.landing.analyzeButton}</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest py-1">
            {content.landing.quickActionsLabel}
          </span>
          {content.landing.quickActions.map((a) => (
            <span
              key={a}
              className="px-4 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium"
            >
              {a}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Grid label */}
      <div className="fixed bottom-10 right-10 flex flex-col items-end opacity-20 select-none pointer-events-none">
        {content.landing.gridLabels.map((label, i) => (
          <span key={i} className="font-mono text-[10px]">{label}</span>
        ))}
      </div>
    </motion.div>
  );
}
