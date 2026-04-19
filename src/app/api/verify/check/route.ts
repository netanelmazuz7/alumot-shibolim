import { NextResponse } from "next/server";
import twilio from "twilio";
import { verifyCode } from "@/lib/emailOtpStore";
import { rateLimit, getClientIp, rateLimitExceeded } from "@/lib/rateLimit";

/**
 * מאמת קוד OTP.
 *   - טלפון:  מול Twilio Verify
 *   - מייל:   מול מאגר פנימי
 */
export async function POST(req: Request) {
  try {
    // הגבלת קצב: 10 ניסיונות ל-10 דקות לפי IP.
    // מניעת ניחוש קודים בכוח (brute force).
    const ip = getClientIp(req);
    const rl = rateLimit(`verify-check:${ip}`, 10, 10 * 60);
    if (!rl.ok) {
      return rateLimitExceeded(
        rl,
        "יותר מדי ניסיונות אימות. נסה שוב בעוד כמה דקות."
      );
    }

    const { type, value, code } = (await req.json()) as {
      type: "phone" | "email";
      value: string;
      code: string;
    };

    if (!value || !code) {
      return NextResponse.json(
        { ok: false, error: "חסר ערך או קוד" },
        { status: 400 }
      );
    }

    // ===== אימות טלפון - Twilio =====
    if (type === "phone") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

      if (!accountSid || !authToken || !verifySid) {
        if (code === "123456") {
          return NextResponse.json({ ok: true, verified: true, dev: true });
        }
        return NextResponse.json({
          ok: true,
          verified: false,
          error: "קוד שגוי (מצב דמו: הקוד הוא 123456)",
        });
      }

      const client = twilio(accountSid, authToken);
      let to = value.replace(/[-\s]/g, "");
      if (to.startsWith("0")) to = "+972" + to.slice(1);
      else if (!to.startsWith("+")) to = "+972" + to;

      const check = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to, code });

      return NextResponse.json({
        ok: true,
        verified: check.status === "approved",
      });
    }

    // ===== אימות מייל - מאגר פנימי =====
    const result = verifyCode(value, code);
    if (!result.ok) {
      return NextResponse.json({
        ok: true,
        verified: false,
        error: result.reason,
      });
    }
    return NextResponse.json({ ok: true, verified: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "שגיאה באימות הקוד";
    console.error("[verify/check] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
