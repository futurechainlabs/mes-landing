import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function CaseStudyPage({ index }: { index: number }) {
  const { content } = useConfig();
  const details = content.referencesPage.caseStudyDetails[index];
  const card = content.referencesPage.caseStudies[index];

  if (!details || !card) {
    return (
      <PageShell>
        <div className="py-32 text-center text-on-surface-variant">
          Vaka analizi bulunamadi.
          <a href="#references" className="block mt-4 text-primary font-bold">
            Referanslara Don
          </a>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* ── 1. HEADER ── */}
      <motion.header
        className="mb-24 pt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
          {details.badge}
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-on-surface leading-[1.1] mb-8 max-w-4xl">
          {details.title}
        </h1>
        <div className="h-1 w-24 bg-primary rounded-full" />
      </motion.header>

      {/* ── 2. SUMMARY ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-outline">
              {details.summaryLabel}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-xl leading-relaxed text-on-surface-variant font-light">
            {details.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 3. MODULES USED ── */}
      <motion.section
        className="mb-24 bg-surface-container-low rounded-xl p-12"
        {...fadeUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-outline">
              {details.modulesLabel}
            </h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {details.modules.map((mod, i) => (
              <motion.div
                key={i}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                  >
                    {mod.icon}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">{mod.name}</h3>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {mod.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 4. TECHNOLOGY & INFRASTRUCTURE ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-outline">
              {details.techLabel}
            </h2>
          </div>
          <div className="md:col-span-8">
            <ul className="space-y-8">
              {details.techSteps.map((step, i) => (
                <motion.li
                  key={i}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-primary font-bold text-lg mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p className="text-on-surface-variant font-light">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── 5. RESULTS ── */}
      <motion.section
        className="mb-24 pt-16 border-t border-outline-variant/30"
        {...fadeUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-outline">
              {details.resultsLabel}
            </h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12">
            {details.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-6xl font-bold tracking-tighter text-on-surface mb-2">
                  {r.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary">
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          className="mt-20 p-8 bg-primary-container text-on-primary-container rounded-xl flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-lg font-medium">{details.ctaText}</p>
          <a href="#contact" className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-sm hover:bg-surface-container-low transition-colors shrink-0 active:scale-95">
            {details.ctaButton}
          </a>
        </motion.div>
      </motion.section>
    </PageShell>
  );
}
