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

    const preferences = await sql()`SELECT pair_key, allowed_rows FROM seating_preferences`;
    const allowed = new Map(preferences.map((item) => [item.pair_key, String(item.allowed_rows).split(",").map(Number)]));
    const slots = Array.from({ length: 18 }, (_, index) => ({
      index,
      row: index < 16 ? Math.floor(index / 4) + 1 : 5,
    }));
    const pairs = [...desks].sort(() => Math.random() - 0.5).sort((a, b) => {
      const getSize = (pair: typeof a) => {
        const key = [pair.student_a, pair.student_b].sort().join("|");
        return (allowed.get(key) || [1, 2, 3, 4, 5]).length;
      };
      return getSize(a) - getSize(b);
    });
    const assigned: Array<typeof pairs[number] | undefined> = Array(18);
    const placePair = (pairIndex: number, availableSlots: typeof slots): boolean => {
      if (pairIndex === pairs.length) return true;
      const pair = pairs[pairIndex];
      const pairKey = [pair.student_a, pair.student_b].sort().join("|");
      const permittedRows = allowed.get(pairKey) || [1, 2, 3, 4, 5];
      const choices = availableSlots.filter((slot) => permittedRows.includes(slot.row)).sort(() => Math.random() - 0.5);
      for (const choice of choices) {
        assigned[choice.index] = pair;
        if (placePair(pairIndex + 1, availableSlots.filter((slot) => slot.index !== choice.index))) return true;
      }
      assigned[choices[0]?.index ?? 0] = undefined;
      return false;
    };
    if (!placePair(0, slots)) return NextResponse.json({ error: "Aturan baris tidak memiliki kombinasi yang memungkinkan." }, { status: 409 });
    const orderedPairs = assigned as typeof pairs;
    for (let index = 0; index < desks.length; index += 1) {
      await sql()`
        UPDATE seating_desks SET student_a = ${orderedPairs[index].student_a}, student_b = ${orderedPairs[index].student_b},
            updated_at = NOW()
        WHERE desk_num = ${desks[index].desk_num}
      `;
    }

    return NextResponse.json({
      students: orderedPairs.flatMap((pair) => [pair.student_a, pair.student_b]),
    });
  } catch (error) {
    console.error("Gagal mengacak denah duduk:", error);
    return NextResponse.json({ error: "Pengacakan denah duduk gagal." }, { status: 500 });
  }
}
