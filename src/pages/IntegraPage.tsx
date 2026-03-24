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

export default function IntegraPage() {
  const { content, images } = useConfig();
  const cp = content.integraPage;
  const heroImage = images["integraHero"];

  const erpLogos = cp.integraErpLogos || ["SAP S/4HANA", "ORACLE", "Dynamics 365", "LOGO ERP"];
  const processSteps = cp.integraProcessSteps || [];
  const techTags = cp.integraTechTags || ["JSON", "Webhooks", "OAuth 2.0"];

  return (
    <PageShell>
      {/* ── 1. HERO ── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">{cp.badge}</div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
              {cp.headingLine1}{" "}
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

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-2xl border border-outline-variant/10 relative">
              {heroImage ? (
                <img src={heroImage} alt={cp.badge} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon imageKey="integra.heroIcon" fallback={cp.heroIcon} className="text-on-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                    </div>
                    <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-12 border border-primary/10 rounded-full" />
                  </div>
                </div>
              )}
              <motion.div className="absolute bottom-6 left-6 bg-surface/80 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-xl border border-outline-variant/10 border-l-4 border-l-primary flex items-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <span className="material-symbols-outlined text-primary text-2xl">{cp.integraSyncIcon || "sync_alt"}</span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{cp.integraSyncSpeedLabel || "Senkronizasyon Hizi"}</div>
                  <div className="text-lg font-black text-on-surface">{cp.integraSyncSpeedValue || "0.42ms"}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── 2. ECOSYSTEM LOGOS ── */}
      <motion.section className="bg-surface-container-low -mx-6 lg:-mx-12 px-6 lg:px-12 py-16 mb-24" {...fadeUp}>
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-10">{cp.integraEcosystemLabel || "Desteklenen Ekosistemler"}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {erpLogos.map((logo) => (
              <div key={logo} className="text-2xl font-black text-on-surface opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default select-none">{logo}</div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 3. BENTO FEATURES ── */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-sm hover:shadow-md transition-all" {...fadeUp}>
            <div className="flex items-start gap-6">
              <div className="bg-primary w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <DynamicIcon imageKey="integra.feature1Icon" fallback="api" className="text-on-primary text-3xl" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{cp.features[1]?.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{cp.features[1]?.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {techTags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border-l-4 border-primary" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="mb-4 text-primary">
              <DynamicIcon imageKey="integra.feature2Icon" fallback="security" className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.integraSecurityTitle || cp.features[2]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[2]?.desc}</p>
          </motion.div>

          <motion.div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm hover:shadow-md transition-all" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <div className="mb-4 text-primary">
              <DynamicIcon imageKey="integra.feature3Icon" fallback="dynamic_feed" className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{cp.integraRealtimeTitle || cp.features[3]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[3]?.desc}</p>
          </motion.div>

          <motion.div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border-t-4 border-surface-tint" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="flex items-center gap-6">
              <div className="space-y-3 flex-1">
                <h3 className="text-2xl font-bold">{cp.integraFlowTitle || cp.features[0]?.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{cp.features[0]?.desc}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="bg-surface-container rounded-xl px-4 py-3 text-center">
                  <span className="text-xs font-black tracking-widest text-on-surface-variant">{cp.integraErpLabel || "ERP"}</span>
                </div>
                <motion.div animate={{ x: [0, 4, 0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="material-symbols-outlined text-primary text-4xl">swap_horiz</span>
                </motion.div>
                <div className="bg-primary-container rounded-xl px-4 py-3 text-center">
                  <span className="text-xs font-black tracking-widest text-on-primary-container">{cp.integraMesLabel || "MES"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. PROCESS FLOW ── */}
      <motion.section className="mb-24 text-center" {...fadeUp}>
        <h2 className="text-4xl font-extrabold tracking-tight mb-16">{cp.integraFlowSectionHeading || "Veri Akis Dongusu"}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {processSteps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${i === 0 ? "bg-surface border-2 border-primary text-primary" : i === 1 ? "bg-primary-container border-2 border-primary text-on-primary-container" : "bg-primary text-on-primary"}`}>
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{step.icon}</span>
                </div>
                <span className="text-sm font-bold text-on-surface max-w-[120px]">{step.label}</span>
              </motion.div>
              {i < processSteps.length - 1 && (
                <div className="hidden md:flex items-center mx-6">
                  <motion.div className="w-24 h-1 rounded-full bg-gradient-to-r from-primary/40 to-primary" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }} style={{ transformOrigin: "left" }} />
                  <span className="material-symbols-outlined text-primary text-xl -ml-1">chevron_right</span>
                </div>
              )}
              {i < processSteps.length - 1 && (
                <div className="flex md:hidden flex-col items-center my-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary/40 to-primary rounded-full" />
                  <span className="material-symbols-outlined text-primary text-xl">expand_more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 5. CTA ── */}
      <motion.section className="bg-on-background rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden" {...fadeUp}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-surface">{cp.ctaSectionHeading}</h2>
          <p className="text-lg text-surface/80 font-medium">{cp.ctaSectionDesc}</p>
          <a href="#contact" className="inline-block bg-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">{cp.ctaSectionButton1}</a>
        </div>
      </motion.section>
    </PageShell>
  );
}
