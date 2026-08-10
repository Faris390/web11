"use client";

import { useEffect, useState, useRef } from "react";
import ParticleBackground from "./ParticleBackground";

const words = [
  "F1 Students!!",
  "Obsession > Talent",
  "Logic > Luck",
  "Innovators of Tomorrow",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentWord) {
      speed = 1800;
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      speed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* 1. Hero Background Image - full bleed, no gaps */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700 opacity-90 dark:opacity-75"
          style={{ backgroundImage: "url('/herobg.jpeg')" }}
        />
        {/* Gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/20 to-surface/90 dark:from-black/60 dark:via-black/30 dark:to-black/85" />
      </div>

      {/* 2. Lightweight CSS Particle Background (replaces heavy Three.js) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        <ParticleBackground />
      </div>

      {/* 3. Main Hero Content with entrance animations */}
      <div className="z-10 text-center flex flex-col items-center gap-6 max-w-4xl py-12 px-6 sm:px-10">
        {/* Title - slides down and fades in */}
        <h1
          className={`font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-extrabold tracking-tighter text-surface-bright drop-shadow-lg transition-all duration-1000 ease-out ${mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
            }`}
        >
          XI-FARSENA
        </h1>

        {/* Typewriter - fades in with delay */}
        <div
          className={`h-10 md:h-14 flex items-center justify-center transition-all duration-1000 ease-out delay-300 ${mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
            }`}
        >
          <p className="font-headline-sm text-headline-sm text-surface-bright/90 min-h-[36px] drop-shadow-md">
            {text}
          </p>
          <span className="w-1 h-6 md:h-8 bg-primary ml-1 animate-pulse" />
        </div>

        {/* CTA Button - fixed hover wrapper hit area to eliminate aggressive flicker bug */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-2 transition-all duration-1000 ease-out delay-700 ${mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
            }`}
        >
          <div className="group relative inline-flex items-center justify-center p-3 cursor-pointer">
            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 0.9,
                  behavior: "smooth",
                });
              }}
              className="glass-panel bg-primary/90 text-on-primary px-8 py-4 rounded-full font-label-md text-label-md transition-all duration-300 cubic-bezier(0.2, 1, 0.3, 1) group-hover:bg-primary group-hover:shadow-[0_10px_35px_rgba(212,163,115,0.6)] group-hover:-translate-y-2 active:scale-95 flex items-center gap-2"
            >
              <span>Explore XI-Farsena</span>
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-y-1">
                arrow_downward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Scroll down indicator - gentle bounce */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out delay-1000 ${mounted ? "opacity-60" : "opacity-0"
          }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-surface-bright/80 font-label-sm text-xs tracking-widest uppercase">
            Scroll
          </span>
          <span className="material-symbols-outlined text-surface-bright/80 text-[18px]">
            expand_more
          </span>
        </div>
      </div>
    </section>
  );
}
