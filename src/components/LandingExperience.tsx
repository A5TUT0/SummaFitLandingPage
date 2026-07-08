import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Download, QrCode } from "lucide-react";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { type LandingCopy } from "../lib/i18n";

const INSTALL_QR_SRC = "/install-qr.svg";

type CopyState = "idle" | "copied" | "error";

const isDesktopInstallSurface = () => {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent || "";
  const isTouchMac =
    /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
  const isMobileOrTablet =
    /iPhone|iPad|iPod|Android|Windows Phone/i.test(userAgent) ||
    isTouchMac;

  return window.matchMedia("(min-width: 900px)").matches && !isMobileOrTablet;
};

const copyText = async (text: string) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(text);
};

export function LandingExperience({
  installUrl,
  copy,
}: {
  installUrl: string;
  copy: LandingCopy;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const copyResetTimeout = useRef<number | undefined>(undefined);
  const dialogBackdropRef = useRef<HTMLDivElement | null>(null);
  const dialogPanelRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  const closeDialog = useCallback(() => {
    if (isClosingRef.current) return;

    const backdrop = dialogBackdropRef.current;
    const panel = dialogPanelRef.current;

    if (!backdrop || !panel) {
      setIsDialogOpen(false);
      return;
    }

    isClosingRef.current = true;

    void import("gsap")
      .then(({ gsap }) => {
        gsap
          .timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
              isClosingRef.current = false;
              setIsDialogOpen(false);
            },
          })
          .to(
            panel,
            {
              autoAlpha: 0,
              y: 16,
              scale: 0.97,
              filter: "blur(10px)",
              duration: 0.22,
            },
            0,
          )
          .to(backdrop, { autoAlpha: 0, duration: 0.24 }, 0);
      })
      .catch(() => {
        isClosingRef.current = false;
        setIsDialogOpen(false);
      });
  }, []);

  useEffect(() => {
    if (!isDialogOpen) return;

    isClosingRef.current = false;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogPanelRef.current?.focus({ preventScroll: true });

    let animationContext: { revert: () => void } | undefined;
    let isCancelled = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    void import("gsap").then(({ gsap }) => {
      const backdrop = dialogBackdropRef.current;
      const panel = dialogPanelRef.current;
      if (isCancelled || !backdrop || !panel) return;

      animationContext = gsap.context(() => {
        const select = gsap.utils.selector(backdrop);
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduceMotion) {
          gsap.set(
            [
              backdrop,
              panel,
              ...select(".install-qr-frame"),
              ...select(".install-dialog-action"),
            ],
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            },
          );
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            backdrop,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.28 },
          )
          .fromTo(
            panel,
            { autoAlpha: 0, y: 24, scale: 0.96, filter: "blur(14px)" },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.48,
            },
            "<0.02",
          )
          .fromTo(
            select(".install-qr-frame"),
            { autoAlpha: 0, y: 14, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.42 },
            "<0.16",
          )
          .fromTo(
            select(".install-dialog-action"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.06 },
            "<0.08",
          );
      }, backdrop);
    });

    return () => {
      isCancelled = true;
      animationContext?.revert();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, isDialogOpen]);

  useEffect(() => {
    return () => {
      window.clearTimeout(copyResetTimeout.current);
    };
  }, []);

  const handleInstallClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isDesktopInstallSurface()) return;

    event.preventDefault();
    setCopyState("idle");
    setIsDialogOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await copyText(installUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    window.clearTimeout(copyResetTimeout.current);
    copyResetTimeout.current = window.setTimeout(() => {
      setCopyState("idle");
    }, 1800);
  };

  const installDialog =
    isDialogOpen && typeof document !== "undefined" ? (
      <div
        className="install-dialog-backdrop"
        ref={dialogBackdropRef}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
      >
        <div
          className="install-dialog-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-describedby={dialogDescriptionId}
          tabIndex={-1}
          ref={dialogPanelRef}
        >
          <div className="install-dialog-grid">
            <div className="install-dialog-message">
              <p className="install-dialog-eyebrow install-dialog-action">
                <QrCode aria-hidden="true" size={16} strokeWidth={2.4} />
                <span>{copy.qrDialogEyebrow}</span>
              </p>
              <h2 id={dialogTitleId}>{copy.qrDialogTitle}</h2>
              <p id={dialogDescriptionId}>{copy.qrDialogDescription}</p>
            </div>

            <div className="install-qr-frame">
              <img
                src={INSTALL_QR_SRC}
                alt={copy.qrDialogQrAlt}
                width="256"
                height="256"
                loading="eager"
              />
            </div>
          </div>

          <div className="install-link-panel install-dialog-action">
            <div className="install-link-copy">
              <span>{copy.qrDialogLinkLabel}</span>
              <code>{installUrl}</code>
            </div>
            <button
              className="install-copy-button"
              type="button"
              onClick={handleCopyLink}
            >
              {copyState === "copied" ? (
                <Check aria-hidden="true" size={17} strokeWidth={2.5} />
              ) : (
                <Copy aria-hidden="true" size={17} strokeWidth={2.4} />
              )}
              <span>
                {copyState === "copied"
                  ? copy.qrDialogCopied
                  : copy.qrDialogCopy}
              </span>
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {copyState === "copied" ? copy.qrDialogCopied : ""}
          </p>
        </div>
      </div>
    ) : null;

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
          <a
            className="button"
            href={installUrl}
            aria-label={copy.cta}
            aria-haspopup="dialog"
            aria-expanded={isDialogOpen}
            onClick={handleInstallClick}
          >
            <Download aria-hidden="true" size={18} strokeWidth={2.4} />
            <span>{copy.cta}</span>
          </a>
          <p className="availability">{copy.availability}</p>
        </div>
      </div>

      {installDialog ? createPortal(installDialog, document.body) : null}
    </>
  );
}
