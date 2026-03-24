import { type ReactNode } from "react";
import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "../components/DynamicIcon";
import type { ModulePageContent } from "../config/content";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

interface Props {
  /** Key prefix for image lookups, e.g. "live", "optima" */
  moduleKey: string;
  content: ModulePageContent;
  /** Optional custom showcase section (replaces default) */
  showcaseSlot?: ReactNode;
}

export default function ModulePageLayout({ moduleKey, content: cp, showcaseSlot }: Props) {
  const { images } = useConfig();
  const heroImage = images[`${moduleKey}Hero`];

  return (
    <PageShell>
      {/* ── Hero Section ── */}
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
              {cp.headingLine1} <br />
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
            <div className="bg-surface-container-lowest rounded-3xl p-2 shadow-2xl border border-outline-variant/10">
              {heroImage ? (
                <img src={heroImage} alt={cp.badge} className="rounded-2xl w-full h-80 object-cover" />
              ) : (
                <div className="rounded-2xl w-full h-80 bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon imageKey={`${moduleKey}.heroIcon`} fallback={cp.heroIcon} className="text-on-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                    </div>
                    <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-12 border border-primary/10 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Feature Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {cp.features.map((f, i) => (
          <motion.div
            key={f.title}
            className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group border-l-4 border-primary"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
          >
            <div className="mb-4 text-primary bg-secondary-container w-12 h-12 flex items-center justify-center rounded-xl">
              <DynamicIcon imageKey={`${moduleKey}.feature${i}Icon`} fallback={f.icon} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ── Showcase Section ── */}
      {showcaseSlot ?? (
        <motion.section
          className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden"
          {...fadeUp}
        >
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-2/5 space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tight">
                {cp.showcaseHeading}
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                {cp.showcaseDesc}
              </p>
            </div>
            <div className="w-full lg:w-3/5">
              {images[`${moduleKey}.showcase`] ? (
                <img src={images[`${moduleKey}.showcase`]} alt={cp.showcaseHeading} className="rounded-2xl w-full shadow-lg" />
              ) : (
                <div className="bg-on-surface rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-4 text-xs text-white/40 font-mono">{cp.badge} Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {cp.showcaseMetrics.map((m) => (
                      <div key={m.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">{m.label}</p>
                        <p className="text-2xl font-black text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 h-32 bg-white/5 rounded-xl border border-white/10 flex items-end p-4 gap-2">
                    {[65, 42, 78, 55, 88, 45, 72, 60, 85, 50, 70, 90].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-primary rounded-t"
                        style={{ opacity: 0.4 + (h / 100) * 0.6 }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Stats Section ── */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cp.stats.map((s, i) => (
            <motion.div
              key={s.value}
              className="bg-surface-container-low p-8 rounded-3xl relative overflow-hidden group"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.15 }}
            >
              <div className="text-6xl font-black text-primary opacity-10 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform select-none">
                {s.value}
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-extrabold text-primary mb-2">{s.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                  {s.label}
                </div>
                <p className="mt-4 text-sm text-on-surface-variant">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <motion.section
        className="bg-primary-container rounded-[2.5rem] p-12 lg:p-24 text-center text-on-primary-container relative overflow-hidden"
        {...fadeUp}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 blur-[100px] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {cp.ctaSectionHeading}
          </h2>
          <p className="text-lg opacity-90 font-medium">
            {cp.ctaSectionDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
              {cp.ctaSectionButton1}
            </a>
            <button className="bg-primary text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">
              {cp.ctaSectionButton2}
            </button>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
