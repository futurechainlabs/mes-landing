import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";

export default function FloatingCTA() {
  const { content } = useConfig();
  const c = content.floatingCta;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[59] flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <a href="#contact" className="px-4 py-2 rounded-full bg-white text-on-surface-variant text-sm font-semibold shadow-lg shadow-slate-900/5 border border-slate-100 hover:bg-slate-50 transition-all">
        <span className="material-symbols-outlined text-base mr-1 align-middle">{c.callIcon}</span>
        {c.callText}
      </a>
      <a href="#contact" className="px-4 py-2 rounded-full premium-gradient text-white text-sm font-bold shadow-lg shadow-primary/25 transition-all">
        <span className="material-symbols-outlined text-base mr-1 align-middle">{c.demoIcon}</span>
        {c.demoText}
      </a>
    </motion.div>
  );
}
