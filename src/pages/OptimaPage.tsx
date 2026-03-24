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

const sparkBars = [40, 65, 55, 80, 70, 90, 75, 85, 60, 78, 88, 72];

export default function OptimaPage() {
  const { content, images } = useConfig();
  const cp = content.optimaPage;
  const heroImage = images["optimaHero"];

  const oeeBreakdown = cp.optimaOeeBreakdown || [];
  const progressBars = cp.optimaProgressBars || [];
  const integrationTags = cp.optimaIntegrationTags || [];
  const bullets = cp.optimaSectionBullets || [];

  return (
    <PageShell>
      {/* ── SECTION 1: Hero ── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.15 }} />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-primary/8 to-transparent pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">{cp.badge}</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
              {cp.headingLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">{cp.headingHighlight}</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{cp.description}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="bg-gradient-to-r from-primary to-surface-tint text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95">
                {cp.ctaButton}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <button className="bg-gradient-to-r from-primary/10 to-surface-tint/10 text-primary px-8 py-4 rounded-xl font-bold hover:from-primary/20 hover:to-surface-tint/20 transition-all">{cp.secondaryButton}</button>
            </div>
          </motion.div>

          <motion.div className="relative flex flex-col items-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
            {heroImage ? (
              <img src={heroImage} alt={cp.badge} className="rounded-2xl w-full max-w-md object-cover shadow-2xl" />
            ) : (
              <div className="w-full max-w-md">
                <div className="flex items-center gap-2 mb-6 justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span className="text-sm font-bold text-on-surface-variant tracking-wide">{cp.optimaHeroTitle || ""}</span>
                </div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-52 h-52">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="80" fill="transparent" stroke="var(--color-surface-container)" strokeWidth="14" />
                      <motion.circle cx="100" cy="100" r="80" fill="transparent" stroke="var(--color-primary)" strokeWidth="14" strokeLinecap="round" strokeDasharray={502.65} initial={{ strokeDashoffset: 502.65 }} whileInView={{ strokeDashoffset: 502.65 * 0.18 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-on-surface">{cp.optimaOeeValue || "82%"}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">{cp.optimaOeeLabel || "OEE"}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {oeeBreakdown.map((m) => (
                    <div key={m.label} className="bg-surface-container-lowest rounded-xl p-4 text-center border border-outline-variant/10">
                      <div className={`w-2 h-2 rounded-full ${m.color} mx-auto mb-2`} />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{m.label}</p>
                      <p className="text-2xl font-black text-on-surface">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── SECTION 2: Value Proposition ── */}
      <motion.section className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden" {...fadeUp}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight flex-1">{cp.showcaseHeading}</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-sm font-bold">
            <span className="material-symbols-outlined text-base">trending_up</span>
            {cp.optimaRoiBadge || "+18% / ROI"}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* Feature 1: col-span-8 */}
          <motion.div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden group" {...fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <DynamicIcon imageKey="optima.feature0Icon" fallback={cp.features[0]?.icon || "analytics"} className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold">{cp.features[0]?.title}</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-lg">{cp.features[0]?.desc}</p>
            <div className="flex items-end gap-2 h-28">
              {[35, 60, 45, 80, 55, 70, 40, 90, 65, 50, 75, 85].map((h, i) => (
                <motion.div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-t-md" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }} />
              ))}
            </div>
          </motion.div>

          {/* Feature 2: col-span-4 */}
          <motion.div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <DynamicIcon imageKey="optima.feature1Icon" fallback={cp.features[1]?.icon || "precision_manufacturing"} className="text-primary text-xl" />
              </div>
              <h3 className="text-lg font-bold">{cp.features[1]?.title}</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{cp.features[1]?.desc}</p>
            <div className="space-y-3">
              {progressBars.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-on-surface-variant">{item.label}</span>
                    <span className="text-primary">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-primary to-surface-tint rounded-full" initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature 3: col-span-4 */}
          <motion.div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <DynamicIcon imageKey="optima.feature2Icon" fallback={cp.features[2]?.icon || "bolt"} className="text-primary text-xl" />
              </div>
              <h3 className="text-lg font-bold">{cp.features[2]?.title}</h3>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{cp.features[2]?.desc}</p>
            <div className="flex flex-wrap gap-2">
              {integrationTags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-wider rounded-lg">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Feature 4: col-span-8 */}
          <motion.div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                <DynamicIcon imageKey="optima.feature3Icon" fallback={cp.features[3]?.icon || "eco"} className="text-green-600 text-lg" />
                <span className="text-xs font-bold text-green-700">{cp.features[3]?.title}</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-lg">{cp.features[3]?.desc}</p>
            <div className="mt-6 flex items-end gap-1 h-16">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 20 + Math.sin(i * 0.5) * 15 + Math.cos(i * 0.3) * 10;
                return <motion.div key={i} className="flex-1 bg-gradient-to-t from-green-500/60 to-green-300/30 rounded-t-sm" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.03 }} />;
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 3: Visual Showcase ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">{cp.optimaSectionHeading || cp.showcaseHeading}</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">{cp.showcaseDesc}</p>
            <div className="space-y-4 pt-4">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-green-600 text-base">{b.icon || "done"}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div className="bg-[#1e2329] rounded-2xl p-6 shadow-2xl text-white" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-white/40 font-mono">{cp.optimaShiftTitle || "Vardiya Analizi"}</span>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{cp.optimaProductionLabel || "Uretim Adedi"}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black">{cp.optimaProductionValue || "12,482"}</span>
                <span className="text-sm font-bold text-green-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                  {cp.optimaProductionChange || "+4.2%"}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-16 mb-6">
              {sparkBars.map((h, i) => (
                <motion.div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400/40 rounded-t-sm" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{cp.optimaScrapLabel || "Hurda Orani"}</p>
                <p className="text-xl font-black">{cp.optimaScrapValue || "0.82%"}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{cp.optimaMtbfLabel || "MTBF"}</p>
                <p className="text-xl font-black">{cp.optimaMtbfValue || "142 Sa."}</p>
              </div>
            </div>
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-blue-400 text-lg">{cp.optimaAiTitle || "auto_awesome"}</span>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">{cp.optimaAiLabel || "AI Oneri"}</span>
              </div>
              <p className="text-xs text-blue-100/80 leading-relaxed">{cp.optimaAiDesc || ""}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4: CTA ── */}
      <motion.section className="relative bg-gradient-to-r from-primary to-surface-tint rounded-[3rem] p-12 lg:p-24 text-center text-on-primary overflow-hidden" {...fadeUp}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">{cp.ctaSectionHeading}</h2>
          <p className="text-lg opacity-90 font-medium">{cp.ctaSectionDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">{cp.ctaSectionButton1}</a>
            <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-black hover:bg-primary-container/80 transition-all">{cp.ctaSectionButton2}</button>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
