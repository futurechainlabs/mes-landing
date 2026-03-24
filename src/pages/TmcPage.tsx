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

export default function TmcPage() {
  const { content, images } = useConfig();
  const cp = content.tmcPage;
  const heroImage = images["tmcHero"];

  return (
    <PageShell>
      {/* ── 1. HERO ── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c1c6d5 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[14px]">{cp.tmcBadgeIcon || "settings_input_component"}</span>
              {cp.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1]">
              {cp.headingLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                {cp.headingHighlight}
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant font-medium">
              {cp.headingLine2}
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
              {cp.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 active:scale-95">
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
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
              {heroImage ? (
                <img src={heroImage} alt={cp.badge} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon
                        imageKey="tmc.heroIcon"
                        fallback={cp.heroIcon}
                        className="text-on-primary text-6xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      />
                    </div>
                    <div className="absolute -inset-6 border-2 border-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute -inset-12 border border-primary/10 rounded-full" />
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-multiply" />

              {/* Floating compliance badge */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 p-6 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-sm font-bold text-primary mb-1 tracking-widest uppercase">
                  {cp.showcaseMetrics[0]?.label}
                </div>
                <div className="text-2xl font-extrabold text-on-surface">
                  {cp.showcaseMetrics[0]?.value}
                </div>
              </motion.div>
            </div>
            {/* Decorative blur */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container/30 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </header>

      {/* ── 2. FEATURES BENTO GRID ── */}
      <motion.section
        className="bg-surface-container-low -mx-6 lg:-mx-12 px-6 lg:px-12 py-24 mb-24"
        {...fadeUp}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-4">
              {cp.tmcCompetenciesHeading || "Temel Yetkinlikler"}
            </h2>
            <p className="text-on-surface-variant max-w-2xl">
              {cp.tmcCompetenciesDesc || "Fabrika sahasindaki veri akisini normalize eden, tutun uretimine ozel tasarlanmis teknolojik katman."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cp.features.slice(0, 3).map((f, i) => (
              <motion.div
                key={i}
                className="bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-between group hover:translate-y-[-4px] transition-all"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <DynamicIcon
                      imageKey={`tmc.feature${i}Icon`}
                      fallback={f.icon}
                      className="text-3xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-4">{f.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/10 text-primary font-semibold flex items-center gap-2 cursor-pointer group-hover:gap-3 transition-all">
                  {cp.tmcDetailsButton || "Detaylari Gor"}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 3. TECHNICAL ARCHITECTURE ── */}
      <motion.section className="mb-24 relative overflow-hidden" {...fadeUp}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c1c6d5 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
          {/* Left */}
          <div className="w-full md:w-1/2">
            <div className="p-1 w-fit rounded-lg bg-surface-container-high mb-8">
              <div className="bg-surface-container-lowest px-4 py-2 rounded-md shadow-sm text-sm font-bold text-primary">
                {cp.tmcArchBadge || "TEKNIK MIMARI"}
              </div>
            </div>
            <h2 className="text-4xl font-bold text-on-surface mb-8 tracking-tight">
              {cp.tmcArchHeading || "Analitik Mimari ve Protokol Destegi"}
            </h2>
            <div className="space-y-6">
              {(cp.tmcProtocolDetails || []).map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-1 bg-primary rounded-full" />
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Architecture image */}
          <div className="w-full md:w-1/2">
            <div className="bg-surface-container-highest rounded-[2rem] p-4 shadow-inner relative">
              {images["tmc.archImage"] ? (
                <img src={images["tmc.archImage"]} alt="Technical Architecture" className="rounded-2xl w-full" />
              ) : (
                <div className="rounded-2xl w-full aspect-[4/3] bg-gradient-to-br from-surface-container-low to-surface-container flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-primary text-6xl opacity-40">{cp.tmcArchDiagramIcon || "schema"}</span>
                    <p className="text-sm text-on-surface-variant font-medium">{cp.tmcArchDiagramLabel || "Teknik Mimari Diyagrami"}</p>
                  </div>
                </div>
              )}
              {/* Latency badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-primary p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-on-primary text-3xl font-extrabold tracking-tighter">
                  {cp.showcaseMetrics[1]?.value}
                </div>
                <div className="text-on-primary/70 text-[10px] font-bold tracking-widest uppercase">
                  {cp.tmcLatencyLabel || "LATENCY PEAK"}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 4. ROI SECTION (full-width primary) ── */}
      <motion.section
        className="bg-primary text-on-primary -mx-6 lg:-mx-12 px-6 lg:px-12 py-24 mb-24 relative overflow-hidden"
        {...fadeUp}
      >
        {/* Decorative skew */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <h2 className="text-4xl font-bold mb-6">{cp.ctaSectionHeading}</h2>
              <p className="text-on-primary-container text-lg mb-10 leading-relaxed">
                {cp.ctaSectionDesc}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {cp.stats.slice(0, 2).map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-extrabold mb-2">{s.value}</div>
                    <div className="text-sm font-medium text-on-primary-container">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - ROI card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/10">
              <h3 className="text-xl font-bold mb-6">{cp.tmcRoiHeading || "Yatirim Getirisi (ROI)"}</h3>
              <ul className="space-y-4">
                {(cp.tmcRoiBullets || []).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary-fixed">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block w-full mt-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-surface-container transition-all text-center">
                {cp.ctaSectionButton1}
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 5. PRODUCT SHOWCASE ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="bg-surface-container-lowest rounded-[3rem] p-12 shadow-sm flex flex-col items-center text-center">
          {images["tmc.productLogo"] ? (
            <img src={images["tmc.productLogo"]} alt="OnSuite OPC UA TMC" className="h-16 mb-8 opacity-90" />
          ) : (
            <div className="h-16 mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {cp.tmcProductIcon || "settings_input_component"}
              </span>
              <span className="text-2xl font-extrabold tracking-tighter text-on-surface">{cp.tmcProductName || "OPC UA TMC"}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-on-surface mb-4">{cp.showcaseHeading}</h2>
          <p className="text-on-surface-variant max-w-xl mb-12">{cp.showcaseDesc}</p>
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {images["tmc.showcase"] ? (
              <img src={images["tmc.showcase"]} alt="TMC Interface" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-8xl opacity-20">{cp.tmcMonitoringIcon || "monitoring"}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 to-transparent flex items-end p-8">
              <div className="text-white text-left">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">{cp.tmcProductViewLabel || "Arayuz Gorunumu"}</p>
                <p className="text-xl font-bold">{cp.tmcProductPanelLabel || "Standardize Edilmis Makine Paneli"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
