import { NextResponse } from "next/server";
import { getCurrentCustomerId } from "@/lib/auth";
import { getCustomerById } from "@/lib/customerStore";

export async function GET() {
  const id = await getCurrentCustomerId();
  if (!id) {
    return NextResponse.json({ ok: true, customer: null });
  }
  const customer = await getCustomerById(id);
  if (!customer) {
    return NextResponse.json({ ok: true, customer: null });
  }
  // לא מחזירים סודות
  const {
    passwordHash: _h,
    passwordSalt: _s,
    ...safe
  } = customer;
  void _h;
  void _s;
  return NextResponse.json({ ok: true, customer: safe });
}
