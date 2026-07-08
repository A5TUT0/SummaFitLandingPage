export type Locale = "en" | "es" | "fr";

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

export type LegalSection = {
  title: string;
  body: string[];
};

export type LegalCopy = {
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  updatedLabel: string;
  updatedAt: string;
  summaryLabel: string;
  summaryItems: Array<{
    term: string;
    detail: string;
  }>;
  sections: LegalSection[];
  note: string;
  languageLabel: string;
  homeLabel: string;
};

export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "fr"];

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

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
};

export const LEGAL_COPY: Record<Locale, LegalCopy> = {
  en: {
    pageTitle: "Privacy Policy | SummaFit",
    metaDescription:
      "SummaFit privacy policy for local-first nutrition tracking, Apple Health permissions, barcode lookup, exports, and deletion.",
    eyebrow: "Privacy Policy",
    heading: "Privacy for a local-first nutrition app.",
    intro:
      "SummaFit is designed to keep your tracking data close to you. This policy explains what the app stores, when it contacts outside services, and how you can export or delete your data.",
    updatedLabel: "Effective date",
    updatedAt: "July 9, 2026",
    summaryLabel: "At a glance",
    summaryItems: [
      { term: "Data model", detail: "Local-first" },
      { term: "Health access", detail: "Optional Apple Health permissions" },
      { term: "Barcode lookup", detail: "Open Food Facts when you scan" },
      { term: "Sale of data", detail: "None" },
    ],
    sections: [
      {
        title: "What SummaFit stores",
        body: [
          "SummaFit stores your profile settings, nutrition targets, food logs, water logs, weight entries, favorites, recent foods, app preferences, reminder settings, and product corrections on your device.",
          "Your profile is protected with AES-GCM before it is saved. Other app history is stored locally in the iOS app sandbox and is not uploaded to SummaFit servers.",
        ],
      },
      {
        title: "Health data",
        body: [
          "Apple Health integration is optional. If you grant permission, SummaFit can read steps, active energy, body mass, and walking or running distance, and can write body mass, dietary energy, and water entries.",
          "Health data is used only to power app features you request. You can manage or revoke Health permissions in the iOS Health app or iOS Settings.",
        ],
      },
      {
        title: "Food search and barcode scans",
        body: [
          "When you scan a barcode, SummaFit may contact Open Food Facts to retrieve public product information for that barcode. The request can include the barcode and standard network information such as IP address and user agent.",
          "Manual food entries and corrections you create are kept locally on your device unless you choose to export or share them.",
        ],
      },
      {
        title: "Notifications",
        body: [
          "If you enable reminders, SummaFit schedules local notifications on your device for meals, hydration, weight logging, or inactivity nudges.",
          "These reminders are managed locally and do not require SummaFit to run a notification server.",
        ],
      },
      {
        title: "Exporting and deleting data",
        body: [
          "You can export your personal data from Settings as a JSON file. The file is created on your device so you can save or share it yourself.",
          "You can also clear your app data from Settings. Deleting the app may remove locally stored SummaFit data according to iOS behavior.",
        ],
      },
      {
        title: "Third parties",
        body: [
          "SummaFit does not sell your personal information. The app relies on Apple platform services and may use Open Food Facts for barcode product lookup.",
          "If you open the App Store, Apple handles that interaction under Apple's own terms and privacy policy.",
        ],
      },
      {
        title: "Contact",
        body: [
          "For privacy questions, data requests, or corrections to this policy, contact SummaFit at privacy@summa.fit.",
          "This policy may be updated as SummaFit changes. The latest version will be available at https://summa.fit/en/policy.",
        ],
      },
    ],
    note: "This page is provided for transparency and App Store review. It is not a substitute for legal advice for your individual situation.",
    languageLabel: "Language",
    homeLabel: "Home",
  },
  es: {
    pageTitle: "Política de privacidad | SummaFit",
    metaDescription:
      "Política de privacidad de SummaFit para seguimiento nutricional local, permisos de Apple Health, búsqueda por código de barras, exportación y eliminación de datos.",
    eyebrow: "Política de privacidad",
    heading: "Privacidad para una app de nutrición local-first.",
    intro:
      "SummaFit está diseñada para mantener tus datos de seguimiento cerca de ti. Esta política explica qué guarda la app, cuándo contacta servicios externos y cómo puedes exportar o eliminar tus datos.",
    updatedLabel: "Fecha de entrada en vigor",
    updatedAt: "9 de julio de 2026",
    summaryLabel: "Resumen",
    summaryItems: [
      { term: "Modelo de datos", detail: "Primero local" },
      { term: "Acceso a salud", detail: "Permisos opcionales de Apple Health" },
      { term: "Códigos de barras", detail: "Open Food Facts al escanear" },
      { term: "Venta de datos", detail: "Ninguna" },
    ],
    sections: [
      {
        title: "Qué almacena SummaFit",
        body: [
          "SummaFit almacena en tu dispositivo la configuración de tu perfil, objetivos nutricionales, registros de alimentos, agua y peso, favoritos, alimentos recientes, preferencias de la app, recordatorios y correcciones de productos.",
          "Tu perfil se protege con AES-GCM antes de guardarse. El resto del historial de la app se guarda localmente en el sandbox de iOS y no se sube a servidores de SummaFit.",
        ],
      },
      {
        title: "Datos de salud",
        body: [
          "La integración con Apple Health es opcional. Si concedes permiso, SummaFit puede leer pasos, energía activa, masa corporal y distancia caminando o corriendo, y puede escribir masa corporal, energía alimentaria y registros de agua.",
          "Los datos de salud se usan solo para activar funciones que solicitas. Puedes gestionar o revocar permisos en la app Salud de iOS o en Ajustes.",
        ],
      },
      {
        title: "Búsqueda de alimentos y escaneo",
        body: [
          "Cuando escaneas un código de barras, SummaFit puede contactar con Open Food Facts para recuperar información pública del producto asociado. La solicitud puede incluir el código de barras e información de red estándar, como dirección IP y user agent.",
          "Las entradas manuales y correcciones que crees se mantienen localmente en tu dispositivo salvo que decidas exportarlas o compartirlas.",
        ],
      },
      {
        title: "Notificaciones",
        body: [
          "Si activas recordatorios, SummaFit programa notificaciones locales en tu dispositivo para comidas, hidratación, registro de peso o avisos de inactividad.",
          "Estos recordatorios se gestionan localmente y no requieren que SummaFit opere un servidor de notificaciones.",
        ],
      },
      {
        title: "Exportación y eliminación de datos",
        body: [
          "Puedes exportar tus datos personales desde Ajustes como un archivo JSON. El archivo se crea en tu dispositivo para que puedas guardarlo o compartirlo tú mismo.",
          "También puedes borrar los datos de la app desde Ajustes. Eliminar la app puede borrar datos locales de SummaFit según el comportamiento de iOS.",
        ],
      },
      {
        title: "Terceros",
        body: [
          "SummaFit no vende tu información personal. La app depende de servicios de la plataforma de Apple y puede usar Open Food Facts para búsquedas de productos por código de barras.",
          "Si abres el App Store, Apple gestiona esa interacción bajo sus propios términos y política de privacidad.",
        ],
      },
      {
        title: "Contacto",
        body: [
          "Para preguntas de privacidad, solicitudes de datos o correcciones a esta política, contacta con SummaFit en privacy@summa.fit.",
          "Esta política puede actualizarse conforme cambie SummaFit. La versión más reciente estará disponible en https://summa.fit/es/policy.",
        ],
      },
    ],
    note: "Esta página se proporciona por transparencia y para la revisión del App Store. No sustituye el asesoramiento legal para tu situación particular.",
    languageLabel: "Idioma",
    homeLabel: "Inicio",
  },
  fr: {
    pageTitle: "Politique de confidentialité | SummaFit",
    metaDescription:
      "Politique de confidentialité de SummaFit pour le suivi nutritionnel local, les autorisations Apple Health, la recherche par code-barres, les exports et la suppression des données.",
    eyebrow: "Politique de confidentialité",
    heading: "Confidentialité pour une app de nutrition locale.",
    intro:
      "SummaFit est conçue pour garder vos données de suivi près de vous. Cette politique explique ce que l'app stocke, quand elle contacte des services externes, et comment vous pouvez exporter ou supprimer vos données.",
    updatedLabel: "Date d'entrée en vigueur",
    updatedAt: "9 juillet 2026",
    summaryLabel: "En bref",
    summaryItems: [
      { term: "Modèle de données", detail: "Local d'abord" },
      { term: "Accès santé", detail: "Autorisations Apple Health facultatives" },
      { term: "Codes-barres", detail: "Open Food Facts lors du scan" },
      { term: "Vente de données", detail: "Aucune" },
    ],
    sections: [
      {
        title: "Ce que SummaFit stocke",
        body: [
          "SummaFit stocke sur votre appareil les paramètres de profil, objectifs nutritionnels, journaux alimentaires, journaux d'eau, entrées de poids, favoris, aliments récents, préférences de l'app, paramètres de rappel et corrections de produits.",
          "Votre profil est protégé avec AES-GCM avant d'être enregistré. Les autres historiques de l'app sont stockés localement dans le sandbox iOS et ne sont pas envoyés aux serveurs de SummaFit.",
        ],
      },
      {
        title: "Données de santé",
        body: [
          "L'intégration Apple Health est facultative. Si vous l'autorisez, SummaFit peut lire les pas, l'énergie active, la masse corporelle et la distance de marche ou de course, et peut écrire la masse corporelle, l'énergie alimentaire et les entrées d'eau.",
          "Les données de santé servent uniquement aux fonctionnalités que vous demandez. Vous pouvez gérer ou révoquer ces autorisations dans l'app Santé d'iOS ou dans Réglages.",
        ],
      },
      {
        title: "Recherche d'aliments et scans",
        body: [
          "Lorsque vous scannez un code-barres, SummaFit peut contacter Open Food Facts afin de récupérer les informations publiques du produit associé. La requête peut inclure le code-barres et des informations réseau standard comme l'adresse IP et le user agent.",
          "Les entrées manuelles et corrections que vous créez restent localement sur votre appareil, sauf si vous choisissez de les exporter ou de les partager.",
        ],
      },
      {
        title: "Notifications",
        body: [
          "Si vous activez les rappels, SummaFit programme des notifications locales sur votre appareil pour les repas, l'hydratation, le suivi du poids ou les rappels d'inactivité.",
          "Ces rappels sont gérés localement et ne nécessitent pas que SummaFit exploite un serveur de notifications.",
        ],
      },
      {
        title: "Export et suppression des données",
        body: [
          "Vous pouvez exporter vos données personnelles depuis Réglages sous forme de fichier JSON. Le fichier est créé sur votre appareil afin que vous puissiez l'enregistrer ou le partager vous-même.",
          "Vous pouvez aussi effacer les données de l'app depuis Réglages. La suppression de l'app peut supprimer les données locales de SummaFit selon le comportement d'iOS.",
        ],
      },
      {
        title: "Tiers",
        body: [
          "SummaFit ne vend pas vos informations personnelles. L'app s'appuie sur les services de la plateforme Apple et peut utiliser Open Food Facts pour la recherche de produits par code-barres.",
          "Si vous ouvrez l'App Store, Apple gère cette interaction selon ses propres conditions et sa propre politique de confidentialité.",
        ],
      },
      {
        title: "Contact",
        body: [
          "Pour toute question de confidentialité, demande de données ou correction de cette politique, contactez SummaFit à privacy@summa.fit.",
          "Cette politique peut être mise à jour à mesure que SummaFit évolue. La version la plus récente sera disponible sur https://summa.fit/fr/policy.",
        ],
      },
    ],
    note: "Cette page est fournie par souci de transparence et pour l'examen de l'App Store. Elle ne remplace pas un conseil juridique adapté à votre situation.",
    languageLabel: "Langue",
    homeLabel: "Accueil",
  },
};
