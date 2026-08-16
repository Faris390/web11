"use client";

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      {/* Background Image: bg1.jpeg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed filter brightness-[0.5] saturate-110"
        style={{ backgroundImage: "url('/bg1.jpeg')" }}
      />
      {/* Dark Vignette Overlay for Premium Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0a]/80 via-[#12110e]/60 to-[#0e0d0a]/85" />
    </div>
  );
}
