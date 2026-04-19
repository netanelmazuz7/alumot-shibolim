/**
 * מאגר לקוחות זמני מבוסס קובץ JSON.
 * מתאים לשלב פיתוח/ביקורת בלבד. בפרודקשן יש להחליף במסד נתונים (Supabase/Postgres).
 *
 * הערה חשובה: על Vercel מערכת הקבצים היא read-only (למעט /tmp).
 * כל עוד רצים ב-localhost או על שרת רגיל - זה עובד.
 */

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export type CustomerStatus = "pending" | "approved" | "rejected";

export type Customer = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  status: CustomerStatus;
  passwordHash?: string;
  passwordSalt?: string;
  createdAt: number;
  approvedAt?: number;
  rejectedAt?: number;
  rejectionReason?: string;
  score?: number;
  formData: Record<string, unknown>;
};

const DATA_FILE = path.join(process.cwd(), "data", "customers.json");

// קאש גלובלי - שורד HMR של Next.js dev
const globalKey = "__alumat_customer_store__" as const;
declare global {
  // eslint-disable-next-line no-var
  var __alumat_customer_store__:
    | { loaded: boolean; data: Customer[] }
    | undefined;
}
const cache = (globalThis[globalKey] ??= { loaded: false, data: [] });

async function ensureDir() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
}

async function load() {
  if (cache.loaded) return;
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    cache.data = JSON.parse(txt) as Customer[];
  } catch {
    cache.data = [];
  }
  cache.loaded = true;
}

async function save() {
  await ensureDir();
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(cache.data, null, 2),
    "utf8"
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function listCustomers(): Promise<Customer[]> {
  await load();
  return [...cache.data].sort((a, b) => b.createdAt - a.createdAt);
}

export async function getCustomerById(
  id: string
): Promise<Customer | undefined> {
  await load();
  return cache.data.find((c) => c.id === id);
}

export async function getCustomerByEmail(
  email: string
): Promise<Customer | undefined> {
  await load();
  const n = normalizeEmail(email);
  return cache.data.find((c) => c.email === n);
}

export async function createOrUpdateCustomer(input: {
  email: string;
  fullName: string;
  phone?: string;
  formData: Record<string, unknown>;
  score?: number;
}): Promise<Customer> {
  await load();
  const email = normalizeEmail(input.email);
  const existing = cache.data.find((c) => c.email === email);

  if (existing) {
    // רק אם המשתמש עדיין "pending" - נעדכן את הנתונים (הגשה חוזרת).
    // אם כבר אושר/נדחה - משאירים (לא דורסים).
    if (existing.status === "pending") {
      existing.fullName = input.fullName;
      existing.phone = input.phone;
      existing.formData = input.formData;
      if (input.score !== undefined) existing.score = input.score;
      await save();
    }
    return existing;
  }

  const c: Customer = {
    id: crypto.randomUUID(),
    email,
    fullName: input.fullName,
    phone: input.phone,
    status: "pending",
    createdAt: Date.now(),
    formData: input.formData,
    score: input.score,
  };
  cache.data.push(c);
  await save();
  return c;
}

export async function updateCustomer(
  id: string,
  updates: Partial<Customer>
): Promise<Customer | null> {
  await load();
  const i = cache.data.findIndex((c) => c.id === id);
  if (i === -1) return null;
  cache.data[i] = { ...cache.data[i], ...updates };
  await save();
  return cache.data[i];
}

export async function deleteCustomer(id: string): Promise<boolean> {
  await load();
  const before = cache.data.length;
  cache.data = cache.data.filter((c) => c.id !== id);
  if (cache.data.length === before) return false;
  await save();
  return true;
}
