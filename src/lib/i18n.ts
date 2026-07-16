import { DE_COPY, DE_LEGAL_COPY, DE_SUPPORT_COPY } from "./i18n-de";
import { IT_COPY, IT_LEGAL_COPY, IT_SUPPORT_COPY } from "./i18n-it";

export const SUPPORTED_LOCALES = ["en", "es", "fr", "de", "it"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type LandingHeroCopy = {
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
  support: string;
  seoTitle: string;
  seoDescription: string;
  heroAlt: string;
};

export type LandingContentCopy = {
  languageLabel: string;
  navigationLabel: string;
  featuresNav: string;
  howNav: string;
  faqNav: string;
  highlights: string[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresIntro: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  howEyebrow: string;
  howTitle: string;
  howIntro: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
  privacyEyebrow: string;
  privacyTitle: string;
  privacyDescription: string;
  privacyPoints: string[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  footerTagline: string;
};

export type LandingCopy = LandingHeroCopy & {
  content: LandingContentCopy;
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
  contentsLabel: string;
  contentsNavigationLabel: string;
  summaryItems: Array<{
    term: string;
    detail: string;
  }>;
  sections: LegalSection[];
  note: string;
  languageLabel: string;
  homeLabel: string;
};

export type FAQItem = {
  question: string;
  answer: string[];
};

export type SupportCopy = {
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  updatedLabel: string;
  updatedAt: string;
  faqCategoryTitle: string;
  ui: {
    searchPlaceholder: string;
    searchLabel: string;
    noResults: string;
    diagnostics: string;
    storage: string;
    localFirst: string;
    foodSearch: string;
    healthSync: string;
    advertising: string;
    none: string;
    sendEmail: string;
    copyAddress: string;
    copied: string;
  };
  faqs: FAQItem[];
  contactHeading: string;
  contactText: string;
  contactEmail: string;
  backHome: string;
  languageLabel: string;
  homeLabel: string;
};

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

export function localizedPath(locale: Locale, path = "") {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return cleanPath ? `/${locale}/${cleanPath}/` : `/${locale}/`;
}

export const COPY: Record<Locale, LandingCopy> = {
  en: {
    eyebrow: "Free calorie and macro tracking",
    title: "The free calorie counter for iPhone.",
    subtitle:
      "Scan food barcodes, log calories and macros, track water and weight, and follow your daily progress in one private iPhone app.",
    cta: "Explore the features",
    availability: "Coming soon to iPhone",
    qrDialogEyebrow: "Quick iPhone install",
    qrDialogTitle: "Install SummaFit with this QR",
    qrDialogDescription:
      "Scan this QR with your iPhone camera to open SummaFit in the App Store.",
    qrDialogLinkLabel: "App Store link",
    qrDialogCopy: "Copy link",
    qrDialogCopied: "Copied",
    qrDialogQrAlt: "QR code to install SummaFit from the App Store",
    privacyPolicy: "Privacy Policy",
    support: "Support",
    seoTitle: "Free Calorie Counter App for iPhone | SummaFit",
    seoDescription:
      "Track calories, macros, water and weight with SummaFit, a free iPhone calorie counter with barcode scanning, Apple Health and local-first privacy.",
    heroAlt:
      "SummaFit free calorie counter app dashboard on iPhone showing calories, macros, water and progress",
    content: {
      languageLabel: "Choose language",
      navigationLabel: "Main navigation",
      featuresNav: "Features",
      howNav: "How it works",
      faqNav: "FAQ",
      highlights: [
        "Built for iPhone",
        "Barcode scanner",
        "Local-first privacy",
      ],
      featuresEyebrow: "Everything in one place",
      featuresTitle: "A calorie tracking app built for everyday consistency",
      featuresIntro:
        "SummaFit combines fast food logging with clear nutrition targets, so you can understand what you eat without turning every meal into a spreadsheet.",
      features: [
        {
          title: "Calorie and macro counter",
          description:
            "See consumed and remaining calories alongside protein, carbohydrates and fat targets on a clear daily dashboard.",
        },
        {
          title: "Free barcode scanner",
          description:
            "Scan packaged food barcodes and retrieve nutrition data through Open Food Facts, then adjust the portion you actually ate.",
        },
        {
          title: "Personal daily targets",
          description:
            "Set a goal to lose, maintain or gain weight and calculate calorie and macro targets from your profile and activity level.",
        },
        {
          title: "Water and weight tracking",
          description:
            "Log hydration and weight, review trends and use a consistency calendar to build sustainable nutrition habits.",
        },
        {
          title: "Apple Health integration",
          description:
            "Optionally connect steps, active energy, body weight, dietary energy and water with Apple Health permissions you control.",
        },
        {
          title: "Private by design",
          description:
            "Your profile and nutrition history stay local to your iPhone. No account is required to start tracking.",
        },
      ],
      howEyebrow: "Simple from day one",
      howTitle: "How SummaFit helps you count calories",
      howIntro:
        "Start with a personal target, record what you eat and use daily and long-term progress to make informed adjustments.",
      steps: [
        {
          title: "Choose your nutrition goal",
          description:
            "Enter your basic profile and activity level, then choose weight loss, maintenance or muscle gain.",
        },
        {
          title: "Log meals your way",
          description:
            "Scan a barcode, search foods, reuse favorites or create a manual entry with the portion you consumed.",
        },
        {
          title: "Review calories, macros and trends",
          description:
            "Follow your remaining budget, hydration, weight history and consistency without ads or distracting social features.",
        },
      ],
      privacyEyebrow: "Local-first nutrition tracking",
      privacyTitle: "Your health routine belongs to you",
      privacyDescription:
        "SummaFit is designed to minimize data sharing. Core tracking history is stored on your device, while Apple Health access is optional and controlled by iOS permissions.",
      privacyPoints: [
        "No account required",
        "No sale of personal data",
        "Export and deletion controls",
      ],
      faqEyebrow: "Questions about SummaFit",
      faqTitle: "Free calorie counter app FAQ",
      faqs: [
        {
          question: "Is SummaFit a free calorie counter?",
          answer:
            "SummaFit is planned as a free calorie and macro tracking app for iPhone, including food logging, hydration and progress tools.",
        },
        {
          question: "Can I scan food barcodes?",
          answer:
            "Yes. The built-in barcode scanner looks up public product nutrition data through Open Food Facts. You can review and adjust serving amounts before logging.",
        },
        {
          question: "Does SummaFit work with Apple Health?",
          answer:
            "Apple Health integration is optional. With your permission, SummaFit can use relevant activity, body weight, dietary energy and water data.",
        },
        {
          question: "Does calorie tracking require an account?",
          answer:
            "No account is required. Your profile and tracking history are designed to stay on your iPhone, with export and deletion controls in Settings.",
        },
        {
          question: "Which devices can run SummaFit?",
          answer:
            "SummaFit is built natively for iPhone and requires iOS 26 or later.",
        },
      ],
      ctaTitle: "See what SummaFit is building",
      ctaDescription:
        "Explore the calorie, macro, hydration and progress tools planned for SummaFit on iPhone.",
      footerTagline: "Free, private calorie and macro tracking for iPhone.",
    },
  },
  es: {
    eyebrow: "Control gratis de calorías y macros",
    title: "La app gratis para contar calorías en iPhone.",
    subtitle:
      "Escanea códigos de barras, registra calorías y macros, controla agua y peso y sigue tu progreso diario en una app privada para iPhone.",
    cta: "Explorar funciones",
    availability: "Próximamente en iPhone",
    qrDialogEyebrow: "Instalación rápida en iPhone",
    qrDialogTitle: "Instala SummaFit con este QR",
    qrDialogDescription:
      "Escanea este QR con la cámara de tu iPhone para abrir SummaFit en el App Store.",
    qrDialogLinkLabel: "Link del App Store",
    qrDialogCopy: "Copiar link",
    qrDialogCopied: "Copiado",
    qrDialogQrAlt: "Código QR para instalar SummaFit desde el App Store",
    privacyPolicy: "Política de privacidad",
    support: "Soporte",
    seoTitle: "App para contar calorías gratis en iPhone | SummaFit",
    seoDescription:
      "Controla calorías, macros, agua y peso con SummaFit: app gratis para iPhone con escáner de códigos, Apple Health y privacidad local-first.",
    heroAlt:
      "App gratis SummaFit para contar calorías en iPhone con panel de macros, agua y progreso",
    content: {
      languageLabel: "Elegir idioma",
      navigationLabel: "Navegación principal",
      featuresNav: "Funciones",
      howNav: "Cómo funciona",
      faqNav: "Preguntas",
      highlights: [
        "Creada para iPhone",
        "Escáner de códigos",
        "Privacidad local-first",
      ],
      featuresEyebrow: "Todo en un solo lugar",
      featuresTitle: "Una app para contar calorías creada para ser constante",
      featuresIntro:
        "SummaFit combina un registro rápido de alimentos con objetivos nutricionales claros para entender lo que comes sin convertir cada comida en una hoja de cálculo.",
      features: [
        {
          title: "Contador de calorías y macros",
          description:
            "Consulta calorías consumidas y restantes junto a tus objetivos de proteínas, carbohidratos y grasas en un panel diario claro.",
        },
        {
          title: "Escáner de códigos gratis",
          description:
            "Escanea alimentos envasados, consulta sus datos nutricionales mediante Open Food Facts y ajusta la porción que realmente comiste.",
        },
        {
          title: "Objetivos diarios personales",
          description:
            "Elige perder, mantener o ganar peso y calcula objetivos de calorías y macros según tu perfil y nivel de actividad.",
        },
        {
          title: "Control de agua y peso",
          description:
            "Registra hidratación y peso, revisa tendencias y utiliza el calendario de constancia para crear hábitos sostenibles.",
        },
        {
          title: "Integración con Apple Health",
          description:
            "Conecta opcionalmente pasos, energía activa, peso, energía alimentaria y agua con permisos de Apple Health que tú controlas.",
        },
        {
          title: "Privada desde el diseño",
          description:
            "Tu perfil y tu historial nutricional permanecen en tu iPhone. No necesitas crear una cuenta para empezar.",
        },
      ],
      howEyebrow: "Fácil desde el primer día",
      howTitle: "Cómo te ayuda SummaFit a contar calorías",
      howIntro:
        "Empieza con un objetivo personal, registra lo que comes y utiliza el progreso diario y a largo plazo para hacer ajustes informados.",
      steps: [
        {
          title: "Elige tu objetivo nutricional",
          description:
            "Introduce tu perfil y actividad y elige entre perder peso, mantenerlo o ganar masa muscular.",
        },
        {
          title: "Registra comidas a tu manera",
          description:
            "Escanea un código, busca alimentos, reutiliza favoritos o crea una entrada manual con la cantidad consumida.",
        },
        {
          title: "Revisa calorías, macros y tendencias",
          description:
            "Sigue tu presupuesto restante, hidratación, historial de peso y constancia sin anuncios ni funciones sociales que distraigan.",
        },
      ],
      privacyEyebrow: "Nutrición local-first",
      privacyTitle: "Tu rutina de salud te pertenece",
      privacyDescription:
        "SummaFit está diseñada para minimizar el intercambio de datos. El historial principal se guarda en tu dispositivo y Apple Health es opcional y está controlado por los permisos de iOS.",
      privacyPoints: [
        "Sin cuenta obligatoria",
        "Sin venta de datos personales",
        "Controles de exportación y borrado",
      ],
      faqEyebrow: "Preguntas sobre SummaFit",
      faqTitle: "Preguntas sobre la app para contar calorías",
      faqs: [
        {
          question: "¿SummaFit es un contador de calorías gratis?",
          answer:
            "SummaFit está prevista como una app gratuita para iPhone e incluirá registro de calorías y macros, hidratación y herramientas de progreso.",
        },
        {
          question: "¿Puedo escanear códigos de barras de alimentos?",
          answer:
            "Sí. El escáner integrado consulta datos nutricionales públicos mediante Open Food Facts. Puedes revisar y ajustar la cantidad antes de guardarla.",
        },
        {
          question: "¿SummaFit funciona con Apple Health?",
          answer:
            "La integración es opcional. Con tu permiso, SummaFit puede utilizar datos relevantes de actividad, peso, energía alimentaria y agua.",
        },
        {
          question: "¿Necesito una cuenta para registrar calorías?",
          answer:
            "No. Tu perfil y tu historial están diseñados para permanecer en tu iPhone, con opciones de exportación y borrado en Ajustes.",
        },
        {
          question: "¿En qué dispositivos funciona SummaFit?",
          answer:
            "SummaFit está desarrollada de forma nativa para iPhone y requiere iOS 26 o una versión posterior.",
        },
      ],
      ctaTitle: "Descubre lo que estamos creando",
      ctaDescription:
        "Explora las herramientas de calorías, macros, hidratación y progreso previstas para SummaFit en iPhone.",
      footerTagline:
        "Control gratuito y privado de calorías y macros para iPhone.",
    },
  },
  fr: {
    eyebrow: "Suivi gratuit des calories et macros",
    title: "Le compteur de calories gratuit pour iPhone.",
    subtitle:
      "Scannez les codes-barres, suivez calories et macros, surveillez eau et poids et consultez vos progrès dans une app iPhone privée.",
    cta: "Découvrir les fonctions",
    availability: "Bientôt sur iPhone",
    qrDialogEyebrow: "Installation rapide sur iPhone",
    qrDialogTitle: "Installez SummaFit avec ce QR code",
    qrDialogDescription:
      "Scannez ce QR code avec l'appareil photo de votre iPhone pour ouvrir SummaFit dans l'App Store.",
    qrDialogLinkLabel: "Lien App Store",
    qrDialogCopy: "Copier le lien",
    qrDialogCopied: "Copié",
    qrDialogQrAlt: "QR code pour installer SummaFit depuis l'App Store",
    privacyPolicy: "Politique de confidentialité",
    support: "Support",
    seoTitle: "Application compteur de calories gratuite iPhone | SummaFit",
    seoDescription:
      "Suivez calories, macros, eau et poids avec SummaFit, app iPhone gratuite avec scanner de codes-barres, Apple Health et stockage local.",
    heroAlt:
      "Application gratuite SummaFit de compteur de calories sur iPhone avec macros, eau et progrès",
    content: {
      languageLabel: "Choisir la langue",
      navigationLabel: "Navigation principale",
      featuresNav: "Fonctions",
      howNav: "Fonctionnement",
      faqNav: "Questions",
      highlights: [
        "Conçue pour iPhone",
        "Scanner de codes-barres",
        "Confidentialité locale",
      ],
      featuresEyebrow: "Tout au même endroit",
      featuresTitle: "Une app de suivi des calories pensée pour la régularité",
      featuresIntro:
        "SummaFit associe une saisie rapide des aliments à des objectifs nutritionnels clairs pour comprendre ce que vous mangez sans transformer chaque repas en tableur.",
      features: [
        {
          title: "Compteur de calories et macros",
          description:
            "Consultez les calories consommées et restantes ainsi que vos objectifs de protéines, glucides et lipides sur un tableau de bord clair.",
        },
        {
          title: "Scanner de codes-barres gratuit",
          description:
            "Scannez les aliments emballés, récupérez leurs données via Open Food Facts et ajustez la portion réellement consommée.",
        },
        {
          title: "Objectifs quotidiens personnalisés",
          description:
            "Choisissez de perdre, maintenir ou prendre du poids et calculez vos objectifs selon votre profil et votre activité.",
        },
        {
          title: "Suivi de l'eau et du poids",
          description:
            "Enregistrez hydratation et poids, consultez les tendances et utilisez le calendrier de régularité pour créer des habitudes durables.",
        },
        {
          title: "Intégration Apple Health",
          description:
            "Connectez facultativement pas, énergie active, poids, énergie alimentaire et eau avec les autorisations Apple Health que vous contrôlez.",
        },
        {
          title: "Privée dès la conception",
          description:
            "Votre profil et votre historique nutritionnel restent sur votre iPhone. Aucun compte n'est nécessaire pour commencer.",
        },
      ],
      howEyebrow: "Simple dès le premier jour",
      howTitle: "Comment SummaFit vous aide à compter les calories",
      howIntro:
        "Commencez par un objectif personnel, notez ce que vous mangez et utilisez les progrès quotidiens et à long terme pour vous ajuster.",
      steps: [
        {
          title: "Choisissez votre objectif nutritionnel",
          description:
            "Renseignez votre profil et votre activité, puis choisissez perte de poids, maintien ou prise de muscle.",
        },
        {
          title: "Enregistrez les repas à votre façon",
          description:
            "Scannez un code, recherchez un aliment, réutilisez un favori ou créez une entrée avec la quantité consommée.",
        },
        {
          title: "Consultez calories, macros et tendances",
          description:
            "Suivez votre budget restant, votre hydratation, l'historique du poids et votre régularité sans publicité ni réseau social distrayant.",
        },
      ],
      privacyEyebrow: "Suivi nutritionnel local-first",
      privacyTitle: "Votre routine santé vous appartient",
      privacyDescription:
        "SummaFit minimise le partage de données. L'historique principal est stocké sur votre appareil et Apple Health reste facultatif, sous le contrôle des autorisations iOS.",
      privacyPoints: [
        "Aucun compte requis",
        "Aucune vente de données personnelles",
        "Contrôles d'export et de suppression",
      ],
      faqEyebrow: "Questions sur SummaFit",
      faqTitle: "Questions sur l'application compteur de calories",
      faqs: [
        {
          question: "SummaFit est-il un compteur de calories gratuit ?",
          answer:
            "SummaFit est prévue comme une app iPhone gratuite comprenant le suivi des calories, macros, de l'hydratation et des progrès.",
        },
        {
          question: "Puis-je scanner les codes-barres alimentaires ?",
          answer:
            "Oui. Le scanner intégré consulte les données nutritionnelles publiques via Open Food Facts. Vous pouvez vérifier et ajuster la quantité avant l'enregistrement.",
        },
        {
          question: "SummaFit fonctionne-t-il avec Apple Health ?",
          answer:
            "L'intégration est facultative. Avec votre autorisation, SummaFit peut utiliser les données pertinentes d'activité, de poids, d'énergie alimentaire et d'eau.",
        },
        {
          question: "Un compte est-il nécessaire pour suivre les calories ?",
          answer:
            "Non. Votre profil et votre historique sont conçus pour rester sur votre iPhone, avec des options d'exportation et de suppression dans Réglages.",
        },
        {
          question: "Quels appareils sont compatibles avec SummaFit ?",
          answer:
            "SummaFit est développée nativement pour iPhone et nécessite iOS 26 ou une version ultérieure.",
        },
      ],
      ctaTitle: "Découvrez ce que nous préparons",
      ctaDescription:
        "Explorez les outils de calories, macros, hydratation et progrès prévus pour SummaFit sur iPhone.",
      footerTagline:
        "Suivi gratuit et privé des calories et macros sur iPhone.",
    },
  },
  de: DE_COPY,
  it: IT_COPY,
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
    updatedAt: "July 16, 2026",
    summaryLabel: "At a glance",
    contentsLabel: "Contents",
    contentsNavigationLabel: "Table of contents",
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
          "If you enable reminders, SummaFit schedules local notifications on your device for meal logging, weight logging, or inactivity nudges.",
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
    updatedAt: "16 de julio de 2026",
    summaryLabel: "Resumen",
    contentsLabel: "Contenido",
    contentsNavigationLabel: "Índice de contenidos",
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
          "Si activas recordatorios, SummaFit programa notificaciones locales en tu dispositivo para registrar comidas, registrar el peso o recibir avisos de inactividad.",
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
    updatedAt: "16 juillet 2026",
    summaryLabel: "En bref",
    contentsLabel: "Sommaire",
    contentsNavigationLabel: "Table des matières",
    summaryItems: [
      { term: "Modèle de données", detail: "Local d'abord" },
      {
        term: "Accès santé",
        detail: "Autorisations Apple Health facultatives",
      },
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
          "Si vous activez les rappels, SummaFit programme des notifications locales sur votre appareil pour le suivi des repas, le suivi du poids ou les rappels d'inactivité.",
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
  de: DE_LEGAL_COPY,
  it: IT_LEGAL_COPY,
};

export const SUPPORT_COPY: Record<Locale, SupportCopy> = {
  en: {
    pageTitle: "Support & FAQ | SummaFit",
    metaDescription:
      "Get help and find answers to frequently asked questions about SummaFit, the local-first nutrition tracker for iPhone.",
    eyebrow: "Support Center",
    heading: "We're here to help.",
    intro:
      "Find quick answers to common questions about SummaFit's local-first database, tracking features, Apple Health integration, and privacy.",
    updatedLabel: "Last updated",
    updatedAt: "July 16, 2026",
    faqCategoryTitle: "Frequently Asked Questions",
    ui: {
      searchPlaceholder: "Search questions...",
      searchLabel: "Search frequently asked questions",
      noResults: "No questions matched your search.",
      diagnostics: "Diagnostics",
      storage: "Storage",
      localFirst: "Local-first",
      foodSearch: "Food search",
      healthSync: "Health sync",
      advertising: "Advertising",
      none: "None",
      sendEmail: "Send email",
      copyAddress: "Copy address",
      copied: "Copied!",
    },
    faqs: [
      {
        question: "What is SummaFit?",
        answer: [
          "SummaFit is a clean, local-first app designed for daily nutrition tracking. It allows you to monitor your calories, macronutrients (protein, carbs, fats), water intake, and body weight logs without any ads, accounts, or mandatory cloud servers.",
        ],
      },
      {
        question: "How does local-first storage work?",
        answer: [
          "Your tracking history, favorites, and settings are stored in your iPhone's local sandbox, and your profile is protected with AES-GCM. SummaFit does not upload your health history to its own servers; barcode lookups and optional Apple Health features use the outside services described in the privacy policy.",
        ],
      },
      {
        question: "Does the app require a login or account?",
        answer: [
          "No. You won't need to register, create a password, or sign in with an email. When SummaFit's public App Store version is available, you will be able to start tracking food and water without creating an account.",
        ],
      },
      {
        question: "How does the barcode scanner lookup food?",
        answer: [
          "When you scan a barcode, SummaFit contacts Open Food Facts, a public collaborative product database. The request includes the barcode and standard network information such as an IP address and user agent. If a product is not found, you can log it manually.",
        ],
      },
      {
        question: "Can I sync my data with Apple Health?",
        answer: [
          "Yes. Apple Health integration is optional. With your permission, SummaFit can read steps, active energy, body mass, and walking or running distance, and can write body mass, dietary energy, and water entries to the Health app.",
        ],
      },
      {
        question: "How can I export or back up my data?",
        answer: [
          "You can export all your logged data as a clean JSON file directly from the app Settings. You can save this file to your device's Files app, iCloud, or share it. To clear your data, you can delete it from the Settings or simply delete the app.",
        ],
      },
    ],
    contactHeading: "Still have questions?",
    contactText:
      "If you couldn't find an answer to your question, feel free to send us an email. Our team will get back to you as soon as possible.",
    contactEmail: "support@summa.fit",
    backHome: "Back to Home",
    languageLabel: "Language",
    homeLabel: "Home",
  },
  es: {
    pageTitle: "Soporte y FAQ | SummaFit",
    metaDescription:
      "Obtén ayuda y encuentra respuestas a las preguntas más frecuentes sobre SummaFit, el registrador de nutrición local-first para iPhone.",
    eyebrow: "Centro de Soporte",
    heading: "Estamos aquí para ayudarte.",
    intro:
      "Encuentra respuestas rápidas a preguntas frecuentes sobre la base de datos local de SummaFit, registro de alimentos, integración con Apple Health y privacidad.",
    updatedLabel: "Última actualización",
    updatedAt: "16 de julio de 2026",
    faqCategoryTitle: "Preguntas Frecuentes",
    ui: {
      searchPlaceholder: "Buscar preguntas...",
      searchLabel: "Buscar preguntas frecuentes",
      noResults: "No se encontraron preguntas que coincidan con tu búsqueda.",
      diagnostics: "Diagnósticos",
      storage: "Almacenamiento",
      localFirst: "Local-first",
      foodSearch: "Buscador de alimentos",
      healthSync: "Sincronización con Salud",
      advertising: "Publicidad",
      none: "Ninguna",
      sendEmail: "Enviar correo",
      copyAddress: "Copiar dirección",
      copied: "¡Copiado!",
    },
    faqs: [
      {
        question: "¿Qué es SummaFit?",
        answer: [
          "SummaFit es una app limpia y de almacenamiento local diseñada para el registro de nutrición diario. Te permite monitorizar calorías, macronutrientes (proteínas, carbohidratos, grasas), consumo de agua y peso, sin anuncios, cuentas ni servidores obligatorios en la nube.",
        ],
      },
      {
        question: "¿Cómo funciona el almacenamiento local-first?",
        answer: [
          "Tu historial, favoritos y ajustes se guardan en el sandbox local de tu iPhone, y tu perfil se protege con AES-GCM. SummaFit no sube tu historial de salud a servidores propios; las búsquedas de códigos y Apple Health opcional utilizan los servicios externos descritos en la política de privacidad.",
        ],
      },
      {
        question: "¿La aplicación requiere iniciar sesión o crear una cuenta?",
        answer: [
          "No. No necesitarás registrarte, crear contraseñas ni introducir tu correo. Cuando la versión pública de SummaFit esté disponible en el App Store, podrás registrar comidas e hidratación sin crear una cuenta.",
        ],
      },
      {
        question: "¿Cómo busca alimentos el escáner de códigos de barras?",
        answer: [
          "Al escanear un código de barras, SummaFit contacta con Open Food Facts, una base de datos colaborativa y pública. La solicitud incluye el código y datos de red estándar, como la dirección IP y el user agent. Si el producto no aparece, puedes registrarlo manualmente.",
        ],
      },
      {
        question: "¿Puedo sincronizar mis datos con Apple Health?",
        answer: [
          "Sí. La integración con Apple Health es opcional. Con tu permiso, SummaFit puede leer pasos, energía activa, masa corporal y distancia caminada o recorrida, y escribir masa corporal, energía alimentaria y agua en la app Salud.",
        ],
      },
      {
        question: "¿Cómo puedo exportar o eliminar mis datos?",
        answer: [
          "Puedes exportar todos tus registros como un archivo JSON desde los Ajustes de la app para guardarlo en iCloud o compartirlo. Si deseas borrar todo, puedes hacerlo desde los Ajustes de la app o simplemente desinstalando la app.",
        ],
      },
    ],
    contactHeading: "¿Tienes más preguntas?",
    contactText:
      "Si no encontraste la respuesta que buscabas, escríbenos un correo electrónico y te ayudaremos con gusto.",
    contactEmail: "support@summa.fit",
    backHome: "Volver al Inicio",
    languageLabel: "Idioma",
    homeLabel: "Inicio",
  },
  fr: {
    pageTitle: "Assistance et FAQ | SummaFit",
    metaDescription:
      "Obtenez de l'aide et trouvez des réponses aux questions fréquemment posées sur SummaFit, le suivi de nutrition locale sur iPhone.",
    eyebrow: "Centre de Support",
    heading: "Nous sommes là pour vous aider.",
    intro:
      "Trouvez des réponses rapides aux questions fréquentes concernant le stockage local de SummaFit, le suivi des repas, l'intégration Apple Health et la confidentialité.",
    updatedLabel: "Dernière mise à jour",
    updatedAt: "16 juillet 2026",
    faqCategoryTitle: "Questions Fréquemment Posées",
    ui: {
      searchPlaceholder: "Rechercher des questions...",
      searchLabel: "Rechercher dans les questions fréquentes",
      noResults: "Aucune question ne correspond à votre recherche.",
      diagnostics: "Diagnostics",
      storage: "Stockage",
      localFirst: "Local-first",
      foodSearch: "Recherche d'aliments",
      healthSync: "Synchronisation Santé",
      advertising: "Publicité",
      none: "Aucune",
      sendEmail: "Envoyer un e-mail",
      copyAddress: "Copier l'adresse",
      copied: "Copié !",
    },
    faqs: [
      {
        question: "Qu'est-ce que SummaFit ?",
        answer: [
          "SummaFit est une application simple et locale conçue pour le suivi nutritionnel quotidien. Elle vous permet de suivre vos calories, vos macronutriments (protéines, glucides, lipides), votre consommation d'eau et votre poids, sans publicité, compte ou serveur cloud obligatoire.",
        ],
      },
      {
        question: "Comment fonctionne le stockage local ?",
        answer: [
          "Votre historique, vos favoris et vos réglages sont stockés dans le sandbox local de votre iPhone, et votre profil est protégé avec AES-GCM. SummaFit n'envoie pas votre historique de santé à ses propres serveurs ; les recherches de codes-barres et Apple Health facultatif utilisent les services externes décrits dans la politique de confidentialité.",
        ],
      },
      {
        question: "L'application nécessite-t-elle un compte ?",
        answer: [
          "Non. Vous n'aurez pas besoin de vous inscrire, de créer un mot de passe ou de renseigner un e-mail. Lorsque la version publique de SummaFit sera disponible sur l'App Store, vous pourrez suivre vos repas sans créer de compte.",
        ],
      },
      {
        question:
          "Comment le scanner de code-barres recherche-t-il les aliments ?",
        answer: [
          "Lorsque vous scannez un code-barres, SummaFit interroge Open Food Facts, une base de données collaborative et publique. La requête comprend le code et des informations réseau standard, telles que l'adresse IP et le user agent. Si le produit est absent, vous pouvez le saisir manuellement.",
        ],
      },
      {
        question: "Puis-je synchroniser mes données avec Apple Health ?",
        answer: [
          "Oui. L'intégration Apple Health est facultative. Avec votre autorisation, SummaFit peut lire les pas, l'énergie active, la masse corporelle et la distance de marche ou de course, puis écrire la masse corporelle, l'énergie alimentaire et l'eau dans l'app Santé.",
        ],
      },
      {
        question: "Comment exporter ou supprimer mes données ?",
        answer: [
          "Vous pouvez exporter toutes vos données de suivi au format JSON depuis les Réglages de l'application pour les enregistrer ou les partager. Pour tout supprimer, utilisez l'option dans les Réglages ou désinstallez l'application.",
        ],
      },
    ],
    contactHeading: "Vous avez d'autres questions ?",
    contactText:
      "Si vous n'avez pas trouvé la réponse à votre question, n'hésitez pas à nous envoyer un e-mail. Notre équipe vous répondra dans les plus brefs délais.",
    contactEmail: "support@summa.fit",
    backHome: "Retour à l'Accueil",
    languageLabel: "Langue",
    homeLabel: "Accueil",
  },
  de: DE_SUPPORT_COPY,
  it: IT_SUPPORT_COPY,
};
