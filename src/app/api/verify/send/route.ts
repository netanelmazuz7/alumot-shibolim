import { NextResponse } from "next/server";
import twilio from "twilio";
import { Resend } from "resend";
import { saveCode, generateCode } from "@/lib/emailOtpStore";
import { rateLimit, getClientIp, rateLimitExceeded } from "@/lib/rateLimit";

/**
 * שולח קוד אימות OTP.
 *   - טלפון:  דרך Twilio Verify (SMS)
 *   - מייל:   דרך Resend (המייל נשלח עם קוד בן 6 ספרות)
 */
export async function POST(req: Request) {
  try {
    // הגבלת קצב: 3 בקשות ל-10 דקות לפי IP.
    // SMS עולה כסף - חיוני לחסום בוטים.
    const ip = getClientIp(req);
    const rl = rateLimit(`verify-send:${ip}`, 3, 10 * 60);
    if (!rl.ok) {
      return rateLimitExceeded(
        rl,
        "שלחת יותר מדי קודי אימות. נסה שוב בעוד כמה דקות."
      );
    }

    const { type, value } = (await req.json()) as {
      type: "phone" | "email";
      value: string;
    };

    if (!value) {
      return NextResponse.json(
        { ok: false, error: "חסר ערך" },
        { status: 400 }
      );
    }

    // ===== אימות טלפון - Twilio =====
    if (type === "phone") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

      if (!accountSid || !authToken || !verifySid) {
        console.warn(
          "[verify/send] Twilio credentials not configured - DEV mode"
        );
        return NextResponse.json({ ok: true, dev: true });
      }

      const client = twilio(accountSid, authToken);
      let to = value.replace(/[-\s]/g, "");
      if (to.startsWith("0")) to = "+972" + to.slice(1);
      else if (!to.startsWith("+")) to = "+972" + to;

      await client.verify.v2
        .services(verifySid)
        .verifications.create({ to, channel: "sms" });

      return NextResponse.json({ ok: true });
    }

    // ===== אימות מייל - Resend =====
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[verify/send] RESEND_API_KEY not set - DEV mode");
      // Dev mode - שמור קוד קבוע כדי לאפשר בדיקה
      saveCode(value, "123456");
      return NextResponse.json({ ok: true, dev: true });
    }

    const code = generateCode();
    saveCode(value, code);

    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM ||
      "Alumat Shibolim <noreply@alumat-shibolim.co.il>";

    const { error } = await resend.emails.send({
      from,
      to: [value],
      subject: `קוד אימות - אלומת שיבולים: ${code}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <body style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;background:#faf6ed">
          <div style="background:linear-gradient(135deg,#d4a843,#b8912e);padding:24px;border-radius:12px;text-align:center;margin-bottom:24px">
            <h1 style="color:white;margin:0;font-size:22px">🌾 אלומת שיבולים</h1>
          </div>
          <div style="background:white;padding:28px;border-radius:12px;border:1px solid #eee">
            <h2 style="color:#1a365d;margin:0 0 12px 0">קוד האימות שלך</h2>
            <p style="color:#666;line-height:1.6;margin:0 0 20px 0">
              הקוד שלך להשלמת האימות בדוא"ל:
            </p>
            <div style="background:#faf6ed;border:2px dashed #d4a843;border-radius:10px;padding:20px;text-align:center;margin-bottom:20px">
              <span style="font-size:36px;font-weight:bold;color:#1a365d;letter-spacing:8px">${code}</span>
            </div>
            <p style="color:#999;font-size:13px;margin:0;text-align:center">
              הקוד תקף ל-10 דקות. אם לא ביקשת אותו - התעלם ממייל זה.
            </p>
          </div>
        </body>
        </html>`,
    });

    if (error) {
      console.error("[verify/send] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "שגיאה בשליחת קוד האימות";
    console.error("[verify/send] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
