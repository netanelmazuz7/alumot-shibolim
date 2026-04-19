/**
 * מאגר לקוחות מבוסס Supabase.
 * גישה דרך service_role key מהשרת בלבד - ראה src/lib/supabase.ts
 */

import { supabase } from "./supabase";

export type CustomerStatus = "pending" | "approved" | "rejected";

export type Customer = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  status: CustomerStatus;
  passwordHash?: string;
  passwordSalt?: string;
  createdAt: number; // ms since epoch
  approvedAt?: number;
  rejectedAt?: number;
  rejectionReason?: string;
  adminNotes?: string;
  score?: number;
  formData: Record<string, unknown>;
};

// מבנה שורה במסד - שמות snake_case כמו ב-SQL
type DbRow = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  status: CustomerStatus;
  password_hash: string | null;
  password_salt: string | null;
  score: number | null;
  form_data: Record<string, unknown>;
  rejection_reason: string | null;
  admin_notes: string | null;
  created_at: string;
  approved_at: string | null;
  rejected_at: string | null;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function rowToCustomer(r: DbRow): Customer {
  return {
    id: r.id,
    email: r.email,
    fullName: r.full_name,
    phone: r.phone ?? undefined,
    status: r.status,
    passwordHash: r.password_hash ?? undefined,
    passwordSalt: r.password_salt ?? undefined,
    score: r.score ?? undefined,
    formData: r.form_data ?? {},
    rejectionReason: r.rejection_reason ?? undefined,
    adminNotes: r.admin_notes ?? undefined,
    createdAt: new Date(r.created_at).getTime(),
    approvedAt: r.approved_at ? new Date(r.approved_at).getTime() : undefined,
    rejectedAt: r.rejected_at ? new Date(r.rejected_at).getTime() : undefined,
  };
}

// המרה מעדכון Customer חלקי לעדכון DB חלקי
function updatesToDb(u: Partial<Customer>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (u.email !== undefined) out.email = u.email;
  if (u.fullName !== undefined) out.full_name = u.fullName;
  if (u.phone !== undefined) out.phone = u.phone;
  if (u.status !== undefined) out.status = u.status;
  if (u.passwordHash !== undefined) out.password_hash = u.passwordHash;
  if (u.passwordSalt !== undefined) out.password_salt = u.passwordSalt;
  if (u.score !== undefined) out.score = u.score;
  if (u.formData !== undefined) out.form_data = u.formData;
  if (u.rejectionReason !== undefined) out.rejection_reason = u.rejectionReason;
  if (u.adminNotes !== undefined) out.admin_notes = u.adminNotes;
  if (u.approvedAt !== undefined)
    out.approved_at = new Date(u.approvedAt).toISOString();
  if (u.rejectedAt !== undefined)
    out.rejected_at = new Date(u.rejectedAt).toISOString();
  return out;
}

export async function listCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase()
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[customerStore.list] error:", error);
    throw new Error(error.message);
  }
  return (data as DbRow[]).map(rowToCustomer);
}

export async function getCustomerById(
  id: string
): Promise<Customer | undefined> {
  const { data, error } = await supabase()
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("[customerStore.getById] error:", error);
    throw new Error(error.message);
  }
  return data ? rowToCustomer(data as DbRow) : undefined;
}

export async function getCustomerByEmail(
  email: string
): Promise<Customer | undefined> {
  const { data, error } = await supabase()
    .from("customers")
    .select("*")
    .eq("email", normalizeEmail(email))
    .maybeSingle();
  if (error) {
    console.error("[customerStore.getByEmail] error:", error);
    throw new Error(error.message);
  }
  return data ? rowToCustomer(data as DbRow) : undefined;
}

export async function createOrUpdateCustomer(input: {
  email: string;
  fullName: string;
  phone?: string;
  formData: Record<string, unknown>;
  score?: number;
}): Promise<Customer> {
  const email = normalizeEmail(input.email);
  const existing = await getCustomerByEmail(email);

  // אם המשתמש כבר קיים ועוד ב-pending - נעדכן רק את הנתונים (הגשה חוזרת).
  // אם כבר אושר/נדחה - לא משנים.
  if (existing) {
    if (existing.status === "pending") {
      const { data, error } = await supabase()
        .from("customers")
        .update({
          full_name: input.fullName,
          phone: input.phone ?? null,
          form_data: input.formData,
          score: input.score ?? null,
        })
        .eq("id", existing.id)
        .select("*")
        .single();
      if (error) {
        console.error("[customerStore.update existing] error:", error);
        throw new Error(error.message);
      }
      return rowToCustomer(data as DbRow);
    }
    return existing;
  }

  const { data, error } = await supabase()
    .from("customers")
    .insert({
      email,
      full_name: input.fullName,
      phone: input.phone ?? null,
      status: "pending",
      form_data: input.formData,
      score: input.score ?? null,
    })
    .select("*")
    .single();
  if (error) {
    console.error("[customerStore.create] error:", error);
    throw new Error(error.message);
  }
  return rowToCustomer(data as DbRow);
}

export async function updateCustomer(
  id: string,
  updates: Partial<Customer>
): Promise<Customer | null> {
  const dbUpdates = updatesToDb(updates);
  if (Object.keys(dbUpdates).length === 0) {
    return (await getCustomerById(id)) ?? null;
  }
  const { data, error } = await supabase()
    .from("customers")
    .update(dbUpdates)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) {
    console.error("[customerStore.update] error:", error);
    throw new Error(error.message);
  }
  return data ? rowToCustomer(data as DbRow) : null;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const { error, count } = await supabase()
    .from("customers")
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) {
    console.error("[customerStore.delete] error:", error);
    throw new Error(error.message);
  }
  return (count ?? 0) > 0;
}
