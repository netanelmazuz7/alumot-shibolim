import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createOrUpdateCustomer } from "@/lib/customerStore";

/**
 * שולח את נתוני טופס ההרשמה למייל של המנהל, כולל תמונות כקבצים מצורפים.
 * מקבל multipart/form-data (עם formData כ-JSON + קבצים בשדות נפרדים).
 * ב-DEV mode (ללא מפתח Resend) - מדפיס ללוג ומחזיר הצלחה.
 */

type FormDataObj = Record<string, unknown>;

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024; // 20MB בסך הכל ל-Resend

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined || v === "") return "(ריק)";
  if (typeof v === "boolean") return v ? "✓ כן" : "✗ לא";
  if (Array.isArray(v)) {
    if (v.length === 0) return "(ריק)";
    return `${v.length} פריטים`;
  }
  return escapeHtml(String(v));
}

const FIELD_LABELS: Record<string, string> = {
  fullName: "שם מלא",
  idNumber: "תעודת זהות",
  birthDate: "תאריך לידה",
  gender: "מגדר",
  city: "עיר",
  street: "רחוב",
  phone: "טלפון",
  phoneVerified: "טלפון מאומת",
  email: "דוא״ל",
  emailVerified: "דוא״ל מאומת",
  maritalStatus: "מצב משפחתי",
  incomeRange: "רמת הכנסה",
  hasCriminalRecord: "רישום פלילי",
  licensePlate: "מספר רכב",
  manufacturer: "יצרן",
  model: "דגם",
  year: "שנת ייצור",
  marketValue: "שווי שוק",
  mileage: "קילומטראז'",
  usage: "סוג שימוש",
  drivingYears: "שנות ניסיון",
  currentInsurer: "מבטח נוכחי",
  claimsCount: "מספר תביעות",
  trafficViolations: "עבירות תנועה",
  consentCriminal: "הסכמה - רישום פלילי",
  consentCredit: "הסכמה - מידע פיננסי",
  consentInsurance: "הסכמה - מידע ביטוחי",
  consentVehicle: "הסכמה - נתוני רכב",
  consentClaims: "הסכמה - מאגר תביעות",
  consentEmployment: "הסכמה - מעסיק",
  agreeTerms: "אישור תקנון",
};

function renderEmailHtml(
  data: FormDataObj,
  score?: number,
  accepted?: boolean,
  attachmentsSummary?: string
) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr style="border-bottom:1px solid #eee">
          <td style="padding:8px 12px;background:#faf6ed;font-weight:bold;color:#1a365d;width:40%">${
            FIELD_LABELS[key] || key
          }</td>
          <td style="padding:8px 12px;color:#333">${formatValue(value)}</td>
        </tr>`
    )
    .join("");

  const statusBadge =
    accepted === undefined
      ? ""
      : `<div style="background:${
          accepted ? "#d1fae5" : "#fee2e2"
        };color:${
          accepted ? "#065f46" : "#991b1b"
        };padding:12px 20px;border-radius:8px;display:inline-block;font-weight:bold;margin-bottom:20px">
          ${accepted ? "✓ התקבל לקהילה" : "✗ לא עמד בקריטריונים"}
          ${score !== undefined ? ` | ניקוד: ${score}/100` : ""}
        </div>`;

  const attachmentsBlock = attachmentsSummary
    ? `<div style="background:#faf6ed;border:1px solid #d4a843;border-radius:8px;padding:12px 16px;margin-top:16px;color:#1a365d">
         <strong>📎 קבצים מצורפים:</strong> ${attachmentsSummary}
       </div>`
    : "";

  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head><meta charset="utf-8"/></head>
  <body style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#fff">
    <div style="background:linear-gradient(135deg,#d4a843,#b8912e);padding:24px;border-radius:12px;margin-bottom:20px">
      <h1 style="color:white;margin:0;font-size:24px">🌾 טופס הרשמה חדש - אלומת שיבולים</h1>
      <p style="color:rgba(255,255,255,0.9);margin:8px 0 0 0">
        התקבל בתאריך: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}
      </p>
    </div>

    ${statusBadge}

    <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #eee;border-radius:8px;overflow:hidden">
      ${rows}
    </table>

    ${attachmentsBlock}

    <p style="margin-top:24px;color:#666;font-size:12px;text-align:center">
      הודעה זו נשלחה אוטומטית ממערכת ההרשמה של אלומת שיבולים.
    </p>
  </body>
  </html>`;
}

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.\-א-ת ]+/g, "_").slice(0, 120);
}

/**
 * מייל אישור קבלה אוטומטי ללקוח.
 * נשלח מיד לאחר הגשת הטופס למי שעבר את הסינון (score >= 90).
 */
function renderCustomerConfirmationHtml(
  fullName: string,
  email: string,
  score: number
) {
  const firstName = fullName.split(" ")[0] || "חבר/ה יקר/ה";
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="he">
  <head><meta charset="utf-8"/><title>תודה על ההרשמה - אלומת שיבולים</title></head>
  <body style="font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:0;background:#faf6ed">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#d4a843,#b8912e);padding:32px 24px;border-radius:16px 16px 0 0;text-align:center">
        <div style="font-size:48px;margin-bottom:8px">🌾</div>
        <h1 style="color:white;margin:0;font-size:28px;font-weight:900">תודה על ההרשמה!</h1>
        <p style="color:rgba(255,255,255,0.95);margin:12px 0 0 0;font-size:16px">
          קיבלנו את הפרטים שלך בהצלחה
        </p>
      </div>

      <!-- Body -->
      <div style="background:white;padding:32px 24px;border-radius:0 0 16px 16px;border:1px solid #e5d9b8">
        <p style="color:#1a365d;font-size:18px;margin:0 0 16px 0">
          שלום <strong>${escapeHtml(firstName)}</strong>,
        </p>
        <p style="color:#4a5568;line-height:1.7;margin:0 0 20px 0">
          תודה שהצטרפת למשפחת <strong style="color:#1a365d">אלומת שיבולים</strong>.
          עברת את הסינון האוטומטי שלנו עם ציון <strong style="color:#2d8a4e">${score}/100</strong> —
          ועכשיו הבקשה שלך עוברת לבדיקה ידנית של הצוות.
        </p>

        <!-- Timeline -->
        <div style="background:#faf6ed;border-radius:12px;padding:20px;margin:24px 0">
          <h2 style="color:#1a365d;font-size:18px;margin:0 0 16px 0;font-weight:bold">
            ⏱️ מה קורה עכשיו?
          </h2>
          <div style="display:block;margin-bottom:12px">
            <span style="display:inline-block;background:#2d8a4e;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;margin-left:10px">1</span>
            <span style="color:#1a365d;font-weight:bold">הבקשה התקבלה ✅</span>
          </div>
          <div style="display:block;margin-bottom:12px">
            <span style="display:inline-block;background:#d4a843;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;margin-left:10px">2</span>
            <span style="color:#1a365d;font-weight:bold">בדיקת הצוות — תוך 2-3 ימי עסקים</span>
          </div>
          <div style="display:block">
            <span style="display:inline-block;background:#cbd5e0;color:white;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;margin-left:10px">3</span>
            <span style="color:#1a365d;font-weight:bold">מייל עם ההחלטה + פרטי כניסה לאזור האישי</span>
          </div>
        </div>

        <p style="color:#4a5568;line-height:1.7;margin:0 0 16px 0">
          בינתיים, אתה מוזמן לקרוא עוד על הקהילה ועל אופן הפעולה באתר שלנו.
        </p>

        <div style="text-align:center;margin:28px 0 16px 0">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://alumat-shibolim.co.il"}"
             style="display:inline-block;background:linear-gradient(135deg,#d4a843,#b8912e);color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">
            בקר באתר
          </a>
        </div>

        <div style="border-top:1px solid #e5d9b8;padding-top:20px;margin-top:24px">
          <p style="color:#718096;font-size:13px;margin:0;line-height:1.6">
            יש שאלה? ענה למייל הזה או פנה אלינו דרך
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://alumat-shibolim.co.il"}/contact" style="color:#d4a843">דף יצירת הקשר</a>.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:20px 24px;color:#718096;font-size:12px">
        <p style="margin:0 0 8px 0">🌾 אלומת שיבולים — קהילה של אנשים שסומכים אחד על השני</p>
        <p style="margin:0">הודעה זו נשלחה אוטומטית אל ${escapeHtml(email)}</p>
      </div>
    </div>
  </body>
  </html>`;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let formData: FormDataObj = {};
    let score: number | undefined;
    let accepted: boolean | undefined;
    const attachments: { filename: string; content: string }[] = [];
    const attachmentNames: string[] = [];

    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();

      const rawFormData = fd.get("formData");
      if (typeof rawFormData === "string") {
        try {
          formData = JSON.parse(rawFormData) as FormDataObj;
        } catch {
          formData = {};
        }
      }
      const rawScore = fd.get("score");
      if (typeof rawScore === "string" && rawScore !== "")
        score = Number(rawScore);
      const rawAccepted = fd.get("accepted");
      if (typeof rawAccepted === "string")
        accepted = rawAccepted === "true";

      // שמות ידידותיים לקבצים
      const friendlyNames: Record<string, string> = {
        idFrontFile: "תז_קדמי",
        idBackFile: "תז_אחורי",
        selfieFile: "סלפי_עם_תז",
      };

      let totalBytes = 0;
      for (const [key, val] of fd.entries()) {
        if (!(val instanceof File)) continue;
        if (val.size === 0) continue;

        const buf = Buffer.from(await val.arrayBuffer());
        totalBytes += buf.length;
        if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
          console.warn(
            "[join/submit] total attachments exceed limit, truncating"
          );
          break;
        }

        const ext = val.name.includes(".")
          ? val.name.slice(val.name.lastIndexOf("."))
          : ".jpg";
        let baseName = friendlyNames[key];
        if (!baseName && key.startsWith("carPhoto_")) {
          const idx = Number(key.split("_")[1]) + 1;
          baseName = `רכב_${idx}`;
        }
        if (!baseName) baseName = sanitizeFilename(val.name) || key;

        const filename = sanitizeFilename(`${baseName}${ext}`);
        attachments.push({
          filename,
          content: buf.toString("base64"),
        });
        attachmentNames.push(filename);
      }
    } else {
      // תאימות לאחור: JSON ללא קבצים
      const body = (await req.json()) as {
        formData: FormDataObj;
        score?: number;
        accepted?: boolean;
      };
      formData = body.formData || {};
      score = body.score;
      accepted = body.accepted;
    }

    if (!formData || typeof formData !== "object") {
      return NextResponse.json(
        { ok: false, error: "נתוני טופס חסרים" },
        { status: 400 }
      );
    }

    // שמירה במאגר הלקוחות - נדרש מייל + שם
    const email = (formData.email as string) || "";
    const fullName = (formData.fullName as string) || "";
    if (email && fullName) {
      try {
        await createOrUpdateCustomer({
          email,
          fullName,
          phone: (formData.phone as string) || undefined,
          formData,
          score,
        });
      } catch (e) {
        console.error("[join/submit] Failed to save customer:", e);
        // ממשיכים גם אם השמירה נכשלה - המייל ישלח בכל מקרה
      }
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.ADMIN_EMAIL || "netanelmazuz7@gmail.com";
    const from =
      process.env.RESEND_FROM || "Alumat Shibolim <onboarding@resend.dev>";

    const attachmentsSummary =
      attachments.length > 0
        ? `${attachments.length} קבצים (${attachmentNames.join(", ")})`
        : "";

    const html = renderEmailHtml(formData, score, accepted, attachmentsSummary);
    const name = (formData.fullName as string) || "לא ידוע";
    const subject = `🌾 טופס הרשמה חדש - ${name}${
      accepted !== undefined ? (accepted ? " (התקבל)" : " (נדחה)") : ""
    }`;

    // DEV mode - אם אין מפתח Resend
    if (!resendKey) {
      console.warn("[join/submit] RESEND_API_KEY not set - logging only");
      console.log("=== JOIN SUBMISSION (DEV) ===");
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Attachments:", attachmentNames);
      console.log("Data:", JSON.stringify(formData, null, 2));
      console.log("==============================");
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      replyTo: (formData.email as string) || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("[join/submit] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    // מייל אישור אוטומטי ללקוח - רק אם התקבל ויש מייל תקין.
    // אם Resend נכשל (למשל לפני אימות דומיין) - לא שובר את התגובה למשתמש.
    if (accepted && email && score !== undefined) {
      try {
        const customerHtml = renderCustomerConfirmationHtml(
          fullName || email,
          email,
          score
        );
        const { error: customerMailError } = await resend.emails.send({
          from,
          to: [email],
          subject: "🌾 תודה על ההרשמה - אלומת שיבולים",
          html: customerHtml,
        });
        if (customerMailError) {
          console.warn(
            "[join/submit] Customer confirmation email failed (non-fatal):",
            customerMailError.message
          );
        } else {
          console.log("[join/submit] Customer confirmation email sent to", email);
        }
      } catch (e) {
        console.warn(
          "[join/submit] Customer confirmation email threw (non-fatal):",
          e
        );
      }
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      attachments: attachmentNames.length,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "שגיאה בשליחת הטופס";
    console.error("[join/submit] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
