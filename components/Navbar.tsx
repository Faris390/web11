"use client";

import GlassButton from "@/components/GlassButton";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", active: true },
    { name: "Struktur Kelas", href: "#structure" },
    { name: "Jadwal & Piket", href: "#schedule" },
    { name: "Denah Duduk", href: "#seating" },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fade-in transition-opacity"
          aria-hidden="true"
        />
      )}

      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-3xl z-50 transition-all duration-300">
        <nav
          id="navbar"
          className={`w-full backdrop-blur-xl bg-black/50 border border-white/20 shadow-glow-gold rounded-full transition-all duration-300 px-4 sm:px-5 py-2 flex items-center justify-between ${
            isScrolled ? "shadow-lg py-1.5 bg-black/70 border-white/30" : ""
          }`}
        >
          {/* Brand Logo using Syne font */}
          <a
            href="#"
            className="font-headline-md text-xl sm:text-2xl font-bold tracking-tighter text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>XI-F1</span>
          </a>

          {/* Desktop Navigation Links using Plus Jakarta Sans */}
          <div className="hidden md:flex gap-4 lg:gap-5 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${
                  link.active
                    ? "text-primary font-bold bg-primary/20"
                    : "text-white/80 hover:text-primary hover:bg-white/10"
                } font-label-md text-label-md transition-all duration-300 px-3 py-1 rounded-full`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <GlassButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-amber-400 focus:outline-none p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </GlassButton>
          </div>

          {/* Mobile Drawer Menu using glass-panel */}
          {mobileMenuOpen && (
            <div className="absolute top-14 left-0 right-0 glass-panel rounded-2xl p-3 sm:p-4 flex flex-col gap-1.5 shadow-2xl border border-white/20 animate-fade-in md:hidden z-50">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-amber-300 font-medium text-sm py-2.5 px-3.5 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="material-symbols-outlined text-xs text-white/40">chevron_right</span>
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-white/10">
                <a
                  href="/loginjir"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono text-amber-300/80 hover:text-amber-300 py-2 px-3.5 rounded-xl hover:bg-amber-400/10 flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Portal Admin Kelas</span>
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
