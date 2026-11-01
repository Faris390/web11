import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { sql } from "@/lib/db";

function requireRishyt() {
  const session = readSession();
  return session?.role === "rishyt";
}

export async function GET() {
  if (!requireRishyt()) return NextResponse.json({ error: "Akses khusus rishyt." }, { status: 403 });

  const desks = await sql()`SELECT student_a, student_b FROM seating_desks ORDER BY desk_num`;
  const preferences = await sql()`SELECT pair_key, allowed_rows FROM seating_preferences`;
  const values = new Map(preferences.map((item) => [item.pair_key, item.allowed_rows]));
  return NextResponse.json({
    pairs: desks.map((desk) => {
      const pairKey = [desk.student_a, desk.student_b].sort().join("|");
      return { pairKey, studentA: desk.student_a, studentB: desk.student_b, allowedRows: (values.get(pairKey) || "1,2,3,4,5").split(",").map(Number) };
    }),
  });
}

export async function PUT(request: Request) {
  if (!requireRishyt()) return NextResponse.json({ error: "Akses khusus rishyt." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.pairs)) return NextResponse.json({ error: "Format preferensi tidak valid." }, { status: 400 });

  try {
    for (const pair of body.pairs) {
      const rows = Array.isArray(pair.allowedRows)
        ? pair.allowedRows.filter((row: unknown): row is number => typeof row === "number" && Number.isInteger(row) && row >= 1 && row <= 5)
        : [];
      if (!pair.pairKey || rows.length === 0) continue;
      await sql()`
        INSERT INTO seating_preferences (pair_key, allowed_rows, updated_at)
        VALUES (${pair.pairKey}, ${rows.join(",")}, NOW())
        ON CONFLICT (pair_key) DO UPDATE SET allowed_rows = EXCLUDED.allowed_rows, updated_at = NOW()
      `;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal menyimpan kemungkinan baris:", error);
    return NextResponse.json({ error: "Preferensi gagal disimpan." }, { status: 500 });
  }
}
