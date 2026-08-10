"use client";

export default function Stats() {
  return (
    <div
      className="md:absolute bottom-8 md:bottom-16 right-4 md:right-16 glass-panel p-6 rounded-xl ambient-shadow hover-lift z-20 flex gap-6 sm:gap-8 items-center justify-center my-6 md:my-0 mx-auto w-[92%] max-w-sm md:w-auto transition-all duration-300 border border-white/15"
      style={{ transitionDelay: "0.3s" }}
    >
      <div className="text-center">
        <p className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold">
          12
        </p>
        <p className="font-label-sm text-label-sm text-white/70 uppercase tracking-widest mt-1">
          Man
        </p>
      </div>
      <div className="w-px h-12 bg-white/15" />
      <div className="text-center">
        <p className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold">
          24
        </p>
        <p className="font-label-sm text-label-sm text-white/70 uppercase tracking-widest mt-1">
          Woman
        </p>
      </div>
      <div className="w-px h-12 bg-white/15" />
      <div className="text-center">
        <p className="font-display-lg-mobile text-display-lg-mobile text-surface-bright font-bold">
          36
        </p>
        <p className="font-label-sm text-label-sm text-white/70 uppercase tracking-widest mt-1">
          Total
        </p>
      </div>
    </div>
  );
}
