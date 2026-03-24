import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";

const spring = { type: "spring" as const, stiffness: 140, damping: 24 };

interface Props {
  depth: number;
  entering: boolean;
}

export default function Screen2_OEE({ depth, entering }: Props) {
  const { content } = useConfig();
  const c = content.oee;

  const scale = depth === 0 ? 1 : 1 - depth * 0.08;
  const opacity = depth === 0 ? 1 : 0.45;
  const x = depth === 0 ? 0 : depth * 15;
  const y = depth === 0 ? 0 : depth * 10;

  const kpiIcons = ["inventory_2", "timer_off", "speed"];
  const kpiColors = ["text-primary", "text-tertiary", "text-secondary"];

  return (
    <motion.div
      className="absolute inset-0 pl-20 pt-20 pb-32 overflow-hidden"
      initial={entering ? { opacity: 0, y: 60 } : false}
      animate={{ opacity, scale, x, y }}
      transition={spring}
      style={{
        zIndex: 30 - depth * 10,
        transformOrigin: "top left",
        pointerEvents: depth === 0 ? "auto" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 py-6">
        {/* Query reference */}
        <div className="mb-6 flex items-center gap-3">
          <DynamicIcon imageKey="oee.queryIcon" fallback="psychology_alt" className="text-primary" />
          <span className="text-sm font-medium text-on-surface-variant tracking-tight">
            "{c.queryRef}"
          </span>
        </div>

        {/* Hero insight card */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50 mb-8">
          <div className="grid grid-cols-12 gap-0">
            {/* Left content */}
            <div className="col-span-7 p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded">
                  {c.badge}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {c.updatedAgo}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-3 leading-tight">
                {c.headingNormal}{" "}
                <span className="text-primary">{c.headingHighlight}</span>
              </h1>
              <p className="text-on-surface-variant text-base max-w-md leading-relaxed mb-6">
                {c.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <DynamicIcon imageKey="oee.feature1Icon" fallback="check_circle" className="text-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
                  <span className="text-sm font-semibold text-on-surface">{c.feature1}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <DynamicIcon imageKey="oee.feature2Icon" fallback="trending_up" className="text-sm" />
                  <span className="text-sm font-medium">{c.feature2}</span>
                </div>
              </div>
            </div>

            {/* Right OEE gauge */}
            <div className="col-span-5 bg-surface-container-low p-6 border-l border-outline-variant/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                {c.gaugeTitle}
              </h3>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle className="text-outline-variant/20" cx="80" cy="80" r="68" fill="transparent" stroke="currentColor" strokeWidth="8" />
                  <motion.circle
                    className="text-primary"
                    cx="80" cy="80" r="68" fill="transparent" stroke="currentColor" strokeWidth="12"
                    strokeDasharray={427}
                    initial={{ strokeDashoffset: 427 }}
                    animate={{ strokeDashoffset: 427 * 0.18 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold tracking-tighter text-on-surface">82%</span>
                  <span className="text-[9px] font-bold uppercase text-on-surface-variant">{c.gaugeLabel}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {c.gaugeMetrics.map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-on-surface">{item.value}%</p>
                    <div className="h-1 bg-surface-container-highest rounded-full mt-1">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-4">
          {c.kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm shadow-slate-100"
              initial={entering ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between items-start mb-3">
                <DynamicIcon imageKey={`oee.kpi${i}Icon`} fallback={kpiIcons[i]} className={`${kpiColors[i]} p-2 rounded-lg`} style={{ backgroundColor: "rgba(0,0,0,0.03)" }} />
                <span className={`text-xs font-bold ${kpiColors[i]}`}>{kpi.change}</span>
              </div>
              <h4 className="text-sm font-bold text-on-surface-variant mb-1">{kpi.label}</h4>
              <p className="text-2xl font-bold tracking-tight">
                {kpi.value}{" "}
                {kpi.unit && <span className="text-xs font-normal text-on-surface-variant">{kpi.unit}</span>}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
