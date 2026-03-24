import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";

const spring = { type: "spring" as const, stiffness: 140, damping: 24 };

const defaultStepIcons = ["precision_manufacturing", "settings_input_component", "fact_check", "inventory_2"];
const stepColors = [
  "bg-primary text-white shadow-primary/20",
  "bg-primary text-white shadow-primary/20",
  "bg-white border-2 border-primary text-primary",
  "bg-slate-50 border-2 border-slate-100 text-slate-300",
];
const stepTextColors = ["text-green-600", "text-green-600", "text-primary", "text-slate-400"];

interface Props {
  depth: number;
  entering: boolean;
}

export default function Screen4_Trace({ depth, entering }: Props) {
  const { content } = useConfig();
  const c = content.trace;

  return (
    <motion.div
      className="absolute right-4 bottom-[calc(7rem+80px)] flex justify-start pl-4"
      style={{
        left: "calc(6rem + 80px)",
        top: depth === 0 ? "calc(26rem - 80px)" : "calc(24rem - 80px)",
        zIndex: 40 - depth * 10,
        transformOrigin: "bottom left",
        pointerEvents: depth === 0 ? "auto" : "none",
      }}
      initial={entering ? { opacity: 0, y: 40, scale: 0.95 } : false}
      animate={{
        opacity: depth === 0 ? 1 : 0.45,
        scale: depth === 0 ? 1 : 0.88,
      }}
      transition={spring}
    >
      <div className="w-full max-w-[54rem] bg-white rounded-3xl shadow-[0px_24px_48px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
        <div className="p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <DynamicIcon imageKey="trace.headerIcon" fallback="qr_code_scanner" className="text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{c.title}</h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{c.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-bold text-green-600">{c.liveLabel}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mb-10 px-4">
            <div className="absolute top-6 left-0 w-full h-0.5 bg-slate-100" />
            <motion.div
              className="absolute top-6 left-0 h-0.5 bg-primary"
              initial={entering ? { width: "0%" } : false}
              animate={{ width: "66%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
            <div className="relative flex justify-between">
              {c.steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={entering ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
                  className="flex flex-col items-center gap-2 relative z-10"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${stepColors[i]}`}>
                    <DynamicIcon imageKey={`trace.step${i}Icon`} fallback={defaultStepIcons[i]} className="text-xl" />
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold ${i === 3 ? "text-slate-400" : "text-slate-900"}`}>
                      {s.label}
                    </p>
                    <p className={`text-[11px] font-bold ${stepTextColors[i]}`}>{s.status}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data cards */}
          <div className="grid grid-cols-3 gap-4">
            {c.cards.map((card, i) => (
              <motion.div
                key={i}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                initial={entering ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                <div className="flex items-center gap-1.5">
                  {i === 2 && <DynamicIcon imageKey="trace.qualityIcon" fallback="check_circle" className="text-green-500 text-lg" />}
                  <p className={`text-base font-bold ${i === 2 ? "text-green-600" : "text-slate-900"}`}>{card.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
