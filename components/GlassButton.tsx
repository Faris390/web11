"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import GlassSurface from "@/components/GlassSurface";

type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export default function GlassButton({ children, className = "", ...props }: GlassButtonProps) {
  return (
    <GlassSurface
      className="inline-flex max-w-full"
      borderRadius={14}
      backgroundOpacity={0.2}
      blur={8}
      saturation={1.2}
    >
      <button {...props} className={`relative z-10 ${className}`}>
        {children}
      </button>
    </GlassSurface>
  );
}
