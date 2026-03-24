import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";

const spring = { type: "spring" as const, stiffness: 140, damping: 24 };

const bars = [
  { label: "CNC-01", pct: 85 },
  { label: "ARM-04", pct: 62 },
  { label: "EXT-02", pct: 42 },
  { label: "LSR-09", pct: 25 },
  { label: "OTHER", pct: 12, muted: true },
];

interface Props {
  depth: number;
  entering: boolean;
}

export default function Screen3_Downtime({ depth, entering }: Props) {
  const { content } = useConfig();
  const c = content.downtime;

  const scale = depth === 0 ? 0.95 : depth === 1 ? 0.85 : 0.78;
  const opacity = depth === 0 ? 1 : 0.45;

  return (
    <motion.div
      className="absolute top-12 right-4 left-4 bottom-[calc(8rem+40px)] flex justify-center overflow-hidden"
      initial={entering ? { opacity: 0, y: 50, scale: 0.9 } : false}
      animate={{ opacity, scale }}
      transition={spring}
      style={{
        zIndex: 30 - depth * 10,
        transformOrigin: "top right",
        pointerEvents: depth === 0 ? "auto" : "none",
      }}
    >
      <div className="w-full max-w-4xl glass-panel rounded-3xl shadow-[0px_32px_64px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden">
        <div className="p-7 border-l-[6px] border-error">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-11 h-11 rounded-full bg-error/10 flex items-center justify-center text-error">
              <DynamicIcon imageKey="downtime.headerIcon" fallback="warning" className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-on-surface">{c.title}</h2>
              <p className="text-sm text-on-surface-variant font-medium">{c.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-4 gap-6">
            {/* Pareto */}
            <div className="col-span-3 bg-surface-container-low/50 rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {c.paretoTitle}
                </span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" /> {c.legendLost}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary" /> {c.legendPareto}
                  </span>
                </div>
              </div>
              <div className="h-52 w-full flex items-end justify-between px-4 relative">
                {bars.map((bar, i) => (
                  <div key={bar.label} className="flex flex-col items-center" style={{ width: 48 }}>
                    <motion.div
                      className={`w-full rounded-t-xl ${bar.muted ? "bg-primary/40" : "bg-primary"}`}
                      initial={entering ? { height: 0 } : false}
                      animate={{ height: (bar.pct / 100) * 180 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.08 }}
                    />
                    <span className="text-[11px] mt-2 font-bold text-on-surface-variant">{bar.label}</span>
                  </div>
                ))}
                <svg className="absolute inset-0 pointer-events-none" style={{ height: 180 }} preserveAspectRatio="none">
                  <motion.path
                    d="M36,160 L108,100 L180,70 L252,45 L324,30"
                    fill="none" stroke="#883700" strokeDasharray="6" strokeWidth="2.5"
                    initial={entering ? { pathLength: 0 } : { pathLength: 1 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                  />
                </svg>
              </div>
            </div>

            {/* Side stats */}
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-error/5 rounded-2xl border-l-4 border-error">
                <p className="text-[10px] font-bold uppercase tracking-widest text-error mb-1">{c.criticalLabel}</p>
                <h4 className="font-bold text-on-surface text-base">{c.criticalMachine}</h4>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-on-surface">{c.criticalValue}</span>
                  <span className="text-[11px] text-on-surface-variant font-semibold">{c.criticalCause}</span>
                </div>
              </div>

              <div className="p-4 bg-surface-container-high rounded-2xl border border-outline-variant/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{c.trendLabel}</p>
                <h4 className="font-bold text-on-surface text-sm">{c.trendTitle}</h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{c.trendDesc}</p>
              </div>

              <button className="mt-auto w-full py-3 premium-gradient text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2">
                <DynamicIcon imageKey="downtime.liveIcon" fallback="videocam" className="text-lg" />
                {c.liveButton}
              </button>
            </div>
          </div>

          {/* AI suggestion */}
          <div className="mt-6 pt-5 border-t border-outline-variant/20 flex gap-4 items-start">
            <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
              <DynamicIcon imageKey="downtime.aiIcon" fallback="auto_awesome" className="text-primary text-lg" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface text-sm">{c.aiTitle}</p>
              <p className="text-on-surface-variant text-xs mt-1">{c.aiDesc}</p>
              <div className="flex gap-3 mt-3">
                <span className="px-5 py-1.5 rounded-full premium-gradient text-white text-xs font-bold shadow-md">{c.aiButton1}</span>
                <span className="px-5 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-bold">{c.aiButton2}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full self-center">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-300" />
                <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-400" />
              </div>
              <p className="text-[10px] font-bold text-on-surface-variant">{c.operatorsActive}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
