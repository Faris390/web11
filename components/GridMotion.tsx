"use client";

type GridMotionProps = {
  items: string[];
  rows?: number;
  speed?: number;
  gap?: number;
  className?: string;
};

const GridMotion = ({
  items,
  rows = 4,
  speed = 18,
  gap = 14,
  className = "",
}: GridMotionProps) => {
  const rowItems = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: Math.max(8, items.length * 2) }, (_, index) => items[(row * 2 + index) % items.length])
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ "--grid-motion-speed": `${Math.max(1, speed)}s` } as React.CSSProperties}
    >
      <style>{`
        @keyframes grid-motion-left {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @keyframes grid-motion-right {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        [data-grid-row] {
          backface-visibility: hidden;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-grid-row] { animation-play-state: paused !important; }
        }
      `}</style>
      <div className="absolute inset-[-22%] flex flex-col justify-center -rotate-6 scale-125">
        {rowItems.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="relative flex w-max"
            data-grid-row
            style={{
              gap,
              marginTop: rowIndex === 0 ? 0 : gap,
              animation: `${rowIndex % 2 === 0 ? "grid-motion-left" : "grid-motion-right"} var(--grid-motion-speed) linear infinite`,
            }}
          >
            {row.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="h-[clamp(100px,18vw,220px)] w-[clamp(150px,25vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30"
              >
                <img src={src} alt="" draggable={false} className="h-full w-full object-cover opacity-60 grayscale-[20%]" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-[#12110e]" />
    </div>
  );
};

export default GridMotion;
