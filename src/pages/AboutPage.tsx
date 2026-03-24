import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutPage() {
  const { content } = useConfig();
  const cp = content.aboutPage;

  return (
    <PageShell>
      {/* ── 1. HERO ── */}
      <section className="py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
              {cp.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter mb-8 leading-tight">
              {cp.heading} <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                {cp.headingHighlight}
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {cp.description}
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 border border-outline-variant/30 rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-outline-variant/50 rounded-full flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-primary/5 rounded-full flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary text-6xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        precision_manufacturing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. VISION & MISSION ── */}
      <motion.section
        className="bg-surface-container-low py-24 -mx-6 lg:-mx-12 px-6 lg:px-12 mb-24"
        {...fadeUp}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-primary-fixed text-on-primary-fixed rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-on-surface tracking-tight">
                {cp.visionTitle}
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                {cp.visionDesc}
              </p>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            {/* Mission */}
            <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm md:mt-12">
              <div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-on-surface tracking-tight">
                {cp.missionTitle}
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                {cp.missionDesc}
              </p>
              <div className="h-1 w-20 bg-tertiary rounded-full" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 3. WHY US (BENTO GRID) ── */}
      <section className="mb-32">
        <motion.div className="text-center mb-16" {...fadeUp}>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            {cp.whyUsHeading}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cp.whyUsCards.map((card, i) => {
            if (card.type === "stat" && card.colSpan === 1) {
              return (
                <motion.div
                  key={i}
                  className="md:col-span-1 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {card.label && (
                    <div className="text-sm font-bold text-primary mb-4 tracking-widest uppercase">
                      {card.label}
                    </div>
                  )}
                  <div className="text-5xl font-extrabold tracking-tighter mb-2 text-on-surface">
                    {card.value}
                  </div>
                  <div className="text-on-surface-variant">{card.desc}</div>
                </motion.div>
              );
            }

            if (card.type === "methodology") {
              return (
                <motion.div
                  key={i}
                  className="md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-10 rounded-3xl text-white relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                    <p className="text-primary-fixed leading-relaxed max-w-lg mb-8">
                      {card.desc}
                    </p>
                    <a
                      href="#contact"
                      className="inline-block bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-surface-container-low transition-colors"
                    >
                      {card.buttonText}
                    </a>
                  </div>
                  {card.icon && (
                    <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[200px] opacity-10">
                      {card.icon}
                    </span>
                  )}
                </motion.div>
              );
            }

            if (card.type === "stat" && card.colSpan === 2) {
              return (
                <motion.div
                  key={i}
                  className="md:col-span-2 bg-surface-container-high p-8 rounded-3xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                      <div className="text-5xl font-extrabold tracking-tighter mb-2 text-on-surface">
                        {card.value}
                      </div>
                      <div className="text-on-surface-variant font-medium text-lg">
                        {card.desc}
                      </div>
                    </div>
                    <div className="flex -space-x-4">
                      {["A", "B", "C"].map((letter) => (
                        <div
                          key={letter}
                          className="w-12 h-12 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-xs font-bold text-on-surface-variant"
                        >
                          {letter}
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">
                        +
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            if (card.type === "focus") {
              return (
                <motion.div
                  key={i}
                  className="md:col-span-1 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-4 block">
                    {card.icon}
                  </span>
                  <h4 className="text-xl font-bold mb-2">{card.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      </section>

      {/* ── 4. TEAM ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-on-surface">
              {cp.teamHeading}
            </h2>
            <p className="text-on-surface-variant">{cp.teamDesc}</p>
          </div>
          <div className="hidden md:block h-px flex-grow bg-outline-variant/30 mx-8 mb-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {cp.teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[4/5] bg-surface-container-highest rounded-2xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-outline-variant">
                  <span className="material-symbols-outlined text-5xl">
                    {member.icon}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    {member.hoverLabel}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-on-surface">{member.title}</h3>
              <p className="text-sm text-on-surface-variant">{member.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </PageShell>
  );
}
