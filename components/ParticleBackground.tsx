"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  top: number;
  delay: number;
  duration: number;
  angle: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const pts: Particle[] = [];
    const count = window.innerWidth < 768 ? 30 : 55;
    for (let i = 0; i < count; i++) {
      pts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(pts);

    const stars: ShootingStar[] = [];
    for (let i = 0; i < 4; i++) {
      stars.push({
        id: i,
        top: Math.random() * 60,
        delay: i * 3 + Math.random() * 2,
        duration: Math.random() * 1.5 + 1,
        angle: Math.random() * 20 + 15,
      });
    }
    setShootingStars(stars);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15 animate-aurora-1"
        style={{
          background:
            "radial-gradient(circle, rgba(212,163,115,0.4) 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-10 animate-aurora-2"
        style={{
          background:
            "radial-gradient(circle, rgba(212,163,115,0.3) 0%, transparent 70%)",
          bottom: "-5%",
          left: "-5%",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary animate-float-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute animate-shooting-star"
          style={{
            top: `${s.top}%`,
            right: "-5%",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            transform: `rotate(${s.angle}deg)`,
          }}
        >
          <div className="w-[80px] md:w-[120px] h-[1.5px] bg-gradient-to-r from-transparent via-primary/80 to-white rounded-full" />
        </div>
      ))}
    </div>
  );
}
