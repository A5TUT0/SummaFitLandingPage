export type Locale = "en" | "es" | "de" | "fr" | "it";

export type LandingCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  availability: string;
  qrDialogEyebrow: string;
  qrDialogTitle: string;
  qrDialogDescription: string;
  qrDialogLinkLabel: string;
  qrDialogCopy: string;
  qrDialogCopied: string;
  qrDialogQrAlt: string;
  privacyPolicy: string;
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
    qrDialogEyebrow: "Quick iPhone install",
    qrDialogTitle: "Install SummaFit with this QR",
    qrDialogDescription: "Scan this QR with your iPhone camera to open SummaFit in the App Store.",
    qrDialogLinkLabel: "App Store link",
    qrDialogCopy: "Copy link",
    qrDialogCopied: "Copied",
    qrDialogQrAlt: "QR code to install SummaFit from the App Store",
    privacyPolicy: "Privacy Policy",
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
    qrDialogEyebrow: "Instalación rápida en iPhone",
    qrDialogTitle: "Instala SummaFit con este QR",
    qrDialogDescription: "Escanea este QR con la cámara de tu iPhone para abrir SummaFit en el App Store.",
    qrDialogLinkLabel: "Link del App Store",
    qrDialogCopy: "Copiar link",
    qrDialogCopied: "Copiado",
    qrDialogQrAlt: "Código QR para instalar SummaFit desde el App Store",
    privacyPolicy: "Política de privacidad",
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
    qrDialogEyebrow: "Schnell aufs iPhone",
    qrDialogTitle: "Installiere SummaFit mit diesem QR-Code",
    qrDialogDescription: "Scanne diesen QR-Code mit deiner iPhone-Kamera, um SummaFit im App Store zu öffnen.",
    qrDialogLinkLabel: "App Store Link",
    qrDialogCopy: "Link kopieren",
    qrDialogCopied: "Kopiert",
    qrDialogQrAlt: "QR-Code zur Installation von SummaFit aus dem App Store",
    privacyPolicy: "Datenschutzerklärung",
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
    qrDialogEyebrow: "Installation rapide sur iPhone",
    qrDialogTitle: "Installez SummaFit avec ce QR code",
    qrDialogDescription: "Scannez ce QR code avec l'appareil photo de votre iPhone pour ouvrir SummaFit dans l'App Store.",
    qrDialogLinkLabel: "Lien App Store",
    qrDialogCopy: "Copier le lien",
    qrDialogCopied: "Copié",
    qrDialogQrAlt: "QR code pour installer SummaFit depuis l'App Store",
    privacyPolicy: "Politique de confidentialité",
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
    qrDialogEyebrow: "Installazione rapida su iPhone",
    qrDialogTitle: "Installa SummaFit con questo QR",
    qrDialogDescription: "Scansiona questo QR con la fotocamera del tuo iPhone per aprire SummaFit sull'App Store.",
    qrDialogLinkLabel: "Link App Store",
    qrDialogCopy: "Copia link",
    qrDialogCopied: "Copiato",
    qrDialogQrAlt: "Codice QR per installare SummaFit dall'App Store",
    privacyPolicy: "Informativa sulla privacy",
    seoTitle: "SummaFit | Scansiona. Registra. Migliora.",
    seoDescription:
      "SummaFit è un'app gratuita per iPhone per seguire nutrizione quotidiana: calorie, macro, acqua, scanner alimentare, progressi e Apple Health.",
    heroAlt: "Dashboard SummaFit su iPhone con calorie, macro, acqua e progressi",
  },
};
