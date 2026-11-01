import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql()`
      SELECT student_a, student_b
      FROM seating_desks
      ORDER BY desk_num
    `;
    return NextResponse.json({
      students: rows.flatMap((row) => [row.student_a, row.student_b]),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Gagal mengambil denah duduk:", error);
    return NextResponse.json({ error: "Denah duduk gagal dimuat." }, { status: 500 });
  }
}

export async function POST() {
  const session = readSession();
  if (!session) return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });

  try {
    const desks = await sql()`
      SELECT desk_num, student_a, student_b
      FROM seating_desks
      ORDER BY desk_num
    `;
    if (desks.length !== 18) {
      return NextResponse.json({ error: "Data 18 pasangan bangku belum lengkap." }, { status: 409 });
    }

    const pairs = [...desks].sort(() => Math.random() - 0.5);
    for (let index = 0; index < desks.length; index += 1) {
      await sql()`
        UPDATE seating_desks
        SET student_a = ${pairs[index].student_a},
            student_b = ${pairs[index].student_b},
            updated_at = NOW()
        WHERE desk_num = ${desks[index].desk_num}
      `;
    }

    return NextResponse.json({
      students: pairs.flatMap((pair) => [pair.student_a, pair.student_b]),
    });
  } catch (error) {
    console.error("Gagal mengacak denah duduk:", error);
    return NextResponse.json({ error: "Pengacakan denah duduk gagal." }, { status: 500 });
  }
}
