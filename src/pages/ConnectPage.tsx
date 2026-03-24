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

export default function ConnectPage() {
  const { content, images } = useConfig();
  const cp = content.connectPage;
  const heroImage = images["connectHero"];

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
              </span>{" "}
              {cp.headingLine3 && <><br />{cp.headingLine3}</>}
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
                      <DynamicIcon imageKey="connect.heroIcon" fallback={cp.heroIcon} className="text-on-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }} />
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

      {/* ── Connectivity Standards Grid ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {cp.protocols.map((p, i) => (
          <motion.div
            key={p.title}
            className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group border-l-4 border-primary"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
          >
            <div className="mb-4 text-primary bg-secondary-container w-12 h-12 flex items-center justify-center rounded-xl">
              <DynamicIcon imageKey={`connect.protocol${i}Icon`} fallback={p.icon} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ── Protocol Architecture Section ── */}
      <motion.section
        className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden"
        {...fadeUp}
      >
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left text */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                {cp.archHeading}
              </h2>
              <p className="text-on-surface-variant">
                {cp.archDesc}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
                    {cp.archStatusLabel}
                  </div>
                  <div className="text-sm font-medium">{cp.archStatusValue}</div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter mb-2">
                  {cp.archChannelsLabel}
                </div>
                <div className="flex gap-2">
                  {cp.archChannels.map((ch) => (
                    <span
                      key={ch}
                      className="px-2 py-1 bg-secondary-container text-primary text-[10px] font-bold rounded"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right diagram */}
          <div className="w-full lg:w-3/5">
            {images["connect.archDiagram"] ? (
              <img src={images["connect.archDiagram"]} alt="Architecture" className="rounded-2xl w-full shadow-lg" />
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl p-8 relative shadow-lg min-h-[400px] flex items-center justify-center">
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, transparent 24%, rgba(0,78,159,.2) 25%, rgba(0,78,159,.2) 26%, transparent 27%, transparent 74%, rgba(0,78,159,.2) 75%, rgba(0,78,159,.2) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,78,159,.2) 25%, rgba(0,78,159,.2) 26%, transparent 27%, transparent 74%, rgba(0,78,159,.2) 75%, rgba(0,78,159,.2) 76%, transparent 77%, transparent)",
                    backgroundSize: "50px 50px",
                  }}
                />
                <div className="flex flex-col items-center gap-12 w-full max-w-lg">
                  {/* Input nodes */}
                  <div className="flex justify-between w-full">
                    {cp.archInputNodes.map((n, i) => (
                      <motion.div
                        key={n.label}
                        className="w-20 h-20 bg-surface-container rounded-lg border border-outline-variant/20 flex flex-col items-center justify-center p-2 text-center"
                        {...fadeUp}
                      >
                        <DynamicIcon imageKey={`connect.inputNode${i}Icon`} fallback={n.icon} className="text-slate-400" />
                        <span className="text-[10px] font-bold mt-1">{n.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Connector lines top */}
                  <svg className="w-full h-8 -my-8" viewBox="0 0 400 32" fill="none">
                    <path d="M60 0 L60 16 L200 16" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                    <path d="M200 0 L200 16" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                    <path d="M340 0 L340 16 L200 16" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                    <path d="M200 16 L200 32" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                  </svg>

                  {/* Central connector */}
                  <motion.div
                    className="relative w-28 h-28 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <DynamicIcon imageKey="connect.centralIcon" fallback={cp.heroIcon} className="text-on-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                    <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping opacity-20" />
                  </motion.div>

                  {/* Connector lines bottom */}
                  <svg className="w-full h-8 -my-8" viewBox="0 0 400 32" fill="none">
                    <path d="M200 0 L200 16 L140 16 L140 32" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                    <path d="M200 16 L260 16 L260 32" stroke="#004e9f" strokeWidth="1.5" strokeDasharray="4" opacity="0.3" />
                  </svg>

                  {/* Output nodes */}
                  <div className="flex justify-around w-full">
                    {cp.archOutputNodes.map((n, i) => (
                      <motion.div
                        key={n.label}
                        className="w-24 h-24 bg-surface-container-low rounded-xl border-t-2 border-primary flex flex-col items-center justify-center p-3 text-center"
                        {...fadeUp}
                      >
                        <DynamicIcon imageKey={`connect.outputNode${i}Icon`} fallback={n.icon} className="text-primary mb-1" />
                        <span className="text-[10px] font-black tracking-widest text-primary">
                          {n.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

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
