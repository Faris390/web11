import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";

export async function GET() {
  const session = readSession();
  return session
    ? NextResponse.json({ authenticated: true, username: session.username, role: session.role })
    : NextResponse.json({ authenticated: false }, { status: 401 });
}
