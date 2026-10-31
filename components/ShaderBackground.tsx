"use client";

import Image from "next/image";

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden transform-gpu">
      {/* Fixed Single Background Image (Rock-solid, no resize on scroll) */}
      <Image
        src="/bg1.jpeg"
        alt="Background"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-center brightness-50 saturate-110 pointer-events-none"
      />
      {/* Dark Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0a]/80 via-[#12110e]/60 to-[#0e0d0a]/85" />
    </div>
  );
}


