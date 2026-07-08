export type Locale = "en" | "es" | "de" | "fr" | "it";

export type LandingCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  availability: string;
  seoTitle: string;
  seoDescription: string;
  heroAlt: string;
};

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "de", "fr", "it"];

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
};

export const COPY: Record<Locale, LandingCopy> = {
  en: {
    eyebrow: "Free nutrition tracking on iPhone",
    title: "Scan. Track. Transform.",
    subtitle: "SummaFit helps you track calories, macros, water, and daily progress without noise.",
    cta: "Install for free",
    availability: "Free for iPhone",
    seoTitle: "SummaFit | Scan. Track. Transform.",
    seoDescription:
      "SummaFit is a free iPhone app for daily nutrition tracking: calories, macros, hydration, barcode scanning, progress, and Apple Health.",
    heroAlt: "SummaFit iPhone dashboard with calories, macros, hydration, and progress",
  },
  es: {
    eyebrow: "Nutrición gratis en iPhone",
    title: "Escanea. Registra. Avanza.",
    subtitle: "SummaFit te ayuda a llevar calorías, macros, agua y progreso diario sin ruido.",
    cta: "Instalar gratis",
    availability: "Gratis para iPhone",
    seoTitle: "SummaFit | Escanea. Registra. Avanza.",
    seoDescription:
      "SummaFit es una app gratis para iPhone para llevar nutrición diaria: calorías, macros, agua, escáner de alimentos, progreso y Apple Health.",
    heroAlt: "Panel de SummaFit en iPhone con calorías, macros, agua y progreso",
  },
  de: {
    eyebrow: "Kostenloses Tracking auf dem iPhone",
    title: "Scannen. Erfassen. Vorankommen.",
    subtitle: "SummaFit hilft dir, Kalorien, Makros, Wasser und Fortschritt ohne Lärm zu verfolgen.",
    cta: "Kostenlos installieren",
    availability: "Kostenlos für iPhone",
    seoTitle: "SummaFit | Scannen. Erfassen. Vorankommen.",
    seoDescription:
      "SummaFit ist eine kostenlose iPhone-App für tägliches Nutrition Tracking: Kalorien, Makros, Wasser, Barcode-Scanner, Fortschritt und Apple Health.",
    heroAlt: "SummaFit iPhone Dashboard mit Kalorien, Makros, Wasser und Fortschritt",
  },
  fr: {
    eyebrow: "Suivi nutrition gratuit sur iPhone",
    title: "Scannez. Suivez. Progressez.",
    subtitle: "SummaFit vous aide à suivre calories, macros, eau et progrès quotidien sans bruit.",
    cta: "Installer gratuitement",
    availability: "Gratuit pour iPhone",
    seoTitle: "SummaFit | Scannez. Suivez. Progressez.",
    seoDescription:
      "SummaFit est une app iPhone gratuite pour suivre la nutrition quotidienne: calories, macros, eau, scan alimentaire, progrès et Apple Health.",
    heroAlt: "Tableau de bord SummaFit sur iPhone avec calories, macros, eau et progrès",
  },
  it: {
    eyebrow: "Tracking nutrizionale gratis su iPhone",
    title: "Scansiona. Registra. Migliora.",
    subtitle: "SummaFit ti aiuta a seguire calorie, macro, acqua e progressi quotidiani senza rumore.",
    cta: "Installa gratis",
    availability: "Gratis per iPhone",
    seoTitle: "SummaFit | Scansiona. Registra. Migliora.",
    seoDescription:
      "SummaFit è un'app gratuita per iPhone per seguire nutrizione quotidiana: calorie, macro, acqua, scanner alimentare, progressi e Apple Health.",
    heroAlt: "Dashboard SummaFit su iPhone con calorie, macro, acqua e progressi",
  },
};
