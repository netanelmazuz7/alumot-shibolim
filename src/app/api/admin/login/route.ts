import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/auth";
import { rateLimit, getClientIp, rateLimitExceeded } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    // הגבלת קצב קשוחה יותר לאדמין: 5 ניסיונות ל-15 דקות.
    const ip = getClientIp(req);
    const rl = rateLimit(`admin-login:${ip}`, 5, 15 * 60);
    if (!rl.ok) {
      return rateLimitExceeded(
        rl,
        "יותר מדי ניסיונות. נסה שוב בעוד 15 דקות."
      );
    }

    const { password } = (await req.json()) as { password: string };
    if (!password) {
      return NextResponse.json(
        { ok: false, error: "נדרשת סיסמה" },
        { status: 400 }
      );
    }
    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "סיסמה שגויה" },
        { status: 401 }
      );
    }
    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "שגיאה בהתחברות" },
      { status: 500 }
    );
  }
}
