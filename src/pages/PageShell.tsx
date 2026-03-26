import { useEffect, type ReactNode } from "react";
import TopNav from "../components/TopNav";
import { useConfig } from "../config/ConfigContext";

/**
 * Shared shell for full-page module pages.
 * Overrides body overflow so the page can scroll,
 * renders TopNav + footer, and restores overflow on unmount.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const { logoUrl, content } = useConfig();
  const f = content.footer;

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    const root = document.getElementById("root");
    if (root) { root.style.overflow = "auto"; root.style.height = "auto"; }
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      if (root) { root.style.overflow = ""; root.style.height = ""; }
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <TopNav />
      <main className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full mt-auto max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0 space-y-4 text-center md:text-left">
            <a
              href={import.meta.env.BASE_URL}
              onClick={(e) => { e.preventDefault(); window.location.hash = ""; }}
              className="flex items-center gap-2 justify-center md:justify-start no-underline cursor-pointer"
            >
              <img alt={f.brandName + " Logo"} className="h-6" src={logoUrl} />
              <span className="font-bold text-slate-900">{f.brandName}</span>
            </a>
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              {f.copyright}
            </p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            {f.links.map((link) => (
              <a key={link.label} className="text-xs text-slate-500 uppercase tracking-widest hover:text-primary hover:underline transition-all cursor-pointer" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
