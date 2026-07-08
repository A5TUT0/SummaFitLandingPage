import React, { useEffect, useRef, useState } from "react";
import { Iphone15Pro } from "./ui/iphone-15-pro";
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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % APP_IMAGES.length);
    }, 3800);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const images = containerRef.current.querySelectorAll('.carousel-img');
    images.forEach((img, index) => {
      if (index === currentIndex) {
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          zIndex: 10,
        });
      } else {
        gsap.to(img, {
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          ease: "power3.out",
          zIndex: 0,
        });
      }
    });
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <Iphone15Pro className="hero-product-image shadow-2xl">
        <div ref={containerRef} className="relative w-full h-full bg-zinc-950">
          {APP_IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`App screenshot ${idx + 1}`}
              className="carousel-img absolute top-0 left-0 w-full h-full object-cover opacity-0 scale-95"
              style={{ opacity: idx === 0 ? 1 : 0, scale: idx === 0 ? "1" : "0.96" }}
            />
          ))}
        </div>
      </Iphone15Pro>
    </div>
  );
}
