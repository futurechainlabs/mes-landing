import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const notifStyles: Record<string, { bg: string; border: string; iconBg: string; labelColor: string; timeColor: string; textColor: string; icon: string }> = {
  error:   { bg: "bg-red-50",   border: "border-red-200/50",   iconBg: "bg-red-500",   labelColor: "text-red-600",   timeColor: "text-red-400",   textColor: "text-red-800",   icon: "warning" },
  success: { bg: "bg-green-50", border: "border-green-200/50", iconBg: "bg-green-500", labelColor: "text-green-600", timeColor: "text-green-400", textColor: "text-green-800", icon: "check_circle" },
  info:    { bg: "bg-blue-50",  border: "border-blue-200/50",  iconBg: "bg-blue-500",  labelColor: "text-blue-600",  timeColor: "text-blue-400",  textColor: "text-blue-800",  icon: "info" },
};

export default function LivePage() {
  const { content, images } = useConfig();
  const cp = content.livePage;
  const heroImage = images["liveHero"];
  const protocols = cp.protocols ?? [];
  const alertItems = cp.alertItems ?? [];
  const notifications = cp.notifications ?? [];
  const widgets = cp.widgetTypes ?? [];
  const dl = cp.dashboardLabels ?? {};
  const heroCards = cp.liveHeroCards ?? [
    { icon: "router", label: "Gateway" },
    { icon: "memory", label: "PLC" },
    { icon: "cloud_sync", label: "Cloud Sync" },
    { icon: "sensors", label: "IIoT Node" },
  ];
  const barData = cp.liveBarData ?? [60, 80, 45, 90, 70, 55, 85, 75, 95, 50, 65, 88];

  return (
    <PageShell>
      {/* ── HERO SECTION ── */}
      <header className="relative overflow-hidden mb-16 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-left space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
              {cp.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
              {cp.headingLine1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">
                {cp.headingHighlight}
              </span>
              {cp.headingLine2 && <><br />{cp.headingLine2}</>}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {cp.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                {cp.ctaButton}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all">
                {cp.secondaryButton}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 rounded-full" />
            {heroImage ? (
              <div className="bg-surface-container-lowest rounded-3xl p-2 shadow-2xl border border-outline-variant/10">
                <img src={heroImage} alt={cp.badge} className="rounded-2xl w-full h-80 object-cover" />
              </div>
            ) : (
              <div className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-outline-variant/10">
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                  {heroCards.slice(0, 3).map((card, i) => (
                    <motion.div key={i} className="bg-surface-container rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-outline-variant/10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                      <DynamicIcon imageKey={`live.heroCard${i}Icon`} fallback={card.icon} className="text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{card.label}</span>
                    </motion.div>
                  ))}
                  <motion.div className="col-span-2 bg-surface-container rounded-2xl p-4 flex flex-col justify-center gap-2 border border-outline-variant/10" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{cp.liveStreamLabel || "Live Stream"}</span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                      {barData.map((h, i) => (
                        <motion.div key={i} className="flex-1 bg-primary/70 rounded-t" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }} />
                      ))}
                    </div>
                  </motion.div>
                  {heroCards[3] && (
                    <motion.div className="bg-surface-container rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-outline-variant/10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                      <DynamicIcon imageKey="live.heroCard3Icon" fallback={heroCards[3].icon} className="text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{heroCards[3].label}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── CONNECTIVITY SECTION ── */}
      <motion.section className="-mx-6 lg:-mx-12 px-6 lg:px-12 py-16 mb-24 bg-surface-container-low" {...fadeUp}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                {cp.connectivityHeading}
              </h2>
              <p className="text-on-surface-variant text-lg">{cp.connectivityDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protocols.map((p, i) => (
              <motion.div
                key={i}
                className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all group border border-outline-variant/10"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="mb-6 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <DynamicIcon imageKey={`live.protocol${i}Icon`} fallback={p.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── MONITORING INTERFACE ── */}
      <motion.section className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xl mb-24 border border-outline-variant/10" {...fadeUp}>
        <div className="flex flex-col lg:flex-row min-h-[480px]">
          <div className="w-full lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full" />
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">{cp.showcaseHeading}</h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">{cp.showcaseDesc}</p>
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10">
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">{cp.liveOeeLabel || "OEE"}</div>
              <div className="text-5xl font-black text-primary">{cp.liveOeeValue || "98.2%"}</div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 bg-slate-900 relative p-8 lg:p-12">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(148,163,184,.4) 25%, rgba(148,163,184,.4) 26%, transparent 27%, transparent 74%, rgba(148,163,184,.4) 75%, rgba(148,163,184,.4) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(148,163,184,.4) 25%, rgba(148,163,184,.4) 26%, transparent 27%, transparent 74%, rgba(148,163,184,.4) 75%, rgba(148,163,184,.4) 76%, transparent 77%)", backgroundSize: "40px 40px" }} />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">{cp.showcaseHeading}</h4>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-widest">{dl.liveLabel}</span>
              </div>
            </div>
            <div className="relative z-10 mb-8">
              <svg className="w-full h-32" viewBox="0 0 600 120" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 80 Q50 60 100 70 T200 50 T300 65 T400 35 T500 55 T600 30" stroke="#22c55e" strokeWidth="2.5" fill="none" />
                <path d="M0 80 Q50 60 100 70 T200 50 T300 65 T400 35 T500 55 T600 30 L600 120 L0 120 Z" fill="url(#chartGrad)" />
                <path d="M0 90 Q50 85 100 88 T200 75 T300 80 T400 60 T500 70 T600 55" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4" opacity="0.5" fill="none" />
              </svg>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
              {cp.showcaseMetrics.slice(0, 4).map((m, i) => (
                <motion.div key={i} className="bg-slate-800/80 backdrop-blur rounded-xl p-4 border border-slate-700/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
                  <div className="text-xl font-black text-white">{m.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── ALERTS SECTION ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-4">
            {notifications.map((n, i) => {
              const s = notifStyles[n.type] || notifStyles.info;
              return (
                <motion.div
                  key={i}
                  className={`${s.bg} border ${s.border} rounded-2xl p-6 backdrop-blur-sm shadow-sm`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${s.labelColor} uppercase tracking-wider`}>{n.label}</span>
                        <span className={`text-[10px] ${s.timeColor}`}>{n.time}</span>
                      </div>
                      <p className={`text-sm ${s.textColor} font-medium`}>{n.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight">
              {cp.features[1]?.title}
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {cp.features[1]?.desc}
            </p>
            <div className="space-y-4 pt-4">
              {alertItems.map((f, i) => (
                <motion.div key={i} className="flex items-center gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                  </div>
                  <span className="text-sm text-on-surface-variant font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── REPORTING SECTION ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">{cp.ctaSectionHeading}</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">{cp.ctaSectionDesc}</p>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10">
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            <div className="w-full lg:w-64 bg-surface-container p-6 border-b lg:border-b-0 lg:border-r border-outline-variant/10">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">{dl.widgetLibrary}</h3>
              <div className="space-y-3">
                {widgets.map((w, i) => (
                  <motion.div key={i} className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10 cursor-grab hover:shadow-sm transition-all" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{w.icon}</span>
                    <span className="text-sm font-medium">{w.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6 lg:p-8">
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full min-h-[400px]">
                <motion.div className="col-span-2 bg-surface-container rounded-2xl p-6 border border-outline-variant/10" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{dl.weeklyTrend}</span>
                    <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">{dl.weeklyRange}</span>
                  </div>
                  <svg className="w-full h-24" viewBox="0 0 400 80" fill="none" preserveAspectRatio="none">
                    <defs><linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--md-sys-color-primary, #004e9f)" stopOpacity="0.2" /><stop offset="100%" stopColor="var(--md-sys-color-primary, #004e9f)" stopOpacity="0" /></linearGradient></defs>
                    <path d="M0 60 Q40 50 80 40 T160 35 T240 25 T320 30 T400 15" stroke="var(--md-sys-color-primary, #004e9f)" strokeWidth="2.5" fill="none" />
                    <path d="M0 60 Q40 50 80 40 T160 35 T240 25 T320 30 T400 15 L400 80 L0 80 Z" fill="url(#trendGrad)" />
                  </svg>
                </motion.div>
                <motion.div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 flex flex-col justify-between" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{dl.activeErrors}</span>
                  <div>
                    <div className="text-4xl font-black text-red-500">{cp.liveActiveErrorsCount || "3"}</div>
                    <div className="text-[10px] text-on-surface-variant mt-1">{dl.activeErrorsDetail}</div>
                  </div>
                </motion.div>
                <motion.div className="bg-surface-container/50 rounded-2xl border-2 border-dashed border-outline-variant/20 flex items-center justify-center" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-center text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-3xl mb-1 block">add_circle</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{dl.addWidget}</span>
                  </div>
                </motion.div>
                <motion.div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 flex flex-col justify-between" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{dl.totalOutput}</span>
                  <div>
                    <div className="text-4xl font-black text-primary">{dl.totalOutputValue}</div>
                    <div className="text-[10px] text-green-500 font-bold mt-1">{dl.totalOutputChange}</div>
                  </div>
                </motion.div>
                <motion.div className="bg-surface-container/50 rounded-2xl border-2 border-dashed border-outline-variant/20 flex items-center justify-center" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="text-center text-on-surface-variant/40">
                    <span className="material-symbols-outlined text-3xl mb-1 block">add_circle</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{dl.addWidget}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a href="#contact" className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95 text-center">
            {cp.ctaSectionButton1}
          </a>
          <button className="bg-surface-container-high text-primary border border-outline-variant/20 px-10 py-5 rounded-2xl font-black hover:bg-surface-container-highest transition-all">
            {cp.ctaSectionButton2}
          </button>
        </div>
      </motion.section>
    </PageShell>
  );
}
