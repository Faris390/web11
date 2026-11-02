"use client";

import { useEffect, useState, useMemo } from "react";

export interface Student {
  id: number;
  name: string;
  gender: "L" | "P";
  absentNo: number;
  role?: string;
  piketDay: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";
}

const ALL_STUDENTS: Student[] = [
  { id: 1, absentNo: 1, name: "Faris", gender: "L", piketDay: "Senin" },
  { id: 2, absentNo: 2, name: "Fardhan", gender: "L", piketDay: "Senin" },
  { id: 3, absentNo: 3, name: "Diana", gender: "P", piketDay: "Selasa" },
  { id: 4, absentNo: 4, name: "Queen", gender: "P", piketDay: "Selasa" },
  { id: 5, absentNo: 5, name: "Caca", gender: "P", piketDay: "Rabu" },
  { id: 6, absentNo: 6, name: "Velia", gender: "P", piketDay: "Rabu" },
  { id: 7, absentNo: 7, name: "Selly", gender: "P", piketDay: "Kamis" },
  { id: 8, absentNo: 8, name: "Rini", gender: "P", piketDay: "Kamis" },
  { id: 9, absentNo: 9, name: "Cahya", gender: "L", piketDay: "Jumat" },
  { id: 10, absentNo: 10, name: "Nadin", gender: "P", piketDay: "Jumat" },
  { id: 11, absentNo: 11, name: "Arya", gender: "L", piketDay: "Senin" },
  { id: 12, absentNo: 12, name: "Faza", gender: "L", piketDay: "Senin" },
  { id: 13, absentNo: 13, name: "Vita", gender: "P", piketDay: "Selasa" },
  { id: 14, absentNo: 14, name: "Luna", gender: "P", piketDay: "Selasa" },
  { id: 15, absentNo: 15, name: "Vico", gender: "L", piketDay: "Rabu" },
  { id: 16, absentNo: 16, name: "Richard", gender: "L", piketDay: "Rabu" },
  { id: 17, absentNo: 17, name: "Vina", gender: "P", piketDay: "Kamis" },
  { id: 18, absentNo: 18, name: "Safa", gender: "P", piketDay: "Kamis" },
  { id: 19, absentNo: 19, name: "Dewa", gender: "L", piketDay: "Jumat" },
  { id: 20, absentNo: 20, name: "Tia", gender: "P", piketDay: "Jumat" },
  { id: 21, absentNo: 21, name: "Arqa", gender: "L", piketDay: "Senin" },
  { id: 22, absentNo: 22, name: "Galih", gender: "L", piketDay: "Senin" },
  { id: 23, absentNo: 23, name: "Alit", gender: "L", piketDay: "Selasa" },
  { id: 24, absentNo: 24, name: "Aden", gender: "L", piketDay: "Selasa" },
  { id: 25, absentNo: 25, name: "Aim", gender: "L", piketDay: "Rabu" },
  { id: 26, absentNo: 26, name: "Areng", gender: "L", piketDay: "Rabu" },
  { id: 27, absentNo: 27, name: "Riegan", gender: "L", piketDay: "Kamis" },
  { id: 28, absentNo: 28, name: "Vanno", gender: "L", piketDay: "Kamis" },
  { id: 29, absentNo: 29, name: "R. Ajeng", gender: "P", piketDay: "Jumat" },
  { id: 30, absentNo: 30, name: "Cinta", gender: "P", piketDay: "Jumat" },
  { id: 31, absentNo: 31, name: "Kevin", gender: "L", piketDay: "Senin" },
  { id: 32, absentNo: 32, name: "Ersha", gender: "P", piketDay: "Selasa" },
  { id: 33, absentNo: 33, name: "Khaira", gender: "P", piketDay: "Rabu" },
  { id: 34, absentNo: 34, name: "Sila", gender: "P", piketDay: "Kamis" },
  { id: 35, absentNo: 35, name: "Gusta", gender: "L", piketDay: "Jumat" },
  { id: 36, absentNo: 36, name: "Aldaz", gender: "L", piketDay: "Senin" },
];

const getNickname = (fullName: string): string => {
  return fullName.trim().split(" ")[0];
};

interface RowConfig {
  rowNum: number;
  isBackRow?: boolean;
  desks: { deskNum: number; seats: [number, number] }[];
}

const ROWS: RowConfig[] = [
  { rowNum: 1, desks: [{ deskNum: 1, seats: [0, 1] }, { deskNum: 5, seats: [8, 9] }, { deskNum: 10, seats: [18, 19] }, { deskNum: 15, seats: [28, 29] }] },
  { rowNum: 2, desks: [{ deskNum: 2, seats: [2, 3] }, { deskNum: 6, seats: [10, 11] }, { deskNum: 11, seats: [20, 21] }, { deskNum: 16, seats: [30, 31] }] },
  { rowNum: 3, desks: [{ deskNum: 3, seats: [4, 5] }, { deskNum: 7, seats: [12, 13] }, { deskNum: 12, seats: [22, 23] }, { deskNum: 17, seats: [32, 33] }] },
  { rowNum: 4, desks: [{ deskNum: 4, seats: [6, 7] }, { deskNum: 8, seats: [14, 15] }, { deskNum: 13, seats: [24, 25] }, { deskNum: 18, seats: [34, 35] }] },
  { rowNum: 5, isBackRow: true, desks: [{ deskNum: 9, seats: [16, 17] }, { deskNum: 14, seats: [26, 27] }] },
];

export default function SeatingChart() {
  const [students, setStudents] = useState<Student[]>(ALL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterGender, setFilterGender] = useState<"all" | "L" | "P">("all");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedRowTab, setSelectedRowTab] = useState<number | "all">("all");

  useEffect(() => {
    fetch("/api/seating", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return;
        const data = (await response.json()) as { students?: string[] };
        if (!data.students || data.students.length !== ALL_STUDENTS.length) return;
        const studentsByName = new Map(ALL_STUDENTS.map((student) => [student.name, student]));
        const arranged = data.students
          .map((name) => studentsByName.get(name))
          .filter((student): student is Student => Boolean(student));
        if (arranged.length === ALL_STUDENTS.length) setStudents(arranged);
      })
      .catch(() => undefined);
  }, []);

  const isStudentHighlighted = (student?: Student): boolean => {
    if (!student || !searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return Boolean(
      student.name.toLowerCase().includes(q) ||
      student.absentNo.toString() === q ||
      (student.role && student.role.toLowerCase().includes(q))
    );
  };

  const isStudentFiltered = (student?: Student): boolean => {
    if (!student || filterGender === "all") return true;
    return student.gender === filterGender;
  };

  // Find search matches with desk info for quick feedback banner
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: Array<{ student: Student; deskNum: number; rowNum: number; partner?: Student; side: "Kiri" | "Kanan" }> = [];

    ROWS.forEach((row) => {
      row.desks.forEach((desk) => {
        const left = students[desk.seats[0]];
        const right = students[desk.seats[1]];

        if (left && (left.name.toLowerCase().includes(q) || left.absentNo.toString() === q)) {
          results.push({ student: left, deskNum: desk.deskNum, rowNum: row.rowNum, partner: right, side: "Kiri" });
        }
        if (right && (right.name.toLowerCase().includes(q) || right.absentNo.toString() === q)) {
          results.push({ student: right, deskNum: desk.deskNum, rowNum: row.rowNum, partner: left, side: "Kanan" });
        }
      });
    });

    return results;
  }, [searchQuery, students]);

  return (
    <section
      id="seating"
      className="py-12 sm:py-20 md:py-28 px-3 sm:px-6 md:px-margin-desktop max-w-container-max mx-auto relative"
    >
      <div className="flex flex-col gap-5 md:gap-8">
        {/* Header Title & Catatan */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-fixed mb-2 sm:mb-3">
              <span className="material-symbols-outlined text-[16px]">table_restaurant</span>
              <span className="font-overline text-[11px] uppercase tracking-widest">
                DENAH TEMPAT DUDUK XI-F1
              </span>
            </div>
            <h2
              className="font-headline-md text-2xl sm:text-4xl text-surface-bright font-extrabold tracking-tight"
              style={{
                textShadow: "0 0 30px rgba(212,163,115,0.4), 0 3px 10px rgba(0,0,0,0.9)",
              }}
            >
              Denah Tempat Duduk
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Tata letak 18 meja dan 36 siswa XI-Farsena
            </p>
          </div>

          {/* CATATAN Rotasi Senin */}
          <div className="bg-[#1e1c18] p-3 sm:p-4 rounded-2xl border border-amber-500/40 shadow-lg flex items-center gap-3 max-w-md">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-amber-200 uppercase tracking-wider">
                📌 Catatan Penting
              </p>
              <p className="text-[11px] sm:text-xs text-amber-100/90 mt-0.5 font-medium leading-relaxed">
                Denah tempat duduk siswa di-rolling secara berkala setiap hari Senin.
              </p>
            </div>
          </div>
        </div>

        {/* Filter, Search Bar & View Mode Toggle */}
        <div className="bg-[#181613] rounded-2xl p-3 sm:p-4 border border-white/15 shadow-xl flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari nama atau nomor absen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle & Gender Filter */}
            <div className="flex flex-wrap items-center gap-2 justify-between sm:justify-end">
              {/* View Switcher: Map vs List */}
              <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/15 text-xs">
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                    viewMode === "map"
                      ? "bg-amber-500 text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">grid_view</span>
                  <span>Denah Kelas</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                    viewMode === "list"
                      ? "bg-amber-500 text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                  <span>Daftar Meja</span>
                </button>
              </div>

              {/* Gender Filter */}
              <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/15 text-xs">
                <button
                  onClick={() => setFilterGender("all")}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    filterGender === "all" ? "bg-white/20 text-white font-semibold" : "text-white/60"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterGender("L")}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    filterGender === "L" ? "bg-blue-500/30 text-blue-300 font-semibold" : "text-white/60"
                  }`}
                >
                  L (18)
                </button>
                <button
                  onClick={() => setFilterGender("P")}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    filterGender === "P" ? "bg-pink-500/30 text-pink-300 font-semibold" : "text-white/60"
                  }`}
                >
                  P (18)
                </button>
              </div>
            </div>
          </div>

          {/* Instant Search Results Banner */}
          {searchResults.length > 0 && (
            <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 flex flex-col gap-1.5">
              <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Hasil Pencarian ({searchResults.length} siswa ditemukan):</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedStudent(res.student)}
                    className="text-left px-3 py-1.5 rounded-lg bg-black/60 border border-amber-400/30 text-xs text-white hover:bg-black/80 transition-all flex items-center gap-2"
                  >
                    <span className="font-bold text-amber-300">{res.student.name}</span>
                    <span className="text-[10px] text-white/60 font-mono">#{res.student.absentNo}</span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded font-mono">
                      Meja #{res.deskNum} (Baris {res.rowNum})
                    </span>
                    {res.partner && (
                      <span className="text-[10px] text-white/50 hidden sm:inline">
                        • Sebelah {getNickname(res.partner.name)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── MODE 1: VISUAL DENAH KELAS ── */}
        {viewMode === "map" && (
          <div className="bg-[#14120e] rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 border border-white/15 relative w-full shadow-2xl">
            {/* Mobile swipe helper hint */}
            <div className="flex md:hidden items-center justify-between px-3 py-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs mb-3">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <span className="material-symbols-outlined text-[16px] animate-pulse">swipe</span>
                <span>Geser kiri-kanan untuk melihat denah lengkap</span>
              </span>
              <button
                onClick={() => setViewMode("list")}
                className="text-[10px] font-bold underline text-amber-200 pl-2 shrink-0"
              >
                Mode Daftar
              </button>
            </div>

            {/* Scrollable Container with adequate minimum width so desks never get squished */}
            <div className="w-full overflow-x-auto pb-4 [scrollbar-width:thin] [scrollbar-color:rgba(245,158,11,0.3)_transparent]">
              <div className="min-w-[620px] md:min-w-0">
                {/* Top Classroom Front: Whiteboard & Teacher Desk */}
                <div className="w-full flex flex-col items-center mb-4 sm:mb-6 md:mb-8 pb-3 md:pb-6 border-b border-white/10 relative">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 mb-1 md:mb-2 font-bold">
                    [ DEPAN KELAS ]
                  </span>

                  {/* Papan Tulis / Whiteboard */}
                  <div className="w-full max-w-xl h-8 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-200 font-semibold text-[10px] sm:text-xs tracking-wider px-2 shadow-inner">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="material-symbols-outlined text-[14px] sm:text-[18px]">edit_note</span>
                      Papan Tulis Kelas
                    </span>
                  </div>

                  {/* Meja Guru */}
                  <div className="mt-2 sm:mt-3">
                    <div className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-lg bg-amber-950 border border-amber-600/50 text-amber-200 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-[13px] sm:text-[16px]">co_present</span>
                      Meja Guru
                    </div>
                  </div>
                </div>

                {/* Rows Grid Architecture: 4 Columns with clear central aisle */}
                <div className="space-y-3 sm:space-y-6 md:space-y-8">
                  {ROWS.map((row) => (
                    <div key={row.rowNum} className="flex flex-col gap-1 sm:gap-2">
                      {/* Row Header Indicator */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/50 px-1 sm:px-2">
                        <span className="font-mono font-bold tracking-wider text-amber-400/90">
                          BARIS KE-{row.rowNum} {row.isBackRow ? "(Belakang)" : ""}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-white/40">
                          {row.isBackRow ? "2 Bangku (4 Siswa)" : "4 Bangku (8 Siswa)"}
                        </span>
                      </div>

                      {/* Desk Containers in Row */}
                      {row.isBackRow ? (
                        /* Row 5: 2 Desks centered in middle */
                        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
                          <div /> {/* Spacer Col 1 */}

                          {row.desks.map((desk) => (
                            <DeskCard
                              key={desk.deskNum}
                              deskNum={desk.deskNum}
                              seatIndices={desk.seats}
                              students={students}
                              onSelectStudent={(st) => setSelectedStudent(st)}
                              isStudentHighlighted={isStudentHighlighted}
                              isStudentFiltered={isStudentFiltered}
                            />
                          ))}

                          <div /> {/* Spacer Col 4 */}
                        </div>
                      ) : (
                        /* Rows 1-4: 4 Desks side-by-side with middle aisle separation */
                        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 relative">
                          {row.desks.map((desk, idx) => (
                            <div
                              key={desk.deskNum}
                              className={idx === 1 ? "pr-1 sm:pr-2 border-r border-amber-500/20" : idx === 2 ? "pl-1 sm:pl-2" : ""}
                            >
                              <DeskCard
                                deskNum={desk.deskNum}
                                seatIndices={desk.seats}
                                students={students}
                                onSelectStudent={(st) => setSelectedStudent(st)}
                                isStudentHighlighted={isStudentHighlighted}
                                isStudentFiltered={isStudentFiltered}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Classroom Back Marker */}
                <div className="w-full mt-6 md:mt-8 pt-3 border-t border-white/10 flex items-center justify-between text-white/40 text-[10px] sm:text-[11px] font-mono">
                  <span>[ Pintu / Jendela ]</span>
                  <span>Total 18 Meja • 36 Siswa</span>
                  <span>[ Dinding Belakang ]</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MODE 2: DAFTAR MEJA / PER BARIS (Mobile-First Card View) ── */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-4">
            {/* Row Selector Tabs */}
            <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setSelectedRowTab("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                  selectedRowTab === "all"
                    ? "bg-amber-400 text-black font-bold shadow-md"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white"
                }`}
              >
                Semua Baris (1-5)
              </button>
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRowTab(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                    selectedRowTab === r
                      ? "bg-amber-400 text-black font-bold shadow-md"
                      : "bg-white/5 border border-white/10 text-white/70 hover:text-white"
                  }`}
                >
                  Baris {r} {r === 5 ? "(Belakang)" : ""}
                </button>
              ))}
            </div>

            {/* List of Desks by Row */}
            <div className="space-y-4">
              {ROWS.filter((row) => selectedRowTab === "all" || row.rowNum === selectedRowTab).map((row) => (
                <div
                  key={row.rowNum}
                  className="bg-[#14120e] rounded-2xl p-3 sm:p-5 border border-white/15 flex flex-col gap-3 shadow-xl"
                >
                  {/* Row Title */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">chair</span>
                      <span>Baris ke-{row.rowNum} {row.isBackRow ? "(Belakang Kelas)" : ""}</span>
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {row.desks.length} Meja ({row.desks.length * 2} Siswa)
                    </span>
                  </div>

                  {/* Desks in this Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {row.desks.map((desk) => {
                      const stLeft = students[desk.seats[0]];
                      const stRight = students[desk.seats[1]];
                      const isDeskHighlighted = isStudentHighlighted(stLeft) || isStudentHighlighted(stRight);

                      return (
                        <div
                          key={desk.deskNum}
                          className={`rounded-xl p-3 border transition-all ${
                            isDeskHighlighted
                              ? "bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400/50"
                              : "bg-[#1c1a17] border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-amber-300 font-mono">
                              Meja #{desk.deskNum}
                            </span>
                            <span className="text-[10px] text-white/40 font-mono">
                              Baris {row.rowNum}
                            </span>
                          </div>

                          {/* 2 Students at this Desk */}
                          <div className="grid grid-cols-2 gap-2">
                            {/* Left Student */}
                            {stLeft && (
                              <button
                                onClick={() => setSelectedStudent(stLeft)}
                                className={`p-2 rounded-lg border text-left transition-all active:scale-[0.98] flex flex-col justify-between gap-1.5 ${
                                  isStudentHighlighted(stLeft)
                                    ? "bg-amber-400/30 border-amber-300 text-white"
                                    : "bg-[#25221d] hover:bg-[#2e2a24] border-white/10 text-white"
                                } ${!isStudentFiltered(stLeft) ? "opacity-30" : "opacity-100"}`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-blue-500/25 text-blue-300 font-bold border border-blue-500/30">
                                    KIRI (L)
                                  </span>
                                  <span className="text-[9px] font-mono text-white/40">
                                    #{stLeft.absentNo}
                                  </span>
                                </div>
                                <p className="font-bold text-xs leading-tight truncate w-full text-white">
                                  {stLeft.name}
                                </p>
                                <span className="text-[9px] text-white/50 font-mono">
                                  Piket {stLeft.piketDay}
                                </span>
                              </button>
                            )}

                            {/* Right Student */}
                            {stRight && (
                              <button
                                onClick={() => setSelectedStudent(stRight)}
                                className={`p-2 rounded-lg border text-left transition-all active:scale-[0.98] flex flex-col justify-between gap-1.5 ${
                                  isStudentHighlighted(stRight)
                                    ? "bg-amber-400/30 border-amber-300 text-white"
                                    : "bg-[#25221d] hover:bg-[#2e2a24] border-white/10 text-white"
                                } ${!isStudentFiltered(stRight) ? "opacity-30" : "opacity-100"}`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-pink-500/25 text-pink-300 font-bold border border-pink-500/30">
                                    KANAN (R)
                                  </span>
                                  <span className="text-[9px] font-mono text-white/40">
                                    #{stRight.absentNo}
                                  </span>
                                </div>
                                <p className="font-bold text-xs leading-tight truncate w-full text-white">
                                  {stRight.name}
                                </p>
                                <span className="text-[9px] text-white/50 font-mono">
                                  Piket {stRight.piketDay}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal with Backdrop Dismiss */}
      {selectedStudent && (
        <div
          onClick={() => setSelectedStudent(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1814] border border-white/20 rounded-3xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center text-sm transition-all"
              aria-label="Tutup detail siswa"
            >
              ✕
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl text-white shadow-lg shrink-0 ${
                  selectedStudent.gender === "L"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-800"
                    : "bg-gradient-to-br from-pink-600 to-rose-800"
                }`}
              >
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-mono">
                    Absen #{selectedStudent.absentNo}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold ${
                      selectedStudent.gender === "L"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-pink-500/20 text-pink-300"
                    }`}
                  >
                    {selectedStudent.gender === "L" ? "Laki-laki" : "Perempuan"}
                  </span>
                </div>
                <h3 className="font-headline-sm text-base sm:text-xl font-bold text-white mt-1">
                  {selectedStudent.name}
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {selectedStudent.role && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-400">verified</span>
                  <div>
                    <p className="text-[11px] text-white/60">Jabatan Kelas</p>
                    <p className="text-xs sm:text-sm font-bold text-amber-200">{selectedStudent.role}</p>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">cleaning_services</span>
                <div>
                  <p className="text-[11px] text-white/60">Jadwal Piket Kebersihan</p>
                  <p className="text-xs sm:text-sm font-semibold text-white">Hari {selectedStudent.piketDay}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-glow-gold"
            >
              Tutup Detail
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// Sub-component for individual Desk Card
interface DeskCardProps {
  deskNum: number;
  seatIndices: [number, number];
  students: Student[];
  onSelectStudent: (student: Student) => void;
  isStudentHighlighted: (student?: Student) => boolean;
  isStudentFiltered: (student?: Student) => boolean;
}

function DeskCard({
  deskNum,
  seatIndices,
  students,
  onSelectStudent,
  isStudentHighlighted,
  isStudentFiltered,
}: DeskCardProps) {
  const studentLeft = students[seatIndices[0]];
  const studentRight = students[seatIndices[1]];

  const isLeftMatch = Boolean(studentLeft && isStudentHighlighted(studentLeft));
  const isRightMatch = Boolean(studentRight && isStudentHighlighted(studentRight));
  const isDeskMatch = isLeftMatch || isRightMatch;

  const isLeftFiltered = !studentLeft || isStudentFiltered(studentLeft);
  const isRightFiltered = !studentRight || isStudentFiltered(studentRight);

  return (
    <div
      className={`bg-[#1c1a17] p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl border transition-all relative ${
        isDeskMatch
          ? "border-amber-400 bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-[1.02] z-10"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      {/* Desk Header Badge */}
      <div className="flex items-center justify-between mb-1 sm:mb-1.5 pb-0.5 sm:pb-1 border-b border-white/10">
        <span className="text-[9px] sm:text-[11px] font-bold text-amber-300 flex items-center gap-1">
          <span className="material-symbols-outlined text-[11px] sm:text-[13px]">table_restaurant</span>
          <span>Meja #{deskNum}</span>
        </span>
      </div>

      {/* 2 Seats Stacked Vertically */}
      <div className="flex flex-col gap-1 sm:gap-1.5">
        {studentLeft && (
          <SeatButton
            seatLabel="Kiri"
            student={studentLeft}
            isMatched={isLeftMatch}
            isFiltered={isLeftFiltered}
            onSelect={onSelectStudent}
          />
        )}
        {studentRight && (
          <SeatButton
            seatLabel="Kanan"
            student={studentRight}
            isMatched={isRightMatch}
            isFiltered={isRightFiltered}
            onSelect={onSelectStudent}
          />
        )}
      </div>
    </div>
  );
}

// Sub-component for individual Seat Button (horizontal row layout)
interface SeatButtonProps {
  seatLabel: string;
  student: Student;
  isMatched: boolean;
  isFiltered: boolean;
  onSelect: (student: Student) => void;
}

function SeatButton({ seatLabel, student, isMatched, isFiltered, onSelect }: SeatButtonProps) {
  return (
    <button
      onClick={() => onSelect(student)}
      className={`px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg border text-left flex items-center justify-between gap-1.5 transition-all relative overflow-hidden active:scale-[0.98] ${
        !isFiltered ? "opacity-25" : "opacity-100"
      } ${
        isMatched
          ? "bg-amber-400/30 border-amber-300 ring-1 ring-amber-400 text-white font-bold"
          : "bg-[#25221d] hover:bg-[#302c25] border-white/10 text-white"
      }`}
    >
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {/* L/R Indicator */}
        <span
          className={`text-[8px] sm:text-[9px] font-mono font-bold shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center rounded ${
            seatLabel === "Kiri"
              ? "bg-blue-500/25 text-blue-300 border border-blue-500/30"
              : "bg-pink-500/25 text-pink-300 border border-pink-500/30"
          }`}
        >
          {seatLabel === "Kiri" ? "L" : "R"}
        </span>

        {/* Nickname */}
        <span className="text-[10px] sm:text-xs font-semibold leading-tight text-white truncate">
          {getNickname(student.name)}
        </span>
      </div>

      {/* Absen number */}
      <span className="text-[8px] sm:text-[9px] font-mono text-white/40 shrink-0">
        #{student.absentNo}
      </span>
    </button>
  );
}
