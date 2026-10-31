import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL belum dikonfigurasi.");
  }

  return databaseUrl;
}

export function sql() {
  return neon(getDatabaseUrl());
}
