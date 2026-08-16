"use client";

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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-50 transition-all duration-300">
      <nav
        id="navbar"
        className={`w-full backdrop-blur-xl bg-black/40 border border-white/20 shadow-glow-gold rounded-full transition-all duration-300 px-5 py-2 flex items-center justify-between ${
          isScrolled ? "shadow-lg py-1.5 bg-black/60 border-white/25" : ""
        }`}
      >
        {/* Brand Logo using Syne font */}
        <a
          href="#"
          className="font-headline-md text-headline-md font-bold tracking-tighter text-primary hover:opacity-85 transition-opacity"
        >
          XI-F1
        </a>

        {/* Desktop Navigation Links using Plus Jakarta Sans */}
        <div className="hidden md:flex gap-5 items-center">
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
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary focus:outline-none p-1"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Drawer Menu using glass-panel */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 glass-panel rounded-2xl p-4 flex flex-col gap-2 shadow-glow-gold animate-fade-in md:hidden z-50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-surface-bright hover:text-primary font-label-md text-label-md py-2 px-3 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
