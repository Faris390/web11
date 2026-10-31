import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const subjects = await sql()`SELECT id, name FROM subjects ORDER BY name`;
    return NextResponse.json({ subjects }, { headers: { "Cache-Control": "public, s-maxage=300" } });
  } catch (error) {
    console.error("Gagal mengambil mata pelajaran:", error);
    return NextResponse.json({ error: "Mata pelajaran gagal dimuat." }, { status: 500 });
  }
}
