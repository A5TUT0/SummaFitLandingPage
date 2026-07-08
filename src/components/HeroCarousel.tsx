import { useEffect, useRef, useState } from "react";
import { Iphone } from "./ui/iphone";
import { gsap } from "gsap";

const APP_IMAGES = [
  "/images/homePage.png",
  "/images/progressPage.png",
  "/images/biometricsPage.png",
  "/images/activityLevelPage.png",
  "/images/settingsPage.png",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % APP_IMAGES.length);
    }, 4200);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const images = gsap.utils.toArray<HTMLImageElement>(
      containerRef.current.querySelectorAll(".carousel-img"),
    );
    const active = images[currentIndex];
    const previous = images[previousIndexRef.current];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!active) return;

    gsap.killTweensOf(images);

    if (reduceMotion || currentIndex === previousIndexRef.current) {
      gsap.set(images, { autoAlpha: 0, scale: 1, y: 0, filter: "blur(0px)" });
      gsap.set(active, { autoAlpha: 1, zIndex: 2 });
      previousIndexRef.current = currentIndex;
      return;
    }

    gsap.set(active, {
      autoAlpha: 1,
      clipPath: "inset(0% 0% 100% 0%)",
      filter: "blur(8px)",
      scale: 1.035,
      y: 24,
      zIndex: 3,
    });

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .to(active, {
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "blur(0px)",
        scale: 1,
        y: 0,
        duration: 1.05,
      })
      .to(
        previous,
        {
          autoAlpha: 0,
          filter: "blur(6px)",
          scale: 0.982,
          y: -18,
          duration: 0.78,
          ease: "power3.out",
        },
        0,
      );

    previousIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <Iphone className="hero-product-image">
        <div ref={containerRef} className="relative size-full bg-zinc-950">
          {APP_IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`App screenshot ${idx + 1}`}
              className="carousel-img absolute left-0 top-0 size-full object-cover object-top opacity-0"
              decoding={idx === 0 ? "sync" : "async"}
              loading={idx === 0 ? "eager" : "lazy"}
              style={{ opacity: idx === 0 ? 1 : 0, zIndex: idx === 0 ? 2 : 1 }}
            />
          ))}
        </div>
      </Iphone>
    </div>
  );
}
