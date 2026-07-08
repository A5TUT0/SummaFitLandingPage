# SummaFit Design System - Color Palette

This document defines the official color palette of the SummaFit application as implemented in the iOS codebase.

## 1. Core Color System

The core theme values automatically adapt to the user's system appearance (Light / Dark mode or forced overrides).

| Token Name | Light Mode Hex | Dark Mode Hex | Description / Usage |
| :--- | :--- | :--- | :--- |
| `summaBg` | `#F5F7FA` | `#0D0F16` | Main background canvas |
| `summaSurface` | `#FFFFFF` | `#1C1C2B` | Card container background surfaces |
| `summaText` | `#0D0F16` | `#FFFFFF` | Primary headers and main body text |
| `summaTextSub` | `#595966` | `#B8B8B8` | Secondary labels, descriptions, and subtitle text |
| `summaTextMuted` | `#8C8C99` | `#8C8C8C` | Small captions, timestamps, and placeholder text |
| `summaBorder` | `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.06)` | Thin glassmorphic card borders |
| `summaBorderStrong` | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.12)` | Thick boundaries and ghost button borders |
| `summaInputBg` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.06)` | Text fields and segmented picker background |
| `summaDivider` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Divider lines and empty ring strokes |

---

## 2. Branding & Progress Colors

Branding colors represent targets, progress rings, and specific macronutrients tracked on the dashboard.

| Token Name | Light Mode Hex | Dark Mode Hex | Description / Usage |
| :--- | :--- | :--- | :--- |
| `summaOrange` | `#FF7300` | `#FF7300` | Primary brand accent color (can adapt to Blue `#1A80FF` if toggled in widget theme settings) |
| `summaOrangeGlow` | `#FF9926` | `#FF9926` | Brighter gradient endpoint for active rings and buttons |
| `summaProtein` | `#AD38D1` | `#E699FF` | Protein progress indicator and macro cards |
| `summaCarbs` | `#1A85D1` | `#73C7FF` | Carbohydrates progress indicator and macro cards |
| `summaFat` | `#D16B14` | `#FFB36B` | Fats progress indicator and macro cards |
| `summaGreen` | `#1E9452` | `#52E08C` | Success states, calorie target completion, and steps |

---

## 3. Background Ambient Glow Quadrants

The app utilizes a soft, breathing, 4-corner ambient glow background system. These colors are also reflected in the dynamic App Icon background.

- **Top Left (Orange)**: `#FE7500` (subtle breathing animation)
- **Top Right (Purple)**: `#BD68FE` (subtle breathing animation)
- **Bottom Left (Green)**: `#4EDE66` (subtle breathing animation)
- **Bottom Right (Blue)**: `#32B0FE` (subtle breathing animation)

*Note: In Light Mode, the system automatically scales the opacity of the ambient quadrant glow circles by `1.45x` to ensure they look rich, saturated, and premium against the white canvas without washing out.*
