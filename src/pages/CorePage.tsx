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

export default function CorePage() {
  const { content, images } = useConfig();
  const cp = content.corePage;
  const heroImage = images["coreHero"];

  const auditLogs = cp.coreAuditLogs || [];
  const complianceBadges = cp.coreComplianceBadges || [];
  const securityCards = cp.coreSecurityCards || [];
  const auditChecklist = cp.coreAuditChecklist || [];

  return (
    <PageShell>
      {/* ── 1. HERO (full-width, no image, left-aligned) ── */}
      <header className="relative overflow-hidden mb-24 py-16 lg:py-28">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c1c6d5 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
        />
        {/* Decorative gradient blob */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-bl from-primary/40 to-transparent rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
            <span className="material-symbols-outlined text-[18px]">{cp.coreShieldIcon || "shield"}</span>
            {cp.badge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter mb-8 leading-[1.1]">
            {cp.headingLine1} <br />
            <span className="text-primary">{cp.headingHighlight}</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            {cp.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {complianceBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 px-4 py-2 bg-surface-container-low rounded-xl border-l-4 border-primary"
              >
                <span className="material-symbols-outlined text-primary">{b.icon}</span>
                <span className="text-sm font-semibold">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* ── 2. IDENTITY & IAM ── */}
      <motion.section
        className="bg-surface-container-low -mx-6 lg:-mx-12 px-6 lg:px-12 py-24 mb-24"
        {...fadeUp}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left - Image */}
            <div className="w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {heroImage ? (
                  <img src={heroImage} alt="Server Infrastructure" className="w-full h-[500px] object-cover" />
                ) : (
                  <div className="w-full h-[500px] bg-gradient-to-br from-primary/5 to-surface-container-low flex items-center justify-center">
                    <DynamicIcon
                      imageKey="core.heroIcon"
                      fallback={cp.heroIcon}
                      className="text-primary text-8xl opacity-30"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl">
                  <h3 className="font-bold text-xl mb-2">{cp.coreIamSubHeading || "Merkezi Kimlik Yonetimi"}</h3>
                  <p className="text-sm text-on-surface-variant">{cp.coreIamSubDesc || "Kurumsal dizin servisleri ile tam entegre, guvenli erisim protokolleri."}</p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold tracking-tight mb-6">{cp.coreIamHeading || "Kimlik ve Yetki Yonetimi (IAM)"}</h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                {cp.coreIamDesc || "OnSuite Core, her kullanicinin dogru veriye dogru yetkiyle erismesini garanti eder. Karmasik hiyerarsik yapilari kolayca modelleyen gelismis rol tanimlama sistemi sunar."}
              </p>
              <div className="space-y-6">
                {cp.features.slice(0, 2).map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary">
                      <DynamicIcon
                        imageKey={`core.feature${i}Icon`}
                        fallback={f.icon}
                        className="text-2xl"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{f.title}</h4>
                      <p className="text-on-surface-variant">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 3. DATA SECURITY GRID ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">{cp.coreSecurityHeading || "Veri Guvenligi ve Protokoller"}</h2>
          <p className="text-on-surface-variant">{cp.coreSecurityDesc || "Endustriyel siber guvenlik standartlarinda uctan uca koruma saglayan teknoloji katmanlari."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityCards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <DynamicIcon
                imageKey={`core.feature${i + 2}Icon`}
                fallback={card.icon}
                className="text-4xl text-primary mb-6"
              />
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 4. AUDIT TRAIL ── */}
      <motion.section
        className="bg-surface-container-low -mx-6 lg:-mx-12 px-6 lg:px-12 py-24 mb-24"
        {...fadeUp}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
            {/* Left - Content */}
            <div className="p-12 lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-secondary-container/30 text-primary font-bold text-xs tracking-widest uppercase mb-6 rounded">
                {cp.coreAuditBadge || "AUDIT TRAIL"}
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">{cp.coreAuditHeading || "Sistem Izleme ve Kayit"}</h2>
              <p className="text-lg text-on-surface-variant mb-10">
                {cp.coreAuditDesc || "Platform uzerindeki her islem, kim tarafindan, ne zaman ve hangi IP uzerinden yapildigi bilgisiyle degistirilemez sekilde kayit altina alinir."}
              </p>
              <ul className="space-y-4">
                {auditChecklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Terminal */}
            <div className="lg:w-1/2 bg-slate-900 p-8 flex items-center justify-center">
              <div className="w-full space-y-4 font-mono text-xs">
                {auditLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    className={`p-4 bg-slate-800 rounded-lg border-l-2 border-${log.color}-400 text-slate-300 ${log.opacity || ""}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: log.opacity ? 0.5 : 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>{" "}
                    <span className={`text-${log.color}-400`}>{log.type}:</span>{" "}
                    {log.message}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 5. FLEXIBLE INFRASTRUCTURE BENTO ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <h2 className="text-4xl font-bold tracking-tight text-center mb-16">{cp.coreFlexHeading || "Esnek ve Dinamik Altyapi"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[600px]">
          {/* Large card - col-span-2 row-span-2 */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-primary p-10 rounded-3xl text-on-primary flex flex-col justify-end relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-10 right-10 opacity-20 transform scale-[3]">
              <span className="material-symbols-outlined text-[100px]">{cp.coreDynamicIcon || "dynamic_form"}</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">{cp.coreDynamicTitle || "Dinamik Nesne Tanimlama"}</h3>
            <p className="text-primary-fixed-dim leading-relaxed">
              {cp.coreDynamicDesc || "OnSuite Core, kod yazmaniza gerek kalmadan yeni veri nesneleri ve is kurallari tanimlamnize olanak tanir. Isletmenizin benzersiz ihtiyaclarina saniyeler icinde uyum saglar."}
            </p>
          </motion.div>

          {/* Medium card */}
          <motion.div
            className="md:col-span-2 bg-surface-container-high p-8 rounded-3xl flex items-center gap-8"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <div className="w-20 h-20 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
              <span className="material-symbols-outlined text-4xl">{cp.coreFlexFormIcon || "dashboard_customize"}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{cp.coreFlexFormTitle || "Esnek Form Yonetimi"}</h3>
              <p className="text-on-surface-variant text-sm">{cp.coreFlexFormDesc || "Surukle-birak arayuzu ile karmasik veri giris formlarini dakikalar icinde olusturun."}</p>
            </div>
          </motion.div>

          {/* Small card 1 */}
          <motion.div
            className="md:col-span-1 bg-secondary-container p-8 rounded-3xl flex flex-col justify-between"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
          >
            <span className="material-symbols-outlined text-primary text-3xl">{cp.coreApiIcon || "api"}</span>
            <h3 className="font-bold mt-4">{cp.coreApiTitle || "Genis API Destegi"}</h3>
          </motion.div>

          {/* Small card 2 */}
          <motion.div
            className="md:col-span-1 bg-surface-container-high p-8 rounded-3xl flex flex-col justify-between"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <span className="material-symbols-outlined text-primary text-3xl">{cp.coreModularIcon || "settings_input_component"}</span>
            <h3 className="font-bold mt-4">{cp.coreModularTitle || "Moduler Mimari"}</h3>
          </motion.div>
        </div>
      </motion.section>

      {/* ── 6. CTA ── */}
      <motion.section className="mb-24" {...fadeUp}>
        <div className="bg-gradient-to-br from-primary to-primary-container p-12 md:p-20 rounded-[40px] text-center text-on-primary relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {cp.ctaSectionHeading}
            </h2>
            <p className="text-xl text-primary-fixed-dim max-w-2xl mx-auto">
              {cp.ctaSectionDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="px-10 py-5 bg-white text-primary rounded-2xl font-black hover:bg-opacity-90 transition-all active:scale-95">
                {cp.ctaSectionButton1}
              </a>
              <button className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black hover:bg-white/10 transition-all active:scale-95">
                {cp.ctaSectionButton2}
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
