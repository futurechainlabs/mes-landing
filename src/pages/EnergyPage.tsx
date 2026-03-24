import { useState } from "react";
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

const blueShade = (v: number) => {
  if (v >= 9) return "bg-blue-900";
  if (v >= 8) return "bg-blue-800";
  if (v >= 7) return "bg-blue-700";
  if (v >= 6) return "bg-blue-600";
  if (v >= 5) return "bg-blue-500";
  if (v >= 4) return "bg-blue-400";
  if (v >= 3) return "bg-blue-300";
  if (v >= 2) return "bg-blue-200";
  return "bg-blue-100";
};

export default function EnergyPage() {
  const { content, images } = useConfig();
  const cp = content.energyPage;
  const heroImage = images["energyHero"];
  const [activeToggle, setActiveToggle] = useState<"daily" | "weekly">("daily");

  const heatmapRows = cp.energyHeatmapRows || [];
  const machines = cp.energyMachines || [];
  const sectionHeading = cp.energySectionHeading || "Makine Bazli Tuketim Analitigi";
  const dailyLabel = cp.energyDailyLabel || "Gunluk";
  const weeklyLabel = cp.energyWeeklyLabel || "Haftalik";
  const heatmapTitle = cp.energyHeatmapTitle || "Tuketim Isi Haritasi";
  const lowLabel = cp.energyLowLabel || "DUSUK";
  const highLabel = cp.energyHighLabel || "YUKSEK";
  const scoreLabel = cp.energyScoreLabel || "Verimlilik Skoru";
  const scoreValue = cp.energyScoreValue || "84.2";
  const scoreSuffix = cp.energyScoreSuffix || "/100";
  const scoreChange = cp.energyScoreChange || "+3.2%";
  const scoreChangeDesc = cp.energyScoreChangeDesc || "gecen aya gore";
  const savingsIcon = cp.energySavingsIcon || "savings";
  const savingsLabel = cp.energySavingsLabel || "Tahmini Tasarruf";
  const savingsValue = cp.energySavingsValue || "\u20BA142.500";
  const savingsDesc = cp.energySavingsDesc || "yillik projeksiyon";
  const machinePrefix = cp.energyMachinePrefix || "Makine";
  const decisionHeading = cp.energyDecisionHeading || "Karmasik Veriyi Karara Donusturun";
  const decisionBullets = cp.energyDecisionBullets || [
    { icon: "check_circle", text: "Anlik tuketim verisi ile anomali tespiti" },
    { icon: "check_circle", text: "Makine bazinda maliyet dagilimi" },
    { icon: "check_circle", text: "Otomatik optimizasyon onerileri" },
  ];

  return (
    <PageShell>
      {/* ────────────────────────── 1. HERO ────────────────────────── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
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
              {cp.headingLine2 && (
                <>
                  <br />
                  {cp.headingLine2}
                </>
              )}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {cp.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                {cp.ctaButton}
              </a>
              <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all">
                {cp.secondaryButton}
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 rounded-full" />
            <div className="bg-surface-container-lowest rounded-3xl p-2 shadow-2xl border border-outline-variant/10">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={cp.badge}
                  className="rounded-2xl w-full h-80 object-cover"
                />
              ) : (
                <div className="rounded-2xl w-full h-80 bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-2xl">
                      <DynamicIcon
                        imageKey="energy.heroIcon"
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
            </div>
          </motion.div>
        </div>
      </header>

      {/* ────────────────────────── 2. FEATURES ────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {cp.features.slice(0, 3).map((f, i) => (
          <motion.div
            key={f.title}
            className="group bg-surface-container-low hover:bg-surface-container-lowest rounded-2xl p-8 transition-colors duration-300 flex flex-col"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-12">
              <DynamicIcon
                imageKey={`energy.feature${i}Icon`}
                fallback={f.icon}
                className="text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">{f.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ────────────────────────── 3. HEATMAP & ANALYTICS ────────────────────────── */}
      <motion.section className="mb-24" {...fadeUp}>
        {/* Section header with toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
            {sectionHeading}
          </h2>
          <div className="flex bg-surface-container rounded-xl p-1">
            <button
              onClick={() => setActiveToggle("daily")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeToggle === "daily"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {dailyLabel}
            </button>
            <button
              onClick={() => setActiveToggle("weekly")}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeToggle === "weekly"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {weeklyLabel}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Heatmap (col-span-3) */}
          <div className="lg:col-span-3 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-on-surface">{heatmapTitle}</h3>
              {/* Legend */}
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="font-medium">{lowLabel}</span>
                <div className="flex gap-0.5">
                  <span className="w-4 h-3 rounded-sm bg-blue-100" />
                  <span className="w-4 h-3 rounded-sm bg-blue-300" />
                  <span className="w-4 h-3 rounded-sm bg-blue-500" />
                  <span className="w-4 h-3 rounded-sm bg-blue-700" />
                  <span className="w-4 h-3 rounded-sm bg-blue-900" />
                </div>
                <span className="font-medium">{highLabel}</span>
              </div>
            </div>

            <div className="space-y-3">
              {heatmapRows.map((row, ri) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-on-surface-variant w-24 shrink-0 truncate">
                    {row.label}
                  </span>
                  <div className="grid grid-cols-12 gap-1.5 flex-1">
                    {row.data.map((v, ci) => (
                      <motion.div
                        key={ci}
                        className={`h-10 rounded-lg ${blueShade(v)}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.06 + ci * 0.02 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Analytics cards (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Verimlilik Skoru */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 flex-1">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">
                {scoreLabel}
              </h3>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-on-surface leading-none">{scoreValue}</span>
                <span className="text-xl text-on-surface-variant font-medium mb-1">{scoreSuffix}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="material-symbols-outlined text-green-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  trending_up
                </span>
                <span className="text-sm font-bold text-green-600">{scoreChange}</span>
                <span className="text-xs text-on-surface-variant">{scoreChangeDesc}</span>
              </div>
            </div>

            {/* Tahmini Tasarruf */}
            <div className="bg-primary rounded-2xl p-6 shadow-sm flex-1 relative overflow-hidden">
              {/* Watermark icon */}
              <span
                className="material-symbols-outlined absolute -right-4 -bottom-4 text-on-primary/10 pointer-events-none"
                style={{ fontSize: "120px", fontVariationSettings: "'FILL' 1" }}
              >
                {savingsIcon}
              </span>
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-on-primary/70 uppercase tracking-wider mb-4">
                  {savingsLabel}
                </h3>
                <span className="text-4xl font-black text-on-primary leading-none">
                  {savingsValue}
                </span>
                <p className="text-sm text-on-primary/70 mt-3">{savingsDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────── 4. MACHINE DATA ────────────────────────── */}
      <motion.section
        className="bg-surface-container-low rounded-[2rem] p-8 lg:p-16 mb-24"
        {...fadeUp}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Machine cards */}
          <div className="space-y-4">
            {machines.map((m, i) => (
              <motion.div
                key={m.id}
                className={`bg-surface-container-lowest rounded-xl p-5 shadow-sm ${m.borderClass} ${m.opacity}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {machinePrefix} {m.id}
                    </p>
                    <p className="text-base font-bold text-on-surface mt-0.5">{m.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-on-surface">{m.kwh}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${m.statusColor}`}
                    >
                      {m.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Text + checklist */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
              {decisionHeading}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {cp.showcaseDesc}
            </p>
            <div className="space-y-4 pt-2">
              {decisionBullets.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                >
                  <span
                    className="material-symbols-outlined text-primary mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-on-surface">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ────────────────────────── 5. CTA ────────────────────────── */}
      <motion.section
        className="bg-slate-900 rounded-[2rem] p-12 lg:p-24 text-center relative overflow-hidden"
        {...fadeUp}
      >
        {/* Radial dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {cp.ctaSectionHeading}
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            {cp.ctaSectionDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">
              {cp.ctaSectionButton1}
            </a>
            <button className="border border-slate-700 text-white bg-slate-800 px-10 py-5 rounded-2xl font-black hover:bg-slate-700 transition-all">
              {cp.ctaSectionButton2}
            </button>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
