/**
 * הגבלת קצב בקשות (Rate Limiting) בזיכרון.
 *
 * שומר מונה לכל IP + endpoint בזיכרון של ה-Lambda. כשהחלון עובר,
 * המונה מתאפס. מספיק טוב ל-MVP - חוסם 80%+ של התקפות.
 *
 * חסרון: ב-Vercel יש כמה Lambda instances, כל אחד מונה נפרד.
 * לייצור אמיתי עם תנועה גבוהה - להעביר ל-Upstash Redis או Supabase.
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

// ניקוי אוטומטי כל 10 דקות של רשומות פגות תוקף
let cleanupScheduled = false;
function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 10 * 60 * 1000);
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSec: number;
};

/**
 * בודק אם IP/key עבר את מגבלת הקצב.
 *
 * @param key מזהה ייחודי (לדוגמה: `verify-send:1.2.3.4`)
 * @param limit כמות בקשות מותרת
 * @param windowSec חלון זמן בשניות
 */
export function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): RateLimitResult {
  scheduleCleanup();
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    // חלון חדש
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      ok: true,
      remaining: limit - 1,
      resetAt,
      retryAfterSec: 0,
    };
  }

  // בתוך חלון קיים
  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
    retryAfterSec: 0,
  };
}

/**
 * מחלץ IP מבקשה. ב-Vercel ה-IP נמצא ב-header x-forwarded-for.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

/**
 * בונה תגובת 429 סטנדרטית עם header Retry-After.
 */
export function rateLimitExceeded(result: RateLimitResult, message?: string) {
  return new Response(
    JSON.stringify({
      ok: false,
      error: message || "יותר מדי בקשות. נסה שוב בעוד מספר דקות.",
      retryAfterSec: result.retryAfterSec,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfterSec),
      },
    }
  );
}
