import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dayParam = searchParams.get("day");
  const day = dayParam === null ? null : Number(dayParam);

  if (day !== null && (!Number.isInteger(day) || day < 1 || day > 5)) {
    return NextResponse.json({ error: "Parameter day harus bernilai 1 sampai 5." }, { status: 400 });
  }

  try {
    const database = sql();
    const rows = await database`
      SELECT
        se.id,
        se.day_of_week,
        se.start_time,
        se.end_time,
        s.id AS subject_id,
        s.name AS subject,
        a.id AS assignment_id,
        a.title AS assignment_title,
        a.type AS assignment_type,
        a.details AS assignment_details,
        a.due_date
      FROM schedule_entries se
      INNER JOIN subjects s ON s.id = se.subject_id
      LEFT JOIN LATERAL (
        SELECT a.id, a.title, a.type, a.details, a.due_date
        FROM assignments a
        WHERE a.subject_id = se.subject_id
          AND (a.schedule_entry_id IS NULL OR a.schedule_entry_id = se.id)
          AND (a.due_date IS NULL OR a.due_date >= CURRENT_DATE)
        ORDER BY a.due_date ASC NULLS LAST, a.created_at DESC
        LIMIT 1
      ) a ON TRUE
      WHERE (${day}::smallint IS NULL OR se.day_of_week = ${day})
        AND se.active = TRUE
      ORDER BY se.start_time ASC, a.due_date ASC NULLS LAST;
    `;

    return NextResponse.json(
      { day, schedule: rows },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Gagal mengambil jadwal dari Neon:", error);
    return NextResponse.json(
      { error: "Jadwal belum dapat diambil. Periksa konfigurasi database." },
      { status: 500 }
    );
  }
}
