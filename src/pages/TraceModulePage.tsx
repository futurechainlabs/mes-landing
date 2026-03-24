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

export default function TraceModulePage() {
  const { content, images } = useConfig();
  const cp = content.traceModulePage;
  const heroImage = images["traceHero"];

  const heroKpis = cp.traceHeroKpis || [{ label: "Precision", value: "99.98%" }, { label: "Latency", value: "12ms" }];
  const unitMetrics = cp.traceUnitMetrics || [];
  const tableRows = cp.traceTableRows || [];
  const tableHeaders = cp.traceTableHeaders || ["Istasyon", "Operator", "Zaman Damgasi", "Durum", "Detay"];
  const badges = cp.traceBadges || [];

  return (
    <PageShell>
      {/* ── SECTION 1: HERO ── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column */}
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

          {/* Right column - Hero image */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-container-lowest shadow-2xl border border-outline-variant/10">
              {heroImage ? (
                <>
                  <img src={heroImage} alt={cp.badge} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-surface-container-low to-primary-container/20 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon imageKey="traceModule.heroIcon" fallback={cp.heroIcon} className="text-on-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                    </div>
                    <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-12 border border-primary/10 rounded-full" />
                  </div>
                </div>
              )}

              {/* Floating KPI card */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-around">
                  {heroKpis.map((kpi, i) => (
                    <div key={i} className="text-center flex items-center gap-4">
                      {i > 0 && <div className="w-px h-10 bg-outline-variant/20" />}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">{kpi.label}</p>
                        <p className="text-2xl font-black text-primary">{kpi.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── SECTION 2: BENTO FEATURES ── */}
      <motion.section className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden" {...fadeUp}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">{cp.traceSectionHeading || "Gelismis Izlenebilirlik Mimarisi"}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 - col-span-2 */}
          <motion.div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 border-l-4 border-primary shadow-sm relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center shrink-0">
                <DynamicIcon imageKey="traceModule.feature0Icon" fallback={cp.features[0]?.icon || "qr_code_scanner"} className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{cp.features[0]?.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[0]?.desc}</p>
              </div>
            </div>
            {/* QR Code sub-card */}
            <div className="bg-surface-container-low rounded-xl p-5 flex items-center gap-5 border border-outline-variant/10">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-outline-variant/10">
                <span className="material-symbols-outlined text-4xl text-on-surface">{cp.traceSerialIcon || "qr_code_2"}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{cp.traceSerialLabel || "Seri No"}</p>
                <p className="text-lg font-black text-on-surface font-mono">{cp.traceSerialNumber || "#SN-8821-XP-2025"}</p>
                <p className="text-[11px] text-on-surface-variant mt-1">{cp.traceSerialMeta || ""}</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">{cp.traceSerialStatus || "Aktif"}</div>
            </div>
          </motion.div>

          {/* Feature 2: Primary bg */}
          <motion.div className="bg-primary text-on-primary rounded-2xl p-8 shadow-sm relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <DynamicIcon imageKey="traceModule.feature1Icon" fallback={cp.features[1]?.icon || "account_tree"} className="text-3xl text-on-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{cp.features[1]?.title}</h3>
              <p className="text-sm leading-relaxed opacity-90">{cp.features[1]?.desc}</p>
            </div>
            <div className="absolute bottom-4 right-4 opacity-10">
              <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-4">
              <DynamicIcon imageKey="traceModule.feature2Icon" fallback={cp.features[2]?.icon || "history"} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.features[2]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[2]?.desc}</p>
          </motion.div>

          {/* Feature 4 - col-span-2 */}
          <motion.div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-sm relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container text-primary flex items-center justify-center shrink-0">
                <DynamicIcon imageKey="traceModule.feature3Icon" fallback={cp.features[3]?.icon || "fact_check"} className="text-3xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{cp.features[3]?.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[3]?.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">{b.icon}</span>
                  {b.text}
                </span>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none">
              <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 3: UNIT DATA ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="border-l-4 border-primary pl-6 mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight">{cp.traceUnitHeading || "Birim Bazli Veri Katmani"}</h2>
          <p className="text-on-surface-variant mt-2">{cp.traceUnitDesc || ""}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {unitMetrics.map((m, i) => (
            <motion.div key={i} className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-sm border border-outline-variant/10 relative overflow-hidden group" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-3xl text-primary">{m.icon}</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{m.label}</p>
              <p className="text-3xl font-black text-primary">{m.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Operational History Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{cp.traceTableHeading || "Operasyonel Gecmis"}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <motion.tr key={i} className="border-b border-outline-variant/5 hover:bg-surface-container-low/30 transition-colors" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <td className="px-6 py-4 text-sm font-medium text-on-surface">{row.station}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{row.operator}</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-mono">{row.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-mono">{row.detail}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 4: CTA ── */}
      <motion.section className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-on-primary relative overflow-hidden" {...fadeUp}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">{cp.ctaSectionHeading}</h2>
          <p className="text-lg opacity-90 font-medium">{cp.ctaSectionDesc}</p>
          <a href="#contact" className="inline-block bg-white text-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">{cp.ctaSectionButton1}</a>
        </div>
      </motion.section>
    </PageShell>
  );
}
