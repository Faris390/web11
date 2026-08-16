"use client";

import { useEffect, useRef, useState } from "react";

export interface OrgMember {
  id: string;
  name: string;
  className?: string;
  instagram: string;
  role: string;
  image: string;
  tier: "pembina" | "ketua" | "waka" | "support";
  department?: "sekretaris" | "bendahara";
  icon: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  badge: string;
}

const orgMembers: OrgMember[] = [
  {
    id: "pembina",
    name: "Hakim Akbar S.Mat",
    instagram: "hakimakbarmaulana",
    role: "Wali / Pembina",
    image: "/kpembina.jpeg",
    tier: "pembina",
    icon: "school",
    accentColor: "from-amber-400 via-amber-500 to-amber-600",
    borderColor: "border-amber-400/60 hover:border-amber-300",
    glowColor: "rgba(245, 158, 11, 0.4)",
    badge: "Wali Kelas",
  },
  {
    id: "ketua",
    name: "Panji A.R",
    className: "XII-A1",
    instagram: "panjiathallah_",
    role: "Ketua Kelas",
    image: "/ketua.jpeg",
    tier: "ketua",
    icon: "shield_person",
    accentColor: "from-purple-500 via-indigo-500 to-purple-600",
    borderColor: "border-purple-500/50 hover:border-purple-300",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "BPH Inti",
  },
  {
    id: "waka",
    name: "Novim Adi P.",
    className: "XI-A4",
    instagram: "v3mm_",
    role: "Wakil Ketua",
    image: "/kwakil.jpeg",
    tier: "waka",
    icon: "diversity_3",
    accentColor: "from-sky-400 via-cyan-500 to-blue-600",
    borderColor: "border-sky-400/50 hover:border-sky-300",
    glowColor: "rgba(56, 189, 248, 0.4)",
    badge: "BPH Inti",
  },
  {
    id: "sek1",
    name: "Aisyah Azzahra",
    className: "XI-F1",
    instagram: "aisyahazzahra",
    role: "Sekretaris I",
    image: "/ksekretaris.jpeg",
    tier: "support",
    department: "sekretaris",
    icon: "edit_note",
    accentColor: "from-emerald-400 to-teal-600",
    borderColor: "border-emerald-500/40 hover:border-emerald-300",
    glowColor: "rgba(16, 185, 129, 0.3)",
    badge: "Administrasi",
  },
  {
    id: "sek2",
    name: "Mitha Lestari",
    className: "XI-F1",
    instagram: "mithalestari",
    role: "Sekretaris II",
    image: "/ksekretaris2.jpeg",
    tier: "support",
    department: "sekretaris",
    icon: "edit_document",
    accentColor: "from-teal-400 to-cyan-600",
    borderColor: "border-teal-500/40 hover:border-teal-300",
    glowColor: "rgba(20, 184, 166, 0.3)",
    badge: "Administrasi",
  },
  {
    id: "bend1",
    name: "Amanda Severina",
    className: "XI-F1",
    instagram: "amandaseverina",
    role: "Bendahara I",
    image: "/kbendahara.jpeg",
    tier: "support",
    department: "bendahara",
    icon: "account_balance_wallet",
    accentColor: "from-rose-400 to-pink-600",
    borderColor: "border-rose-500/40 hover:border-rose-300",
    glowColor: "rgba(244, 63, 94, 0.3)",
    badge: "Keuangan",
  },
  {
    id: "bend2",
    name: "Larasati Putri",
    className: "XI-F1",
    instagram: "larasatiputri",
    role: "Bendahara II",
    image: "/kbendahara2.jpeg",
    tier: "support",
    department: "bendahara",
    icon: "payments",
    accentColor: "from-amber-400 to-rose-500",
    borderColor: "border-amber-500/40 hover:border-amber-300",
    glowColor: "rgba(245, 158, 11, 0.3)",
    badge: "Keuangan",
  },
];

export default function ClassStructure() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pembina = orgMembers.find((m) => m.tier === "pembina")!;
  const ketua = orgMembers.find((m) => m.tier === "ketua")!;
  const waka = orgMembers.find((m) => m.tier === "waka")!;
  const supports = orgMembers.filter((m) => m.tier === "support");

  return (
    <section
      ref={sectionRef}
      id="structure"
      className="py-16 sm:py-24 md:py-32 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* ── Background Cosmic Glow Spheres ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-amber-500/15 rounded-full blur-[110px] pointer-events-none animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-purple-500/15 rounded-full blur-[95px] pointer-events-none animate-pulse [animation-duration:10s]" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-sky-500/15 rounded-full blur-[95px] pointer-events-none animate-pulse [animation-duration:9s]" />

      <div className="flex flex-col items-center gap-8 sm:gap-12 relative z-10">

        {/* ── Section Header ── */}
        <div
          className={`text-center max-w-2xl px-2 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-purple-500/20 to-sky-400/20 border border-amber-400/30 text-amber-300 mb-3 sm:mb-4 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
              account_tree
            </span>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white/90">
              XI-F1 2026/2027
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white tracking-tight mb-2 sm:mb-3 drop-shadow-md">
            Struktur Organisasi Kelas
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Susunan kepengurusan kelas XI-F1 yang berdedikasi menciptakan ruang belajar yang solid, aktif, dan harmonis.
          </p>
        </div>

        {/* ── Organizational Chart Tree ── */}
        <div className="w-full flex flex-col items-center">

          {/* ══ TIER 1: PEMBINA / WALI KELAS ══ */}
          <div
            className={`w-full flex justify-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-6 scale-95"
              }`}
          >
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
              <MemberCard member={pembina} isApex />
            </div>
          </div>

          {/* ══ CONNECTOR: Pembina ➔ Ketua & Wakil ══ */}
          <div
            className={`w-full max-w-sm sm:max-w-xl flex flex-col items-center pointer-events-none transition-all duration-700 delay-150 ${isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              }`}
            style={{ transformOrigin: "top" }}
          >
            <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-amber-400 via-amber-400/80 to-purple-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            {/* Pulsing junction node */}
            <div className="relative -my-1 z-10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-amber-400/40 animate-ping" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 border border-white shadow-[0_0_12px_rgba(245,158,11,1)]" />
            </div>
            {/* Horizontal branch bar: left-[25%] to right-[25%] */}
            <div className="relative w-full h-5 sm:h-6">
              <div className="absolute top-1 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-purple-500 via-amber-400 to-sky-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              <div className="absolute left-[25%] top-1 w-0.5 h-4 sm:h-5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <div className="absolute left-[25%] bottom-0 -translate-x-[45%] w-1.5 h-1.5 rounded-full bg-purple-400" />
              <div className="absolute right-[25%] top-1 w-0.5 h-4 sm:h-5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <div className="absolute right-[25%] bottom-0 translate-x-[45%] w-1.5 h-1.5 rounded-full bg-sky-400" />
            </div>
          </div>

          {/* ══ TIER 2: KETUA & WAKIL KETUA ══ */}
          <div
            className={`w-full max-w-sm sm:max-w-xl grid grid-cols-2 gap-3 sm:gap-6 relative z-10 transition-all duration-700 ease-out delay-250 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <MemberCard member={ketua} />
            <MemberCard member={waka} />
          </div>

          {/* ══ CONNECTOR: Leaders ➔ Support Divisions ══ */}
          <div
            className={`w-full max-w-sm sm:max-w-xl flex flex-col items-center pointer-events-none my-1 transition-all duration-700 delay-350 ${isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              }`}
            style={{ transformOrigin: "top" }}
          >
            <div className="relative w-full h-4 sm:h-5">
              <div className="absolute left-[25%] top-0 w-0.5 h-2.5 bg-purple-400/70" />
              <div className="absolute right-[25%] top-0 w-0.5 h-2.5 bg-sky-400/70" />
              <div className="absolute top-2.5 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-purple-400/70 via-amber-400/80 to-sky-400/70" />
            </div>
            <div className="w-0.5 h-5 sm:h-7 bg-gradient-to-b from-amber-400/80 via-emerald-400/80 to-teal-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            {/* Glowing pulsing junction node */}
            <div className="relative -my-1 z-10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white shadow-[0_0_12px_rgba(16,185,129,1)]" />
            </div>
          </div>

          {/* ══ TIER 3: SEKRETARIS & BENDAHARA ══ */}
          <div
            className={`w-full max-w-5xl mt-4 sm:mt-6 transition-all duration-700 ease-out delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-emerald-400/40" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-emerald-300/90 bg-emerald-400/10 px-3.5 py-1 rounded-full border border-emerald-400/25 flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <span className="material-symbols-outlined text-[13px] animate-pulse text-emerald-400">tune</span>
                <span>Sekretaris &amp; Bendahara</span>
              </span>
              <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-rose-400/40" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {supports.map((member) => (
                <MemberCard key={member.id} member={member} isCompact />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   MEMBER CARD SUB-COMPONENT
   ══════════════════════════════════════════════════════ */
interface MemberCardProps {
  member: OrgMember;
  isApex?: boolean;
  isCompact?: boolean;
}

function MemberCard({ member, isApex = false, isCompact = false }: MemberCardProps) {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div
      className={`org-card glass-panel group relative z-10 border ${member.borderColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${isApex ? "p-4 sm:p-6" : isCompact ? "p-3 sm:p-4" : "p-3.5 sm:p-5"
        }`}
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.45)" }}
    >
      {/* Background Hover Aura */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${member.glowColor} 0%, transparent 75%)` }}
      />

      {/* Avatar with Dual Spinning Rings */}
      <div
        className={`org-avatar ${isApex
            ? "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
            : isCompact
              ? "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18"
              : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          } bg-white/10 text-white p-0.5 sm:p-1 transition-all duration-500 group-hover:scale-105`}
        style={{ boxShadow: `0 0 20px ${member.glowColor}` }}
      >
        {/* Outer Rotating Ring */}
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${member.accentColor} opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-spin [animation-duration:10s] pointer-events-none`}
        />
        {/* Inner Counter-Rotating Ring */}
        <div
          className={`absolute -inset-0.5 rounded-full bg-gradient-to-bl ${member.accentColor} opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-spin [animation-duration:14s] [animation-direction:reverse] pointer-events-none`}
        />
        <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-[#191815] flex items-center justify-center">
          {!imgError ? (
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-tr ${member.accentColor} flex flex-col items-center justify-center text-white font-bold`}>
              <span className="material-symbols-outlined text-base sm:text-lg mb-0.5">{member.icon}</span>
              <span className={isCompact ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"}>
                {getInitials(member.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Member Name */}
      <h3
        className={`org-name font-bold group-hover:text-amber-300 transition-colors duration-300 flex items-center justify-center gap-1 flex-wrap ${isApex ? "text-sm sm:text-base md:text-lg" : isCompact ? "text-xs sm:text-sm" : "text-xs sm:text-base"
          }`}
      >
        <span className="leading-tight line-clamp-2 sm:line-clamp-none">{member.name}</span>
        {member.className && (
          <span className="text-[9px] sm:text-[10px] font-mono font-normal opacity-80 px-1.5 py-0.5 rounded bg-white/10 text-white/90">
            {member.className}
          </span>
        )}
      </h3>

      {/* Instagram Button */}
      <a
        href={`https://instagram.com/${member.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram @${member.instagram}`}
        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-white/70 hover:text-white mt-1.5 py-1 px-2.5 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-600/80 hover:via-pink-600/80 hover:to-amber-500/80 border border-white/10 hover:border-transparent transition-all duration-300 max-w-full truncate shadow-sm hover:shadow-[0_0_12px_rgba(236,72,153,0.4)] hover:scale-105"
      >
        <svg className="w-3 h-3 fill-current flex-shrink-0 opacity-80" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span className="truncate">@{member.instagram}</span>
        <span className="material-symbols-outlined text-[11px] opacity-60 group-hover:translate-x-0.5 transition-transform">
          arrow_outward
        </span>
      </a>

      {/* Role Badge */}
      <p
        className={`org-role mt-2 sm:mt-2.5 transition-colors duration-300 flex items-center justify-center gap-1 ${isApex
            ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
            : member.tier === "ketua"
              ? "text-purple-300 border-purple-400/30 bg-purple-400/10"
              : member.tier === "waka"
                ? "text-sky-300 border-sky-400/30 bg-sky-400/10"
                : "text-emerald-300/90 border-emerald-400/20 bg-emerald-400/10"
          }`}
      >
        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">{member.icon}</span>
        <span className="truncate">{member.role}</span>
      </p>
    </div>
  );
}
