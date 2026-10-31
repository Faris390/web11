import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function GET() {
  const session = readSession();
  if (!session) return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });

  try {
    const assignments = await sql()`
      SELECT a.id, s.name AS subject, a.title, a.type, a.details, a.due_date
      FROM assignments a
      INNER JOIN subjects s ON s.id = a.subject_id
      ORDER BY a.due_date ASC NULLS LAST, a.created_at DESC
      LIMIT 50
    `;
    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("Gagal mengambil daftar tugas:", error);
    return NextResponse.json({ error: "Daftar tugas gagal dimuat." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = readSession();
  if (!session) return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const subjectId = typeof body?.subjectId === "string" ? body.subjectId : "";
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const type = typeof body?.type === "string" ? body.type : "";
  const details = typeof body?.details === "string" ? body.details.trim() : "";
  const dueDate = typeof body?.dueDate === "string" && body.dueDate ? body.dueDate : null;
  const validTypes = ["tugas", "berkelompok", "presentasi", "ulangan"];

  if (!subjectId || !title || !details || !validTypes.includes(type)) {
    return NextResponse.json({ error: "Mata pelajaran, judul, tipe, dan detail wajib diisi." }, { status: 400 });
  }

  try {
    const rows = await sql()`
      INSERT INTO assignments (subject_id, title, type, details, due_date)
      SELECT id, ${title}, ${type}, ${details}, ${dueDate}
      FROM subjects WHERE id = ${subjectId}
      RETURNING id, title, type, details, due_date
    `;
    if (!rows.length) return NextResponse.json({ error: "Mata pelajaran tidak ditemukan." }, { status: 404 });
    return NextResponse.json({ assignment: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Gagal menambahkan tugas:", error);
    return NextResponse.json({ error: "Tugas gagal disimpan." }, { status: 500 });
  }
}
