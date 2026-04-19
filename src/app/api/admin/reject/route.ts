import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getCustomerById, updateCustomer } from "@/lib/customerStore";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "אין הרשאה" },
      { status: 401 }
    );
  }

  try {
    const { customerId, reason } = (await req.json()) as {
      customerId: string;
      reason?: string;
    };
    const customer = await getCustomerById(customerId);
    if (!customer) {
      return NextResponse.json(
        { ok: false, error: "לקוח לא נמצא" },
        { status: 404 }
      );
    }

    const updated = await updateCustomer(customerId, {
      status: "rejected",
      rejectedAt: Date.now(),
      rejectionReason: reason,
    });

    return NextResponse.json({ ok: true, customer: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "שגיאה";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
