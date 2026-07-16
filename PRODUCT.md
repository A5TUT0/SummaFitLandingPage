# SummaFit - Product Specification & Features

SummaFit is an advanced fitness and nutrition tracking application built natively for iOS in Swift and SwiftUI. The application features a premium visual aesthetic matching the iOS 26 Liquid Glass design system, live barcode scanning, Apple Health synchronization, and customizable theme settings.

---

## 1. Onboarding Flow (User Profile & Goal Customization)

When a user launches the app for the first time, they complete a step-by-step onboarding wizard to initialize their metrics.

- **Biometric Initial Setup**: Guided forms to collect the user's age, gender, current weight, height, and general daily activity level.
- **Goal Definition**: Users choose between losing weight, maintaining weight, or gaining muscle.
- **TDEE & Target Calculation**: The app automatically computes target daily calories and macronutrient ratios (Protein, Carbs, Fats) based on the user's biometric variables.
- **Biometric Results Screen**: Displays calculated daily budgets with a smooth calculating progress animation (scaling smoothly from 1 to 100% with a multicolor radial gradient ring).

---

## 2. Today Nutrition Dashboard (DashboardView)

The daily operations center of the app, designed for high visual feedback and quick action.

- **Hero Calorie Card**: Renders a dynamic `SummaProgressRing` comparing consumed calories against the user's daily budget.
- **Dynamic Energy Budgeting**: Calorie budget is calculated dynamically as:
  $$\text{Total Calorie Budget} = \text{Target Calories} + \text{HealthKit Active Calories Burned}$$
- **Macronutrient Pills**: Visual indicators showing current protein, carbs, and fat ingestion against targets.
- **Water Logging Card**: Tracks daily hydration in milliliters. Users can quick-add water or log custom amounts.
- **Daily Food Log List**: Chronological feed of logged foods with swipe-to-delete support. Includes high-resolution imagery where available.
- **Apple Health Linking Banner**: Encourages users to grant HealthKit permissions for active calorie tracking and weight synchronization.

---

## 3. Intelligent Barcode Scanner & Search (ScannerView)

Powered by the Open Food Facts JSON API, facilitating automatic food tracking.

- **Live Camera Scanner**: Uses the device's AVFoundation camera to scan product barcodes in real-time.
- **Unified Interface**: Toggle between live scanning, manual database keyword search, and checking local recents/favorites caches.
- **Portion Weight Calculator**: Display values per 100g or standard servings. Users enter custom consumption weight (grams/servings), and the app automatically computes proportional calories and macro profiles.
- **Database Addition Form**: If a barcode is missing, users can input details and upload photos. This supports the crowdsourced Open Food Facts AI (Robotoff) for database completion.
- **API Call Rate Rule**: Optimized call pattern where exactly 1 network request is made per actual product scan.

---

## 4. Progress Analytics (ProgressView)

Comprehensive tracking of logs, streaking consistency, weight fluctuations, and diet quality.

- **Consistency Calendar**: A GitHub-style activity grid mapping dates on which the user completed food logs.
- **Streak Tracker**: Tracks and displays consecutive days of active logging.
- **Biometrics History (LogWeightSheet)**: A visual line chart documenting weight updates. Syncs bidirectionally with Apple Health weight logs.
- **Energy intake Chart**: Bar charts showing daily calorie consumption grouped by week, month, or year.
- **Macro Adherence Indicators**: Progress bars illustrating compliance with target protein, carbs, and fats ratios over a 7-day average.

---

## 5. Personalization, Privacy & Compliance (SettingsView)

- **Biometric Editor**: Modify age, weight, height, activity level, and targets directly.
- **App Appearance Switcher**: Switch theme styles between System Default, Dark Mode, and Light Mode.
- **Multi-language Support**: Fully localized into English, Spanish (Español), French (Français), German (Deutsch), and Italian (Italiano).
- **Local Reminders**: Configure meal logging reminders, a weekly weight reminder, and an optional inactivity nudge.
- **GDPR & CCPA Data Management**:
  - **Export Data**: Generates a shareable JSON export of profile and logging history.
  - **Clear Local Cache**: Purges offline image and text caches.
  - **Delete My Data / Wipe Everything**: Instantly wipes all user profile data, macros, streaks, and health logs.

---

## 6. Technical Stack & Architecture

- **Platform Target**: iOS 26.0+
- **Core Technology**: Swift 5.0, SwiftUI, Swift Charts, HealthKit, AVFoundation.
- **Widget Target (SummaWidget)**: Medium-sized companion widget displaying calorie budget and dynamic progress ring on the Home Screen.
- **Offline Caching**: Automatically saves recent items, favorite foods, and logs locally, allowing manual logging in low-connectivity areas (e.g., gym basements).
