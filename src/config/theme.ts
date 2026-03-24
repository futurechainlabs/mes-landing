export interface ThemeConfig {
  colors: {
    primary: string;
    primaryContainer: string;
    onPrimary: string;
    onPrimaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    onSecondary: string;
    onSecondaryContainer: string;
    tertiary: string;
    tertiaryContainer: string;
    onTertiary: string;
    error: string;
    errorContainer: string;
    onError: string;
    surface: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainer: string;
    surfaceContainerLow: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    surfaceContainerLowest: string;
    onSurface: string;
    onSurfaceVariant: string;
    onBackground: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    surfaceTint: string;
    primaryFixed: string;
  };
  fonts: {
    primary: string;
    headingWeight: string;
    bodyWeight: string;
  };
  spacing: {
    topNavHeight: string;
    sideNavWidth: string;
    sideNavExpandedWidth: string;
    bottomBarMaxWidth: string;
    cardBorderRadius: string;
    containerMaxWidth: string;
  };
}

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "#004e9f",
    primaryContainer: "#0066cc",
    onPrimary: "#ffffff",
    onPrimaryContainer: "#dfe8ff",
    secondary: "#495f87",
    secondaryContainer: "#b9cffd",
    onSecondary: "#ffffff",
    onSecondaryContainer: "#425880",
    tertiary: "#883700",
    tertiaryContainer: "#af4900",
    onTertiary: "#ffffff",
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
    onError: "#ffffff",
    surface: "#f8f9fa",
    surfaceDim: "#d9dadb",
    surfaceBright: "#f8f9fa",
    surfaceContainer: "#edeeef",
    surfaceContainerLow: "#f3f4f5",
    surfaceContainerHigh: "#e7e8e9",
    surfaceContainerHighest: "#e1e3e4",
    surfaceContainerLowest: "#ffffff",
    onSurface: "#191c1d",
    onSurfaceVariant: "#414753",
    onBackground: "#191c1d",
    outline: "#727784",
    outlineVariant: "#c1c6d5",
    inverseSurface: "#2e3132",
    surfaceTint: "#005cba",
    primaryFixed: "#d7e3ff",
  },
  fonts: {
    primary: '"Inter", system-ui, sans-serif',
    headingWeight: "800",
    bodyWeight: "400",
  },
  spacing: {
    topNavHeight: "64px",
    sideNavWidth: "72px",
    sideNavExpandedWidth: "224px",
    bottomBarMaxWidth: "768px",
    cardBorderRadius: "12px",
    containerMaxWidth: "1152px",
  },
};
