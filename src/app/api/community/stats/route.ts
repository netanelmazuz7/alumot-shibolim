import { NextResponse } from "next/server";
import { listCustomers } from "@/lib/customerStore";

/**
 * סטטיסטיקות קהילה פומביות - מוצגות בלוח הבקרה של חברים מאושרים.
 * לא נדרשת הרשאה, אך נחשפים רק מספרים מצטברים (לא פרטי לקוחות).
 */
export async function GET() {
  try {
    const all = await listCustomers();
    const approvedCount = all.filter((c) => c.status === "approved").length;
    const pendingCount = all.filter((c) => c.status === "pending").length;

    // תביעות פעילות - כרגע תמיד 0 (עד שנבנה מודול תביעות)
    const activeClaims = 0;

    return NextResponse.json({
      ok: true,
      approvedCount,
      pendingCount,
      activeClaims,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "שגיאה בטעינת סטטיסטיקות";
    console.error("[community/stats] error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
