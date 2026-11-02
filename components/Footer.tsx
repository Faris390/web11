export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-xl w-full rounded-t-3xl mt-12 sm:mt-20 md:mt-28 relative z-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-margin-desktop py-8 sm:py-12 gap-6 md:gap-8 max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline-sm text-xl sm:text-2xl text-surface-bright font-bold">
            XI-Farsena
          </span>
          <p className="font-body-md text-xs sm:text-sm text-white/60">
            SMAN 1 Pandaan • Tahun Ajaran 2026/2027
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm">
          <a
            className="text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium"
            href="https://instagram.com/farsena.smanda"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium"
            href="#schedule"
          >
            Jadwal
          </a>
          <a
            className="text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium"
            href="#structure"
          >
            Struktur
          </a>
          <a
            className="text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium"
            href="#seating"
          >
            Denah Duduk
          </a>
        </div>
        <div className="text-center md:text-right">
          <p className="font-overline text-[10px] sm:text-overline text-white/40 tracking-wider">
            © 2026 XI-Farsena SMAN 1 Pandaan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
