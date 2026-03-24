import { motion } from "framer-motion";
import TypingEngine from "../engine/TypingEngine";
import type { StepId } from "../engine/useSequenceController";
import { useConfig } from "../config/ConfigContext";

interface Props {
  step: StepId;
  progress: number;
}

export default function BottomBar({ step, progress }: Props) {
  const { content } = useConfig();

  const isTyping2 = step === "typing2";
  const isTyping3 = step === "typing3";
  const isTyping4 = step === "typing4";
  const isClick2 = step === "click2";
  const isClick3 = step === "click3";
  const isClick4 = step === "click4";

  const activeQuery = isTyping2 || isClick2
    ? content.queries.q2
    : isTyping3 || isClick3
      ? content.queries.q3
      : isTyping4 || isClick4
        ? content.queries.q4
        : "";

  const typingProgress = isClick2 || isClick3 || isClick4 ? 1 : progress;
  const isActive = isTyping2 || isTyping3 || isTyping4 || isClick2 || isClick3 || isClick4;

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-[58]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 22, delay: 0.2 }}
    >
      <div className="glass-header rounded-2xl shadow-xl shadow-slate-900/5 p-2 flex items-center border border-white">
        <div className="flex-1 flex items-center px-4">
          <span className="material-symbols-outlined text-primary mr-3">search</span>
          <div className="w-full py-3 text-sm">
            {isActive ? (
              <span className="text-on-surface">
                <TypingEngine text={activeQuery} progress={typingProgress} active />
              </span>
            ) : (
              <span className="text-slate-400">
                {content.bottomBar.placeholder}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 pr-2">
          <span className="material-symbols-outlined text-slate-400 p-2">attachment</span>
          <motion.button
            className="premium-gradient p-2.5 rounded-xl text-white shadow-lg shadow-primary/20"
            animate={{
              scale:
                (isClick2 && progress > 0.2 && progress < 0.6) ||
                (isClick3 && progress > 0.2 && progress < 0.6) ||
                (isClick4 && progress > 0.2 && progress < 0.6)
                  ? 0.9
                  : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <span className="material-symbols-outlined">send</span>
          </motion.button>
        </div>
      </div>
      <p className="text-center text-[10px] text-on-surface-variant mt-2 font-medium tracking-tight">
        {content.bottomBar.footerText}
      </p>
    </motion.div>
  );
}
