import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";

const defaultModuleIcons = ["factory", "inventory_2", "verified", "engineering", "warehouse", "analytics"];
const moduleHrefs = ["/uretim", "/envanter", "/kalite", "/bakim", "/depo", "/analitik"];

interface Props {
  entering: boolean;
}

export default function Screen5_Modules({ entering }: Props) {
  const { content } = useConfig();
  const c = content.modules;

  return (
    <motion.div
      className="absolute inset-0 pl-20 pt-16 overflow-auto"
      initial={entering ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ zIndex: 50 }}
    >
      {/* Module grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-8">
        <motion.div
          className="text-center mb-10"
          initial={entering ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3">
            {c.heading}
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            {c.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.cards.map((mod, i) => (
            <motion.a
              key={i}
              href={moduleHrefs[i]}
              className="group bg-surface-container-lowest p-7 rounded-xl shadow-[0px_12px_32px_rgba(25,28,29,0.04)] border-b-4 border-transparent transition-all cursor-pointer hover:shadow-[0px_12px_32px_rgba(25,28,29,0.08)] hover:border-primary hover:-translate-y-1 no-underline"
              initial={entering ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-primary">
                <DynamicIcon imageKey={`modules.card${i}Icon`} fallback={defaultModuleIcons[i]} className="text-primary text-2xl group-hover:text-on-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">{mod.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{mod.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* System settings wide card */}
        <motion.div
          initial={entering ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-5 bg-surface-container-lowest p-7 rounded-xl shadow-[0px_12px_32px_rgba(25,28,29,0.04)] border-b-4 border-transparent transition-all cursor-pointer hover:shadow-[0px_12px_32px_rgba(25,28,29,0.08)] hover:border-primary"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
              <DynamicIcon imageKey="modules.settingsIcon" fallback="settings" className="text-primary text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-on-surface mb-1">{c.settingsTitle}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{c.settingsDesc}</p>
            </div>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-surface-tint active:scale-95">
              {c.settingsButton}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
