"use client";

import { useEffect, useRef } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rowElements = Array.from(root.querySelectorAll<HTMLElement>("[data-grid-row]"));
    let frame = 0;
    let last = performance.now();
    let offset = rowElements.map((_, index) => index * 120);

    const animate = (now: number) => {
      const delta = Math.min(50, now - last);
      last = now;
      rowElements.forEach((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        offset[index] += direction * speed * delta / 1000;
        const width = row.scrollWidth / 2;
        if (width > 0) offset[index] = direction < 0
          ? ((offset[index] % width) + width) % width - width
          : -(((offset[index] % width) + width) % width);
        row.style.transform = `translate3d(${offset[index]}px, 0, 0)`;
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const rowItems = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: Math.max(8, items.length * 2) }, (_, index) => items[(row * 2 + index) % items.length])
  );

  return (
    <div ref={rootRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-[-22%] -rotate-6 scale-125">
        {rowItems.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="relative flex w-max"
            data-grid-row
            style={{ gap, marginTop: rowIndex === 0 ? 0 : gap }}
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
