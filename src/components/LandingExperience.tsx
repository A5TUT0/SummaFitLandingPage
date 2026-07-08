import { Download, ScanBarcode, Sparkles, TrendingUp } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { type LandingCopy } from "../lib/i18n";

export function LandingExperience({
  installUrl,
  copy,
}: {
  installUrl: string;
  copy: LandingCopy;
}) {
  return (
    <>
      <div className="hero-copy">
        <p className="eyebrow reveal-soft">{copy.eyebrow}</p>
        <h1 id="hero-title" className="title reveal-soft">
          <DiaTextReveal
            text={copy.title}
            textColor="var(--summa-text)"
            colors={["#FE7500", "#BD68FE", "#4EDE66", "#32B0FE"]}
            duration={1.45}
            delay={0.24}
            startOnView={false}
            className="title-reveal"
          />
        </h1>
        <p className="subtitle reveal-soft">{copy.subtitle}</p>
        <div className="actions reveal-soft">
          <a className="button" href={installUrl} aria-label={copy.cta}>
            <Download aria-hidden="true" size={18} strokeWidth={2.4} />
            <span>{copy.cta}</span>
          </a>
          <p className="availability">{copy.availability}</p>
        </div>
      </div>
    </>
  );
}
