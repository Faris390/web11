"use client";

import { MouseEvent, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TiltCard({ children, className = "", style = {} }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    card.style.transition = `transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function StructureSection() {
  return (
    <section
      id="structure"
      className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
    >
      <div className="flex flex-col gap-12">
        <div className="fade-up is-visible">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
            Class Structure
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">
            The creative minds and leaders guiding the X-Faskara journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
          {/* Wali Kelas */}
          <TiltCard className="md:col-span-8 glass-panel rounded-xl overflow-hidden relative group hover-lift fade-up is-visible">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqu_os-wP7tkPLy_86o9fO50Dh1qqmFCNqRNF1SzO09grKg4_E6rH4x1r1VfQiqgR_ETMd7u3JsnrNeUNrtwVWIzGEhs_9XwP-7IQ92RVriVDHDI1gTRD2o0yoZXajMjRezr5CVu5-UbIRAJdAH1h3Q9p2NLJyyAt084LdyFdxzbbV8nFLY8YVvLu4P8zukgxU3X5i0eu_rJqZb5Hk-sRsxFiItxmDS6Zbc-XQNLhvS-ywzziiCjdK')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 tilt-card-inner">
              <span className="font-overline text-overline text-primary-fixed bg-surface/20 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                Wali Kelas
              </span>
              <h3 className="font-headline-sm text-headline-sm text-surface-bright font-bold">
                Bpk. Guru Name
              </h3>
              <p className="font-body-md text-body-md text-surface-variant mt-1">
                Guiding Light of Faskara
              </p>
            </div>
          </TiltCard>

          {/* Ketua Kelas */}
          <TiltCard
            className="md:col-span-4 glass-panel rounded-xl overflow-hidden relative group hover-lift fade-up is-visible"
            style={{ transitionDelay: "0.1s" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrwS-CYgBmBHuxVepRXEE4XawRT27YIjBBc9SgkZ_C-ieCfEQkTf8igtTa98zh_C0y-8YzFfAUxY7c6WA1EP3c-ty0poIxNreMfE1lvAX1dQI4Vnx8tltjOPFjze8jWiqIR10pI1Jloi_FpjcctAfDPgTZCSiEZM0ThuJ9d455fbemK4FWIciWA7LIlLUN8a4PIZ71geK-WJktv1aYGYTng3wKXvU0AwCYZ7AwefyNGG2zjr4QrL3c')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 tilt-card-inner">
              <span className="font-overline text-overline text-primary-fixed bg-surface/20 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                Ketua Kelas
              </span>
              <h3 className="font-headline-sm text-headline-sm text-surface-bright font-bold">
                Student Name
              </h3>
            </div>
          </TiltCard>

          {/* Wakil & Sekretaris */}
          <div
            className="md:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-end hover-lift fade-up is-visible"
            style={{ transitionDelay: "0.2s" }}
          >
            <span
              className="material-symbols-outlined text-[48px] text-primary mb-auto"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            <div>
              <span className="font-overline text-overline text-primary mb-2 inline-block">
                Wakil & Sekretaris
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                The Coordinators
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Managing the details with precision.
              </p>
            </div>
          </div>

          {/* Bendahara */}
          <div
            className="md:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-end hover-lift fade-up is-visible"
            style={{ transitionDelay: "0.3s" }}
          >
            <span
              className="material-symbols-outlined text-[48px] text-primary mb-auto"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance_wallet
            </span>
            <div>
              <span className="font-overline text-overline text-primary mb-2 inline-block">
                Bendahara
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Treasurers
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Ensuring our creative endeavors are funded.
              </p>
            </div>
          </div>

          {/* Keamanan */}
          <div
            className="md:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-end hover-lift fade-up is-visible"
            style={{ transitionDelay: "0.4s" }}
          >
            <span
              className="material-symbols-outlined text-[48px] text-primary mb-auto"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
            <div>
              <span className="font-overline text-overline text-primary mb-2 inline-block">
                Keamanan
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Security
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Keeping the harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
