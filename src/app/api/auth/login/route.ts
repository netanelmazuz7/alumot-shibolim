import { NextResponse } from "next/server";
import { setCustomerSession, verifyPassword } from "@/lib/auth";
import { getCustomerByEmail } from "@/lib/customerStore";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "חסרים פרטים" },
        { status: 400 }
      );
    }

    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return NextResponse.json(
        { ok: false, error: "דוא״ל או סיסמה שגויים" },
        { status: 401 }
      );
    }
    if (customer.status !== "approved") {
      return NextResponse.json(
        {
          ok: false,
          error:
            customer.status === "pending"
              ? "ההרשמה שלך עדיין בבדיקה. תקבל הודעה במייל כשתאושר."
              : "ההרשמה שלך נדחתה. לפרטים פנה אלינו.",
        },
        { status: 403 }
      );
    }
    if (!customer.passwordHash || !customer.passwordSalt) {
      return NextResponse.json(
        { ok: false, error: "חשבון לא הוגדר - פנה למנהל" },
        { status: 500 }
      );
    }
    if (!verifyPassword(password, customer.passwordHash, customer.passwordSalt)) {
      return NextResponse.json(
        { ok: false, error: "דוא״ל או סיסמה שגויים" },
        { status: 401 }
      );
    }

    await setCustomerSession(customer.id);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "שגיאה";
    console.error("[auth/login] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
