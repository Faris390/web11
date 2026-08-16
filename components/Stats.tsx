"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
}

function AnimatedCounter({ target, duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Stats() {
  return (
    <div className="relative group p-1 rounded-2xl bg-gradient-to-r from-amber-500/30 via-primary/40 to-amber-500/30 shadow-[0_0_40px_rgba(212,163,115,0.25)] hover:shadow-[0_0_60px_rgba(212,163,115,0.45)] transition-all duration-500 hover:scale-[1.03]">
      <div className="glass-panel px-6 sm:px-10 py-5 rounded-xl flex gap-6 sm:gap-12 items-center justify-center bg-black/60 border border-white/20 backdrop-blur-2xl">
        {/* Male Stat */}
        <div className="text-center group/stat">
          <div className="flex items-center justify-center gap-1.5 text-primary text-2xl sm:text-4xl font-extrabold font-display-lg drop-shadow-[0_0_12px_rgba(212,163,115,0.6)]">
            <span className="material-symbols-outlined text-lg sm:text-2xl text-amber-400">
              male
            </span>
            <AnimatedCounter target={12} />
          </div>
          <p className="font-label-sm text-[11px] sm:text-xs text-white/70 uppercase tracking-[0.25em] font-semibold mt-1">
            Siswa (Man)
          </p>
        </div>

        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/25 to-transparent" />

        {/* Female Stat */}
        <div className="text-center group/stat">
          <div className="flex items-center justify-center gap-1.5 text-primary text-2xl sm:text-4xl font-extrabold font-display-lg drop-shadow-[0_0_12px_rgba(212,163,115,0.6)]">
            <span className="material-symbols-outlined text-lg sm:text-2xl text-pink-400">
              female
            </span>
            <AnimatedCounter target={24} />
          </div>
          <p className="font-label-sm text-[11px] sm:text-xs text-white/70 uppercase tracking-[0.25em] font-semibold mt-1">
            Siswi (Woman)
          </p>
        </div>

        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/25 to-transparent" />

        {/* Total Stat */}
        <div className="text-center group/stat">
          <div className="flex items-center justify-center gap-1.5 text-surface-bright text-2xl sm:text-4xl font-extrabold font-display-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <span className="material-symbols-outlined text-lg sm:text-2xl text-amber-300">
              groups
            </span>
            <AnimatedCounter target={36} />
          </div>
          <p className="font-label-sm text-[11px] sm:text-xs text-amber-200/90 uppercase tracking-[0.25em] font-bold mt-1">
            Total Siswa
          </p>
        </div>
      </div>
    </div>
  );
}
