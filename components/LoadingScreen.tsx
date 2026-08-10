"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Durasi loading dibuat lebih santai & halus
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Kenaikan persen lebih kecil (+4 sampai +11)
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 110); // Interval diperlambat jadi 110ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // 1. Tahan 400ms pas udah 100%, baru mulai memudar
      const startFade = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 400);

      // 2. Transisi memudar berlangsung 1500ms (1.5 detik)
      // Total waktu hapus dari DOM: 400ms (tahan) + 1500ms (fade) = 1900ms
      const removeComponent = setTimeout(() => {
        setShouldRender(false);
      }, 1900);

      return () => {
        clearTimeout(startFade);
        clearTimeout(removeComponent);
      };
    }
  }, [progress]);

  if (!shouldRender) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes shockwave {
          0% {
            transform: scale(1);
            opacity: 0.7;
            border-width: 2px;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
            border-width: 0.5px;
          }
        }
        @keyframes eq-bounce {
          0%, 100% {
            height: 4px;
          }
          50% {
            height: 18px;
          }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[99999] bg-[#0c0b09] flex flex-col items-center justify-center overflow-hidden transition-all duration-[1500ms] ease-in-out ${isLoading
            ? "opacity-100 scale-100 blur-none"
            : "opacity-0 scale-105 blur-xl pointer-events-none"
          }`}
      >
        <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-amber-600/15 via-primary/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin [animation-duration:2.2s]" />
          <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-amber-400/30 animate-spin [animation-duration:5.5s] [animation-direction:reverse]" />
          <div
            className="absolute inset-0 rounded-full border border-amber-500/80 pointer-events-none"
            style={{ animation: "shockwave 2.5s ease-out infinite" }}
          />
          <div
            className="absolute inset-0 rounded-full border border-amber-400/80 pointer-events-none"
            style={{ animation: "shockwave 2.5s ease-out infinite 0.8s" }}
          />
          <div
            className="absolute inset-0 rounded-full border border-yellow-300/80 pointer-events-none"
            style={{ animation: "shockwave 2.5s ease-out infinite 1.6s" }}
          />

          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-600/30 via-yellow-500/30 to-amber-200/20 blur-3xl animate-pulse pointer-events-none" />

          <div className="relative z-10 p-5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-[0_0_35px_rgba(212,163,115,0.3)]">
            <Image
              src="/loading.png"
              alt="XI-FARSENA Logo"
              width={90}
              height={90}
              priority
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse [animation-duration:2s]"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-3 mt-8 w-60 sm:w-72">
          <div className="flex items-baseline gap-1.5 font-display-lg text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            <span>{progress}</span>
            <span className="text-lg font-mono text-amber-400">%</span>
          </div>

          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/80 font-semibold">
            XI-FARSENA | SMANDA
          </span>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-white rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_#f59e0b]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 h-5 mt-3">
          <div className="w-1 bg-amber-400/80 rounded-full" style={{ animation: "eq-bounce 0.6s ease-in-out infinite" }} />
          <div className="w-1 bg-yellow-300/80 rounded-full" style={{ animation: "eq-bounce 0.8s ease-in-out infinite 0.15s" }} />
          <div className="w-1 bg-amber-500/80 rounded-full" style={{ animation: "eq-bounce 0.5s ease-in-out infinite 0.3s" }} />
          <div className="w-1 bg-white/90 rounded-full" style={{ animation: "eq-bounce 0.7s ease-in-out infinite 0.1s" }} />
          <div className="w-1 bg-amber-400/80 rounded-full" style={{ animation: "eq-bounce 0.6s ease-in-out infinite 0.2s" }} />
        </div>
      </div>
    </>
  );
}