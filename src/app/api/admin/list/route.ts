import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listCustomers } from "@/lib/customerStore";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "אין הרשאה" },
      { status: 401 }
    );
  }
  const all = await listCustomers();
  // לא מחזירים hash/salt של סיסמאות לפרונט
  const safe = all.map((c) => {
    const {
      passwordHash: _h,
      passwordSalt: _s,
      ...rest
    } = c;
    void _h;
    void _s;
    return rest;
  });
  return NextResponse.json({ ok: true, customers: safe });
}
