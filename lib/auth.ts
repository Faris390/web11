import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "kelasrmk_session";

export type AdminRole = "admin" | "rishyt";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET belum dikonfigurasi.");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSession(username: string, role: AdminRole) {
  const payload = Buffer.from(JSON.stringify({ username, role, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSession() {
  const value = cookies().get(COOKIE_NAME)?.value;
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      username: string;
      role: AdminRole;
      exp: number;
    };
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 8 * 60 * 60,
    path: "/",
  };
}

export function clearSessionCookie() {
  return { ...sessionCookie(""), maxAge: 0 };
}

export function authenticate(username: string, password: string) {
  const accounts: Array<[AdminRole, string | undefined, string | undefined]> = [
    ["admin", process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD],
    ["rishyt", process.env.RISHYT_USERNAME, process.env.RISHYT_PASSWORD],
  ];
  return accounts.find(([, configuredUser, configuredPassword]) =>
    configuredUser === username && configuredPassword === password
  )?.[0] ?? null;
}

export { COOKIE_NAME };
