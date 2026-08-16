"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<"overview" | "schedule" | "structure" | "seating">("overview");

  useEffect(() => {
    // Cek apakah ada token login
    const token = localStorage.getItem('token');

    if (!token) {
      // Kalau gak ada token, tendang ke halaman login portal
      router.push('/loginjir');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/loginjir');
  };

  // Tampilkan loading screen glassmorphism sebelum status auth selesai dicek
  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-[#12110e] text-[#fcf9f0] flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-4 z-10 border border-white/10 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <span className="material-symbols-outlined text-amber-400 text-4xl animate-spin">
            progress_activity
          </span>
          <p className="text-sm font-semibold text-amber-200/80 tracking-wide">
            Memeriksa hak akses admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#12110e] text-[#fcf9f0] relative overflow-x-hidden">
      {/* ── Top Admin Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-white leading-tight">XI-FARSENA</h2>
            <p className="text-[10px] font-mono text-amber-300/80 tracking-wider">ADMIN DASHBOARD</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-panel border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span className="hidden sm:inline">Halaman Utama</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 hover:border-red-400/60 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

        {/* ── Main Hero-Style Header Section (WITHOUT Typewriter) ── */}
        <section className="min-h-[85vh] w-full flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-12 px-4">
          {/* 1. Hero Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700 opacity-90 dark:opacity-80"
              style={{ backgroundImage: "url('/bg1.jpeg')" }}
            />
            {/* Gradient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/20 to-[#12110e] dark:from-black/60 dark:via-black/40 dark:to-[#12110e]" />
          </div>

          {/* 2. Lightweight CSS Particle Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            <ParticleBackground />
          </div>

          {/* 3. Main Hero Content without Typewriter */}
          <div className="z-10 text-center flex flex-col items-center gap-6 max-w-4xl pt-8 pb-4 px-4 sm:px-10">
            {/* Admin Dashboard Badge */}
            <div
              className={`transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
            >
            </div>

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

            {/* Subtitle / Admin Welcome Note (Typewriter Omitted) */}
            <p
              className={`text-base sm:text-lg text-white/80 max-w-xl transition-all duration-1000 ease-out delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              Pusat Kontrol & Pengelolaan Informasi XI-Farsena.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div
              className={`flex flex-wrap justify-center gap-3 mt-2 transition-all duration-1000 ease-out delay-500 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                }`}
            >
              <button
                onClick={() => {
                  setActiveSection("overview");
                  document.getElementById("dashboard-content")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${activeSection === "overview"
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "glass-panel text-white border-white/20 hover:border-amber-400/50"
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>Overview</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("schedule");
                  document.getElementById("dashboard-content")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${activeSection === "schedule"
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "glass-panel text-white border-white/20 hover:border-amber-400/50"
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Kelola Jadwal</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("structure");
                  document.getElementById("dashboard-content")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${activeSection === "structure"
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "glass-panel text-white border-white/20 hover:border-amber-400/50"
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>Struktur Kelas</span>
              </button>

              <button
                onClick={() => {
                  setActiveSection("seating");
                  document.getElementById("dashboard-content")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border ${activeSection === "seating"
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "glass-panel text-white border-white/20 hover:border-amber-400/50"
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">chair</span>
                <span>Denah Duduk</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Dashboard Content & Controls Section ── */}
        <section id="dashboard-content" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <div className="glass-panel p-5 rounded-2xl border border-amber-400/30 relative overflow-hidden group hover:border-amber-400 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">Total Siswa</span>
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">36</p>
              <p className="text-xs text-white/60 mt-1">Siswa Terdaftar (XI-F1)</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 relative overflow-hidden group hover:border-purple-400 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">Pengurus Inti</span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                  <span className="material-symbols-outlined text-2xl">shield_person</span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">7</p>
              <p className="text-xs text-white/60 mt-1">Wali, Ketua & Pengurus</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-sky-400/30 relative overflow-hidden group hover:border-sky-400 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-sky-300 uppercase tracking-wider">Mata Pelajaran</span>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300">
                  <span className="material-symbols-outlined text-2xl">menu_book</span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">12</p>
              <p className="text-xs text-white/60 mt-1">Jadwal Mingguan Aktif</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-emerald-400/30 relative overflow-hidden group hover:border-emerald-400 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">Denah Duduk</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <span className="material-symbols-outlined text-2xl">event_seat</span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-white">18 Baris</p>
              <p className="text-xs text-white/60 mt-1">Layout Meja & Kursi Aktif</p>
            </div>
          </div>

          {/* Dynamic Panel View Based on Active Tab */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400">tune</span>
                      Panel Kontrol Admin
                    </h3>
                    <p className="text-xs text-white/60 mt-0.5">Ringkasan status modul website XI-FARSENA</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    SYSTEM ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-amber-400 text-2xl">calendar_today</span>
                      <h4 className="font-bold text-white text-base">Jadwal Pelajaran</h4>
                    </div>
                    <p className="text-xs text-white/70 mb-4">
                      Jadwal Senin hingga Jumat telah terkonfigurasi lengkap dengan piket kebersihan kelas.
                    </p>
                    <button
                      onClick={() => setActiveSection("schedule")}
                      className="w-full py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold hover:bg-amber-500/30 transition-all"
                    >
                      Buka Pengaturan Jadwal
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/40 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-purple-400 text-2xl">account_tree</span>
                      <h4 className="font-bold text-white text-base">Struktur Kelas</h4>
                    </div>
                    <p className="text-xs text-white/70 mb-4">
                      Susunan pengurus kelas (Pembina, Ketua, Wakil, Sekretaris & Bendahara) aktif.
                    </p>
                    <button
                      onClick={() => setActiveSection("structure")}
                      className="w-full py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold hover:bg-purple-500/30 transition-all"
                    >
                      Buka Pengaturan Pengurus
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-sky-400 text-2xl">grid_on</span>
                      <h4 className="font-bold text-white text-base">Denah Tempat Duduk</h4>
                    </div>
                    <p className="text-xs text-white/70 mb-4">
                      Denah interaktif posisi duduk siswa kelas XI-FARSENA lengkap dengan pencarian nama.
                    </p>
                    <button
                      onClick={() => setActiveSection("seating")}
                      className="w-full py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold hover:bg-sky-500/30 transition-all"
                    >
                      Buka Pengaturan Denah
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "schedule" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-400">calendar_month</span>
                    Modul Manajemen Jadwal Pelajaran
                  </h3>
                  <span className="text-xs text-amber-300/80 font-mono">Modul Ready</span>
                </div>
                <p className="text-xs text-white/70">
                  Fitur pengelolaan jadwal pelajaran dan jadwal piket harian kelas XI-FARSENA.
                </p>
                <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">info</span>
                  <span>Jadwal aktif ditampilkan secara dinamis di halaman depan berdasarkan hari saat ini.</span>
                </div>
              </div>
            )}

            {activeSection === "structure" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-400">account_tree</span>
                    Modul Struktur Pengurus Kelas
                  </h3>
                  <span className="text-xs text-purple-300/80 font-mono">Modul Ready</span>
                </div>
                <p className="text-xs text-white/70">
                  Fitur pengelolaan nama pengurus, jabatan, akun Instagram, dan foto profil.
                </p>
                <div className="p-4 rounded-xl bg-purple-400/10 border border-purple-400/20 text-xs text-purple-200 flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">stars</span>
                  <span>Struktur organisasi memuat Pembina: Hakim Akbar S.Mat, Ketua: Panji A.R, Wakil Ketua: Novim Adi P.</span>
                </div>
              </div>
            )}

            {activeSection === "seating" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-sky-400">chair</span>
                    Modul Denah Tempat Duduk
                  </h3>
                  <span className="text-xs text-sky-300/80 font-mono">Modul Ready</span>
                </div>
                <p className="text-xs text-white/70">
                  Layout denah tempat duduk 36 siswa dengan pencarian cepat dan mode visualisasi meja.
                </p>
                <div className="p-4 rounded-xl bg-sky-400/10 border border-sky-400/20 text-xs text-sky-200 flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">event_seat</span>
                  <span>Posisi meja terdistribusi rapi dalam bentuk 2 kolom meja ganda.</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center border-t border-white/10 text-xs text-white/50 relative z-10">
          <p>© {new Date().getFullYear()} XI-FARSENA • SMAN 1 Pandaan Admin Dashboard</p>
        </footer>
      </div>
    );
  }
