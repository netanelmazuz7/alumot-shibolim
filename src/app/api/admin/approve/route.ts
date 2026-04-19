import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdmin, generatePassword, hashPassword } from "@/lib/auth";
import { getCustomerById, updateCustomer } from "@/lib/customerStore";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "אין הרשאה" },
      { status: 401 }
    );
  }

  try {
    const { customerId } = (await req.json()) as { customerId: string };
    const customer = await getCustomerById(customerId);
    if (!customer) {
      return NextResponse.json(
        { ok: false, error: "לקוח לא נמצא" },
        { status: 404 }
      );
    }

    const password = generatePassword();
    const { hash, salt } = hashPassword(password);

    const updated = await updateCustomer(customerId, {
      status: "approved",
      approvedAt: Date.now(),
      passwordHash: hash,
      passwordSalt: salt,
    });

    // שליחת מייל קבלה עם סיסמה
    const resendKey = process.env.RESEND_API_KEY;
    const from =
      process.env.RESEND_FROM ||
      "Alumat Shibolim <onboarding@resend.dev>";
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const loginUrl = `${baseUrl}/login`;

    let emailSent = false;
    let emailError: string | undefined;

    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const { error } = await resend.emails.send({
          from,
          to: [customer.email],
          subject: "🌾 ברוך הבא לקהילת אלומת שיבולים - פרטי התחברות",
          html: welcomeHtml(customer.fullName, customer.email, password, loginUrl),
        });
        if (error) {
          emailError = error.message;
          console.error("[admin/approve] Resend error:", error);
        } else {
          emailSent = true;
        }
      } catch (e) {
        emailError = e instanceof Error ? e.message : "unknown";
        console.error("[admin/approve] Resend exception:", e);
      }
    } else {
      console.warn(
        "[admin/approve] RESEND_API_KEY not set - DEV mode, password printed below"
      );
      console.log(
        `=== APPROVED (DEV) ===\nemail: ${customer.email}\npassword: ${password}\nloginUrl: ${loginUrl}\n======================`
      );
    }

    return NextResponse.json({
      ok: true,
      customer: updated,
      emailSent,
      emailError,
      // מחזירים סיסמה לאדמין כדי שיוכל לשלוח ידנית במקרה שהמייל נכשל
      password,
      loginUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "שגיאה";
    console.error("[admin/approve] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function welcomeHtml(
  name: string,
  email: string,
  password: string,
  loginUrl: string
): string {
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head><meta charset="utf-8"/></head>
  <body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#faf6ed">
    <div style="background:linear-gradient(135deg,#d4a843,#b8912e);padding:28px;border-radius:12px;text-align:center;margin-bottom:24px">
      <h1 style="color:white;margin:0;font-size:26px">🌾 ברוך הבא לקהילה!</h1>
      <p style="color:rgba(255,255,255,0.95);margin:10px 0 0 0;font-size:15px">
        הבקשה שלך אושרה
      </p>
    </div>

    <div style="background:white;padding:28px;border-radius:12px;border:1px solid #eee;margin-bottom:20px">
      <h2 style="color:#1a365d;margin:0 0 16px 0;font-size:20px">שלום ${escapeHtml(name)},</h2>
      <p style="color:#444;line-height:1.7;margin:0 0 16px 0;font-size:15px">
        שמחים לבשר שהבקשה שלך להצטרפות לאלומת שיבולים <b>אושרה</b>!
        הכנו לך גישה לאזור האישי באתר.
      </p>

      <div style="background:#faf6ed;border:2px dashed #d4a843;border-radius:10px;padding:20px;margin:20px 0">
        <p style="margin:0 0 8px 0;color:#666;font-size:13px">דוא"ל להתחברות:</p>
        <p style="margin:0 0 16px 0;font-size:16px;color:#1a365d;font-weight:bold;direction:ltr;text-align:right">${escapeHtml(email)}</p>
        <p style="margin:0 0 8px 0;color:#666;font-size:13px">סיסמה זמנית:</p>
        <p style="margin:0;font-size:22px;color:#1a365d;font-weight:bold;letter-spacing:3px;direction:ltr;text-align:right;font-family:monospace">${escapeHtml(password)}</p>
      </div>

      <div style="text-align:center;margin:24px 0">
        <a href="${loginUrl}" style="display:inline-block;background:#d4a843;color:white;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">
          כניסה לאזור האישי ←
        </a>
      </div>

      <p style="color:#999;font-size:13px;line-height:1.6;margin:20px 0 0 0">
        <b>חשוב:</b> שמור את הסיסמה במקום בטוח. נמליץ לך לשנות אותה בכניסה הראשונה.
      </p>
    </div>

    <p style="color:#999;font-size:12px;text-align:center;margin:0">
      אם לא ביקשת גישה זו - התעלם ממייל זה או צור איתנו קשר.
    </p>
  </body>
  </html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
