import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "./DynamicIcon";
import type { Lang } from "../config/content";

const LANG_DISPLAY: Record<Lang, string> = { tr: "TR", en: "ENG", ro: "RO" };

export default function TopNav() {
  const { content, lang, setLang, logoUrl } = useConfig();
  const [megaOpen, setMegaOpen] = useState(false);
  const mm = content.megaMenu;

  return (
    <>
      <motion.header
        className="fixed top-0 w-full z-[60] glass-header shadow-sm shadow-slate-200/50"
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center shrink-0">
            <img src={logoUrl} alt="OnSuite" className="h-9 object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {content.navItems.map((t, i) => (
              i === 0 ? (
                <button
                  key={t}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg cursor-pointer h-16 flex items-center transition-colors ${
                    megaOpen
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-slate-500 hover:text-primary"
                  }`}
                  onMouseEnter={() => setMegaOpen(true)}
                >
                  {t}
                </button>
              ) : (
                <a
                  key={t}
                  href={i === 1 ? "#references" : "#about"}
                  className="text-sm font-medium text-slate-500 px-3 py-1.5 rounded-lg cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setMegaOpen(false)}
                >
                  {t}
                </a>
              )
            ))}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative group">
              <button className="px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-semibold border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">language</span>
                {LANG_DISPLAY[lang]}
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[70]">
                {(["tr", "en", "ro"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`block w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 ${lang === l ? "text-primary" : "text-on-surface-variant"}`}
                  >
                    {LANG_DISPLAY[l]}
                  </button>
                ))}
              </div>
            </div>
            <a href="#contact" className="px-4 py-2 rounded-full premium-gradient text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">calendar_month</span>
              {content.demoButton}
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[58] bg-on-surface/5 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMegaOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 z-[59]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="max-w-screen-2xl mx-auto px-8">
                <div className="bg-surface-container-lowest shadow-2xl rounded-b-3xl border-t border-surface-container shadow-black/5 overflow-hidden">
                  <div className="grid grid-cols-12">
                    {/* Left Sidebar */}
                    <div className="col-span-3 bg-surface-container-low p-10 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                          {mm.sidebarTitle}
                        </h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                          {mm.sidebarDesc}
                        </p>
                        <div className="space-y-4">
                          {mm.features.map((feat, i) => (
                            <div key={feat} className="flex items-center gap-3 text-sm font-semibold text-on-surface">
                              <DynamicIcon imageKey={`megaMenu.feature${i}Icon`} fallback={mm.featureIcons[i]} className="text-primary text-xl" />
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-12">
                        <a className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform cursor-pointer" href="#contact">
                          {mm.linkText}
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Grid */}
                    <div className="col-span-9 p-10">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {mm.modules.map((mod, i) => (
                          <a
                            key={mod.name}
                            className="group flex flex-col gap-3 p-4 -m-4 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer no-underline"
                            href={mod.href}
                            onClick={() => setMegaOpen(false)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <DynamicIcon imageKey={`megaMenu.module${i}Icon`} fallback={mod.icon} />
                              </div>
                              <h4 className="font-bold text-on-surface">OnSuite {mod.name}</h4>
                            </div>
                            {mod.desc && (
                              <p className="text-xs text-on-surface-variant leading-relaxed">
                                {mod.desc}
                              </p>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-surface-container-highest/30 px-10 py-4 flex items-center justify-between border-t border-surface-container">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                      {mm.footerLabel}
                    </span>
                    <div className="flex gap-6">
                      {mm.footerStats.map((stat) => (
                        <span key={stat} className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
