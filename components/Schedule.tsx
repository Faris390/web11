"use client";

import { useEffect, useRef, useState } from "react";

type TaskType = "tugas" | "berkelompok" | "presentasi" | "ulangan" | "none";

interface Task {
  id: string;
  subject: string;
  task: string;
  time: string;
  teacher: string;
  type: TaskType;
}

interface DaySchedule {
  day: string;
  dayShort: string;
  piket: string[];
  tasks: Task[];
}

const scheduleData: DaySchedule[] = [
  {
    day: "Senin",
    dayShort: "SEN",
    piket: ["Andi", "Budi", "Citra", "Dian", "Eko", "Fani"],
    tasks: [
      {
        id: "sen-1",
        subject: "Bahasa Indonesia",
        time: "07:30 - 09:00",
        teacher: "Dra. Hj. Nurhayati, M.Pd.",
        task: "Presentasi Teks Eksposisi Kelompok & Diskusi Opini",
        type: "presentasi",
      },
      {
        id: "sen-2",
        subject: "Matematika",
        time: "09:15 - 10:45",
        teacher: "Drs. Budi Santoso, M.Si.",
        task: "Latihan Soal Trigonometri Hal. 45 No. 1-10",
        type: "tugas",
      },
      {
        id: "sen-3",
        subject: "Sejarah",
        time: "11:00 - 12:30",
        teacher: "Ahmad Rizki, S.Pd.",
        task: "Materi Reguler - Tidak ada tugas",
        type: "none",
      },
    ],
  },
  {
    day: "Selasa",
    dayShort: "SEL",
    piket: ["Farhan", "Gita", "Hadi", "Indah", "Joko", "Kiki"],
    tasks: [
      {
        id: "sel-1",
        subject: "Fisika",
        time: "07:30 - 09:00",
        teacher: "Dr. Eng. Tri Handoko, M.T.",
        task: "Praktikum & Penyusunan Laporan Gerak Parabola",
        type: "berkelompok",
      },
      {
        id: "sel-2",
        subject: "Bahasa Inggris",
        time: "09:15 - 10:45",
        teacher: "Sarah Wijaya, M.A.",
        task: "Essay Writing: My Future Career in Tech",
        type: "tugas",
      },
      {
        id: "sel-3",
        subject: "PKN",
        time: "11:00 - 12:30",
        teacher: "Drs. H. Suwandi",
        task: "Materi Reguler - Tidak ada tugas",
        type: "none",
      },
    ],
  },
  {
    day: "Rabu",
    dayShort: "RAB",
    piket: ["Laras", "Mitha", "Naufal", "Oki", "Putri", "Qori"],
    tasks: [
      {
        id: "rab-1",
        subject: "Kimia",
        time: "07:30 - 09:00",
        teacher: "Endang Pertiwi, S.Si., M.Pd.",
        task: "Ulangan Harian Bab 2: Ikatan Kimia & Geometri Molekul",
        type: "ulangan",
      },
      {
        id: "rab-2",
        subject: "Matematika",
        time: "09:15 - 10:45",
        teacher: "Drs. Budi Santoso, M.Si.",
        task: "Materi Reguler - Tidak ada tugas",
        type: "none",
      },
      {
        id: "rab-3",
        subject: "Seni Budaya",
        time: "11:00 - 12:30",
        teacher: "Rudi Hartono, S.Sn.",
        task: "Pembuatan Sketsa Poster Budaya Lokal & Pameran Kelas",
        type: "berkelompok",
      },
    ],
  },
  {
    day: "Kamis",
    dayShort: "KAM",
    piket: ["Rian", "Salsa", "Taufik", "Utami", "Vino", "Winda"],
    tasks: [
      {
        id: "kam-1",
        subject: "Biologi",
        time: "07:30 - 09:00",
        teacher: "Maya Kartika, S.Si.",
        task: "Presentasi Visual Diagram Sistem Pencernaan Manusia",
        type: "presentasi",
      },
      {
        id: "kam-2",
        subject: "Bahasa Indonesia",
        time: "09:15 - 10:45",
        teacher: "Dra. Hj. Nurhayati, M.Pd.",
        task: "Materi Reguler - Tidak ada tugas",
        type: "none",
      },
      {
        id: "kam-3",
        subject: "PJOK",
        time: "11:00 - 12:30",
        teacher: "Bambang Pamungkas, S.Pd.",
        task: "Praktik Keterampilan Teknik Dasar Passing & Servis Bola Voli",
        type: "tugas",
      },
    ],
  },
  {
    day: "Jumat",
    dayShort: "JUM",
    piket: ["Xander", "Yulia", "Zainal", "Adit", "Bella", "Caca"],
    tasks: [
      {
        id: "jum-1",
        subject: "Informatika",
        time: "07:30 - 09:30",
        teacher: "Faris RMK, S.Kom., M.T.",
        task: "Proyek Web Portfolio XI-Farsena Menggunakan Next.js & CSS",
        type: "berkelompok",
      },
      {
        id: "jum-2",
        subject: "Bahasa Inggris",
        time: "09:45 - 11:15",
        teacher: "Sarah Wijaya, M.A.",
        task: "Materi Reguler - Tidak ada tugas",
        type: "none",
      },
    ],
  },
];

const typeConfig: Record<TaskType, { label: string; color: string; bg: string; border: string; glow: string; icon: string }> = {
  tugas: {
    label: "Tugas",
    color: "text-sky-400",
    bg: "bg-sky-400/10 hover:bg-sky-400/20",
    border: "border-sky-400/30",
    glow: "shadow-[0_0_12px_rgba(56,189,248,0.2)]",
    icon: "edit_note",
  },
  berkelompok: {
    label: "Berkelompok",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 hover:bg-emerald-400/20",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    icon: "groups",
  },
  presentasi: {
    label: "Presentasi",
    color: "text-amber-400",
    bg: "bg-amber-400/10 hover:bg-amber-400/20",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.2)]",
    icon: "co_present",
  },
  ulangan: {
    label: "Ulangan",
    color: "text-rose-400",
    bg: "bg-rose-400/10 hover:bg-rose-400/20",
    border: "border-rose-400/30",
    glow: "shadow-[0_0_12px_rgba(251,113,133,0.2)]",
    icon: "quiz",
  },
  none: {
    label: "Tidak Ada Tugas",
    color: "text-emerald-400/90",
    bg: "bg-emerald-500/10 hover:bg-emerald-500/15",
    border: "border-emerald-500/20",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.1)]",
    icon: "check_circle",
  },
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<TaskType | "all">("all");
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Auto-select today (1=Monday...5=Friday)
    const today = new Date().getDay();
    if (today >= 1 && today <= 5) {
      setActiveDay(today - 1);
      setTodayIndex(today - 1);
    } else {
      setTodayIndex(0);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSchedule = scheduleData[activeDay];
  const filteredTasks = selectedFilter === "all"
    ? currentSchedule.tasks
    : currentSchedule.tasks.filter((t) => t.type === selectedFilter);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full py-12 sm:py-18 px-3 sm:px-6 overflow-hidden flex flex-col justify-center"
    >

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Compact Section Header */}
        <div
          className={`text-center mb-6 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">
              event_repeat
            </span>
            <span className="font-label-sm text-[11px] text-primary font-bold tracking-[0.2em] uppercase">
              JADWAL KELAS F1
            </span>
          </div>

          <h2
            className="font-headline-md text-2xl sm:text-4xl text-surface-bright font-extrabold tracking-tight"
            style={{
              textShadow: "0 0 30px rgba(212,163,115,0.4), 0 3px 10px rgba(0,0,0,0.9)",
            }}
          >
            Jadwal Kelas & Piket
          </h2>
        </div>

        {/* Day Tabs */}
        <div
          className={`flex flex-col items-center gap-4 mb-5 transition-all duration-800 ease-out delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-black/60 border border-white/15 shadow-xl">
            {scheduleData.map((day, index) => {
              const isToday = todayIndex === index;
              const isActive = activeDay === index;
              return (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(index)}
                  className={`relative px-3 sm:px-5 py-2 rounded-lg font-label-md text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${isActive
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(212,163,115,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <span>{day.day}</span>
                  {isToday && (
                    <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-amber-400/25 text-amber-300 border border-amber-400/30">
                      Hari Ini
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${selectedFilter === "all"
                  ? "bg-white/20 border-white/40 text-white font-bold"
                  : "bg-black/40 border-white/10 text-white/50 hover:text-white"
                }`}
            >
              Semua ({currentSchedule.tasks.length})
            </button>
            {(Object.keys(typeConfig) as TaskType[]).map((key) => {
              const config = typeConfig[key];
              const count = currentSchedule.tasks.filter((t) => t.type === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFilter(key)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border flex items-center gap-1 ${selectedFilter === key
                      ? `${config.bg} ${config.border} ${config.color} font-bold`
                      : "bg-black/40 border-white/10 text-white/40 hover:text-white"
                    }`}
                >
                  <span className="material-symbols-outlined text-xs">{config.icon}</span>
                  <span>{config.label} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout: Tasks Card + Piket Card */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-4 gap-4 transition-all duration-800 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Main Tasks List (3 cols on LG) */}
          <div className="lg:col-span-3 glass-panel rounded-2xl p-4 sm:p-6 border border-white/15 shadow-xl flex flex-col gap-3">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-surface-bright flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  calendar_today
                </span>
                <span>Jadwal {currentSchedule.day}</span>
              </h3>
              <span className="text-xs font-mono text-white/40">
                {filteredTasks.length} Pelajaran
              </span>
            </div>

            {/* Tasks list */}
            {currentSchedule.tasks.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-white/25">event_busy</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/50">Tidak Ada Kegiatan</p>
                  <p className="text-xs text-white/30 mt-1">Belum ada tugas, kelompok, presentasi, atau ulangan untuk hari {currentSchedule.day}.</p>
                </div>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center gap-2 text-center">
                <span className="material-symbols-outlined text-2xl text-white/20">filter_list_off</span>
                <p className="text-xs font-mono text-white/40">
                  Tidak ada kegiatan dengan kategori ini untuk hari {currentSchedule.day}.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {filteredTasks.map((task) => {
                  const config = typeConfig[task.type];
                  return (
                    <div
                      key={task.id}
                      className={`p-3 sm:p-4 rounded-xl border transition-all ${config.bg} ${config.border} flex flex-col sm:flex-row sm:items-center justify-between gap-2.5`}
                    >
                      {/* Subject + Task + Teacher */}
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border mt-0.5 ${config.bg} ${config.border}`}>
                          <span className={`material-symbols-outlined text-base ${config.color}`}>
                            {config.icon}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm sm:text-base text-surface-bright">
                              {task.subject}
                            </span>
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.2 rounded-md border ${config.bg} ${config.border} ${config.color}`}>
                              {config.label}
                            </span>
                          </div>

                          <p className="text-white/80 text-xs sm:text-sm mt-0.5 leading-snug">
                            {task.task}
                          </p>

                          {/* Teacher name directly visible */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300/90 mt-1">
                            <span className="material-symbols-outlined text-xs text-amber-400">
                              person
                            </span>
                            <span>{task.teacher}</span>
                          </div>
                        </div>
                      </div>

                      {/* Time Badge */}
                      <div className="flex-shrink-0 self-end sm:self-center">
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-white/70 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10">
                          <span className="material-symbols-outlined text-xs text-amber-400">
                            schedule
                          </span>
                          <span>{task.time}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Piket Kebersihan Card (1 col on LG) */}
          <div className="lg:col-span-1 glass-panel rounded-2xl p-4 sm:p-5 border border-amber-400/20 bg-amber-500/5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-300 text-lg">
                    cleaning_services
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-surface-bright">
                    Piket Kebersihan
                  </h4>
                  <p className="text-[10px] font-mono text-amber-300/80">
                    Hari {currentSchedule.day}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
                {currentSchedule.piket.map((nama, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white/90"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/30 border border-primary/40 text-[10px] text-amber-300 font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{nama}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-white/40 text-center">
              *Wajib piket sebelum & sesudah KBM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
