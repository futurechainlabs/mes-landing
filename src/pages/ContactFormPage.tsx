import { motion } from "framer-motion";
import PageShell from "./PageShell";
import { useConfig } from "../config/ConfigContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const contactItems = [
  { icon: "location_on", key: "office" as const },
  { icon: "call", key: "phone" as const },
  { icon: "mail", key: "email" as const },
];

export default function ContactFormPage() {
  const { content } = useConfig();
  const cp = content.contactPage2;

  return (
    <PageShell>
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #c1c6d5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.05,
        }}
      />

      {/* ── HERO ── */}
      <motion.header
        className="relative z-10 mb-20 max-w-3xl pt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight mb-6 leading-[1.1]">
          {cp.heading}
        </h1>
        <p className="text-xl text-on-surface-variant leading-relaxed font-light">
          {cp.description}
        </p>
      </motion.header>

      {/* ── TWO COLUMN LAYOUT ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
        {/* Left: Contact Info */}
        <motion.div className="lg:col-span-5 space-y-12" {...fadeUp}>
          <div className="space-y-10">
            {/* Office */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  {cp.officeLabel}
                </h3>
                <p className="text-lg text-on-surface leading-snug whitespace-pre-line">
                  {cp.officeAddress}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">call</span>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  {cp.phoneLabel}
                </h3>
                <p className="text-lg text-on-surface">{cp.phoneNumber}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  {cp.emailLabel}
                </h3>
                <p className="text-lg text-primary font-medium">{cp.emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="p-6 rounded-xl bg-surface-container-low border-l-4 border-primary">
            <p className="text-sm font-medium text-on-surface-variant italic">
              "{cp.quote}"
            </p>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0px_12px_32px_rgba(25,28,29,0.06)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
                    htmlFor="contact-name"
                  >
                    {cp.formNameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder={cp.formNamePlaceholder}
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors px-1 py-3 text-on-surface placeholder:text-outline-variant/60 outline-none"
                  />
                </div>
                {/* Company */}
                <div className="space-y-2">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
                    htmlFor="contact-company"
                  >
                    {cp.formCompanyLabel}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder={cp.formCompanyPlaceholder}
                    className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors px-1 py-3 text-on-surface placeholder:text-outline-variant/60 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
                  htmlFor="contact-email"
                >
                  {cp.formEmailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={cp.formEmailPlaceholder}
                  className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors px-1 py-3 text-on-surface placeholder:text-outline-variant/60 outline-none"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1"
                  htmlFor="contact-message"
                >
                  {cp.formMessageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder={cp.formMessagePlaceholder}
                  className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors px-1 py-3 text-on-surface placeholder:text-outline-variant/60 resize-none outline-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-lg font-bold text-sm tracking-wide hover:shadow-lg active:scale-95 transition-all"
                >
                  {cp.formButton}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
