"use client";

import { useState } from "react";

export interface Student {
  id: number;
  name: string;
  gender: "L" | "P";
  absentNo: number;
  role?: string;
  piketDay: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";
}

const ALL_STUDENTS: Student[] = [
  { id: 1, absentNo: 1, name: "Achmad Fauzi", gender: "L", piketDay: "Senin", role: "Ketua Kelas" },
  { id: 2, absentNo: 2, name: "Adinda Putri", gender: "P", piketDay: "Senin", role: "Wakil Ketua" },
  { id: 3, absentNo: 3, name: "Aditya Pratama", gender: "L", piketDay: "Selasa" },
  { id: 4, absentNo: 4, name: "Aisyah Azzahra", gender: "P", piketDay: "Selasa", role: "Sekretaris I" },
  { id: 5, absentNo: 5, name: "Alfi Syahrin", gender: "L", piketDay: "Rabu" },
  { id: 6, absentNo: 6, name: "Amanda Severina", gender: "P", piketDay: "Rabu", role: "Bendahara I" },
  { id: 7, absentNo: 7, name: "Andi Pratama", gender: "L", piketDay: "Kamis" },
  { id: 8, absentNo: 8, name: "Anisa Rahma", gender: "P", piketDay: "Kamis" },
  { id: 9, absentNo: 9, name: "Bagas Saputra", gender: "L", piketDay: "Jumat" },
  { id: 10, absentNo: 10, name: "Bunga Citra", gender: "P", piketDay: "Jumat" },
  { id: 11, absentNo: 11, name: "Daniel Wijaya", gender: "L", piketDay: "Senin" },
  { id: 12, absentNo: 12, name: "Dian Sastro", gender: "P", piketDay: "Senin" },
  { id: 13, absentNo: 13, name: "Eko Prasetyo", gender: "L", piketDay: "Selasa" },
  { id: 14, absentNo: 14, name: "Fani Nurul", gender: "P", piketDay: "Selasa" },
  { id: 15, absentNo: 15, name: "Farhan Ramadhan", gender: "L", piketDay: "Rabu" },
  { id: 16, absentNo: 16, name: "Gita Gutawa", gender: "P", piketDay: "Rabu" },
  { id: 17, absentNo: 17, name: "Hadi Kurniawan", gender: "L", piketDay: "Kamis" },
  { id: 18, absentNo: 18, name: "Indah Permata", gender: "P", piketDay: "Kamis" },
  { id: 19, absentNo: 19, name: "Joko Widodo", gender: "L", piketDay: "Jumat" },
  { id: 20, absentNo: 20, name: "Kiki Amalia", gender: "P", piketDay: "Jumat" },
  { id: 21, absentNo: 21, name: "Larasati Putri", gender: "P", piketDay: "Senin" },
  { id: 22, absentNo: 22, name: "M. Naufal", gender: "L", piketDay: "Senin" },
  { id: 23, absentNo: 23, name: "Mitha Lestari", gender: "P", piketDay: "Selasa" },
  { id: 24, absentNo: 24, name: "Oki Setiana", gender: "P", piketDay: "Selasa" },
  { id: 25, absentNo: 25, name: "Putri Ayu", gender: "P", piketDay: "Rabu" },
  { id: 26, absentNo: 26, name: "Qori Sandioriva", gender: "P", piketDay: "Rabu" },
  { id: 27, absentNo: 27, name: "Raditya Dika", gender: "L", piketDay: "Kamis" },
  { id: 28, absentNo: 28, name: "Rian Hidayat", gender: "L", piketDay: "Kamis" },
  { id: 29, absentNo: 29, name: "Rizky Febian", gender: "L", piketDay: "Jumat" },
  { id: 30, absentNo: 30, name: "Salsa Bila", gender: "P", piketDay: "Jumat" },
  { id: 31, absentNo: 31, name: "Tari Lestari", gender: "P", piketDay: "Senin" },
  { id: 32, absentNo: 32, name: "Taufik Hidayat", gender: "L", piketDay: "Selasa" },
  { id: 33, absentNo: 33, name: "Utama Putra", gender: "L", piketDay: "Rabu" },
  { id: 34, absentNo: 34, name: "Vina Panduwinata", gender: "P", piketDay: "Kamis" },
  { id: 35, absentNo: 35, name: "Wahyu Hidayat", gender: "L", piketDay: "Jumat" },
  { id: 36, absentNo: 36, name: "Zahra Amelia", gender: "P", piketDay: "Senin" },
];

// Extract first name only for compact seat display
const getNickname = (fullName: string): string => {
  return fullName.trim().split(" ")[0];
};

export default function SeatingChart() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterGender, setFilterGender] = useState<"all" | "L" | "P">("all");

  const isStudentHighlighted = (student: Student): boolean => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return Boolean(
      student.name.toLowerCase().includes(q) ||
      student.absentNo.toString() === q ||
      (student.role && student.role.toLowerCase().includes(q))
    );
  };

  const isStudentFiltered = (student: Student): boolean => {
    if (filterGender === "all") return true;
    return student.gender === filterGender;
  };

  interface RowConfig {
    rowNum: number;
    isBackRow?: boolean;
    desks: { deskNum: number; seats: [number, number] }[];
  }

  const rows: RowConfig[] = [
    { rowNum: 1, desks: [{ deskNum: 1, seats: [0, 1] }, { deskNum: 2, seats: [2, 3] }, { deskNum: 3, seats: [4, 5] }, { deskNum: 4, seats: [6, 7] }] },
    { rowNum: 2, desks: [{ deskNum: 5, seats: [8, 9] }, { deskNum: 6, seats: [10, 11] }, { deskNum: 7, seats: [12, 13] }, { deskNum: 8, seats: [14, 15] }] },
    { rowNum: 3, desks: [{ deskNum: 9, seats: [16, 17] }, { deskNum: 10, seats: [18, 19] }, { deskNum: 11, seats: [20, 21] }, { deskNum: 12, seats: [22, 23] }] },
    { rowNum: 4, desks: [{ deskNum: 13, seats: [24, 25] }, { deskNum: 14, seats: [26, 27] }, { deskNum: 15, seats: [28, 29] }, { deskNum: 16, seats: [30, 31] }] },
    { rowNum: 5, isBackRow: true, desks: [{ deskNum: 17, seats: [32, 33] }, { deskNum: 18, seats: [34, 35] }] },
  ];

  return (
    <section
      id="seating"
      className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative"
    >
      <div className="flex flex-col gap-5 md:gap-8">
        {/* Header Title & Catatan */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 fade-up is-visible">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-fixed mb-4">
              <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
              <span className="font-overline text-overline uppercase tracking-widest">
                Denah Tempat Duduk XI-F1
              </span>
            </div>
          </div>

          {/* CATATAN Rotasi Senin */}
          <div className="bg-[#1e1c18] p-4 rounded-2xl border border-amber-500/40 shadow-lg flex items-center gap-3 max-w-md">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined">info</span>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                📌 Catatan Penting
              </p>
              <p className="text-xs text-amber-100/90 mt-0.5 font-medium leading-relaxed">
                Denah tempat duduk siswa akan di-rolling secara berkala setiap hari Senin.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#181613] rounded-2xl p-3 sm:p-4 border border-white/15 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Cari nama / nomor absen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-white/60 font-medium mr-1 hidden sm:inline">Filter:</span>
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/15 text-xs w-full sm:w-auto justify-between">
              <button
                onClick={() => setFilterGender("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterGender === "all" ? "bg-white/20 text-white font-semibold" : "text-white/60"
                  }`}
              >
                Semua (36)
              </button>
              <button
                onClick={() => setFilterGender("L")}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterGender === "L" ? "bg-blue-500/30 text-blue-300 font-semibold" : "text-white/60"
                  }`}
              >
                L (18)
              </button>
              <button
                onClick={() => setFilterGender("P")}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterGender === "P" ? "bg-pink-500/30 text-pink-300 font-semibold" : "text-white/60"
                  }`}
              >
                P (18)
              </button>
            </div>
          </div>
        </div>

        {/* Visual Seating Layout Container (Direct Mobile Visibility - Ultra Fast Solid GPU Colors) */}
        <div className="bg-[#14120e] rounded-2xl md:rounded-3xl p-2 sm:p-5 md:p-8 border border-white/15 relative w-full shadow-2xl overflow-hidden">
          {/* Top Classroom Front: Whiteboard & Teacher Desk */}
          <div className="w-full flex flex-col items-center mb-4 sm:mb-6 md:mb-8 pb-3 md:pb-6 border-b border-white/10 relative">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 mb-1 md:mb-2 font-bold">
              [ DEPAN KELAS ]
            </span>

            {/* Papan Tulis / Whiteboard */}
            <div className="w-full max-w-xl h-8 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-200 font-semibold text-[10px] sm:text-xs tracking-wider px-2">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-[14px] sm:text-[18px]">edit_note</span>
                Papan Tulis
              </span>
            </div>

            {/* Meja Guru */}
            <div className="mt-2 sm:mt-4">
              <div className="px-3 sm:px-5 py-1 sm:py-1.5 rounded-lg bg-amber-950 border border-amber-600/50 text-amber-200 text-[9px] sm:text-xs font-semibold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[13px] sm:text-[16px]">co_present</span>
                Meja Guru
              </div>
            </div>
          </div>

          {/* Rows Grid Architecture (Strict 4 Columns for Mobile & PC - Fit Directly) */}
          <div className="space-y-3 sm:space-y-6 md:space-y-8">
            {rows.map((row) => (
              <div key={row.rowNum} className="flex flex-col gap-1 sm:gap-2">
                {/* Row Header Indicator */}
                <div className="flex items-center justify-between text-[9px] sm:text-xs text-white/50 px-0.5 sm:px-2">
                  <span className="font-mono font-bold tracking-wider text-amber-400/80">
                    BARIS KE-{row.rowNum} {row.isBackRow ? "(Belakang)" : ""}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-white/40">
                    {row.isBackRow ? "2 Bangku (4 Siswa)" : "4 Bangku (8 Siswa)"}
                  </span>
                </div>

                {/* Desk Containers in Row */}
                {row.isBackRow ? (
                  /* Row 5: 2 Desks centered in middle (Cols 2 & 3 of 4 cols) */
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-6">
                    <div /> {/* Spacer Col 1 */}

                    {row.desks.map((desk) => (
                      <DeskCard
                        key={desk.deskNum}
                        deskNum={desk.deskNum}
                        seatIndices={desk.seats}
                        students={ALL_STUDENTS}
                        onSelectStudent={(st) => setSelectedStudent(st)}
                        isStudentHighlighted={isStudentHighlighted}
                        isStudentFiltered={isStudentFiltered}
                      />
                    ))}

                    <div /> {/* Spacer Col 4 */}
                  </div>
                ) : (
                  /* Rows 1-4: 4 Desks side-by-side (Cols 1, 2, 3, 4) */
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-6 relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-amber-500/20 pointer-events-none" />

                    {row.desks.map((desk, idx) => (
                      <div
                        key={desk.deskNum}
                        className={idx === 1 ? "md:mr-2" : idx === 2 ? "md:ml-2" : ""}
                      >
                        <DeskCard
                          deskNum={desk.deskNum}
                          seatIndices={desk.seats}
                          students={ALL_STUDENTS}
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
          <div className="w-full mt-5 md:mt-8 pt-2.5 border-t border-white/10 flex items-center justify-between text-white/40 text-[9px] sm:text-[11px]">
            <span>[ BELAKANG KELAS ]</span>
            <span>Total 18 Bangku • 36 Siswa</span>
            <span className="hidden sm:inline">Dinding Belakang</span>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1a1814] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-all"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg ${selectedStudent.gender === "L"
                  ? "bg-gradient-to-br from-blue-600 to-indigo-800"
                  : "bg-gradient-to-br from-pink-600 to-rose-800"
                  }`}
              >
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-mono">
                    Absen #{selectedStudent.absentNo}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${selectedStudent.gender === "L"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-pink-500/20 text-pink-300"
                      }`}
                  >
                    {selectedStudent.gender === "L" ? "Laki-laki" : "Perempuan"}
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-white mt-1">
                  {selectedStudent.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {selectedStudent.role && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-400">verified</span>
                  <div>
                    <p className="text-xs text-white/60">Jabatan Kelas</p>
                    <p className="text-sm font-bold text-amber-200">{selectedStudent.role}</p>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">cleaning_services</span>
                <div>
                  <p className="text-xs text-white/60">Jadwal Piket Kebersihan</p>
                  <p className="text-sm font-semibold text-white">Hari {selectedStudent.piketDay}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-glow-gold"
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
  isStudentHighlighted: (student: Student) => boolean;
  isStudentFiltered: (student: Student) => boolean;
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

  const isLeftMatch = isStudentHighlighted(studentLeft);
  const isRightMatch = isStudentHighlighted(studentRight);
  const isDeskMatch = isLeftMatch || isRightMatch;

  const isLeftFiltered = isStudentFiltered(studentLeft);
  const isRightFiltered = isStudentFiltered(studentRight);

  return (
    <div
      className={`bg-[#1c1a17] p-1 sm:p-2.5 md:p-3 rounded-lg sm:rounded-2xl border transition-all relative group ${isDeskMatch
        ? "border-amber-400 bg-amber-500/20 shadow-md scale-[1.02] z-10"
        : "border-white/10 hover:border-white/30"
        }`}
    >
      {/* Desk Header Badge */}
      <div className="flex items-center justify-between mb-1 sm:mb-2 pb-0.5 sm:pb-1 border-b border-white/10">
        <span className="text-[8px] sm:text-[10px] md:text-[11px] font-bold text-amber-300 flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[9px] sm:text-[13px]">table_restaurant</span>
          <span>B#{deskNum}</span>
        </span>
      </div>

      {/* 2 Seats Stacked Vertically (Top = Left, Bottom = Right) */}
      <div className="flex flex-col gap-0.5 sm:gap-1.5">
        <SeatButton
          seatLabel="Kiri"
          student={studentLeft}
          isMatched={isLeftMatch}
          isFiltered={isLeftFiltered}
          onSelect={onSelectStudent}
        />
        <SeatButton
          seatLabel="Kanan"
          student={studentRight}
          isMatched={isRightMatch}
          isFiltered={isRightFiltered}
          onSelect={onSelectStudent}
        />
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
      className={`px-1.5 py-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg border text-left flex items-center gap-1 sm:gap-1.5 transition-all relative overflow-hidden ${!isFiltered ? "opacity-25" : "opacity-100"
        } ${isMatched
          ? "bg-amber-400/30 border-amber-300 ring-1 ring-amber-400 text-white font-bold"
          : "bg-[#25221d] hover:bg-[#302c25] border-white/10 text-white"
        }`}
    >
      {/* L/R Indicator */}
      <span
        className={`text-[7px] sm:text-[8px] font-mono font-bold shrink-0 w-3 text-center rounded px-0.5 ${seatLabel === "Kiri"
          ? "bg-blue-500/20 text-blue-300"
          : "bg-pink-500/20 text-pink-300"
          }`}
      >
        {seatLabel === "Kiri" ? "L" : "R"}
      </span>

      {/* Nickname */}
      <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold leading-none text-white flex-1">
        {getNickname(student.name)}
      </span>
    </button>
  );
}
