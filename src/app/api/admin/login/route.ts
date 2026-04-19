import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
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
