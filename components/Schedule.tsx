"use client";

import GlassButton from "@/components/GlassButton";
import { useEffect, useRef, useState } from "react";

type TaskType = "tugas" | "berkelompok" | "presentasi" | "ulangan" | "none";

interface Task {
  id: string;
  subject: string;
  task: string;
  time: string;
  teacher?: string;
  type: TaskType;
}

interface DaySchedule {
  day: string;
  dayShort: string;
  piket: string[];
  tasks: Task[];
}

interface ScheduleRow {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  subject: string;
  assignment_title: string | null;
  assignment_type: TaskType | null;
  assignment_details: string | null;
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
    color: "text-slate-300",
    bg: "bg-slate-500/10 hover:bg-slate-500/15",
    border: "border-slate-400/25",
    glow: "shadow-[0_0_12px_rgba(148,163,184,0.1)]",
    icon: "remove_circle_outline",
  },
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<TaskType | "all">("all");
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [remoteTasksByDay, setRemoteTasksByDay] = useState<Record<number, Task[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
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
    const controller = new AbortController();

    async function loadSchedule() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/schedule", {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json() as { schedule?: ScheduleRow[]; error?: string };

        if (!response.ok) {
          throw new Error(data.error || "Jadwal gagal dimuat.");
        }

        const tasksByDay: Record<number, Task[]> = {};
        for (const row of data.schedule || []) {
          (tasksByDay[row.day_of_week] ||= []).push({
            id: row.id,
            subject: row.subject,
            time: `${row.start_time.slice(0, 5)} - ${row.end_time.slice(0, 5)}`,
            task: row.assignment_title
              ? `${row.assignment_title}${row.assignment_details ? ` — ${row.assignment_details}` : ""}`
              : "Materi reguler - Tidak ada tugas",
            type: row.assignment_type || "none",
          });
        }
        setRemoteTasksByDay(tasksByDay);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(error instanceof Error ? error.message : "Jadwal gagal dimuat.");
        setRemoteTasksByDay({});
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadSchedule();
    return () => controller.abort();
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

  const currentSchedule = { ...scheduleData[activeDay], tasks: remoteTasksByDay[activeDay + 1] || [] };
  const filteredTasks = selectedFilter === "all"
    ? currentSchedule.tasks
    : currentSchedule.tasks.filter((t) => t.type === selectedFilter);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full py-16 sm:py-24 px-3 sm:px-6 overflow-hidden flex flex-col justify-center"
    >

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Compact Section Header */}
        <div
          className={`text-center mb-6 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-3">
            <span className="material-symbols-outlined text-primary text-sm">
              event_repeat
            </span>
            <span className="font-label-sm text-[11px] text-primary font-bold tracking-[0.2em] uppercase">
              JADWAL KELAS F1
            </span>
          </div>

          <h2
            className="font-headline-md text-3xl sm:text-4xl text-surface-bright font-extrabold tracking-tight"
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
          <div className="flex flex-nowrap gap-1.5 sm:gap-2 w-full max-w-3xl overflow-x-auto p-1.5 rounded-2xl bg-black/60 border border-white/15 shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {scheduleData.map((day, index) => {
              const isToday = todayIndex === index;
              const isActive = activeDay === index;
              return (
                <GlassButton
                  key={day.day}
                  onClick={() => setActiveDay(index)}
                  className={`relative flex-1 min-w-[72px] sm:min-w-0 justify-center px-2 sm:px-4 py-2.5 rounded-xl font-label-md text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${isActive
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(212,163,115,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <span className="sm:hidden">{day.dayShort}</span>
                  <span className="hidden sm:inline">{day.day}</span>
                  {isToday && (
                    <span className="hidden sm:inline text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-amber-400/25 text-amber-300 border border-amber-400/30">
                      Hari Ini
                    </span>
                  )}
                </GlassButton>
              );
            })}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-nowrap justify-start sm:justify-center gap-2 max-w-full overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <GlassButton
              onClick={() => setSelectedFilter("all")}
              className={`flex-none px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all border ${selectedFilter === "all"
                  ? "bg-white/20 border-white/40 text-white font-bold"
                  : "bg-black/40 border-white/10 text-white/50 hover:text-white"
                }`}
            >
              Semua ({currentSchedule.tasks.length})
            </GlassButton>
            {(Object.keys(typeConfig) as TaskType[]).map((key) => {
              const config = typeConfig[key];
              const count = currentSchedule.tasks.filter((t) => t.type === key).length;
              return (
                <GlassButton
                  key={key}
                  onClick={() => setSelectedFilter(key)}
                  className={`flex-none px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all border flex items-center gap-1 ${selectedFilter === key
                      ? `${config.bg} ${config.border} ${config.color} font-bold`
                      : "bg-black/40 border-white/10 text-white/40 hover:text-white"
                    }`}
                >
                  <span className="material-symbols-outlined text-xs">{config.icon}</span>
                  <span>{config.label} ({count})</span>
                </GlassButton>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout: Tasks Card + Piket Card */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(250px,1fr)] gap-5 transition-all duration-800 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Main Tasks List (3 cols on LG) */}
          <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/15 shadow-xl flex flex-col gap-4">
            {/* Header info */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
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
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                <span className="material-symbols-outlined text-3xl text-amber-400 animate-spin">progress_activity</span>
                <p className="text-xs font-mono text-white/50">Memuat jadwal dari Neon...</p>
              </div>
            ) : loadError ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                <span className="material-symbols-outlined text-3xl text-rose-400">error</span>
                <p className="text-xs font-mono text-rose-300">{loadError}</p>
              </div>
            ) : currentSchedule.tasks.length === 0 ? (
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
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all ${config.bg} ${config.border} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
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

                          <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed">
                            {task.task}
                          </p>

                        </div>
                      </div>

                      {/* Time Badge */}
                      <div className="flex-shrink-0 self-start sm:self-center">
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
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-amber-400/20 bg-amber-500/5 shadow-xl flex flex-col justify-between">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
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
