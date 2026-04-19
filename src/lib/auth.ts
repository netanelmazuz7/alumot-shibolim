/**
 * ניהול סשנים וסיסמאות.
 * - סיסמאות: scrypt עם מלח ייחודי לכל משתמש
 * - סשן:     קוקי חתום HMAC-SHA256
 * - אין תלות בחבילות חיצוניות - רק crypto של Node
 */

import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "alumat_session";
const ADMIN_COOKIE = "alumat_admin";
const SESSION_DAYS = 30;

function secret() {
  return (
    process.env.SESSION_SECRET ||
    "dev-secret-please-set-SESSION_SECRET-in-env-local"
  );
}

// ===== סיסמאות =====

export function hashPassword(password: string): {
  hash: string;
  salt: string;
} {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  try {
    const test = crypto.scryptSync(password, salt, 64).toString("hex");
    const a = Buffer.from(test, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * מייצר סיסמה קריאה - 10 תווים בלי אותיות/ספרות מבלבלות (0/O, 1/I/l).
 */
export function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 10; i++) {
    out += chars[crypto.randomInt(chars.length)];
  }
  return out;
}

// ===== טוקנים חתומים =====

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

function encodeToken(payload: object): string {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json, "utf8").toString("base64url");
  const sig = sign(b64);
  return `${b64}.${sig}`;
}

function decodeToken<T>(token: string): T | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;
  if (!b64 || !sig) return null;
  const expected = sign(b64);
  const sigBuf = Buffer.from(sig, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    return JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

// ===== סשן לקוח =====

type CustomerSession = { customerId: string; exp: number };

export async function setCustomerSession(customerId: string) {
  const token = encodeToken({
    customerId,
    exp: Date.now() + SESSION_DAYS * 86400 * 1000,
  } satisfies CustomerSession);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearCustomerSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function getCurrentCustomerId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = decodeToken<CustomerSession>(token);
  if (!payload) return null;
  if (payload.exp < Date.now()) return null;
  return payload.customerId;
}

// ===== סשן אדמין =====

type AdminSession = { role: "admin"; exp: number };

export async function setAdminSession() {
  const token = encodeToken({
    role: "admin",
    exp: Date.now() + SESSION_DAYS * 86400 * 1000,
  } satisfies AdminSession);
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const payload = decodeToken<AdminSession>(token);
  if (!payload) return false;
  if (payload.exp < Date.now()) return false;
  return payload.role === "admin";
}

/**
 * בודק את סיסמת האדמין מה-ENV.
 * ADMIN_PASSWORD חייבת להיות מוגדרת ב-.env.local.
 */
export function verifyAdminPassword(password: string): boolean {
  const admin = process.env.ADMIN_PASSWORD;
  if (!admin || !password) return false;
  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(admin, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
