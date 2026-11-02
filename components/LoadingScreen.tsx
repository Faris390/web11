"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  // Phase: "loading" -> "bg-exit" -> "flying" -> "fading" -> "done"
  const [phase, setPhase] = useState<"loading" | "bg-exit" | "flying" | "fading" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // 1. Pada 1.8s: Background dan teks memudar, membuka layar Hero di belakangnya
    const t1 = setTimeout(() => {
      setPhase("bg-exit");
      document.body.style.overflow = "";
    }, 1800);

    // 2. Pada 2.0s: Logo meluncur naik menuju posisi persis Logo Hero
    const t2 = setTimeout(() => {
      setPhase("flying");
    }, 2000);

    // 3. Pada 2.7s: Logo telah sampai di posisi Hero Logo dan perlahan menghilang (fade out)
    const t3 = setTimeout(() => {
      setPhase("fading");
    }, 2700);

    // 4. Pada 3.2s: Hapus komponen dari DOM
    const t4 = setTimeout(() => {
      setPhase("done");
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (phase === "done") return null;

  // Nilai posisi tujuan logo (Mobile vs Desktop)
  const targetTop = isMobile ? "34.5vh" : "38.5vh";

  // Style posisi & animasi logo berdasarkan fase
  const getLogoStyle = (): React.CSSProperties => {
    if (phase === "loading" || phase === "bg-exit") {
      return {
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
        transition: "none",
      };
    }
    if (phase === "flying") {
      return {
        position: "fixed",
        top: targetTop,
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.85)",
        opacity: 1,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      };
    }
    // phase === "fading"
    return {
      position: "fixed",
      top: targetTop,
      left: "50%",
      transform: "translate(-50%, -50%) scale(0.85)",
      opacity: 0,
      transition: "opacity 0.45s ease-out",
    };
  };

  return (
    <>
      <style jsx global>{`
        /* Scanlines Overlay */
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.4)
          );
          background-size: 100% 4px;
        }

        /* Cyber Dot Noise Grid - Warm Amber Tint */
        .cyber-grid {
          background-image: 
            radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 24px 24px, 48px 48px, 48px 48px;
        }

        /* Fade In & Slide Up Animation Teks */
        @keyframes y2kFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        /* Y2K 3D Text Shadow - High Contrast Warm Gold / Amber Offset Overlay */
        .y2k-text-shadow {
          text-shadow: 
            3px 3px 0px #f59e0b,
            6px 6px 0px #b45309,
            0px 0px 30px rgba(245, 158, 11, 0.6);
        }

        /* Main Text Fill: Pure Solid White for Maximum Readability */
        .text-white-main {
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
          display: inline-block;
        }

        /* Spinning rings */
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>

      {/* ═══ Layer 1: Background + Teks (Memudar lebih dulu) ═══ */}
      <div
        className={`fixed inset-0 z-[99998] bg-[#0d0714] flex flex-col items-center justify-center overflow-hidden select-none ${phase === "loading"
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
          }`}
        style={{ transition: "opacity 0.45s ease-in-out" }}
      >
        {/* Cyber Dot Noise Grid */}
        <div className="absolute inset-0 w-full h-full cyber-grid opacity-60 pointer-events-none z-0" />

        {/* Scanlines Overlay */}
        <div className="absolute inset-0 w-full h-full scanlines opacity-50 pointer-events-none z-[1]" />

        {/* Glassmorphism / Backdrop Blur Layer */}
        <div className="absolute inset-0 w-full h-full backdrop-blur-md bg-black/30 pointer-events-none z-[2]" />

        {/* Radial Ambient Glow - Warm Gold / Amber */}
        <div className="absolute w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-600/25 via-yellow-600/20 to-amber-400/20 blur-[110px] pointer-events-none z-[3]" />

        {/* Teks FARSENA!2026 (Warna utama Putih, overlay bayangan 3D Amber) */}
        <div
          className="relative z-10 text-center px-4"
          style={{
            marginTop: "120px",
            opacity: 0,
            animation: "y2kFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
          }}
        >
          <h1 className="font-extrabold text-3xl sm:text-6xl md:text-8xl tracking-tight y2k-text-shadow flex items-center justify-center flex-wrap gap-x-2 font-['Syne'],sans-serif">
            <span className="text-white-main">
              FARSENA!
            </span>
            <span className="text-white-main">
              2026
            </span>
          </h1>
        </div>
      </div>

      {/* ═══ Layer 2: Logo Terbang ke Posisi Hero ═══ */}
      <div className="z-[99999] pointer-events-none" style={getLogoStyle()}>
        <div className="relative">
          {/* Glow aura behind logo */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-300/20 blur-2xl pointer-events-none" />

          {/* Spinning dashed ring */}
          <div
            className="absolute -inset-3 rounded-full border border-dashed border-amber-400/40 pointer-events-none"
            style={{ animation: "spinCCW 12s linear infinite" }}
          />

          {/* Outer spinning ring */}
          <div
            className="absolute -inset-5 rounded-full border border-amber-300/30 pointer-events-none"
            style={{ animation: "spinCW 18s linear infinite" }}
          />

          {/* Round Logo Badge */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-200 shadow-[0_0_40px_rgba(212,163,115,0.6)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black/80 flex items-center justify-center p-1">
              <Image
                src="/logo.jpeg"
                alt="XI-FARSENA Logo"
                width={140}
                height={140}
                priority
                className="w-full h-full object-cover rounded-full drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}