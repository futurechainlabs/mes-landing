import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { DEFAULT_CONTENT, type Lang, type SiteContent } from "./content";
import { DEFAULT_THEME, type ThemeConfig } from "./theme";

interface ConfigContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  content: SiteContent;
  allContent: Record<Lang, SiteContent>;
  updateContent: (lang: Lang, content: SiteContent) => void;
  theme: ThemeConfig;
  updateTheme: (theme: ThemeConfig) => void;
  resetAll: () => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  images: Record<string, string>;
  setImage: (key: string, url: string) => void;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

const STORAGE_KEYS = {
  lang: "onsuite-lang",
  content: "onsuite-content",
  theme: "onsuite-theme",
  logo: "onsuite-logo",
  images: "onsuite-images",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

/** Deep-merge stored content with defaults so new fields are never missing. */
function mergeContent(stored: Record<Lang, SiteContent>, defaults: Record<Lang, SiteContent>): Record<Lang, SiteContent> {
  const result = {} as Record<Lang, SiteContent>;
  for (const lang of ["tr", "en", "ro"] as Lang[]) {
    result[lang] = deepMerge(defaults[lang], stored[lang] ?? {});
  }
  return result;
}

function deepMerge<T extends Record<string, any>>(base: T, override: Record<string, any>): T {
  const out = { ...base } as any;
  for (const key of Object.keys(base)) {
    if (override[key] === undefined) continue;
    if (
      base[key] !== null &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key]) &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key])
    ) {
      out[key] = deepMerge(base[key], override[key]);
    } else {
      out[key] = override[key];
    }
  }
  return out;
}

function applyThemeToCSS(theme: ThemeConfig) {
  const root = document.documentElement;
  const map: Record<string, string> = {
    "--color-primary": theme.colors.primary,
    "--color-primary-container": theme.colors.primaryContainer,
    "--color-on-primary": theme.colors.onPrimary,
    "--color-on-primary-container": theme.colors.onPrimaryContainer,
    "--color-secondary": theme.colors.secondary,
    "--color-secondary-container": theme.colors.secondaryContainer,
    "--color-on-secondary": theme.colors.onSecondary,
    "--color-on-secondary-container": theme.colors.onSecondaryContainer,
    "--color-tertiary": theme.colors.tertiary,
    "--color-tertiary-container": theme.colors.tertiaryContainer,
    "--color-on-tertiary": theme.colors.onTertiary,
    "--color-error": theme.colors.error,
    "--color-error-container": theme.colors.errorContainer,
    "--color-on-error": theme.colors.onError,
    "--color-surface": theme.colors.surface,
    "--color-surface-dim": theme.colors.surfaceDim,
    "--color-surface-bright": theme.colors.surfaceBright,
    "--color-surface-container": theme.colors.surfaceContainer,
    "--color-surface-container-low": theme.colors.surfaceContainerLow,
    "--color-surface-container-high": theme.colors.surfaceContainerHigh,
    "--color-surface-container-highest": theme.colors.surfaceContainerHighest,
    "--color-surface-container-lowest": theme.colors.surfaceContainerLowest,
    "--color-on-surface": theme.colors.onSurface,
    "--color-on-surface-variant": theme.colors.onSurfaceVariant,
    "--color-on-background": theme.colors.onBackground,
    "--color-outline": theme.colors.outline,
    "--color-outline-variant": theme.colors.outlineVariant,
    "--color-inverse-surface": theme.colors.inverseSurface,
    "--color-surface-tint": theme.colors.surfaceTint,
    "--color-primary-fixed": theme.colors.primaryFixed,
  };
  for (const [prop, val] of Object.entries(map)) {
    root.style.setProperty(prop, val);
  }
  root.style.setProperty("--font-family-inter", theme.fonts.primary);
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    loadFromStorage<Lang>(STORAGE_KEYS.lang, "tr")
  );
  const [allContent, setAllContent] = useState<Record<Lang, SiteContent>>(() => {
    const stored = loadFromStorage<Record<Lang, SiteContent> | null>(STORAGE_KEYS.content, null);
    if (!stored) return DEFAULT_CONTENT;
    return mergeContent(stored, DEFAULT_CONTENT);
  });
  const [theme, setTheme] = useState<ThemeConfig>(() =>
    loadFromStorage(STORAGE_KEYS.theme, DEFAULT_THEME)
  );
  const [logoUrl, setLogoUrlState] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.logo, `${import.meta.env.BASE_URL}logo.png`)
  );
  const [images, setImagesState] = useState<Record<string, string>>(() =>
    loadFromStorage(STORAGE_KEYS.images, {})
  );

  // Apply theme on mount and changes
  useEffect(() => {
    applyThemeToCSS(theme);
  }, [theme]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEYS.lang, JSON.stringify(l));
  };

  const updateContent = (l: Lang, c: SiteContent) => {
    setAllContent((prev) => {
      const next = { ...prev, [l]: c };
      localStorage.setItem(STORAGE_KEYS.content, JSON.stringify(next));
      return next;
    });
  };

  const updateTheme = (t: ThemeConfig) => {
    setTheme(t);
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(t));
  };

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);
    localStorage.setItem(STORAGE_KEYS.logo, JSON.stringify(url));
  };

  const setImage = (key: string, url: string) => {
    setImagesState((prev) => {
      const next = { ...prev, [key]: url };
      localStorage.setItem(STORAGE_KEYS.images, JSON.stringify(next));
      return next;
    });
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEYS.content);
    localStorage.removeItem(STORAGE_KEYS.theme);
    localStorage.removeItem(STORAGE_KEYS.logo);
    localStorage.removeItem(STORAGE_KEYS.lang);
    localStorage.removeItem(STORAGE_KEYS.images);
    setAllContent(DEFAULT_CONTENT);
    setTheme(DEFAULT_THEME);
    setLogoUrlState(`${import.meta.env.BASE_URL}logo.png`);
    setImagesState({});
    setLangState("tr");
    applyThemeToCSS(DEFAULT_THEME);
  };

  return (
    <ConfigContext.Provider
      value={{
        lang,
        setLang,
        content: allContent[lang],
        allContent,
        updateContent,
        theme,
        updateTheme,
        resetAll,
        logoUrl,
        setLogoUrl,
        images,
        setImage,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used within ConfigProvider");
  return ctx;
}
