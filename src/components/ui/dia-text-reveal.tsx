import { useEffect, useMemo, useState, type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#FE7500", "#BD68FE", "#4EDE66", "#32B0FE"];

export interface DiaTextRevealProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {
  text: string | string[];
  colors?: string[];
  textColor?: string;
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  startOnView?: boolean;
  once?: boolean;
  className?: string;
  fixedWidth?: boolean;
}

function buildGradient(colors: string[], textColor: string) {
  const palette = colors.length > 0 ? colors : DEFAULT_COLORS;
  const colorStops = palette
    .map((color, index) => {
      const position = 42 + (index / Math.max(palette.length - 1, 1)) * 18;
      return `${color} ${position.toFixed(2)}%`;
    })
    .join(", ");

  return `linear-gradient(90deg, ${textColor} 0%, ${textColor} 34%, ${colorStops}, ${textColor} 70%, ${textColor} 100%)`;
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView: _startOnView = true,
  once: _once = true,
  className,
  fixedWidth = false,
  style,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeText = texts[activeIndex] ?? "";

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReduceMotion(motionQuery.matches);

    setMounted(true);
    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);

    return () => motionQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!repeat || reduceMotion || texts.length < 2) return;

    const timeout = window.setTimeout(
      () => setActiveIndex((current) => (current + 1) % texts.length),
      (duration + delay + repeatDelay) * 1000,
    );

    return () => window.clearTimeout(timeout);
  }, [activeIndex, delay, duration, reduceMotion, repeat, repeatDelay, texts.length]);

  const gradient = useMemo(() => buildGradient(colors, textColor), [colors, textColor]);
  const shouldAnimate = mounted && !reduceMotion;

  const revealStyle: CSSProperties = shouldAnimate
    ? {
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundImage: gradient,
        backgroundPosition: "120% 0",
        backgroundSize: "260% 100%",
        animation: `dia-text-sweep ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
      }
    : {
        color: textColor,
      };

  return (
    <span
      className={cn("dia-text-reveal align-bottom leading-[100%]", className)}
      style={{
        transform: "translateY(-2px)",
        ...(fixedWidth ? { display: "inline-block", whiteSpace: "nowrap" } : undefined),
        ...revealStyle,
        ...style,
      }}
      {...props}
    >
      {activeText}
    </span>
  );
}
