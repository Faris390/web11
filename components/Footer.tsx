export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-xl w-full rounded-t-2xl mt-section-gap relative z-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 gap-8 max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline-sm text-headline-sm text-surface-bright font-bold">
            X-Faskara
          </span>
          <p className="font-body-md text-body-md text-white/60">
            SMAN 1 Pandaan
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a
            className="text-white/70 hover:text-primary transition-colors duration-300 font-label-md text-label-md"
            href="#"
          >
            Instagram
          </a>
          <a
            className="text-white/70 hover:text-primary transition-colors duration-300 font-label-md text-label-md"
            href="#"
          >
            Twitter
          </a>
          <a
            className="text-white/70 hover:text-primary transition-colors duration-300 font-label-md text-label-md"
            href="#"
          >
            Documentation
          </a>
          <a
            className="text-white/70 hover:text-primary transition-colors duration-300 font-label-md text-label-md"
            href="#"
          >
            Privacy
          </a>
        </div>
        <div className="text-center md:text-right">
          <p className="font-overline text-overline text-white/40">
            © 2026 XI-Farsena SMAN 1 Pandaan. Crafted with precision and innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
