/**
 * מאגר זמני בזיכרון לקודי אימות במייל.
 * מתאים לשלב פיתוח/ביקורת - מאפס על כל restart של השרת.
 * בפרודקשן יש להחליף בב-Redis או במסד נתונים.
 */

type Entry = {
  code: string;
  expiresAt: number;
  attempts: number;
};

// השתמש ב-global כדי לשרוד Hot Module Reload של Next.js dev
const globalKey = "__alumot_email_otp_store__" as const;

declare global {
  // eslint-disable-next-line no-var
  var __alumot_email_otp_store__: Map<string, Entry> | undefined;
}

const store: Map<string, Entry> =
  globalThis[globalKey] ?? (globalThis[globalKey] = new Map());

const TTL_MS = 10 * 60 * 1000; // 10 דקות
const MAX_ATTEMPTS = 5;

function normalize(email: string) {
  return email.trim().toLowerCase();
}

export function saveCode(email: string, code: string) {
  store.set(normalize(email), {
    code,
    expiresAt: Date.now() + TTL_MS,
    attempts: 0,
  });
}

export function verifyCode(
  email: string,
  code: string
): { ok: boolean; reason?: string } {
  const key = normalize(email);
  const entry = store.get(key);
  if (!entry) return { ok: false, reason: "לא נשלח קוד לכתובת זו" };
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { ok: false, reason: "הקוד פג תוקף - בקש חדש" };
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(key);
    return { ok: false, reason: "חרגת ממספר הניסיונות - בקש קוד חדש" };
  }
  entry.attempts += 1;
  if (entry.code !== code) return { ok: false, reason: "קוד שגוי - נסה שוב" };
  store.delete(key);
  return { ok: true };
}

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
