import { useState, useRef, useEffect } from "react";
import { useConfig } from "../config/ConfigContext";
import type { Lang, SiteContent } from "../config/content";
import type { ThemeConfig } from "../config/theme";
import { DEFAULT_CONTENT } from "../config/content";
import { DEFAULT_THEME } from "../config/theme";

type Tab = "content" | "theme" | "media";

const LANG_LABELS: Record<Lang, string> = { tr: "Turkce", en: "English", ro: "Romana" };

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ─── Color Picker Input ─────────────────────────────────────────
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-slate-200"
      />
      <div className="flex-1">
        <p className="text-xs font-medium text-slate-600">{label}</p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs font-mono text-slate-500 bg-transparent border-none p-0 w-20 outline-none"
        />
      </div>
    </div>
  );
}

// ─── Text Field ─────────────────────────────────────────────────
function TextField({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );
}

// ─── Icon Field (text + preview) ────────────────────────────────
function IconField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-600 text-xl">{value}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────
function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-bold text-sm text-slate-700">{title}</span>
        <span className="material-symbols-outlined text-slate-400 text-lg">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

// ─── Content Editor ─────────────────────────────────────────────
function ContentEditor({ lang, content, onUpdate }: { lang: Lang; content: SiteContent; onUpdate: (c: SiteContent) => void }) {
  const update = (path: string, value: unknown) => {
    const c = deepClone(content);
    const keys = path.split(".");
    let obj: any = c;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      obj = isNaN(Number(k)) ? obj[k] : obj[Number(k)];
    }
    const lastKey = keys[keys.length - 1];
    if (isNaN(Number(lastKey))) {
      obj[lastKey] = value;
    } else {
      obj[Number(lastKey)] = value;
    }
    onUpdate(c);
  };

  return (
    <div>
      <Section title="Genel / General" defaultOpen>
        <TextField label="Sayfa Basligi / Page Title" value={content.pageTitle} onChange={(v) => update("pageTitle", v)} />
        <TextField label="Demo Butonu / Demo Button" value={content.demoButton} onChange={(v) => update("demoButton", v)} />
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Nav Items (virgul ile / comma separated)
          </label>
          <input
            type="text"
            value={content.navItems.join(", ")}
            onChange={(e) => update("navItems", e.target.value.split(",").map((s) => s.trim()))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </Section>

      <Section title="Ekran 1 - Landing / Ana Sayfa">
        <TextField label="Badge" value={content.landing.badge} onChange={(v) => update("landing.badge", v)} />
        <TextField label="Baslik Satir 1 / Heading Line 1" value={content.landing.headingLine1} onChange={(v) => update("landing.headingLine1", v)} />
        <TextField label="Baslik Vurgu / Heading Highlight" value={content.landing.headingHighlight} onChange={(v) => update("landing.headingHighlight", v)} />
        <TextField label="Arama Placeholder / Search Placeholder" value={content.landing.searchPlaceholder} onChange={(v) => update("landing.searchPlaceholder", v)} />
        <TextField label="Analiz Butonu / Analyze Button" value={content.landing.analyzeButton} onChange={(v) => update("landing.analyzeButton", v)} />
        <TextField label="Hizli Aksiyonlar Etiketi" value={content.landing.quickActionsLabel} onChange={(v) => update("landing.quickActionsLabel", v)} />
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Hizli Aksiyonlar (virgul ile)
          </label>
          <input
            type="text"
            value={content.landing.quickActions.join(", ")}
            onChange={(e) => update("landing.quickActions", e.target.value.split(",").map((s) => s.trim()))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Grid Etiketleri (virgul ile)
          </label>
          <input
            type="text"
            value={content.landing.gridLabels.join(", ")}
            onChange={(e) => update("landing.gridLabels", e.target.value.split(",").map((s) => s.trim()))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </Section>

      <Section title="Sorgular / Queries">
        <TextField label="Sorgu 1 / Query 1" value={content.queries.q1} onChange={(v) => update("queries.q1", v)} />
        <TextField label="Sorgu 2 / Query 2" value={content.queries.q2} onChange={(v) => update("queries.q2", v)} />
        <TextField label="Sorgu 3 / Query 3" value={content.queries.q3} onChange={(v) => update("queries.q3", v)} />
        <TextField label="Sorgu 4 / Query 4" value={content.queries.q4} onChange={(v) => update("queries.q4", v)} />
      </Section>

      <Section title="Ekran 2 - OEE">
        <TextField label="Sorgu Referansi" value={content.oee.queryRef} onChange={(v) => update("oee.queryRef", v)} />
        <TextField label="Badge" value={content.oee.badge} onChange={(v) => update("oee.badge", v)} />
        <TextField label="Guncelleme Zamani" value={content.oee.updatedAgo} onChange={(v) => update("oee.updatedAgo", v)} />
        <TextField label="Baslik Normal" value={content.oee.headingNormal} onChange={(v) => update("oee.headingNormal", v)} />
        <TextField label="Baslik Vurgu" value={content.oee.headingHighlight} onChange={(v) => update("oee.headingHighlight", v)} />
        <TextField label="Aciklama" value={content.oee.description} onChange={(v) => update("oee.description", v)} multiline />
        <TextField label="Ozellik 1" value={content.oee.feature1} onChange={(v) => update("oee.feature1", v)} />
        <TextField label="Ozellik 2" value={content.oee.feature2} onChange={(v) => update("oee.feature2", v)} />
        <TextField label="Gauge Basligi" value={content.oee.gaugeTitle} onChange={(v) => update("oee.gaugeTitle", v)} />
        <TextField label="Gauge Etiketi" value={content.oee.gaugeLabel} onChange={(v) => update("oee.gaugeLabel", v)} />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Gauge Metrikleri</h4>
        {content.oee.gaugeMetrics.map((m, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={m.label} onChange={(e) => { const gm = [...content.oee.gaugeMetrics]; gm[i] = { ...gm[i], label: e.target.value }; update("oee.gaugeMetrics", gm); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            <input type="number" value={m.value} onChange={(e) => { const gm = [...content.oee.gaugeMetrics]; gm[i] = { ...gm[i], value: Number(e.target.value) }; update("oee.gaugeMetrics", gm); }} className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
          </div>
        ))}
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">KPI Kartlari</h4>
        {content.oee.kpis.map((kpi, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-2">
            <input type="text" value={kpi.label} onChange={(e) => { const k = [...content.oee.kpis]; k[i] = { ...k[i], label: e.target.value }; update("oee.kpis", k); }} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            <input type="text" value={kpi.value} onChange={(e) => { const k = [...content.oee.kpis]; k[i] = { ...k[i], value: e.target.value }; update("oee.kpis", k); }} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
            <input type="text" value={kpi.unit} onChange={(e) => { const k = [...content.oee.kpis]; k[i] = { ...k[i], unit: e.target.value }; update("oee.kpis", k); }} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Unit" />
            <input type="text" value={kpi.change} onChange={(e) => { const k = [...content.oee.kpis]; k[i] = { ...k[i], change: e.target.value }; update("oee.kpis", k); }} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Change" />
          </div>
        ))}
      </Section>

      <Section title="Ekran 3 - Durus Analizi / Downtime">
        <TextField label="Baslik / Title" value={content.downtime.title} onChange={(v) => update("downtime.title", v)} />
        <TextField label="Alt Baslik / Subtitle" value={content.downtime.subtitle} onChange={(v) => update("downtime.subtitle", v)} />
        <TextField label="Pareto Basligi" value={content.downtime.paretoTitle} onChange={(v) => update("downtime.paretoTitle", v)} />
        <TextField label="Legend - Kayip" value={content.downtime.legendLost} onChange={(v) => update("downtime.legendLost", v)} />
        <TextField label="Legend - Pareto" value={content.downtime.legendPareto} onChange={(v) => update("downtime.legendPareto", v)} />
        <TextField label="Kritik Etiketi" value={content.downtime.criticalLabel} onChange={(v) => update("downtime.criticalLabel", v)} />
        <TextField label="Kritik Makine" value={content.downtime.criticalMachine} onChange={(v) => update("downtime.criticalMachine", v)} />
        <TextField label="Kritik Deger" value={content.downtime.criticalValue} onChange={(v) => update("downtime.criticalValue", v)} />
        <TextField label="Kritik Neden" value={content.downtime.criticalCause} onChange={(v) => update("downtime.criticalCause", v)} />
        <TextField label="Trend Etiketi" value={content.downtime.trendLabel} onChange={(v) => update("downtime.trendLabel", v)} />
        <TextField label="Trend Basligi" value={content.downtime.trendTitle} onChange={(v) => update("downtime.trendTitle", v)} />
        <TextField label="Trend Aciklama" value={content.downtime.trendDesc} onChange={(v) => update("downtime.trendDesc", v)} multiline />
        <TextField label="Canli Buton" value={content.downtime.liveButton} onChange={(v) => update("downtime.liveButton", v)} />
        <TextField label="AI Basligi" value={content.downtime.aiTitle} onChange={(v) => update("downtime.aiTitle", v)} />
        <TextField label="AI Aciklama" value={content.downtime.aiDesc} onChange={(v) => update("downtime.aiDesc", v)} multiline />
        <TextField label="AI Buton 1" value={content.downtime.aiButton1} onChange={(v) => update("downtime.aiButton1", v)} />
        <TextField label="AI Buton 2" value={content.downtime.aiButton2} onChange={(v) => update("downtime.aiButton2", v)} />
        <TextField label="Aktif Operatorler" value={content.downtime.operatorsActive} onChange={(v) => update("downtime.operatorsActive", v)} />
      </Section>

      <Section title="Ekran 4 - Birim Takip / Trace">
        <TextField label="Baslik / Title" value={content.trace.title} onChange={(v) => update("trace.title", v)} />
        <TextField label="Alt Baslik / Subtitle" value={content.trace.subtitle} onChange={(v) => update("trace.subtitle", v)} />
        <TextField label="Canli Etiketi" value={content.trace.liveLabel} onChange={(v) => update("trace.liveLabel", v)} />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Adimlar / Steps</h4>
        {content.trace.steps.map((s, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={s.label} onChange={(e) => { const st = [...content.trace.steps]; st[i] = { ...st[i], label: e.target.value }; update("trace.steps", st); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            <input type="text" value={s.status} onChange={(e) => { const st = [...content.trace.steps]; st[i] = { ...st[i], status: e.target.value }; update("trace.steps", st); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Status" />
          </div>
        ))}
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Kartlar / Cards</h4>
        {content.trace.cards.map((card, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={card.label} onChange={(e) => { const cs = [...content.trace.cards]; cs[i] = { ...cs[i], label: e.target.value }; update("trace.cards", cs); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            <input type="text" value={card.value} onChange={(e) => { const cs = [...content.trace.cards]; cs[i] = { ...cs[i], value: e.target.value }; update("trace.cards", cs); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
          </div>
        ))}
      </Section>

      <Section title="Ekran 5 - Moduller / Modules">
        <TextField label="Baslik" value={content.modules.heading} onChange={(v) => update("modules.heading", v)} />
        <TextField label="Alt Baslik" value={content.modules.subheading} onChange={(v) => update("modules.subheading", v)} multiline />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Modul Kartlari</h4>
        {content.modules.cards.map((card, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <input type="text" value={card.title} onChange={(e) => { const cs = [...content.modules.cards]; cs[i] = { ...cs[i], title: e.target.value }; update("modules.cards", cs); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm mb-1" placeholder="Title" />
            <textarea value={card.desc} onChange={(e) => { const cs = [...content.modules.cards]; cs[i] = { ...cs[i], desc: e.target.value }; update("modules.cards", cs); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
          </div>
        ))}
        <TextField label="Ayarlar Basligi" value={content.modules.settingsTitle} onChange={(v) => update("modules.settingsTitle", v)} />
        <TextField label="Ayarlar Aciklama" value={content.modules.settingsDesc} onChange={(v) => update("modules.settingsDesc", v)} multiline />
        <TextField label="Ayarlar Butonu" value={content.modules.settingsButton} onChange={(v) => update("modules.settingsButton", v)} />
      </Section>

      <Section title="Yan Menu / Side Nav">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Menu Ogeleri</h4>
        {content.sideNav.items.map((item, i) => (
          <div key={i} className="mb-2">
            <input type="text" value={item.label} onChange={(e) => { const items = [...content.sideNav.items]; items[i] = { label: e.target.value }; update("sideNav.items", items); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
          </div>
        ))}
        <TextField label="Fabrika Etiketi" value={content.sideNav.factoryLabel} onChange={(v) => update("sideNav.factoryLabel", v)} />
      </Section>

      <Section title="Alt Bar / Bottom Bar">
        <TextField label="Placeholder" value={content.bottomBar.placeholder} onChange={(v) => update("bottomBar.placeholder", v)} />
        <TextField label="Footer Metni" value={content.bottomBar.footerText} onChange={(v) => update("bottomBar.footerText", v)} />
      </Section>

      {/* ── Mega Menu ── */}
      <Section title="Mega Menu">
        <TextField label="Sidebar Basligi" value={content.megaMenu.sidebarTitle} onChange={(v) => update("megaMenu.sidebarTitle", v)} />
        <TextField label="Sidebar Aciklama" value={content.megaMenu.sidebarDesc} onChange={(v) => update("megaMenu.sidebarDesc", v)} multiline />
        <TextField label="Link Metni" value={content.megaMenu.linkText} onChange={(v) => update("megaMenu.linkText", v)} />
        <TextField label="Footer Etiketi" value={content.megaMenu.footerLabel} onChange={(v) => update("megaMenu.footerLabel", v)} />
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Footer Istatistikler (virgul ile)
          </label>
          <input
            type="text"
            value={content.megaMenu.footerStats.join(", ")}
            onChange={(e) => update("megaMenu.footerStats", e.target.value.split(",").map((s) => s.trim()))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Ozellikler / Features</h4>
        {content.megaMenu.features.map((feat, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <div className="flex items-center gap-2 w-1/3">
              <span className="material-symbols-outlined text-blue-600 text-lg">{content.megaMenu.featureIcons[i]}</span>
              <input
                type="text"
                value={content.megaMenu.featureIcons[i]}
                onChange={(e) => { const icons = [...content.megaMenu.featureIcons]; icons[i] = e.target.value; update("megaMenu.featureIcons", icons); }}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                placeholder="Icon"
              />
            </div>
            <input
              type="text"
              value={feat}
              onChange={(e) => { const feats = [...content.megaMenu.features]; feats[i] = e.target.value; update("megaMenu.features", feats); }}
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
              placeholder="Feature text"
            />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Moduller ({content.megaMenu.modules.length})</h4>
        {content.megaMenu.modules.map((mod, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">{mod.icon}</span>
                <input
                  type="text"
                  value={mod.icon}
                  onChange={(e) => { const ms = [...content.megaMenu.modules]; ms[i] = { ...ms[i], icon: e.target.value }; update("megaMenu.modules", ms); }}
                  className="w-40 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                  placeholder="Icon"
                />
              </div>
              <input
                type="text"
                value={mod.name}
                onChange={(e) => { const ms = [...content.megaMenu.modules]; ms[i] = { ...ms[i], name: e.target.value }; update("megaMenu.modules", ms); }}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                placeholder="Name"
              />
              <input
                type="text"
                value={mod.href}
                onChange={(e) => { const ms = [...content.megaMenu.modules]; ms[i] = { ...ms[i], href: e.target.value }; update("megaMenu.modules", ms); }}
                className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                placeholder="Href"
              />
            </div>
            <textarea
              value={mod.desc}
              onChange={(e) => { const ms = [...content.megaMenu.modules]; ms[i] = { ...ms[i], desc: e.target.value }; update("megaMenu.modules", ms); }}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y"
              rows={2}
              placeholder="Description"
            />
          </div>
        ))}
      </Section>

      {/* ── Module Pages (shared layout) ── */}
      {([
        { key: "livePage", title: "Live Sayfasi" },
        { key: "optimaPage", title: "Optima Sayfasi" },
        { key: "traceModulePage", title: "Trace Sayfasi" },
        { key: "formsPage", title: "Forms Sayfasi" },
        { key: "cncPage", title: "CNC Sayfasi" },
        { key: "integraPage", title: "Integra Sayfasi" },
        { key: "energyPage", title: "Energy Sayfasi" },
        { key: "tmcPage", title: "TMC Sayfasi" },
        { key: "corePage", title: "Core Sayfasi" },
      ] as { key: keyof SiteContent; title: string }[]).map(({ key, title }) => {
        const page = content[key] as any;
        if (!page || !page.badge) return null;
        return (
          <Section key={key} title={title}>
            <TextField label="Badge" value={page.badge} onChange={(v) => update(`${key}.badge`, v)} />
            <TextField label="Baslik Satir 1" value={page.headingLine1} onChange={(v) => update(`${key}.headingLine1`, v)} />
            <TextField label="Baslik Vurgu" value={page.headingHighlight} onChange={(v) => update(`${key}.headingHighlight`, v)} />
            <TextField label="Baslik Satir 2" value={page.headingLine2} onChange={(v) => update(`${key}.headingLine2`, v)} />
            <TextField label="Aciklama" value={page.description} onChange={(v) => update(`${key}.description`, v)} multiline />
            <TextField label="CTA Butonu" value={page.ctaButton} onChange={(v) => update(`${key}.ctaButton`, v)} />
            <TextField label="Ikincil Buton" value={page.secondaryButton} onChange={(v) => update(`${key}.secondaryButton`, v)} />
            <IconField label="Hero Ikon" value={page.heroIcon} onChange={(v) => update(`${key}.heroIcon`, v)} />

            <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Ozellikler / Features (4)</h4>
            {page.features.map((f: any, i: number) => (
              <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600">{f.icon}</span>
                    <input type="text" value={f.icon} onChange={(e) => { const fs = [...page.features]; fs[i] = { ...fs[i], icon: e.target.value }; update(`${key}.features`, fs); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                  </div>
                  <input type="text" value={f.title} onChange={(e) => { const fs = [...page.features]; fs[i] = { ...fs[i], title: e.target.value }; update(`${key}.features`, fs); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
                </div>
                <textarea value={f.desc} onChange={(e) => { const fs = [...page.features]; fs[i] = { ...fs[i], desc: e.target.value }; update(`${key}.features`, fs); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
              </div>
            ))}

            <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Showcase</h4>
            <TextField label="Showcase Baslik" value={page.showcaseHeading} onChange={(v) => update(`${key}.showcaseHeading`, v)} />
            <TextField label="Showcase Aciklama" value={page.showcaseDesc} onChange={(v) => update(`${key}.showcaseDesc`, v)} multiline />
            <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Showcase Metrikleri</h4>
            {page.showcaseMetrics.map((m: any, i: number) => (
              <div key={i} className="flex gap-3 mb-2">
                <input type="text" value={m.label} onChange={(e) => { const ms = [...page.showcaseMetrics]; ms[i] = { ...ms[i], label: e.target.value }; update(`${key}.showcaseMetrics`, ms); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                <input type="text" value={m.value} onChange={(e) => { const ms = [...page.showcaseMetrics]; ms[i] = { ...ms[i], value: e.target.value }; update(`${key}.showcaseMetrics`, ms); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
              </div>
            ))}

            <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Istatistikler / Stats (3)</h4>
            {page.stats.map((s: any, i: number) => (
              <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex gap-3 mb-1">
                  <input type="text" value={s.value} onChange={(e) => { const ss = [...page.stats]; ss[i] = { ...ss[i], value: e.target.value }; update(`${key}.stats`, ss); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                  <input type="text" value={s.label} onChange={(e) => { const ss = [...page.stats]; ss[i] = { ...ss[i], label: e.target.value }; update(`${key}.stats`, ss); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                </div>
                <input type="text" value={s.desc} onChange={(e) => { const ss = [...page.stats]; ss[i] = { ...ss[i], desc: e.target.value }; update(`${key}.stats`, ss); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Description" />
              </div>
            ))}

            <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">CTA Bolumu</h4>
            <TextField label="CTA Baslik" value={page.ctaSectionHeading} onChange={(v) => update(`${key}.ctaSectionHeading`, v)} />
            <TextField label="CTA Aciklama" value={page.ctaSectionDesc} onChange={(v) => update(`${key}.ctaSectionDesc`, v)} multiline />
            <TextField label="CTA Buton 1" value={page.ctaSectionButton1} onChange={(v) => update(`${key}.ctaSectionButton1`, v)} />
            <TextField label="CTA Buton 2" value={page.ctaSectionButton2} onChange={(v) => update(`${key}.ctaSectionButton2`, v)} />

            {/* Live page extended fields */}
            {key === "livePage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Baglanti / Connectivity</h4>
                <TextField label="Baslik" value={page.connectivityHeading} onChange={(v) => update(`${key}.connectivityHeading`, v)} />
                <TextField label="Aciklama" value={page.connectivityDesc} onChange={(v) => update(`${key}.connectivityDesc`, v)} multiline />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Protokoller</h4>
                {(page.protocols || []).map((p: any, i: number) => (
                  <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600">{p.icon}</span>
                        <input type="text" value={p.icon} onChange={(e) => { const ps = [...page.protocols]; ps[i] = { ...ps[i], icon: e.target.value }; update(`${key}.protocols`, ps); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                      </div>
                      <input type="text" value={p.title} onChange={(e) => { const ps = [...page.protocols]; ps[i] = { ...ps[i], title: e.target.value }; update(`${key}.protocols`, ps); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
                    </div>
                    <textarea value={p.desc} onChange={(e) => { const ps = [...page.protocols]; ps[i] = { ...ps[i], desc: e.target.value }; update(`${key}.protocols`, ps); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Alarm Ozellikleri</h4>
                {(page.alertItems || []).map((a: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{a.icon}</span>
                      <input type="text" value={a.icon} onChange={(e) => { const as2 = [...page.alertItems]; as2[i] = { ...as2[i], icon: e.target.value }; update(`${key}.alertItems`, as2); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={a.text} onChange={(e) => { const as2 = [...page.alertItems]; as2[i] = { ...as2[i], text: e.target.value }; update(`${key}.alertItems`, as2); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Bildirimler / Notifications</h4>
                {(page.notifications || []).map((n: any, i: number) => (
                  <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-3 mb-2">
                      <input type="text" value={n.type} onChange={(e) => { const ns = [...page.notifications]; ns[i] = { ...ns[i], type: e.target.value }; update(`${key}.notifications`, ns); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Type" />
                      <input type="text" value={n.label} onChange={(e) => { const ns = [...page.notifications]; ns[i] = { ...ns[i], label: e.target.value }; update(`${key}.notifications`, ns); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                      <input type="text" value={n.time} onChange={(e) => { const ns = [...page.notifications]; ns[i] = { ...ns[i], time: e.target.value }; update(`${key}.notifications`, ns); }} className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Time" />
                    </div>
                    <input type="text" value={n.text} onChange={(e) => { const ns = [...page.notifications]; ns[i] = { ...ns[i], text: e.target.value }; update(`${key}.notifications`, ns); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Widget Turleri</h4>
                {(page.widgetTypes || []).map((w: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{w.icon}</span>
                      <input type="text" value={w.icon} onChange={(e) => { const ws = [...page.widgetTypes]; ws[i] = { ...ws[i], icon: e.target.value }; update(`${key}.widgetTypes`, ws); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={w.label} onChange={(e) => { const ws = [...page.widgetTypes]; ws[i] = { ...ws[i], label: e.target.value }; update(`${key}.widgetTypes`, ws); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Dashboard Etiketleri</h4>
                {page.dashboardLabels && (
                  <div className="space-y-2">
                    <TextField label="Live Label" value={page.dashboardLabels.liveLabel || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, liveLabel: v })} />
                    <TextField label="Weekly Trend" value={page.dashboardLabels.weeklyTrend || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, weeklyTrend: v })} />
                    <TextField label="Weekly Range" value={page.dashboardLabels.weeklyRange || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, weeklyRange: v })} />
                    <TextField label="Active Errors" value={page.dashboardLabels.activeErrors || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, activeErrors: v })} />
                    <TextField label="Active Errors Detail" value={page.dashboardLabels.activeErrorsDetail || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, activeErrorsDetail: v })} />
                    <TextField label="Total Output" value={page.dashboardLabels.totalOutput || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, totalOutput: v })} />
                    <TextField label="Total Output Value" value={page.dashboardLabels.totalOutputValue || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, totalOutputValue: v })} />
                    <TextField label="Total Output Change" value={page.dashboardLabels.totalOutputChange || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, totalOutputChange: v })} />
                    <TextField label="Add Widget" value={page.dashboardLabels.addWidget || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, addWidget: v })} />
                    <TextField label="Widget Library" value={page.dashboardLabels.widgetLibrary || ""} onChange={(v) => update(`${key}.dashboardLabels`, { ...page.dashboardLabels, widgetLibrary: v })} />
                  </div>
                )}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">OEE & Stream</h4>
                <TextField label="OEE Label" value={page.liveOeeLabel || ""} onChange={(v) => update(`${key}.liveOeeLabel`, v)} />
                <TextField label="OEE Value" value={page.liveOeeValue || ""} onChange={(v) => update(`${key}.liveOeeValue`, v)} />
                <TextField label="Stream Label" value={page.liveStreamLabel || ""} onChange={(v) => update(`${key}.liveStreamLabel`, v)} />
                <TextField label="Active Errors Count" value={page.liveActiveErrorsCount || ""} onChange={(v) => update(`${key}.liveActiveErrorsCount`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Hero Cards</h4>
                {(page.liveHeroCards || []).map((c: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{c.icon}</span>
                      <input type="text" value={c.icon} onChange={(e) => { const arr = [...(page.liveHeroCards || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.liveHeroCards`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={c.label} onChange={(e) => { const arr = [...(page.liveHeroCards || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.liveHeroCards`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Bar Data (comma-separated numbers)</h4>
                <div className="mb-3">
                  <input type="text" value={(page.liveBarData || []).join(", ")} onChange={(e) => update(`${key}.liveBarData`, e.target.value.split(",").map((s: string) => Number(s.trim())))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </>
            )}

            {/* Trace page extended fields */}
            {key === "traceModulePage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Hero KPIs</h4>
                {(page.traceHeroKpis || []).map((k2: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={k2.label} onChange={(e) => { const arr = [...(page.traceHeroKpis || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.traceHeroKpis`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={k2.value} onChange={(e) => { const arr = [...(page.traceHeroKpis || [])]; arr[i] = { ...arr[i], value: e.target.value }; update(`${key}.traceHeroKpis`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Trace Section</h4>
                <TextField label="Section Heading" value={page.traceSectionHeading || ""} onChange={(v) => update(`${key}.traceSectionHeading`, v)} />
                <IconField label="Serial Icon" value={page.traceSerialIcon || ""} onChange={(v) => update(`${key}.traceSerialIcon`, v)} />
                <TextField label="Serial Label" value={page.traceSerialLabel || ""} onChange={(v) => update(`${key}.traceSerialLabel`, v)} />
                <TextField label="Serial Number" value={page.traceSerialNumber || ""} onChange={(v) => update(`${key}.traceSerialNumber`, v)} />
                <TextField label="Serial Meta" value={page.traceSerialMeta || ""} onChange={(v) => update(`${key}.traceSerialMeta`, v)} />
                <TextField label="Serial Status" value={page.traceSerialStatus || ""} onChange={(v) => update(`${key}.traceSerialStatus`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Badges</h4>
                {(page.traceBadges || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{b.icon}</span>
                      <input type="text" value={b.icon} onChange={(e) => { const arr = [...(page.traceBadges || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.traceBadges`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={b.text} onChange={(e) => { const arr = [...(page.traceBadges || [])]; arr[i] = { ...arr[i], text: e.target.value }; update(`${key}.traceBadges`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Unit Section</h4>
                <TextField label="Unit Heading" value={page.traceUnitHeading || ""} onChange={(v) => update(`${key}.traceUnitHeading`, v)} />
                <TextField label="Unit Description" value={page.traceUnitDesc || ""} onChange={(v) => update(`${key}.traceUnitDesc`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Unit Metrics</h4>
                {(page.traceUnitMetrics || []).map((m: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={m.label} onChange={(e) => { const arr = [...(page.traceUnitMetrics || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.traceUnitMetrics`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={m.value} onChange={(e) => { const arr = [...(page.traceUnitMetrics || [])]; arr[i] = { ...arr[i], value: e.target.value }; update(`${key}.traceUnitMetrics`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{m.icon}</span>
                      <input type="text" value={m.icon} onChange={(e) => { const arr = [...(page.traceUnitMetrics || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.traceUnitMetrics`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Table</h4>
                <TextField label="Table Heading" value={page.traceTableHeading || ""} onChange={(v) => update(`${key}.traceTableHeading`, v)} />
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Table Headers (comma-separated)</label>
                  <input type="text" value={(page.traceTableHeaders || []).join(", ")} onChange={(e) => update(`${key}.traceTableHeaders`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Table Rows</h4>
                {(page.traceTableRows || []).map((r: any, i: number) => (
                  <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-2 mb-1">
                      <input type="text" value={r.station} onChange={(e) => { const arr = [...(page.traceTableRows || [])]; arr[i] = { ...arr[i], station: e.target.value }; update(`${key}.traceTableRows`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Station" />
                      <input type="text" value={r.operator} onChange={(e) => { const arr = [...(page.traceTableRows || [])]; arr[i] = { ...arr[i], operator: e.target.value }; update(`${key}.traceTableRows`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Operator" />
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={r.timestamp} onChange={(e) => { const arr = [...(page.traceTableRows || [])]; arr[i] = { ...arr[i], timestamp: e.target.value }; update(`${key}.traceTableRows`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Timestamp" />
                      <input type="text" value={r.status} onChange={(e) => { const arr = [...(page.traceTableRows || [])]; arr[i] = { ...arr[i], status: e.target.value }; update(`${key}.traceTableRows`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Status" />
                      <input type="text" value={r.detail} onChange={(e) => { const arr = [...(page.traceTableRows || [])]; arr[i] = { ...arr[i], detail: e.target.value }; update(`${key}.traceTableRows`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Detail" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Forms page extended fields */}
            {key === "formsPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Checklist</h4>
                <TextField label="Checklist Title" value={page.formsChecklistTitle || ""} onChange={(v) => update(`${key}.formsChecklistTitle`, v)} />
                <TextField label="Checklist ID" value={page.formsChecklistId || ""} onChange={(v) => update(`${key}.formsChecklistId`, v)} />
                {(page.formsChecklistItems || []).map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2 items-center">
                    <input type="checkbox" checked={item.checked} onChange={(e) => { const arr = [...(page.formsChecklistItems || [])]; arr[i] = { ...arr[i], checked: e.target.checked }; update(`${key}.formsChecklistItems`, arr); }} />
                    <input type="text" value={item.label} onChange={(e) => { const arr = [...(page.formsChecklistItems || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.formsChecklistItems`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}
                <TextField label="Signature Label" value={page.formsSignatureLabel || ""} onChange={(v) => update(`${key}.formsSignatureLabel`, v)} />
                <TextField label="Completion Value" value={page.formsCompletionValue || ""} onChange={(v) => update(`${key}.formsCompletionValue`, v)} />
                <TextField label="Completion Label" value={page.formsCompletionLabel || ""} onChange={(v) => update(`${key}.formsCompletionLabel`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Form Builder</h4>
                <TextField label="Section Heading" value={page.formsSectionHeading || ""} onChange={(v) => update(`${key}.formsSectionHeading`, v)} />
                <TextField label="Add Field Button" value={page.formsAddFieldButton || ""} onChange={(v) => update(`${key}.formsAddFieldButton`, v)} />
                <TextField label="Offline Label" value={page.formsOfflineLabel || ""} onChange={(v) => update(`${key}.formsOfflineLabel`, v)} />
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Field Labels (comma-separated)</label>
                  <input type="text" value={(page.formsFieldLabels || []).join(", ")} onChange={(e) => update(`${key}.formsFieldLabels`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Field Types</h4>
                {(page.formsFieldTypes || []).map((ft: any, i: number) => (
                  <div key={i} className="mb-2">
                    <input type="text" value={ft.label} onChange={(e) => { const arr = [...(page.formsFieldTypes || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.formsFieldTypes`, arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Approval</h4>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Approval Roles (comma-separated)</label>
                  <input type="text" value={(page.formsApprovalRoles || []).join(", ")} onChange={(e) => update(`${key}.formsApprovalRoles`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <TextField label="Approval Suffix" value={page.formsApprovalSuffix || ""} onChange={(v) => update(`${key}.formsApprovalSuffix`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Analytics & Draft</h4>
                <TextField label="Analytics Title" value={page.formsAnalyticsTitle || ""} onChange={(v) => update(`${key}.formsAnalyticsTitle`, v)} />
                <TextField label="Enterprise Stat" value={page.formsEnterpriseStat || ""} onChange={(v) => update(`${key}.formsEnterpriseStat`, v)} />
                <TextField label="Draft Form Title" value={page.formsDraftFormTitle || ""} onChange={(v) => update(`${key}.formsDraftFormTitle`, v)} />
                <TextField label="Draft Form ID" value={page.formsDraftFormId || ""} onChange={(v) => update(`${key}.formsDraftFormId`, v)} />
                <TextField label="Draft Label" value={page.formsDraftLabel || ""} onChange={(v) => update(`${key}.formsDraftLabel`, v)} />
                <TextField label="Draft Submit Button" value={page.formsDraftSubmitButton || ""} onChange={(v) => update(`${key}.formsDraftSubmitButton`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Field Section</h4>
                <TextField label="Field Section Heading" value={page.formsFieldSectionHeading || ""} onChange={(v) => update(`${key}.formsFieldSectionHeading`, v)} />
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Field Section Bullets (comma-separated)</label>
                  <input type="text" value={(page.formsFieldSectionBullets || []).join(", ")} onChange={(e) => update(`${key}.formsFieldSectionBullets`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Tablet Check Items</h4>
                {(page.formsTabletCheckItems || []).map((item: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2 items-center">
                    <input type="checkbox" checked={item.checked} onChange={(e) => { const arr = [...(page.formsTabletCheckItems || [])]; arr[i] = { ...arr[i], checked: e.target.checked }; update(`${key}.formsTabletCheckItems`, arr); }} />
                    <input type="text" value={item.label} onChange={(e) => { const arr = [...(page.formsTabletCheckItems || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.formsTabletCheckItems`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}
                <TextField label="OK Button" value={page.formsOkButton || ""} onChange={(v) => update(`${key}.formsOkButton`, v)} />
              </>
            )}

            {/* CNC page extended fields */}
            {key === "cncPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Machine Info</h4>
                <TextField label="Live Label" value={page.cncLiveLabel || ""} onChange={(v) => update(`${key}.cncLiveLabel`, v)} />
                <TextField label="Machine Name" value={page.cncMachineName || ""} onChange={(v) => update(`${key}.cncMachineName`, v)} />
                <TextField label="Machine Status" value={page.cncMachineStatus || ""} onChange={(v) => update(`${key}.cncMachineStatus`, v)} />
                <TextField label="Machine Alt" value={page.cncMachineAlt || ""} onChange={(v) => update(`${key}.cncMachineAlt`, v)} />
                <TextField label="Section Heading" value={page.cncSectionHeading || ""} onChange={(v) => update(`${key}.cncSectionHeading`, v)} />
                <TextField label="Details Button" value={page.cncDetailsButton || ""} onChange={(v) => update(`${key}.cncDetailsButton`, v)} />
                <TextField label="Tool Life Label" value={page.cncToolLifeLabel || ""} onChange={(v) => update(`${key}.cncToolLifeLabel`, v)} />
                <TextField label="Tool Life Value" value={page.cncToolLifeValue || ""} onChange={(v) => update(`${key}.cncToolLifeValue`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Quick Deploy</h4>
                <TextField label="Quick Deploy Title" value={page.cncQuickDeployTitle || ""} onChange={(v) => update(`${key}.cncQuickDeployTitle`, v)} />
                <TextField label="Quick Deploy Desc" value={page.cncQuickDeployDesc || ""} onChange={(v) => update(`${key}.cncQuickDeployDesc`, v)} />
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Protocol Letters (comma-separated)</label>
                  <input type="text" value={(page.cncProtocolLetters || []).join(", ")} onChange={(e) => update(`${key}.cncProtocolLetters`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Analytics</h4>
                <TextField label="Analytics Heading" value={page.cncAnalyticsHeading || ""} onChange={(v) => update(`${key}.cncAnalyticsHeading`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">KPIs</h4>
                {(page.cncKpis || []).map((k2: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={k2.label} onChange={(e) => { const arr = [...(page.cncKpis || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.cncKpis`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={k2.value} onChange={(e) => { const arr = [...(page.cncKpis || [])]; arr[i] = { ...arr[i], value: e.target.value }; update(`${key}.cncKpis`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Dashboard</h4>
                <TextField label="Dashboard Title" value={page.cncDashboardTitle || ""} onChange={(v) => update(`${key}.cncDashboardTitle`, v)} />
                <TextField label="Dashboard Subtitle" value={page.cncDashboardSubtitle || ""} onChange={(v) => update(`${key}.cncDashboardSubtitle`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Dashboard KPIs</h4>
                {(page.cncDashboardKpis || []).map((k2: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={k2.label} onChange={(e) => { const arr = [...(page.cncDashboardKpis || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.cncDashboardKpis`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={k2.value} onChange={(e) => { const arr = [...(page.cncDashboardKpis || [])]; arr[i] = { ...arr[i], value: e.target.value }; update(`${key}.cncDashboardKpis`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Time Labels (comma-separated)</label>
                  <input type="text" value={(page.cncTimeLabels || []).join(", ")} onChange={(e) => update(`${key}.cncTimeLabels`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </>
            )}

            {/* Optima page extended fields */}
            {key === "optimaPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">OEE</h4>
                <TextField label="Hero Title" value={page.optimaHeroTitle || ""} onChange={(v) => update(`${key}.optimaHeroTitle`, v)} />
                <TextField label="OEE Value" value={page.optimaOeeValue || ""} onChange={(v) => update(`${key}.optimaOeeValue`, v)} />
                <TextField label="OEE Label" value={page.optimaOeeLabel || ""} onChange={(v) => update(`${key}.optimaOeeLabel`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">OEE Breakdown</h4>
                {(page.optimaOeeBreakdown || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={b.label} onChange={(e) => { const arr = [...(page.optimaOeeBreakdown || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.optimaOeeBreakdown`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={b.value} onChange={(e) => { const arr = [...(page.optimaOeeBreakdown || [])]; arr[i] = { ...arr[i], value: e.target.value }; update(`${key}.optimaOeeBreakdown`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                    <input type="text" value={b.color} onChange={(e) => { const arr = [...(page.optimaOeeBreakdown || [])]; arr[i] = { ...arr[i], color: e.target.value }; update(`${key}.optimaOeeBreakdown`, arr); }} className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Color" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">ROI</h4>
                <TextField label="ROI Badge" value={page.optimaRoiBadge || ""} onChange={(v) => update(`${key}.optimaRoiBadge`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Progress Bars</h4>
                {(page.optimaProgressBars || []).map((pb: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <input type="text" value={pb.label} onChange={(e) => { const arr = [...(page.optimaProgressBars || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.optimaProgressBars`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="number" value={pb.value} onChange={(e) => { const arr = [...(page.optimaProgressBars || [])]; arr[i] = { ...arr[i], value: Number(e.target.value) }; update(`${key}.optimaProgressBars`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
                  </div>
                ))}

                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Integration Tags (comma-separated)</label>
                  <input type="text" value={(page.optimaIntegrationTags || []).join(", ")} onChange={(e) => update(`${key}.optimaIntegrationTags`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Section</h4>
                <TextField label="Section Heading" value={page.optimaSectionHeading || ""} onChange={(v) => update(`${key}.optimaSectionHeading`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Section Bullets</h4>
                {(page.optimaSectionBullets || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{b.icon}</span>
                      <input type="text" value={b.icon} onChange={(e) => { const arr = [...(page.optimaSectionBullets || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.optimaSectionBullets`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={b.text} onChange={(e) => { const arr = [...(page.optimaSectionBullets || [])]; arr[i] = { ...arr[i], text: e.target.value }; update(`${key}.optimaSectionBullets`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Production</h4>
                <TextField label="Shift Title" value={page.optimaShiftTitle || ""} onChange={(v) => update(`${key}.optimaShiftTitle`, v)} />
                <TextField label="Production Label" value={page.optimaProductionLabel || ""} onChange={(v) => update(`${key}.optimaProductionLabel`, v)} />
                <TextField label="Production Value" value={page.optimaProductionValue || ""} onChange={(v) => update(`${key}.optimaProductionValue`, v)} />
                <TextField label="Production Change" value={page.optimaProductionChange || ""} onChange={(v) => update(`${key}.optimaProductionChange`, v)} />
                <TextField label="Scrap Label" value={page.optimaScrapLabel || ""} onChange={(v) => update(`${key}.optimaScrapLabel`, v)} />
                <TextField label="Scrap Value" value={page.optimaScrapValue || ""} onChange={(v) => update(`${key}.optimaScrapValue`, v)} />
                <TextField label="MTBF Label" value={page.optimaMtbfLabel || ""} onChange={(v) => update(`${key}.optimaMtbfLabel`, v)} />
                <TextField label="MTBF Value" value={page.optimaMtbfValue || ""} onChange={(v) => update(`${key}.optimaMtbfValue`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">AI</h4>
                <TextField label="AI Label" value={page.optimaAiLabel || ""} onChange={(v) => update(`${key}.optimaAiLabel`, v)} />
                <TextField label="AI Title" value={page.optimaAiTitle || ""} onChange={(v) => update(`${key}.optimaAiTitle`, v)} />
                <TextField label="AI Description" value={page.optimaAiDesc || ""} onChange={(v) => update(`${key}.optimaAiDesc`, v)} />
              </>
            )}

            {/* Integra page extended fields */}
            {key === "integraPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">ERP</h4>
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ERP Logos (comma-separated)</label>
                  <input type="text" value={(page.integraErpLogos || []).join(", ")} onChange={(e) => update(`${key}.integraErpLogos`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Process Steps</h4>
                {(page.integraProcessSteps || []).map((s: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{s.icon}</span>
                      <input type="text" value={s.icon} onChange={(e) => { const arr = [...(page.integraProcessSteps || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.integraProcessSteps`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={s.label} onChange={(e) => { const arr = [...(page.integraProcessSteps || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.integraProcessSteps`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Sync</h4>
                <IconField label="Sync Icon" value={page.integraSyncIcon || ""} onChange={(v) => update(`${key}.integraSyncIcon`, v)} />
                <TextField label="Sync Speed Label" value={page.integraSyncSpeedLabel || ""} onChange={(v) => update(`${key}.integraSyncSpeedLabel`, v)} />
                <TextField label="Sync Speed Value" value={page.integraSyncSpeedValue || ""} onChange={(v) => update(`${key}.integraSyncSpeedValue`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Ecosystem & Tech</h4>
                <TextField label="Ecosystem Label" value={page.integraEcosystemLabel || ""} onChange={(v) => update(`${key}.integraEcosystemLabel`, v)} />
                <div className="mb-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tech Tags (comma-separated)</label>
                  <input type="text" value={(page.integraTechTags || []).join(", ")} onChange={(e) => update(`${key}.integraTechTags`, e.target.value.split(",").map((s: string) => s.trim()))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Titles</h4>
                <TextField label="Security Title" value={page.integraSecurityTitle || ""} onChange={(v) => update(`${key}.integraSecurityTitle`, v)} />
                <TextField label="Realtime Title" value={page.integraRealtimeTitle || ""} onChange={(v) => update(`${key}.integraRealtimeTitle`, v)} />
                <TextField label="Flow Title" value={page.integraFlowTitle || ""} onChange={(v) => update(`${key}.integraFlowTitle`, v)} />
                <TextField label="Flow Section Heading" value={page.integraFlowSectionHeading || ""} onChange={(v) => update(`${key}.integraFlowSectionHeading`, v)} />
                <TextField label="ERP Label" value={page.integraErpLabel || ""} onChange={(v) => update(`${key}.integraErpLabel`, v)} />
                <TextField label="MES Label" value={page.integraMesLabel || ""} onChange={(v) => update(`${key}.integraMesLabel`, v)} />
              </>
            )}

            {/* Energy page extended fields */}
            {key === "energyPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Energy Section</h4>
                <TextField label="Section Heading" value={page.energySectionHeading || ""} onChange={(v) => update(`${key}.energySectionHeading`, v)} />
                <TextField label="Daily Label" value={page.energyDailyLabel || ""} onChange={(v) => update(`${key}.energyDailyLabel`, v)} />
                <TextField label="Weekly Label" value={page.energyWeeklyLabel || ""} onChange={(v) => update(`${key}.energyWeeklyLabel`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Heatmap</h4>
                <TextField label="Heatmap Title" value={page.energyHeatmapTitle || ""} onChange={(v) => update(`${key}.energyHeatmapTitle`, v)} />
                <TextField label="Low Label" value={page.energyLowLabel || ""} onChange={(v) => update(`${key}.energyLowLabel`, v)} />
                <TextField label="High Label" value={page.energyHighLabel || ""} onChange={(v) => update(`${key}.energyHighLabel`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Heatmap Rows</h4>
                {(page.energyHeatmapRows || []).map((r: any, i: number) => (
                  <div key={i} className="mb-2 p-3 bg-slate-50 rounded-lg">
                    <input type="text" value={r.label} onChange={(e) => { const arr = [...(page.energyHeatmapRows || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.energyHeatmapRows`, arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                    <input type="text" value={(r.data || []).join(", ")} onChange={(e) => { const arr = [...(page.energyHeatmapRows || [])]; arr[i] = { ...arr[i], data: e.target.value.split(",").map((s: string) => Number(s.trim())) }; update(`${key}.energyHeatmapRows`, arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Data (comma-separated numbers)" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Score</h4>
                <TextField label="Score Label" value={page.energyScoreLabel || ""} onChange={(v) => update(`${key}.energyScoreLabel`, v)} />
                <TextField label="Score Value" value={page.energyScoreValue || ""} onChange={(v) => update(`${key}.energyScoreValue`, v)} />
                <TextField label="Score Suffix" value={page.energyScoreSuffix || ""} onChange={(v) => update(`${key}.energyScoreSuffix`, v)} />
                <TextField label="Score Change" value={page.energyScoreChange || ""} onChange={(v) => update(`${key}.energyScoreChange`, v)} />
                <TextField label="Score Change Desc" value={page.energyScoreChangeDesc || ""} onChange={(v) => update(`${key}.energyScoreChangeDesc`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Savings</h4>
                <IconField label="Savings Icon" value={page.energySavingsIcon || ""} onChange={(v) => update(`${key}.energySavingsIcon`, v)} />
                <TextField label="Savings Label" value={page.energySavingsLabel || ""} onChange={(v) => update(`${key}.energySavingsLabel`, v)} />
                <TextField label="Savings Value" value={page.energySavingsValue || ""} onChange={(v) => update(`${key}.energySavingsValue`, v)} />
                <TextField label="Savings Desc" value={page.energySavingsDesc || ""} onChange={(v) => update(`${key}.energySavingsDesc`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Machines</h4>
                <TextField label="Machine Prefix" value={page.energyMachinePrefix || ""} onChange={(v) => update(`${key}.energyMachinePrefix`, v)} />
                {(page.energyMachines || []).map((m: any, i: number) => (
                  <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-2 mb-1">
                      <input type="text" value={m.id} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], id: e.target.value }; update(`${key}.energyMachines`, arr); }} className="w-16 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="ID" />
                      <input type="text" value={m.name} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], name: e.target.value }; update(`${key}.energyMachines`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Name" />
                      <input type="text" value={m.kwh} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], kwh: e.target.value }; update(`${key}.energyMachines`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="kWh" />
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={m.status} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], status: e.target.value }; update(`${key}.energyMachines`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Status" />
                      <input type="text" value={m.borderClass} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], borderClass: e.target.value }; update(`${key}.energyMachines`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Border Class" />
                      <input type="text" value={m.statusColor} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], statusColor: e.target.value }; update(`${key}.energyMachines`, arr); }} className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Status Color" />
                      <input type="number" value={m.opacity} onChange={(e) => { const arr = [...(page.energyMachines || [])]; arr[i] = { ...arr[i], opacity: Number(e.target.value) }; update(`${key}.energyMachines`, arr); }} className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Opacity" step="0.1" />
                    </div>
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Decision</h4>
                <TextField label="Decision Heading" value={page.energyDecisionHeading || ""} onChange={(v) => update(`${key}.energyDecisionHeading`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Decision Bullets</h4>
                {(page.energyDecisionBullets || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{b.icon}</span>
                      <input type="text" value={b.icon} onChange={(e) => { const arr = [...(page.energyDecisionBullets || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.energyDecisionBullets`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={b.text} onChange={(e) => { const arr = [...(page.energyDecisionBullets || [])]; arr[i] = { ...arr[i], text: e.target.value }; update(`${key}.energyDecisionBullets`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}
              </>
            )}

            {/* TMC page extended fields */}
            {key === "tmcPage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">TMC Badge & Competencies</h4>
                <IconField label="Badge Icon" value={page.tmcBadgeIcon || ""} onChange={(v) => update(`${key}.tmcBadgeIcon`, v)} />
                <TextField label="Competencies Heading" value={page.tmcCompetenciesHeading || ""} onChange={(v) => update(`${key}.tmcCompetenciesHeading`, v)} />
                <TextField label="Competencies Desc" value={page.tmcCompetenciesDesc || ""} onChange={(v) => update(`${key}.tmcCompetenciesDesc`, v)} />
                <TextField label="Details Button" value={page.tmcDetailsButton || ""} onChange={(v) => update(`${key}.tmcDetailsButton`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Protocol Details</h4>
                {(page.tmcProtocolDetails || []).map((pd: any, i: number) => (
                  <div key={i} className="mb-2 p-3 bg-slate-50 rounded-lg">
                    <input type="text" value={pd.title} onChange={(e) => { const arr = [...(page.tmcProtocolDetails || [])]; arr[i] = { ...arr[i], title: e.target.value }; update(`${key}.tmcProtocolDetails`, arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
                    <textarea value={pd.desc} onChange={(e) => { const arr = [...(page.tmcProtocolDetails || [])]; arr[i] = { ...arr[i], desc: e.target.value }; update(`${key}.tmcProtocolDetails`, arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Architecture</h4>
                <TextField label="Arch Badge" value={page.tmcArchBadge || ""} onChange={(v) => update(`${key}.tmcArchBadge`, v)} />
                <TextField label="Arch Heading" value={page.tmcArchHeading || ""} onChange={(v) => update(`${key}.tmcArchHeading`, v)} />
                <IconField label="Arch Diagram Icon" value={page.tmcArchDiagramIcon || ""} onChange={(v) => update(`${key}.tmcArchDiagramIcon`, v)} />
                <TextField label="Arch Diagram Label" value={page.tmcArchDiagramLabel || ""} onChange={(v) => update(`${key}.tmcArchDiagramLabel`, v)} />
                <TextField label="Latency Label" value={page.tmcLatencyLabel || ""} onChange={(v) => update(`${key}.tmcLatencyLabel`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">ROI</h4>
                <TextField label="ROI Heading" value={page.tmcRoiHeading || ""} onChange={(v) => update(`${key}.tmcRoiHeading`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">ROI Bullets</h4>
                {(page.tmcRoiBullets || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{b.icon}</span>
                      <input type="text" value={b.icon} onChange={(e) => { const arr = [...(page.tmcRoiBullets || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.tmcRoiBullets`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={b.text} onChange={(e) => { const arr = [...(page.tmcRoiBullets || [])]; arr[i] = { ...arr[i], text: e.target.value }; update(`${key}.tmcRoiBullets`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Text" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Product</h4>
                <IconField label="Product Icon" value={page.tmcProductIcon || ""} onChange={(v) => update(`${key}.tmcProductIcon`, v)} />
                <TextField label="Product Name" value={page.tmcProductName || ""} onChange={(v) => update(`${key}.tmcProductName`, v)} />
                <TextField label="Product View Label" value={page.tmcProductViewLabel || ""} onChange={(v) => update(`${key}.tmcProductViewLabel`, v)} />
                <TextField label="Product Panel Label" value={page.tmcProductPanelLabel || ""} onChange={(v) => update(`${key}.tmcProductPanelLabel`, v)} />
                <IconField label="Monitoring Icon" value={page.tmcMonitoringIcon || ""} onChange={(v) => update(`${key}.tmcMonitoringIcon`, v)} />
              </>
            )}

            {/* Core page extended fields */}
            {key === "corePage" && (
              <>
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2">Shield & Compliance</h4>
                <IconField label="Shield Icon" value={page.coreShieldIcon || ""} onChange={(v) => update(`${key}.coreShieldIcon`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Compliance Badges</h4>
                {(page.coreComplianceBadges || []).map((b: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{b.icon}</span>
                      <input type="text" value={b.icon} onChange={(e) => { const arr = [...(page.coreComplianceBadges || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.coreComplianceBadges`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={b.label} onChange={(e) => { const arr = [...(page.coreComplianceBadges || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.coreComplianceBadges`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">IAM</h4>
                <TextField label="IAM Heading" value={page.coreIamHeading || ""} onChange={(v) => update(`${key}.coreIamHeading`, v)} />
                <TextField label="IAM Desc" value={page.coreIamDesc || ""} onChange={(v) => update(`${key}.coreIamDesc`, v)} />
                <TextField label="IAM Sub Heading" value={page.coreIamSubHeading || ""} onChange={(v) => update(`${key}.coreIamSubHeading`, v)} />
                <TextField label="IAM Sub Desc" value={page.coreIamSubDesc || ""} onChange={(v) => update(`${key}.coreIamSubDesc`, v)} />

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Security</h4>
                <TextField label="Security Heading" value={page.coreSecurityHeading || ""} onChange={(v) => update(`${key}.coreSecurityHeading`, v)} />
                <TextField label="Security Desc" value={page.coreSecurityDesc || ""} onChange={(v) => update(`${key}.coreSecurityDesc`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Security Cards</h4>
                {(page.coreSecurityCards || []).map((c: any, i: number) => (
                  <div key={i} className="mb-2 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600">{c.icon}</span>
                        <input type="text" value={c.icon} onChange={(e) => { const arr = [...(page.coreSecurityCards || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.coreSecurityCards`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                      </div>
                      <input type="text" value={c.title} onChange={(e) => { const arr = [...(page.coreSecurityCards || [])]; arr[i] = { ...arr[i], title: e.target.value }; update(`${key}.coreSecurityCards`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
                    </div>
                    <textarea value={c.desc} onChange={(e) => { const arr = [...(page.coreSecurityCards || [])]; arr[i] = { ...arr[i], desc: e.target.value }; update(`${key}.coreSecurityCards`, arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Audit</h4>
                <TextField label="Audit Badge" value={page.coreAuditBadge || ""} onChange={(v) => update(`${key}.coreAuditBadge`, v)} />
                <TextField label="Audit Heading" value={page.coreAuditHeading || ""} onChange={(v) => update(`${key}.coreAuditHeading`, v)} />
                <TextField label="Audit Desc" value={page.coreAuditDesc || ""} onChange={(v) => update(`${key}.coreAuditDesc`, v)} />
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Audit Logs</h4>
                {(page.coreAuditLogs || []).map((log: any, i: number) => (
                  <div key={i} className="mb-2 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-2 mb-1">
                      <input type="text" value={log.time} onChange={(e) => { const arr = [...(page.coreAuditLogs || [])]; arr[i] = { ...arr[i], time: e.target.value }; update(`${key}.coreAuditLogs`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Time" />
                      <input type="text" value={log.type} onChange={(e) => { const arr = [...(page.coreAuditLogs || [])]; arr[i] = { ...arr[i], type: e.target.value }; update(`${key}.coreAuditLogs`, arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Type" />
                      <input type="text" value={log.color} onChange={(e) => { const arr = [...(page.coreAuditLogs || [])]; arr[i] = { ...arr[i], color: e.target.value }; update(`${key}.coreAuditLogs`, arr); }} className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Color" />
                      <input type="number" value={log.opacity} onChange={(e) => { const arr = [...(page.coreAuditLogs || [])]; arr[i] = { ...arr[i], opacity: Number(e.target.value) }; update(`${key}.coreAuditLogs`, arr); }} className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Opacity" step="0.1" />
                    </div>
                    <input type="text" value={log.message} onChange={(e) => { const arr = [...(page.coreAuditLogs || [])]; arr[i] = { ...arr[i], message: e.target.value }; update(`${key}.coreAuditLogs`, arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Message" />
                  </div>
                ))}
                <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Audit Checklist</h4>
                {(page.coreAuditChecklist || []).map((c: any, i: number) => (
                  <div key={i} className="flex gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600">{c.icon}</span>
                      <input type="text" value={c.icon} onChange={(e) => { const arr = [...(page.coreAuditChecklist || [])]; arr[i] = { ...arr[i], icon: e.target.value }; update(`${key}.coreAuditChecklist`, arr); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                    </div>
                    <input type="text" value={c.label} onChange={(e) => { const arr = [...(page.coreAuditChecklist || [])]; arr[i] = { ...arr[i], label: e.target.value }; update(`${key}.coreAuditChecklist`, arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
                  </div>
                ))}

                <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Flexibility</h4>
                <TextField label="Flex Heading" value={page.coreFlexHeading || ""} onChange={(v) => update(`${key}.coreFlexHeading`, v)} />
                <IconField label="Dynamic Icon" value={page.coreDynamicIcon || ""} onChange={(v) => update(`${key}.coreDynamicIcon`, v)} />
                <TextField label="Dynamic Title" value={page.coreDynamicTitle || ""} onChange={(v) => update(`${key}.coreDynamicTitle`, v)} />
                <TextField label="Dynamic Desc" value={page.coreDynamicDesc || ""} onChange={(v) => update(`${key}.coreDynamicDesc`, v)} />
                <IconField label="Flex Form Icon" value={page.coreFlexFormIcon || ""} onChange={(v) => update(`${key}.coreFlexFormIcon`, v)} />
                <TextField label="Flex Form Title" value={page.coreFlexFormTitle || ""} onChange={(v) => update(`${key}.coreFlexFormTitle`, v)} />
                <TextField label="Flex Form Desc" value={page.coreFlexFormDesc || ""} onChange={(v) => update(`${key}.coreFlexFormDesc`, v)} />
                <IconField label="API Icon" value={page.coreApiIcon || ""} onChange={(v) => update(`${key}.coreApiIcon`, v)} />
                <TextField label="API Title" value={page.coreApiTitle || ""} onChange={(v) => update(`${key}.coreApiTitle`, v)} />
                <IconField label="Modular Icon" value={page.coreModularIcon || ""} onChange={(v) => update(`${key}.coreModularIcon`, v)} />
                <TextField label="Modular Title" value={page.coreModularTitle || ""} onChange={(v) => update(`${key}.coreModularTitle`, v)} />
              </>
            )}
          </Section>
        );
      })}

      {/* ── Floating CTA ── */}
      <Section title="Floating CTA">
        <IconField label="Call Icon" value={(content as any).floatingCta?.callIcon || ""} onChange={(v) => update("floatingCta.callIcon", v)} />
        <TextField label="Call Text" value={(content as any).floatingCta?.callText || ""} onChange={(v) => update("floatingCta.callText", v)} />
        <IconField label="Demo Icon" value={(content as any).floatingCta?.demoIcon || ""} onChange={(v) => update("floatingCta.demoIcon", v)} />
        <TextField label="Demo Text" value={(content as any).floatingCta?.demoText || ""} onChange={(v) => update("floatingCta.demoText", v)} />
      </Section>

      {/* ── Footer ── */}
      <Section title="Footer">
        <TextField label="Brand Name" value={(content as any).footer?.brandName || ""} onChange={(v) => update("footer.brandName", v)} />
        <TextField label="Copyright" value={(content as any).footer?.copyright || ""} onChange={(v) => update("footer.copyright", v)} />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Links</h4>
        {((content as any).footer?.links || []).map((link: any, i: number) => (
          <div key={i} className="flex gap-3 mb-2">
            <input type="text" value={link.label} onChange={(e) => { const arr = [...((content as any).footer?.links || [])]; arr[i] = { ...arr[i], label: e.target.value }; update("footer.links", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            <input type="text" value={link.href} onChange={(e) => { const arr = [...((content as any).footer?.links || [])]; arr[i] = { ...arr[i], href: e.target.value }; update("footer.links", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Href" />
          </div>
        ))}
      </Section>

      {/* ── Connect Page ── */}
      <Section title="Connect Sayfasi / Connect Page">
        <TextField label="Badge" value={content.connectPage.badge} onChange={(v) => update("connectPage.badge", v)} />
        <TextField label="Baslik Satir 1" value={content.connectPage.headingLine1} onChange={(v) => update("connectPage.headingLine1", v)} />
        <TextField label="Baslik Vurgu" value={content.connectPage.headingHighlight} onChange={(v) => update("connectPage.headingHighlight", v)} />
        <TextField label="Baslik Satir 3" value={content.connectPage.headingLine3} onChange={(v) => update("connectPage.headingLine3", v)} />
        <TextField label="Aciklama" value={content.connectPage.description} onChange={(v) => update("connectPage.description", v)} multiline />
        <TextField label="CTA Butonu" value={content.connectPage.ctaButton} onChange={(v) => update("connectPage.ctaButton", v)} />
        <TextField label="Ikincil Buton" value={content.connectPage.secondaryButton} onChange={(v) => update("connectPage.secondaryButton", v)} />
        <IconField label="Hero Ikon" value={content.connectPage.heroIcon} onChange={(v) => update("connectPage.heroIcon", v)} />

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Protokoller</h4>
        {content.connectPage.protocols.map((p, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">{p.icon}</span>
                <input
                  type="text"
                  value={p.icon}
                  onChange={(e) => { const ps = [...content.connectPage.protocols]; ps[i] = { ...ps[i], icon: e.target.value }; update("connectPage.protocols", ps); }}
                  className="w-40 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                  placeholder="Icon"
                />
              </div>
              <input
                type="text"
                value={p.title}
                onChange={(e) => { const ps = [...content.connectPage.protocols]; ps[i] = { ...ps[i], title: e.target.value }; update("connectPage.protocols", ps); }}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm"
                placeholder="Title"
              />
            </div>
            <textarea
              value={p.desc}
              onChange={(e) => { const ps = [...content.connectPage.protocols]; ps[i] = { ...ps[i], desc: e.target.value }; update("connectPage.protocols", ps); }}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y"
              rows={2}
              placeholder="Description"
            />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Mimari Bolumu / Architecture</h4>
        <TextField label="Baslik" value={content.connectPage.archHeading} onChange={(v) => update("connectPage.archHeading", v)} />
        <TextField label="Aciklama" value={content.connectPage.archDesc} onChange={(v) => update("connectPage.archDesc", v)} multiline />
        <TextField label="Durum Etiketi" value={content.connectPage.archStatusLabel} onChange={(v) => update("connectPage.archStatusLabel", v)} />
        <TextField label="Durum Degeri" value={content.connectPage.archStatusValue} onChange={(v) => update("connectPage.archStatusValue", v)} />
        <TextField label="Kanal Etiketi" value={content.connectPage.archChannelsLabel} onChange={(v) => update("connectPage.archChannelsLabel", v)} />
        <div className="mb-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Kanallar (virgul ile)
          </label>
          <input
            type="text"
            value={content.connectPage.archChannels.join(", ")}
            onChange={(e) => update("connectPage.archChannels", e.target.value.split(",").map((s) => s.trim()))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Giris Dugumuleri / Input Nodes</h4>
        {content.connectPage.archInputNodes.map((n, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">{n.icon}</span>
              <input type="text" value={n.icon} onChange={(e) => { const ns = [...content.connectPage.archInputNodes]; ns[i] = { ...ns[i], icon: e.target.value }; update("connectPage.archInputNodes", ns); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
            </div>
            <input type="text" value={n.label} onChange={(e) => { const ns = [...content.connectPage.archInputNodes]; ns[i] = { ...ns[i], label: e.target.value }; update("connectPage.archInputNodes", ns); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Cikis Dugumuleri / Output Nodes</h4>
        {content.connectPage.archOutputNodes.map((n, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">{n.icon}</span>
              <input type="text" value={n.icon} onChange={(e) => { const ns = [...content.connectPage.archOutputNodes]; ns[i] = { ...ns[i], icon: e.target.value }; update("connectPage.archOutputNodes", ns); }} className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
            </div>
            <input type="text" value={n.label} onChange={(e) => { const ns = [...content.connectPage.archOutputNodes]; ns[i] = { ...ns[i], label: e.target.value }; update("connectPage.archOutputNodes", ns); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Istatistikler / Stats</h4>
        {content.connectPage.stats.map((s, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-3 mb-1">
              <input type="text" value={s.value} onChange={(e) => { const ss = [...content.connectPage.stats]; ss[i] = { ...ss[i], value: e.target.value }; update("connectPage.stats", ss); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
              <input type="text" value={s.label} onChange={(e) => { const ss = [...content.connectPage.stats]; ss[i] = { ...ss[i], label: e.target.value }; update("connectPage.stats", ss); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            </div>
            <input type="text" value={s.desc} onChange={(e) => { const ss = [...content.connectPage.stats]; ss[i] = { ...ss[i], desc: e.target.value }; update("connectPage.stats", ss); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Description" />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">CTA Bolumu</h4>
        <TextField label="CTA Baslik" value={content.connectPage.ctaSectionHeading} onChange={(v) => update("connectPage.ctaSectionHeading", v)} />
        <TextField label="CTA Aciklama" value={content.connectPage.ctaSectionDesc} onChange={(v) => update("connectPage.ctaSectionDesc", v)} multiline />
        <TextField label="CTA Buton 1" value={content.connectPage.ctaSectionButton1} onChange={(v) => update("connectPage.ctaSectionButton1", v)} />
        <TextField label="CTA Buton 2" value={content.connectPage.ctaSectionButton2} onChange={(v) => update("connectPage.ctaSectionButton2", v)} />
      </Section>

      {/* ── References Page ── */}
      <Section title="Referanslar Sayfasi / References Page">
        <TextField label="Badge" value={content.referencesPage.badge} onChange={(v) => update("referencesPage.badge", v)} />
        <TextField label="Baslik" value={content.referencesPage.heading} onChange={(v) => update("referencesPage.heading", v)} />
        <TextField label="Aciklama" value={content.referencesPage.description} onChange={(v) => update("referencesPage.description", v)} multiline />

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Istatistikler / Stats (3)</h4>
        {content.referencesPage.stats.map((s, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-3 mb-1">
              <input type="text" value={s.value} onChange={(e) => { const ss = [...content.referencesPage.stats]; ss[i] = { ...ss[i], value: e.target.value }; update("referencesPage.stats", ss); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
              <input type="text" value={s.unit} onChange={(e) => { const ss = [...content.referencesPage.stats]; ss[i] = { ...ss[i], unit: e.target.value }; update("referencesPage.stats", ss); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Unit" />
              <input type="text" value={s.label} onChange={(e) => { const ss = [...content.referencesPage.stats]; ss[i] = { ...ss[i], label: e.target.value }; update("referencesPage.stats", ss); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            </div>
            <input type="text" value={s.desc} onChange={(e) => { const ss = [...content.referencesPage.stats]; ss[i] = { ...ss[i], desc: e.target.value }; update("referencesPage.stats", ss); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Description" />
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Vaka Analizleri / Case Studies (8)</h4>
        {content.referencesPage.caseStudies.map((cs, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-3 mb-1">
              <input type="text" value={cs.name} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], name: e.target.value }; update("referencesPage.caseStudies", arr); }} className="w-40 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Name" />
              <input type="text" value={cs.sector} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], sector: e.target.value }; update("referencesPage.caseStudies", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Sector" />
              <input type="text" value={cs.icon} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], icon: e.target.value }; update("referencesPage.caseStudies", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
            </div>
            <input type="text" value={cs.desc} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], desc: e.target.value }; update("referencesPage.caseStudies", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Description" />
            <div className="flex gap-3">
              <input type="text" value={cs.metricValue} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], metricValue: e.target.value }; update("referencesPage.caseStudies", arr); }} className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Metric" />
              <input type="text" value={cs.metricLabel} onChange={(e) => { const arr = [...content.referencesPage.caseStudies]; arr[i] = { ...arr[i], metricLabel: e.target.value }; update("referencesPage.caseStudies", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Metric Label" />
            </div>
          </div>
        ))}

        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">CTA Bolumu</h4>
        <TextField label="CTA Baslik" value={content.referencesPage.ctaHeading} onChange={(v) => update("referencesPage.ctaHeading", v)} />
        <TextField label="CTA Aciklama" value={content.referencesPage.ctaDesc} onChange={(v) => update("referencesPage.ctaDesc", v)} multiline />
        <TextField label="CTA Buton 1" value={content.referencesPage.ctaButton1} onChange={(v) => update("referencesPage.ctaButton1", v)} />
        <TextField label="CTA Buton 2" value={content.referencesPage.ctaButton2} onChange={(v) => update("referencesPage.ctaButton2", v)} />
      </Section>

      {/* ── Case Study Details ── */}
      {content.referencesPage.caseStudyDetails.map((detail, idx) => (
        <Section key={idx} title={`Vaka Detay ${idx + 1}: ${content.referencesPage.caseStudies[idx]?.name || idx}`}>
          <TextField label="Badge" value={detail.badge} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], badge: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <TextField label="Baslik / Title" value={detail.title} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], title: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <TextField label="Ozet Etiketi" value={detail.summaryLabel} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], summaryLabel: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Ozet Paragraflari</h4>
          {detail.summary.map((p: string, pi: number) => (
            <div key={pi} className="mb-2">
              <textarea value={p} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const sum = [...arr[idx].summary]; sum[pi] = e.target.value; arr[idx] = { ...arr[idx], summary: sum }; update("referencesPage.caseStudyDetails", arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder={`Paragraf ${pi + 1}`} />
            </div>
          ))}
          <TextField label="Moduller Etiketi" value={detail.modulesLabel} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], modulesLabel: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Moduller</h4>
          {detail.modules.map((mod: any, mi: number) => (
            <div key={mi} className="mb-2 p-3 bg-slate-50 rounded-lg">
              <div className="flex gap-2 mb-1">
                <input type="text" value={mod.icon} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const mods = [...arr[idx].modules]; mods[mi] = { ...mods[mi], icon: e.target.value }; arr[idx] = { ...arr[idx], modules: mods }; update("referencesPage.caseStudyDetails", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
                <input type="text" value={mod.name} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const mods = [...arr[idx].modules]; mods[mi] = { ...mods[mi], name: e.target.value }; arr[idx] = { ...arr[idx], modules: mods }; update("referencesPage.caseStudyDetails", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Name" />
              </div>
              <textarea value={mod.desc} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const mods = [...arr[idx].modules]; mods[mi] = { ...mods[mi], desc: e.target.value }; arr[idx] = { ...arr[idx], modules: mods }; update("referencesPage.caseStudyDetails", arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Desc" />
            </div>
          ))}
          <TextField label="Teknoloji Etiketi" value={detail.techLabel} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], techLabel: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Teknoloji Adimlari</h4>
          {detail.techSteps.map((step: any, si: number) => (
            <div key={si} className="mb-2 p-3 bg-slate-50 rounded-lg">
              <input type="text" value={step.title} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const steps = [...arr[idx].techSteps]; steps[si] = { ...steps[si], title: e.target.value }; arr[idx] = { ...arr[idx], techSteps: steps }; update("referencesPage.caseStudyDetails", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
              <textarea value={step.desc} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const steps = [...arr[idx].techSteps]; steps[si] = { ...steps[si], desc: e.target.value }; arr[idx] = { ...arr[idx], techSteps: steps }; update("referencesPage.caseStudyDetails", arr); }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Desc" />
            </div>
          ))}
          <TextField label="Sonuclar Etiketi" value={detail.resultsLabel} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], resultsLabel: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Sonuclar</h4>
          {detail.results.map((r: any, ri: number) => (
            <div key={ri} className="flex gap-3 mb-2">
              <input type="text" value={r.value} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const res = [...arr[idx].results]; res[ri] = { ...res[ri], value: e.target.value }; arr[idx] = { ...arr[idx], results: res }; update("referencesPage.caseStudyDetails", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />
              <input type="text" value={r.label} onChange={(e) => { const arr = [...content.referencesPage.caseStudyDetails]; const res = [...arr[idx].results]; res[ri] = { ...res[ri], label: e.target.value }; arr[idx] = { ...arr[idx], results: res }; update("referencesPage.caseStudyDetails", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />
            </div>
          ))}
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">CTA</h4>
          <TextField label="CTA Metni" value={detail.ctaText} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], ctaText: v }; update("referencesPage.caseStudyDetails", arr); }} />
          <TextField label="CTA Buton" value={detail.ctaButton} onChange={(v) => { const arr = [...content.referencesPage.caseStudyDetails]; arr[idx] = { ...arr[idx], ctaButton: v }; update("referencesPage.caseStudyDetails", arr); }} />
        </Section>
      ))}

      <Section title="Hakkimizda Sayfasi / About Page">
        <TextField label="Badge" value={content.aboutPage.badge} onChange={(v) => update("aboutPage.badge", v)} />
        <TextField label="Baslik / Heading" value={content.aboutPage.heading} onChange={(v) => update("aboutPage.heading", v)} />
        <TextField label="Baslik Vurgu / Highlight" value={content.aboutPage.headingHighlight} onChange={(v) => update("aboutPage.headingHighlight", v)} />
        <TextField label="Aciklama / Description" value={content.aboutPage.description} onChange={(v) => update("aboutPage.description", v)} multiline />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Vizyon & Misyon</h4>
        <TextField label="Vizyon Basligi" value={content.aboutPage.visionTitle} onChange={(v) => update("aboutPage.visionTitle", v)} />
        <TextField label="Vizyon Aciklamasi" value={content.aboutPage.visionDesc} onChange={(v) => update("aboutPage.visionDesc", v)} multiline />
        <TextField label="Misyon Basligi" value={content.aboutPage.missionTitle} onChange={(v) => update("aboutPage.missionTitle", v)} />
        <TextField label="Misyon Aciklamasi" value={content.aboutPage.missionDesc} onChange={(v) => update("aboutPage.missionDesc", v)} multiline />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Neden Biz</h4>
        <TextField label="Neden Biz Basligi" value={content.aboutPage.whyUsHeading} onChange={(v) => update("aboutPage.whyUsHeading", v)} />
        {content.aboutPage.whyUsCards.map((card, i) => (
          <div key={i} className="mb-3 p-3 bg-slate-50 rounded-lg">
            <div className="text-[10px] font-bold text-blue-500 uppercase mb-2">Kart {i + 1} ({card.type})</div>
            {card.title && <input type="text" value={card.title} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], title: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />}
            {card.label !== undefined && <input type="text" value={card.label || ""} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], label: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Label" />}
            {card.value && <input type="text" value={card.value} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], value: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-32 mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Value" />}
            <textarea value={card.desc} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], desc: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm resize-y" rows={2} placeholder="Description" />
            {card.buttonText && <input type="text" value={card.buttonText} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], buttonText: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-full mb-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Button Text" />}
            {card.icon && <input type="text" value={card.icon} onChange={(e) => { const arr = [...content.aboutPage.whyUsCards]; arr[i] = { ...arr[i], icon: e.target.value }; update("aboutPage.whyUsCards", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />}
          </div>
        ))}
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Ekip</h4>
        <TextField label="Ekip Basligi" value={content.aboutPage.teamHeading} onChange={(v) => update("aboutPage.teamHeading", v)} />
        <TextField label="Ekip Aciklamasi" value={content.aboutPage.teamDesc} onChange={(v) => update("aboutPage.teamDesc", v)} multiline />
        {content.aboutPage.teamMembers.map((m, i) => (
          <div key={i} className="mb-2 p-3 bg-slate-50 rounded-lg">
            <div className="flex gap-2 mb-1">
              <input type="text" value={m.title} onChange={(e) => { const arr = [...content.aboutPage.teamMembers]; arr[i] = { ...arr[i], title: e.target.value }; update("aboutPage.teamMembers", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Title" />
              <input type="text" value={m.subtitle} onChange={(e) => { const arr = [...content.aboutPage.teamMembers]; arr[i] = { ...arr[i], subtitle: e.target.value }; update("aboutPage.teamMembers", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Subtitle" />
            </div>
            <div className="flex gap-2">
              <input type="text" value={m.icon} onChange={(e) => { const arr = [...content.aboutPage.teamMembers]; arr[i] = { ...arr[i], icon: e.target.value }; update("aboutPage.teamMembers", arr); }} className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Icon" />
              <input type="text" value={m.hoverLabel} onChange={(e) => { const arr = [...content.aboutPage.teamMembers]; arr[i] = { ...arr[i], hoverLabel: e.target.value }; update("aboutPage.teamMembers", arr); }} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-sm" placeholder="Hover Label" />
            </div>
          </div>
        ))}
      </Section>

      <Section title="Iletisim Sayfasi / Contact Page">
        <TextField label="Baslik / Heading" value={content.contactPage2.heading} onChange={(v) => update("contactPage2.heading", v)} />
        <TextField label="Aciklama / Description" value={content.contactPage2.description} onChange={(v) => update("contactPage2.description", v)} multiline />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Iletisim Bilgileri / Contact Info</h4>
        <TextField label="Ofis Etiketi" value={content.contactPage2.officeLabel} onChange={(v) => update("contactPage2.officeLabel", v)} />
        <TextField label="Ofis Adresi" value={content.contactPage2.officeAddress} onChange={(v) => update("contactPage2.officeAddress", v)} multiline />
        <TextField label="Telefon Etiketi" value={content.contactPage2.phoneLabel} onChange={(v) => update("contactPage2.phoneLabel", v)} />
        <TextField label="Telefon Numarasi" value={content.contactPage2.phoneNumber} onChange={(v) => update("contactPage2.phoneNumber", v)} />
        <TextField label="E-posta Etiketi" value={content.contactPage2.emailLabel} onChange={(v) => update("contactPage2.emailLabel", v)} />
        <TextField label="E-posta Adresi" value={content.contactPage2.emailAddress} onChange={(v) => update("contactPage2.emailAddress", v)} />
        <TextField label="Alinti / Quote" value={content.contactPage2.quote} onChange={(v) => update("contactPage2.quote", v)} multiline />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Form Alanlari / Form Fields</h4>
        <TextField label="Ad Etiketi" value={content.contactPage2.formNameLabel} onChange={(v) => update("contactPage2.formNameLabel", v)} />
        <TextField label="Ad Placeholder" value={content.contactPage2.formNamePlaceholder} onChange={(v) => update("contactPage2.formNamePlaceholder", v)} />
        <TextField label="Sirket Etiketi" value={content.contactPage2.formCompanyLabel} onChange={(v) => update("contactPage2.formCompanyLabel", v)} />
        <TextField label="Sirket Placeholder" value={content.contactPage2.formCompanyPlaceholder} onChange={(v) => update("contactPage2.formCompanyPlaceholder", v)} />
        <TextField label="E-posta Etiketi" value={content.contactPage2.formEmailLabel} onChange={(v) => update("contactPage2.formEmailLabel", v)} />
        <TextField label="E-posta Placeholder" value={content.contactPage2.formEmailPlaceholder} onChange={(v) => update("contactPage2.formEmailPlaceholder", v)} />
        <TextField label="Mesaj Etiketi" value={content.contactPage2.formMessageLabel} onChange={(v) => update("contactPage2.formMessageLabel", v)} />
        <TextField label="Mesaj Placeholder" value={content.contactPage2.formMessagePlaceholder} onChange={(v) => update("contactPage2.formMessagePlaceholder", v)} />
        <TextField label="Gonder Butonu" value={content.contactPage2.formButton} onChange={(v) => update("contactPage2.formButton", v)} />
      </Section>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onUpdate(deepClone(DEFAULT_CONTENT[lang]))}
          className="px-5 py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          Bu Dili Sifirla / Reset This Language
        </button>
      </div>
    </div>
  );
}

// ─── Theme Editor ───────────────────────────────────────────────
function ThemeEditor({ theme, onUpdate }: { theme: ThemeConfig; onUpdate: (t: ThemeConfig) => void }) {
  const update = (section: keyof ThemeConfig, key: string, value: string) => {
    const t = deepClone(theme);
    (t[section] as any)[key] = value;
    onUpdate(t);
  };

  const colorGroups = [
    { title: "Ana Renkler / Primary", keys: ["primary", "primaryContainer", "onPrimary", "onPrimaryContainer"] },
    { title: "Ikincil / Secondary", keys: ["secondary", "secondaryContainer", "onSecondary", "onSecondaryContainer"] },
    { title: "Ucuncul / Tertiary", keys: ["tertiary", "tertiaryContainer", "onTertiary"] },
    { title: "Hata / Error", keys: ["error", "errorContainer", "onError"] },
    { title: "Yuzey / Surface", keys: ["surface", "surfaceDim", "surfaceBright", "surfaceContainer", "surfaceContainerLow", "surfaceContainerHigh", "surfaceContainerHighest", "surfaceContainerLowest", "onSurface", "onSurfaceVariant", "onBackground"] },
    { title: "Cizgi / Outline", keys: ["outline", "outlineVariant", "inverseSurface", "surfaceTint", "primaryFixed"] },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Renkler / Colors</h3>
      {colorGroups.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="grid grid-cols-2 gap-4">
            {group.keys.map((key) => (
              <ColorInput
                key={key}
                label={key}
                value={(theme.colors as any)[key]}
                onChange={(v) => update("colors", key, v)}
              />
            ))}
          </div>
        </Section>
      ))}

      <h3 className="text-lg font-bold text-slate-800 mb-4 mt-6">Fontlar / Fonts</h3>
      <Section title="Font Ayarlari" defaultOpen>
        <TextField
          label="Ana Font / Primary Font"
          value={theme.fonts.primary}
          onChange={(v) => update("fonts", "primary", v)}
        />
        <TextField
          label="Baslik Kalinligi / Heading Weight"
          value={theme.fonts.headingWeight}
          onChange={(v) => update("fonts", "headingWeight", v)}
        />
        <TextField
          label="Govde Kalinligi / Body Weight"
          value={theme.fonts.bodyWeight}
          onChange={(v) => update("fonts", "bodyWeight", v)}
        />
      </Section>

      <h3 className="text-lg font-bold text-slate-800 mb-4 mt-6">Bosluklar / Spacing</h3>
      <Section title="Bosluk Ayarlari" defaultOpen>
        {Object.entries(theme.spacing).map(([key, val]) => (
          <TextField
            key={key}
            label={key}
            value={val}
            onChange={(v) => update("spacing", key, v)}
          />
        ))}
      </Section>

      <div className="mt-6">
        <button
          onClick={() => onUpdate(deepClone(DEFAULT_THEME))}
          className="px-5 py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50"
        >
          Temayi Sifirla / Reset Theme
        </button>
      </div>
    </div>
  );
}

// ─── Image Upload Helper ────────────────────────────────────────
function ImageUploadField({ label, imageKey, imageUrl, onUpload }: { label: string; imageKey: string; imageUrl: string | undefined; onUpload: (key: string, url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onUpload(imageKey, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{label}</label>
      <div className="flex items-center gap-4">
        <div className="w-40 h-24 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={label} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-slate-300 material-symbols-outlined text-3xl">image</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
          >
            Gorsel Yukle / Upload
          </button>
          {imageUrl && (
            <button
              onClick={() => onUpload(imageKey, "")}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-100"
            >
              Kaldir / Remove
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    </div>
  );
}

// ─── Icon Upload (small square) ─────────────────────────────────
function IconUploadField({ label, imageKey, fallbackIcon, imageUrl, onUpload }: { label: string; imageKey: string; fallbackIcon: string; imageUrl: string | undefined; onUpload: (key: string, url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") onUpload(imageKey, reader.result); };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3 mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-8 h-8 object-contain" />
        ) : (
          <span className="material-symbols-outlined text-blue-600 text-xl">{fallbackIcon}</span>
        )}
      </div>
      <span className="text-xs font-medium text-slate-600 flex-1 min-w-0 truncate">{label}</span>
      <button onClick={() => fileRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shrink-0">
        Yukle
      </button>
      {imageUrl && (
        <button onClick={() => onUpload(imageKey, "")} className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-500 hover:bg-slate-100 shrink-0">
          Sil
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Media Editor ───────────────────────────────────────────────
function MediaEditor({ logoUrl, onLogoChange, images, onImageChange }: { logoUrl: string; onLogoChange: (url: string) => void; images: Record<string, string>; onImageChange: (key: string, url: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onLogoChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Section title="Logo" defaultOpen>
        <div className="flex items-center gap-6 mb-4">
          <div className="w-32 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 p-2">
            <img src={logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700">
              Logo Yukle / Upload Logo
            </button>
            <button onClick={() => onLogoChange("/logo.png")} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50">
              Varsayilana Don / Reset to Default
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
        <TextField label="Logo URL (veya data:URI)" value={logoUrl} onChange={onLogoChange} />
      </Section>

      {/* ── Hero / Buyuk Gorseller ── */}
      <Section title="Sayfa Hero Gorselleri / Page Hero Images">
        <p className="text-xs text-slate-500 mb-4">
          Her sayfa icin hero bolumunde gorunecek gorselleri yukleyin. Gorsel yuklemezseniz varsayilan ikon/animasyon gosterilir.
        </p>
        {[
          { key: "connectHero", label: "Connect Sayfasi Hero" },
          { key: "liveHero", label: "Live Sayfasi Hero" },
          { key: "optimaHero", label: "Optima Sayfasi Hero" },
          { key: "traceHero", label: "Trace Sayfasi Hero" },
          { key: "formsHero", label: "Forms Sayfasi Hero" },
          { key: "cncHero", label: "CNC Sayfasi Hero" },
          { key: "tmcHero", label: "TMC Sayfasi Hero" },
          { key: "integraHero", label: "Integra Sayfasi Hero" },
          { key: "energyHero", label: "Energy Sayfasi Hero" },
          { key: "coreHero", label: "Core Sayfasi Hero" },
        ].map((item) => (
          <ImageUploadField key={item.key} label={item.label} imageKey={item.key} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
      </Section>

      {/* ── Connect Page Gorselleri ── */}
      <Section title="Connect Sayfasi Gorselleri / Connect Page Visuals">
        <ImageUploadField label="Mimari Diyagram Gorseli (tum diyagrami degistirir)" imageKey="connect.archDiagram" imageUrl={images["connect.archDiagram"]} onUpload={onImageChange} />
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Ikonlar</h4>
        <IconUploadField label="Hero Ikon (sync_alt)" imageKey="connect.heroIcon" fallbackIcon="sync_alt" imageUrl={images["connect.heroIcon"]} onUpload={onImageChange} />
        <IconUploadField label="Merkezi Diyagram Ikonu" imageKey="connect.centralIcon" fallbackIcon="sync_alt" imageUrl={images["connect.centralIcon"]} onUpload={onImageChange} />
        {[
          { key: "connect.protocol0Icon", fallback: "settings_input_component", label: "Protokol 1: OPC-UA" },
          { key: "connect.protocol1Icon", fallback: "hub", label: "Protokol 2: MQTT" },
          { key: "connect.protocol2Icon", fallback: "precision_manufacturing", label: "Protokol 3: Modbus" },
          { key: "connect.protocol3Icon", fallback: "memory", label: "Protokol 4: Edge" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
        {[
          { key: "connect.inputNode0Icon", fallback: "precision_manufacturing", label: "Giris Dugumu: PLC" },
          { key: "connect.inputNode1Icon", fallback: "sensors", label: "Giris Dugumu: Sensors" },
          { key: "connect.inputNode2Icon", fallback: "router", label: "Giris Dugumu: Gateway" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
        {[
          { key: "connect.outputNode0Icon", fallback: "analytics", label: "Cikis Dugumu: Unified Stream" },
          { key: "connect.outputNode1Icon", fallback: "cloud_done", label: "Cikis Dugumu: SCADA/ERP" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
      </Section>

      {/* ── Mega Menu Ikonlari ── */}
      <Section title="Mega Menu Ikonlari">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Ozellik Ikonlari</h4>
        {[
          { key: "megaMenu.feature0Icon", fallback: "speed", label: "Ozellik 1: Real-time" },
          { key: "megaMenu.feature1Icon", fallback: "security", label: "Ozellik 2: Security" },
          { key: "megaMenu.feature2Icon", fallback: "cloud", label: "Ozellik 3: Cloud" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
        <h4 className="text-xs font-bold text-slate-500 uppercase mt-4 mb-2">Modul Ikonlari (10)</h4>
        {[
          { key: "megaMenu.module0Icon", fallback: "settings_input_component", label: "Connect" },
          { key: "megaMenu.module1Icon", fallback: "stream", label: "Live" },
          { key: "megaMenu.module2Icon", fallback: "analytics", label: "Optima" },
          { key: "megaMenu.module3Icon", fallback: "location_on", label: "Trace" },
          { key: "megaMenu.module4Icon", fallback: "description", label: "Forms" },
          { key: "megaMenu.module5Icon", fallback: "precision_manufacturing", label: "CNC" },
          { key: "megaMenu.module6Icon", fallback: "memory", label: "TMC" },
          { key: "megaMenu.module7Icon", fallback: "hub", label: "Integra" },
          { key: "megaMenu.module8Icon", fallback: "bolt", label: "Energy" },
          { key: "megaMenu.module9Icon", fallback: "admin_panel_settings", label: "Core" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
      </Section>

      {/* ── OEE Ekrani Ikonlari ── */}
      <Section title="OEE Ekrani Ikonlari (Ekran 2)">
        <IconUploadField label="Sorgu Ikonu" imageKey="oee.queryIcon" fallbackIcon="psychology_alt" imageUrl={images["oee.queryIcon"]} onUpload={onImageChange} />
        <IconUploadField label="Ozellik 1 Ikonu" imageKey="oee.feature1Icon" fallbackIcon="check_circle" imageUrl={images["oee.feature1Icon"]} onUpload={onImageChange} />
        <IconUploadField label="Ozellik 2 Ikonu" imageKey="oee.feature2Icon" fallbackIcon="trending_up" imageUrl={images["oee.feature2Icon"]} onUpload={onImageChange} />
        <IconUploadField label="KPI 1 Ikonu (Uretim)" imageKey="oee.kpi0Icon" fallbackIcon="inventory_2" imageUrl={images["oee.kpi0Icon"]} onUpload={onImageChange} />
        <IconUploadField label="KPI 2 Ikonu (Durus)" imageKey="oee.kpi1Icon" fallbackIcon="timer_off" imageUrl={images["oee.kpi1Icon"]} onUpload={onImageChange} />
        <IconUploadField label="KPI 3 Ikonu (Hiz)" imageKey="oee.kpi2Icon" fallbackIcon="speed" imageUrl={images["oee.kpi2Icon"]} onUpload={onImageChange} />
      </Section>

      {/* ── Durus Ekrani Ikonlari ── */}
      <Section title="Durus Analizi Ikonlari (Ekran 3)">
        <IconUploadField label="Baslik Ikonu (Warning)" imageKey="downtime.headerIcon" fallbackIcon="warning" imageUrl={images["downtime.headerIcon"]} onUpload={onImageChange} />
        <IconUploadField label="Canli Yayın Ikonu" imageKey="downtime.liveIcon" fallbackIcon="videocam" imageUrl={images["downtime.liveIcon"]} onUpload={onImageChange} />
        <IconUploadField label="AI Onerisi Ikonu" imageKey="downtime.aiIcon" fallbackIcon="auto_awesome" imageUrl={images["downtime.aiIcon"]} onUpload={onImageChange} />
      </Section>

      {/* ── Trace Ekrani Ikonlari ── */}
      <Section title="Birim Takip Ikonlari (Ekran 4)">
        <IconUploadField label="Baslik Ikonu (QR)" imageKey="trace.headerIcon" fallbackIcon="qr_code_scanner" imageUrl={images["trace.headerIcon"]} onUpload={onImageChange} />
        <IconUploadField label="Adim 1: Frezeleme" imageKey="trace.step0Icon" fallbackIcon="precision_manufacturing" imageUrl={images["trace.step0Icon"]} onUpload={onImageChange} />
        <IconUploadField label="Adim 2: Montaj" imageKey="trace.step1Icon" fallbackIcon="settings_input_component" imageUrl={images["trace.step1Icon"]} onUpload={onImageChange} />
        <IconUploadField label="Adim 3: Kalite" imageKey="trace.step2Icon" fallbackIcon="fact_check" imageUrl={images["trace.step2Icon"]} onUpload={onImageChange} />
        <IconUploadField label="Adim 4: Paketleme" imageKey="trace.step3Icon" fallbackIcon="inventory_2" imageUrl={images["trace.step3Icon"]} onUpload={onImageChange} />
        <IconUploadField label="Kalite Durum Ikonu" imageKey="trace.qualityIcon" fallbackIcon="check_circle" imageUrl={images["trace.qualityIcon"]} onUpload={onImageChange} />
      </Section>

      {/* ── Moduller Ekrani Ikonlari ── */}
      <Section title="Moduller Ekrani Ikonlari (Ekran 5)">
        {[
          { key: "modules.card0Icon", fallback: "factory", label: "Modul 1: Uretim Kontrolu" },
          { key: "modules.card1Icon", fallback: "inventory_2", label: "Modul 2: Envanter" },
          { key: "modules.card2Icon", fallback: "verified", label: "Modul 3: Kalite" },
          { key: "modules.card3Icon", fallback: "engineering", label: "Modul 4: Bakim" },
          { key: "modules.card4Icon", fallback: "warehouse", label: "Modul 5: Depo" },
          { key: "modules.card5Icon", fallback: "analytics", label: "Modul 6: Analitik" },
          { key: "modules.settingsIcon", fallback: "settings", label: "Sistem Ayarlari Ikonu" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
      </Section>

      {/* ── Yan Menu Ikonlari ── */}
      <Section title="Yan Menu Ikonlari (SideNav)">
        {[
          { key: "sideNav.item0Icon", fallback: "dashboard", label: "Menu 1: Panel" },
          { key: "sideNav.item1Icon", fallback: "analytics", label: "Menu 2: Analitik" },
          { key: "sideNav.item2Icon", fallback: "factory", label: "Menu 3: Varliklar" },
          { key: "sideNav.item3Icon", fallback: "precision_manufacturing", label: "Menu 4: Zaman Cizelgesi" },
          { key: "sideNav.item4Icon", fallback: "description", label: "Menu 5: Raporlar" },
        ].map((item) => (
          <IconUploadField key={item.key} label={item.label} imageKey={item.key} fallbackIcon={item.fallback} imageUrl={images[item.key]} onUpload={onImageChange} />
        ))}
      </Section>

      {/* ── Module Page Icons & Showcase Images ── */}
      {([
        { moduleKey: "live", title: "Live Sayfasi", heroFallback: "stream", features: ["stream", "notifications_active", "dashboard_customize", "speed"] },
        { moduleKey: "optima", title: "Optima Sayfasi", heroFallback: "analytics", features: ["analytics", "auto_awesome", "inventory_2", "trending_up"] },
        { moduleKey: "traceModule", title: "Trace Sayfasi", heroFallback: "location_on", features: ["qr_code_scanner", "account_tree", "verified", "history"] },
        { moduleKey: "forms", title: "Forms Sayfasi", heroFallback: "description", features: ["edit_note", "rule", "phone_android", "analytics"] },
        { moduleKey: "cnc", title: "CNC Sayfasi", heroFallback: "precision_manufacturing", features: ["precision_manufacturing", "build", "memory", "speed"] },
        { moduleKey: "integra", title: "Integra Sayfasi", heroFallback: "hub", features: ["hub", "sync", "api", "cloud_sync"] },
        { moduleKey: "energy", title: "Energy Sayfasi", heroFallback: "bolt", features: ["bolt", "electric_meter", "eco", "query_stats"] },
        { moduleKey: "tmc", title: "TMC Sayfasi", heroFallback: "settings_input_component", features: ["schema", "speed", "hub", "memory"] },
        { moduleKey: "core", title: "Core Sayfasi", heroFallback: "shield", features: ["sync", "key", "encrypted", "gavel"] },
      ]).map(({ moduleKey, title, heroFallback, features }) => (
        <Section key={moduleKey} title={`${title} Ikonlari & Gorseller`}>
          <IconUploadField label="Hero Ikonu" imageKey={`${moduleKey}.heroIcon`} fallbackIcon={heroFallback} imageUrl={images[`${moduleKey}.heroIcon`]} onUpload={onImageChange} />
          <ImageUploadField label="Showcase Gorseli (tum showcase'i degistirir)" imageKey={`${moduleKey}.showcase`} imageUrl={images[`${moduleKey}.showcase`]} onUpload={onImageChange} />
          <h4 className="text-xs font-bold text-slate-500 uppercase mt-2 mb-2">Ozellik Ikonlari</h4>
          {features.map((fallback, i) => (
            <IconUploadField key={i} label={`Ozellik ${i + 1}`} imageKey={`${moduleKey}.feature${i}Icon`} fallbackIcon={fallback} imageUrl={images[`${moduleKey}.feature${i}Icon`]} onUpload={onImageChange} />
          ))}
        </Section>
      ))}

      {/* ── Referanslar Sayfa Logolari ── */}
      <Section title="Referanslar Sayfasi Logolari / Reference Logos">
        <p className="text-xs text-slate-500 mb-4">
          Her referans icin firma logosu yukleyin. Yuklemezseniz varsayilan ikon gosterilir.
        </p>
        {["AeroSystems", "TechAuto", "GlobalFood", "PrecisionCraft", "BioChem Pharma", "VoltGrid", "LogiCenter", "HeavyConstruct"].map((name, i) => (
          <ImageUploadField key={i} label={`${name} Logo`} imageKey={`ref.logo${i}`} imageUrl={images[`ref.logo${i}`]} onUpload={onImageChange} />
        ))}
      </Section>
    </div>
  );
}

// ─── Main Admin Panel ───────────────────────────────────────────
export default function AdminPanel() {
  const { lang, setLang, allContent, updateContent, theme, updateTheme, resetAll, logoUrl, setLogoUrl, images, setImage } = useConfig();
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [editLang, setEditLang] = useState<Lang>(lang);

  // Override body/root overflow:hidden so admin can scroll
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    const root = document.getElementById("root");
    if (root) {
      root.style.overflow = "auto";
      root.style.height = "auto";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      if (root) {
        root.style.overflow = "";
        root.style.height = "";
      }
    };
  }, []);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "content", label: "Icerik / Content", icon: "edit_note" },
    { id: "theme", label: "Tema / Theme", icon: "palette" },
    { id: "media", label: "Medya / Media", icon: "image" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 text-2xl">admin_panel_settings</span>
            <h1 className="text-lg font-bold text-slate-800">OnSuite Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="px-4 py-2 rounded-lg bg-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-200 flex items-center gap-1.5"
              onClick={(e) => { e.preventDefault(); window.location.hash = ""; window.location.reload(); }}
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              Onizleme / Preview
            </a>
            <button
              onClick={resetAll}
              className="px-4 py-2 rounded-lg border border-red-200 text-sm font-bold text-red-600 hover:bg-red-50"
            >
              Tumunu Sifirla / Reset All
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-200 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            {/* Language selector */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
              <span className="text-sm font-bold text-slate-500">Dil / Language:</span>
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                {(["tr", "en", "ro"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setEditLang(l); setLang(l); }}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                      editLang === l
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>

            <ContentEditor
              lang={editLang}
              content={allContent[editLang]}
              onUpdate={(c) => updateContent(editLang, c)}
            />
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === "theme" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <ThemeEditor theme={theme} onUpdate={updateTheme} />
          </div>
        )}

        {/* Media Tab */}
        {activeTab === "media" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <MediaEditor logoUrl={logoUrl} onLogoChange={setLogoUrl} images={images} onImageChange={setImage} />
          </div>
        )}
      </div>
    </div>
  );
}
