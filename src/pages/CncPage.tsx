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

const barHeights = [45, 72, 58, 85, 63, 78, 50, 90, 68, 55, 82, 60];

export default function CncPage() {
  const { content, images } = useConfig();
  const cp = content.cncPage;
  const heroImage = images["cncHero"];

  const dashKpis = cp.cncDashboardKpis || [];
  const timeLabels = cp.cncTimeLabels || [];
  const kpiColors = ["text-primary", "text-tertiary", "text-secondary", "text-error"];

  return (
    <PageShell>
      {/* ── 1. HERO ── */}
      <header className="relative overflow-hidden mb-16 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div className="flex-1 text-left space-y-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">{cp.badge}</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
              {cp.headingLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">{cp.headingHighlight}</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{cp.description}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                {cp.ctaButton}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all">{cp.secondaryButton}</button>
            </div>
          </motion.div>

          <motion.div className="flex-1 relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 rounded-full" />
            <div className="bg-surface-container-lowest rounded-3xl p-2 shadow-2xl border border-outline-variant/10 relative overflow-hidden">
              {heroImage ? (
                <img src={heroImage} alt={cp.cncMachineAlt || cp.badge} className="rounded-2xl w-full h-80 object-cover" />
              ) : (
                <div className="rounded-2xl w-full h-80 bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon imageKey="cnc.heroIcon" fallback="precision_manufacturing" className="text-on-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                    </div>
                    <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-12 border border-primary/10 rounded-full" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-xl px-4 py-3 flex items-center gap-3 border border-white/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm font-bold text-on-surface">{cp.cncLiveLabel || "Canli Yayin"}</span>
                <span className="text-xs text-on-surface-variant">-</span>
                <span className="text-sm text-on-surface-variant">{cp.cncMachineName || "Tezgah #04"}</span>
                <span className="text-xs text-on-surface-variant">-</span>
                <span className="text-sm font-semibold text-green-600">{cp.cncMachineStatus || "Aktif"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── 2. BENTO FEATURES ── */}
      <motion.section className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden" {...fadeUp}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">{cp.cncSectionHeading || "Ustun Entegrasyon Yetenekleri"}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* FOCAS - col-span-2 */}
          <motion.div className="md:col-span-2 group bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 hover:bg-primary hover:border-primary transition-all duration-300 cursor-pointer" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0 }}>
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-secondary-container text-primary group-hover:bg-on-primary/20 group-hover:text-on-primary transition-colors duration-300">
              <DynamicIcon imageKey="cnc.focasIcon" fallback="settings_input_component" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-on-primary transition-colors duration-300">{cp.features[0]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed group-hover:text-on-primary/80 transition-colors duration-300">{cp.features[0]?.desc}</p>
            <span className="inline-flex items-center mt-4 text-sm font-bold text-primary group-hover:text-on-primary transition-colors duration-300">{cp.cncDetailsButton || "Detaylar"} <span className="ml-1">&rarr;</span></span>
          </motion.div>

          {/* MTConnect */}
          <motion.div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border-l-4 border-primary" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-secondary-container text-primary">
              <DynamicIcon imageKey="cnc.mtconnectIcon" fallback="hub" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.features[1]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[1]?.desc}</p>
          </motion.div>

          {/* Parca Sayimi */}
          <motion.div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border-l-4 border-secondary" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-secondary-container text-primary">
              <DynamicIcon imageKey="cnc.analyticsIcon" fallback="analytics" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.features[3]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[3]?.desc}</p>
          </motion.div>

          {/* Takim Omru Takibi - col-span-2 */}
          <motion.div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border-l-4 border-tertiary" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-secondary-container text-primary">
              <DynamicIcon imageKey="cnc.toolIcon" fallback="build" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.features[2]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{cp.features[2]?.desc}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                <span>{cp.cncToolLifeLabel || "Takim Omru"}</span>
                <span>{cp.cncToolLifeValue || "75%"}</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <motion.div className="h-full bg-tertiary rounded-full" initial={{ width: 0 }} whileInView={{ width: cp.cncToolLifeValue || "75%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} />
              </div>
            </div>
          </motion.div>

          {/* Hizli Dagitim - col-span-2 */}
          <motion.div className="md:col-span-2 bg-gradient-to-r from-primary to-primary-container p-8 rounded-2xl shadow-sm text-on-primary" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
            <h3 className="text-xl font-bold mb-2">{cp.cncQuickDeployTitle || "Hizli Dagitim"}</h3>
            <p className="text-sm leading-relaxed opacity-90 mb-6">{cp.cncQuickDeployDesc || ""}</p>
            <div className="flex items-center gap-4">
              {(cp.cncProtocolLetters || ["F", "M", "O", "+"]).map((letter, i) => (
                <motion.div key={i} className="w-12 h-12 rounded-full bg-on-primary/20 border border-on-primary/30 flex items-center justify-center text-lg font-black" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}>
                  {letter}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── 3. DASHBOARD PREVIEW ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight">{cp.cncAnalyticsHeading || "Analitik Mimari"}</h2>
            <p className="text-on-surface-variant leading-relaxed">{cp.showcaseDesc}</p>
            <div className="space-y-4">
              {(cp.cncKpis || []).map((kpi, i) => {
                const borderColors = ["border-emerald-500", "border-primary", "border-error"];
                return (
                  <div key={i} className={`bg-surface-container-lowest p-4 rounded-xl ${borderColors[i] || "border-primary"} border-l-4 shadow-sm`}>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{kpi.label}</div>
                    <div className="text-lg font-extrabold">{kpi.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{cp.cncDashboardTitle || "Makine Performans Ozeti"}</h3>
                  <p className="text-xs text-on-surface-variant">{cp.cncDashboardSubtitle || "Gercek zamanli izleme"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {dashKpis.map((kpi, i) => (
                  <motion.div key={i} className="bg-surface-container-low rounded-xl p-4 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                    <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{kpi.label}</div>
                    <div className={`text-2xl font-black ${kpiColors[i] || "text-primary"}`}>{kpi.value}</div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-surface-container-low rounded-xl p-6">
                <div className="flex items-end gap-2 h-40">
                  {barHeights.map((h, i) => (
                    <motion.div key={i} className="flex-1 bg-primary/80 rounded-t hover:bg-primary transition-colors" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }} />
                  ))}
                </div>
                <div className="flex justify-between mt-3 border-t border-outline-variant/20 pt-2">
                  {timeLabels.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono text-on-surface-variant">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
