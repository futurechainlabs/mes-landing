import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function ReferencesPage() {
  const { content, images } = useConfig();
  const cp = content.referencesPage;

  return (
    <PageShell>
      {/* ── 1. HERO ── */}
      <motion.header
        className="py-16 text-left mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest mb-6">
          <span className="material-symbols-outlined text-sm">verified</span>
          {cp.badge}
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 max-w-4xl">
          {cp.heading}
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          {cp.description}
        </p>
      </motion.header>

      {/* ── 2. STATS ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-surface-container-low p-12 rounded-xl relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

          {cp.stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col ${i > 0 ? "md:border-l md:border-outline-variant/20 md:pl-12" : ""}`}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-on-surface">
                  {stat.value}
                </span>
                <span className="text-lg text-on-surface-variant font-medium">
                  {stat.unit}
                </span>
              </div>
              <p className="mt-4 text-on-surface-variant">{stat.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 3. CASE STUDIES GRID ── */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cp.caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              className="group bg-surface-container-lowest rounded-xl p-6 transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-on-surface/5 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hover left bar */}
              <div className="absolute left-0 top-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded bg-surface-container-high flex items-center justify-center">
                  {images[`ref.logo${i}`] ? (
                    <img
                      src={images[`ref.logo${i}`]}
                      alt={cs.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {cs.icon}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-surface-container text-on-surface-variant">
                  {cs.sector}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{cs.name}</h3>
              <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                {cs.desc}
              </p>

              <div className="mb-8">
                <span className="text-2xl font-extrabold text-primary tracking-tight">
                  {cs.metricValue}
                </span>
                <span className="text-xs font-semibold text-on-surface-variant block uppercase">
                  {cs.metricLabel}
                </span>
              </div>

              <a
                href={`#case-${i}`}
                className="w-full py-3 text-sm font-bold text-primary bg-surface-container-high rounded-lg hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2"
              >
                Vaka Analizini Incele
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <motion.section className="mb-12" {...fadeUp}>
        <div className="relative bg-primary-container rounded-3xl p-16 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-on-primary mb-6">
              {cp.ctaHeading}
            </h2>
            <p className="text-xl text-on-primary-container/80 max-w-2xl mx-auto mb-10">
              {cp.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="px-10 py-5 bg-white text-primary rounded-2xl font-black hover:shadow-2xl transition-all active:scale-95">
                {cp.ctaButton1}
              </a>
              <button className="px-10 py-5 bg-primary text-white border border-white/20 rounded-2xl font-black hover:bg-white/10 transition-all active:scale-95">
                {cp.ctaButton2}
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
