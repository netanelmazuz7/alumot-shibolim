import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { updateCustomer } from "@/lib/customerStore";

/**
 * עדכון הערות פנימיות של המנהל על לקוח.
 * הערות לא מוצגות ללקוח, רק באזור הניהול.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { ok: false, error: "אין הרשאה" },
      { status: 401 }
    );
  }

  try {
    const { customerId, notes } = (await req.json()) as {
      customerId: string;
      notes: string;
    };

    if (!customerId) {
      return NextResponse.json(
        { ok: false, error: "חסר מזהה לקוח" },
        { status: 400 }
      );
    }

    const updated = await updateCustomer(customerId, {
      adminNotes: typeof notes === "string" ? notes : "",
    });

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: "לקוח לא נמצא" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, adminNotes: updated.adminNotes ?? "" });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "שגיאה בשמירת ההערות";
    console.error("[admin/notes] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
