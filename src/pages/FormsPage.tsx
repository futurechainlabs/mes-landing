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

export default function FormsPage() {
  const { content, images } = useConfig();
  const cp = content.formsPage;
  const heroImage = images["formsHero"];

  const checklistItems = cp.formsChecklistItems || [];
  const tabletCheckItems = cp.formsTabletCheckItems || [];
  const fieldLabels = cp.formsFieldLabels || [];
  const fieldTypes = cp.formsFieldTypes || [];
  const approvalRoles = cp.formsApprovalRoles || [];
  const bullets = cp.formsFieldSectionBullets || [];
  const sectionHeadingParts = (cp.formsFieldSectionHeading || "Sahada Kesintisiz|Kullanilabilirlik").split("|");

  return (
    <PageShell>
      {/* ── SECTION 1: HERO ── */}
      <header className="relative overflow-hidden mb-24 py-12 lg:py-24">
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
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{cp.description}</p>
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
            {heroImage ? (
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10">
                <img src={heroImage} alt={cp.badge} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/10 p-6 flex flex-col relative">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/10">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{cp.formsChecklistTitle || ""}</h3>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{cp.formsChecklistId || ""}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  {checklistItems.map((item, i) => (
                    <motion.div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}>
                      <DynamicIcon imageKey={`forms.checkItem${i}`} fallback={item.checked ? "check_circle" : "radio_button_unchecked"} className={`text-xl ${item.checked ? "text-primary" : "text-on-surface-variant/40"}`} style={{ fontVariationSettings: "'FILL' 1" }} />
                      <span className={`text-sm font-medium flex-1 ${item.checked ? "text-on-surface" : "text-on-surface-variant"}`}>{item.label}</span>
                      {item.checked && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">{cp.formsOkButton || "Tamam"}</span>}
                    </motion.div>
                  ))}
                </div>
                <motion.div className="mt-4 pt-3 border-t border-outline-variant/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-lg">draw</span>
                      <span className="text-xs text-on-surface-variant font-medium">{cp.formsSignatureLabel || ""}</span>
                    </div>
                    <div className="w-24 h-8 border-b-2 border-dashed border-outline-variant/30" />
                  </div>
                </motion.div>
                <motion.div className="absolute -bottom-4 -left-4 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/10 px-5 py-3 flex items-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                  </div>
                  <div>
                    <p className="text-xl font-black text-primary leading-none">{cp.formsCompletionValue || "%45"}</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{cp.formsCompletionLabel || ""}</p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      {/* ── SECTION 2: BENTO FEATURES ── */}
      <motion.section className="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-16 mb-24 overflow-hidden" {...fadeUp}>
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{cp.formsSectionHeading || cp.showcaseHeading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 - col-span-2 */}
          <motion.div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden group" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                <DynamicIcon imageKey="forms.feature0Icon" fallback="architecture" className="text-primary text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface">{cp.features[0]?.title}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{cp.features[0]?.desc}</p>
              </div>
            </div>
            <div className="space-y-3">
              {fieldLabels.map((label, i) => (
                <motion.div key={i} className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/10" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-sm">drag_indicator</span>
                  <span className="text-sm font-medium text-on-surface flex-1">{label}</span>
                  <div className="w-32 h-3 bg-outline-variant/10 rounded-full" />
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container">{fieldTypes[i]?.label || ""}</span>
                </motion.div>
              ))}
              <motion.div className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-outline-variant/30 rounded-xl text-on-surface-variant" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <span className="material-symbols-outlined text-sm">add</span>
                <span className="text-xs font-bold">{cp.formsAddFieldButton || "Alan Ekle"}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: Offline */}
          <motion.div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border-l-4 border-primary relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-4">
              <DynamicIcon imageKey="forms.feature1Icon" fallback="cloud_off" className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">{cp.features[3]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[3]?.desc}</p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-on-surface-variant">{cp.formsOfflineLabel || "Cevrimdisi Mod Aktif"}</span>
            </div>
          </motion.div>

          {/* Feature 3: Approval */}
          <motion.div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-4">
              <DynamicIcon imageKey="forms.feature2Icon" fallback="verified_user" className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">{cp.features[2]?.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{cp.features[2]?.desc}</p>
            <div className="mt-6 space-y-2">
              {approvalRoles.map((role) => (
                <div key={role} className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-medium">{role} {cp.formsApprovalSuffix || "onayi"}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature 4 - col-span-2: Analytics */}
          <motion.div className="md:col-span-2 bg-gradient-to-r from-primary to-primary-container rounded-3xl p-8 shadow-sm relative overflow-hidden" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-on-primary mb-2">{cp.formsAnalyticsTitle || cp.features[1]?.title}</h3>
              <p className="text-sm text-on-primary/80 leading-relaxed max-w-lg">{cp.features[1]?.desc}</p>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-on-primary/20 border-2 border-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-on-primary/30 border-2 border-primary flex items-center justify-center">
                    <span className="text-[10px] font-black text-on-primary">+</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-on-primary">{cp.formsEnterpriseStat || ""}</span>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 3: TABLET SHOWCASE ── */}
      <motion.section className="mb-24 overflow-hidden" {...fadeUp}>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div className="flex-1 relative flex items-center justify-center" initial={{ opacity: 0, rotate: -3 }} whileInView={{ opacity: 1, rotate: -3 }} whileHover={{ rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 bg-primary/15 rounded-full blur-[80px]" />
            </div>
            <div className="relative bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl max-w-md w-full">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-700 border border-slate-600" />
              <div className="bg-white rounded-[2rem] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cp.formsDraftFormTitle || ""}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cp.formsDraftFormId || ""}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">{cp.formsDraftLabel || "Taslak"}</span>
                </div>
                <div className="space-y-2.5">
                  {tabletCheckItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm">
                      <span className={`material-symbols-outlined text-lg ${item.checked ? "text-primary" : "text-slate-300"}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.checked ? "check_box" : "check_box_outline_blank"}</span>
                      <span className={`${item.checked ? "text-slate-700" : "text-slate-400"} text-xs font-medium`}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="w-full bg-primary text-on-primary text-sm font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2">
                  {cp.formsDraftSubmitButton || "Onaya Gonder"}
                  <span className="material-symbols-outlined text-sm">send</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div className="flex-1 space-y-6" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              {sectionHeadingParts[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-surface-tint">{sectionHeadingParts[1] || ""}</span>
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg">{cp.showcaseDesc}</p>
            <div className="space-y-4 pt-2">
              {bullets.map((text, i) => (
                <motion.div key={i} className="flex items-start gap-3" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                  <span className="text-on-surface font-medium">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4: CTA ── */}
      <motion.section className="bg-on-surface rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden" {...fadeUp}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/20 blur-[120px] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">{cp.ctaSectionHeading}</h2>
          <p className="text-lg text-white/70 font-medium max-w-xl mx-auto">{cp.ctaSectionDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95">{cp.ctaSectionButton1}</a>
            <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">{cp.ctaSectionButton2}</button>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
