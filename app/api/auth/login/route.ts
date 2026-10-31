import { NextResponse } from "next/server";
import { authenticate, createSession, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const role = authenticate(username, password);

  if (!role) return NextResponse.json({ message: "Username atau password salah." }, { status: 401 });

  const response = NextResponse.json({ success: true, role });
  response.cookies.set(sessionCookie(createSession(username, role)));
  return response;
}
