'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ParticleBackground from '@/components/ParticleBackground';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Kirim data ke backend Express
            const res = await fetch('http://192.168.0.196:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Simpan token JWT di localStorage
                localStorage.setItem('token', data.token);
                // Lempar ke dashboard admin
                router.push('/lovyu');
            } else {
                setError(data.message || 'Login gagal! Periksa username dan password.');
            }
        } catch (err) {
            setError('Backend server belum jalan atau koneksi terputus!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#12110e] text-[#fcf9f0] relative overflow-hidden flex flex-col justify-between select-none">
            {/* ── Background Image & Vignette ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 transition-all duration-700 opacity-80"
                    style={{ backgroundImage: "url('/bg1.jpeg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#12110e]/60 to-[#12110e]" />
            </div>

            {/* ── Particle Background ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
                <ParticleBackground />
            </div>

            {/* ── Ambient Radial Glow Highlights ── */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/20 via-yellow-600/10 to-transparent rounded-full blur-3xl pointer-events-none z-[2]" />

            {/* ── Top Header Navbar ── */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                            <Image
                                src="/logo.jpeg"
                                alt="Logo XI-Farsena"
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-sm sm:text-base text-white leading-tight">XI-FARSENA</h2>
                        <p className="text-[10px] font-mono text-amber-300/80 tracking-wider">ADMIN PORTAL</p>
                    </div>
                </div>

                <Link
                    href="/"
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold glass-panel border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 hover:border-amber-400/60 transition-all flex items-center gap-1.5"
                >
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span className="hidden sm:inline">Halaman Utama</span>
                </Link>
            </header>

            {/* ── Main Content Container (Centered Form Card) ── */}
            <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12 z-10">
                <div
                    className={`w-full max-w-md transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                        }`}
                >
                    <div className="glass-panel relative rounded-3xl p-6 sm:p-10 border border-white/15 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-2xl overflow-hidden">
                        {/* Golden Top Border Glow Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

                        {/* Top Logo Badge with Orbiting Ring */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative mb-3">
                                {/* Glow aura behind logo */}
                                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/30 to-amber-300/20 blur-xl animate-pulse pointer-events-none" />

                                {/* Orbiting Text Ring SVG */}
                                <svg
                                    className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] animate-spin [animation-duration:18s] pointer-events-none"
                                    viewBox="0 0 200 200"
                                >
                                    <defs>
                                        <path
                                            id="adminCirclePath"
                                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                        />
                                    </defs>
                                    <text
                                        fill="rgba(245,158,11,0.75)"
                                        fontSize="13"
                                        fontWeight="700"
                                        letterSpacing="4"
                                        fontFamily="var(--font-syne), sans-serif"
                                    >
                                        <textPath href="#adminCirclePath" startOffset="0%">
                                            -•-ADMIN.ACCESS-•-XI.FARSENA•--
                                        </textPath>
                                    </text>
                                </svg>

                                {/* Dashed Orbit Line */}
                                <div className="absolute -inset-1 rounded-full border border-dashed border-amber-400/40 animate-spin [animation-duration:12s] [animation-direction:reverse] pointer-events-none" />

                                {/* Round Logo Image */}
                                <div className="relative w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                                        <Image
                                            src="/logo.jpeg"
                                            alt="Admin Logo"
                                            width={80}
                                            height={80}
                                            priority
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Heading */}
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center mt-2">
                                Login Admin
                            </h1>
                            <p className="text-xs sm:text-sm text-amber-200/70 text-center mt-1">
                                Masuk untuk mengelola dashboard XI-Farsena
                            </p>
                        </div>

                        {/* Error Alert Banner */}
                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3.5 text-xs flex items-center gap-3 backdrop-blur-md animate-shake">
                                <span className="material-symbols-outlined text-[20px] text-red-400 shrink-0">
                                    warning
                                </span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Username Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-white/80 block ml-1 tracking-wide">
                                    Username
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-amber-300/70 text-[20px] pointer-events-none">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="w-full bg-black/40 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-white/35 rounded-xl pl-11 pr-4 py-3 text-sm transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-white/80 block ml-1 tracking-wide">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-3.5 text-amber-300/70 text-[20px] pointer-events-none">
                                        lock
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-black/40 border border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-white/35 rounded-xl pl-11 pr-11 py-3 text-sm transition-all duration-300 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 text-white/40 hover:text-amber-300 transition-colors p-1 rounded-md"
                                        aria-label="Toggle password visibility"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 mt-2 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-[20px]">
                                            progress_activity
                                        </span>
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Masuk ke Dashboard</span>
                                        <span className="material-symbols-outlined text-[20px]">
                                            arrow_forward
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Card Footer Link */}
                        <div className="mt-6 pt-5 border-t border-white/10 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-300 transition-colors font-medium"
                            >
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                <span>Kembali ke Beranda Utama</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="py-4 text-center text-[11px] font-mono text-white/40 z-10">
                <p>Website Resmi Kelas XI-Farsena • SMAN 1 Pandaan</p>
            </footer>
        </div>
    );
}