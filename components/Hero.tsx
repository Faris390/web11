"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-16 px-4"
    >
      {/* 1. Hero Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700 opacity-90 dark:opacity-80"
          style={{ backgroundImage: "url('/bg1.jpeg')" }}
        />
        {/* Gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/20 to-surface/90 dark:from-black/60 dark:via-black/30 dark:to-black/85" />
      </div>

      {/* 2. Lightweight CSS Particle Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        <ParticleBackground />
      </div>

      {/* 3. Main Hero Content with entrance animations */}
      <div className="z-10 text-center flex flex-col items-center gap-5 max-w-4xl pt-16 pb-8 px-4 sm:px-10">
        {/* Round Logo Above XI-FARSENA with Floating & Glow Animations */}
        <div
          className={`relative transition-all duration-1000 ease-out ${mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-8"
            }`}
        >
          {/* Glow aura behind logo */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-500/25 via-primary/20 to-amber-300/15 blur-2xl animate-pulse pointer-events-none" />

          {/* Circular Text SVG orbiting the logo */}
          <svg
            className="absolute -inset-8 sm:-inset-10 w-[calc(100%+64px)] h-[calc(100%+64px)] sm:w-[calc(100%+80px)] sm:h-[calc(100%+80px)] animate-spin [animation-duration:18s] pointer-events-none"
            viewBox="0 0 200 200"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
              />
            </defs>
            <text
              fill="rgba(212,163,115,0.85)"
              fontSize="14"
              fontWeight="700"
              letterSpacing="6"
              fontFamily="var(--font-syne), sans-serif"
            >
              <textPath href="#circlePath" startOffset="0%">
                -•-farsena.smanda-•-farsena.smanda•--
              </textPath>
            </text>
          </svg>

          {/* Spinning Neon Ring Behind Logo */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:12s] [animation-direction:reverse] pointer-events-none" />

          {/* Round Logo Badge */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-primary to-amber-200 shadow-[0_0_35px_rgba(212,163,115,0.5)] transition-transform duration-500 hover:scale-110">
            <div className="w-full h-full rounded-full overflow-hidden bg-black/80 flex items-center justify-center p-1">
              <Image
                src="/logo.jpeg"
                alt="XI-FARSENA Logo"
                width={120}
                height={120}
                priority
                className="w-full h-full object-cover rounded-full drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Title - XI-FARSENA with Golden Glow */}
        <h1
          className={`font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-extrabold tracking-tighter text-surface-bright transition-all duration-1000 ease-out delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{
            textShadow:
              "0 0 25px rgba(212,163,115,0.6), 0 0 60px rgba(212,163,115,0.3), 0 4px 14px rgba(0,0,0,0.9)",
          }}
        >
          XI-FARSENA
        </h1>

        {/* Typewriter - Animated Subtitle */}
        <div
          className={`h-10 md:h-12 flex items-center justify-center transition-all duration-1000 ease-out delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <p className="font-headline-sm text-lg sm:text-2xl text-surface-bright/90 min-h-[32px] drop-shadow-md font-semibold tracking-wide">
            {text}
          </p>
          <span className="w-1 h-6 md:h-7 bg-amber-400 ml-1.5 animate-pulse shadow-[0_0_8px_#f59e0b]" />
        </div>

        {/* CTA Button */}
        <div
          className={`flex flex-wrap justify-center gap-4 mt-1 transition-all duration-1000 ease-out delay-500 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
        >
          <div className="group relative inline-flex items-center justify-center p-2 cursor-pointer">
            <button
              onClick={() => {
                const el = document.getElementById("schedule");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({
                    top: window.innerHeight * 0.9,
                    behavior: "smooth",
                  });
                }
              }}
              className="glass-panel bg-gradient-to-r from-primary/90 to-amber-600/90 text-white px-8 py-3.5 rounded-full font-label-md text-label-md transition-all duration-300 cubic-bezier(0.2, 1, 0.3, 1) hover:shadow-[0_10px_35px_rgba(212,163,115,0.6)] hover:-translate-y-1.5 active:scale-95 flex items-center gap-2 border border-amber-300/40"
            >
              <span>Explore XI-Farsena</span>
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-y-1">
                arrow_downward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Scroll down indicator */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ease-out delay-1000 ${mounted ? "opacity-60" : "opacity-0"
          }`}
      >
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <span className="text-surface-bright/80 font-label-sm text-[10px] tracking-widest uppercase">
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
