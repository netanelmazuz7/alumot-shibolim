"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Copy,
  Eye,
  Users,
  Search,
  AlertCircle,
  StickyNote,
  Save,
  Loader2,
} from "lucide-react";

type CustomerStatus = "pending" | "approved" | "rejected";

type Customer = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  status: CustomerStatus;
  createdAt: number;
  approvedAt?: number;
  rejectedAt?: number;
  rejectionReason?: string;
  adminNotes?: string;
  score?: number;
  formData: Record<string, unknown>;
};

type Filter = "all" | "pending" | "approved" | "rejected";

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [approvalResult, setApprovalResult] = useState<{
    fullName: string;
    email: string;
    password: string;
    loginUrl: string;
    emailSent: boolean;
    emailError?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        setLoggedIn(Boolean(d.isAdmin));
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (loggedIn) loadCustomers();
  }, [loggedIn]);

  async function loadCustomers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/list");
      const data = await res.json();
      if (data.ok) setCustomers(data.customers);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        setLoggedIn(true);
        setPassword("");
      } else {
        setLoginError(data.error || "שגיאה בהתחברות");
      }
    } catch {
      setLoginError("שגיאת רשת");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setCustomers([]);
  }

  async function handleApprove(customer: Customer) {
    if (!confirm(`לאשר את ${customer.fullName}?\nתישלח אליו סיסמה במייל.`))
      return;
    const res = await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: customer.id }),
    });
    const data = await res.json();
    if (data.ok) {
      setApprovalResult({
        fullName: customer.fullName,
        email: customer.email,
        password: data.password,
        loginUrl: data.loginUrl,
        emailSent: Boolean(data.emailSent),
        emailError: data.emailError,
      });
      await loadCustomers();
    } else {
      alert(`שגיאה: ${data.error}`);
    }
  }

  async function handleReject(customer: Customer) {
    const reason = prompt(
      `סיבת הדחייה של ${customer.fullName} (אופציונלי):`,
      ""
    );
    if (reason === null) return;
    const res = await fetch("/api/admin/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: customer.id, reason }),
    });
    const data = await res.json();
    if (data.ok) {
      await loadCustomers();
    } else {
      alert(`שגיאה: ${data.error}`);
    }
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-primary/50">טוען...</div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-9 h-9 text-gold" />
            </div>
            <h1 className="text-2xl font-black text-primary mb-2">
              כניסת מנהל
            </h1>
            <p className="text-primary/60 text-sm">
              האזור מוגן. נדרשת סיסמת ניהול.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-1.5">
                סיסמת מנהל
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-11 pl-4 py-3 bg-wheat-light border-2 border-wheat-dark/30 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                  autoFocus
                />
              </div>
            </div>
            {loginError && (
              <div className="flex items-start gap-2 bg-danger/10 border border-danger/30 rounded-xl p-3">
                <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <p className="text-danger text-sm">{loginError}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full bg-gold hover:bg-gold-dark disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {submitting ? "מתחבר..." : "כניסה"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtered = customers.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || "").includes(q)
      );
    }
    return true;
  });

  const counts = {
    pending: customers.filter((c) => c.status === "pending").length,
    approved: customers.filter((c) => c.status === "approved").length,
    rejected: customers.filter((c) => c.status === "rejected").length,
    all: customers.length,
  };

  return (
    <div className="min-h-screen bg-cream p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-primary">
                ניהול הרשמות
              </h1>
              <p className="text-primary/60 text-sm">
                אלומת שיבולים - אזור מנהל
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-primary/60 hover:text-danger transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">התנתק</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterChip
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
              icon={<Clock className="w-4 h-4" />}
              label="ממתינים"
              count={counts.pending}
              color="amber"
            />
            <FilterChip
              active={filter === "approved"}
              onClick={() => setFilter("approved")}
              icon={<CheckCircle className="w-4 h-4" />}
              label="אושרו"
              count={counts.approved}
              color="green"
            />
            <FilterChip
              active={filter === "rejected"}
              onClick={() => setFilter("rejected")}
              icon={<XCircle className="w-4 h-4" />}
              label="נדחו"
              count={counts.rejected}
              color="red"
            />
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<Users className="w-4 h-4" />}
              label="הכל"
              count={counts.all}
              color="primary"
            />
          </div>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, מייל או טלפון..."
              className="w-full pr-11 pl-4 py-2.5 bg-wheat-light border border-wheat-dark/20 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-primary/50">
            טוען...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-wheat-light flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-primary/60">אין רשומות להצגה</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => (
              <CustomerRow
                key={c.id}
                customer={c}
                onApprove={() => handleApprove(c)}
                onReject={() => handleReject(c)}
                onView={() => setSelected(c)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DetailModal
          customer={selected}
          onClose={() => setSelected(null)}
          onApprove={() => {
            setSelected(null);
            handleApprove(selected);
          }}
          onReject={() => {
            setSelected(null);
            handleReject(selected);
          }}
          onNotesSaved={(notes) => {
            setSelected({ ...selected, adminNotes: notes });
            setCustomers((prev) =>
              prev.map((c) =>
                c.id === selected.id ? { ...c, adminNotes: notes } : c
              )
            );
          }}
        />
      )}

      {approvalResult && (
        <ApprovalResultModal
          result={approvalResult}
          onClose={() => setApprovalResult(null)}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  icon,
  label,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
  color: "amber" | "green" | "red" | "primary";
}) {
  const colors: Record<string, { bg: string; text: string; ring: string }> = {
    amber: { bg: "bg-amber-100", text: "text-amber-700", ring: "ring-amber-400" },
    green: { bg: "bg-green/10", text: "text-green", ring: "ring-green" },
    red: { bg: "bg-danger/10", text: "text-danger", ring: "ring-danger" },
    primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary" },
  };
  const c = colors[color];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
        active
          ? `${c.bg} ${c.text} ring-2 ${c.ring}`
          : "bg-wheat-light text-primary/60 hover:bg-wheat-light/70"
      }`}
    >
      {icon}
      <span>{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs ${active ? "bg-white" : "bg-white/60"}`}>
        {count}
      </span>
    </button>
  );
}

function CustomerRow({
  customer,
  onApprove,
  onReject,
  onView,
}: {
  customer: Customer;
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}) {
  const statusStyles: Record<
    CustomerStatus,
    { bg: string; text: string; label: string; icon: React.ReactNode }
  > = {
    pending: { bg: "bg-amber-100", text: "text-amber-700", label: "ממתין", icon: <Clock className="w-3.5 h-3.5" /> },
    approved: { bg: "bg-green/10", text: "text-green", label: "אושר", icon: <CheckCircle className="w-3.5 h-3.5" /> },
    rejected: { bg: "bg-danger/10", text: "text-danger", label: "נדחה", icon: <XCircle className="w-3.5 h-3.5" /> },
  };
  const s = statusStyles[customer.status];
  const date = new Date(customer.createdAt).toLocaleDateString("he-IL");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-bold text-primary text-lg truncate">{customer.fullName}</h3>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>
              {s.icon}
              {s.label}
            </span>
            {customer.score !== undefined && (
              <span className="px-2 py-0.5 rounded-full bg-wheat-light text-primary/70 text-xs font-bold">
                {customer.score}/100
              </span>
            )}
            {customer.adminNotes && customer.adminNotes.trim() !== "" && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold"
                title={customer.adminNotes}
              >
                <StickyNote className="w-3 h-3" />
                הערה
              </span>
            )}
          </div>
          <div className="text-sm text-primary/60 space-y-0.5">
            <div className="truncate" dir="ltr" style={{ textAlign: "right" }}>{customer.email}</div>
            <div>{customer.phone || "ללא טלפון"} · {date}</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onView}
            className="flex items-center gap-1 px-3 py-2 bg-wheat-light hover:bg-wheat-light/70 text-primary rounded-xl text-sm font-bold"
          >
            <Eye className="w-4 h-4" />
            פרטים
          </button>
          {customer.status === "pending" && (
            <>
              <button
                onClick={onApprove}
                className="flex items-center gap-1 px-3 py-2 bg-green hover:bg-green/90 text-white rounded-xl text-sm font-bold"
              >
                <CheckCircle className="w-4 h-4" />
                אשר
              </button>
              <button
                onClick={onReject}
                className="flex items-center gap-1 px-3 py-2 bg-danger hover:bg-danger/90 text-white rounded-xl text-sm font-bold"
              >
                <XCircle className="w-4 h-4" />
                דחה
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const DETAIL_LABELS: Record<string, string> = {
  fullName: "שם מלא",
  idNumber: "תעודת זהות",
  birthDate: "תאריך לידה",
  gender: "מגדר",
  city: "עיר",
  street: "רחוב",
  phone: "טלפון",
  email: 'דוא"ל',
  maritalStatus: "מצב משפחתי",
  incomeRange: "הכנסה",
  hasCriminalRecord: "רישום פלילי",
  licensePlate: "מספר רכב",
  manufacturer: "יצרן",
  model: "דגם",
  year: "שנת ייצור",
  marketValue: "שווי שוק",
  mileage: "קילומטראז'",
  usage: "שימוש",
  drivingYears: "שנות ניסיון",
  currentInsurer: "מבטח נוכחי",
  claimsCount: "תביעות",
  trafficViolations: "עבירות תנועה",
};

function DetailModal({
  customer,
  onClose,
  onApprove,
  onReject,
  onNotesSaved,
}: {
  customer: Customer;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onNotesSaved: (notes: string) => void;
}) {
  const entries = Object.entries(customer.formData).filter(
    ([k, v]) => DETAIL_LABELS[k] && v !== "" && v !== null && v !== undefined
  );
  const [notes, setNotes] = useState(customer.adminNotes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesStatus, setNotesStatus] = useState<"idle" | "saved" | "error">(
    "idle"
  );
  const notesChanged = (customer.adminNotes ?? "") !== notes;

  async function saveNotes() {
    setSavingNotes(true);
    setNotesStatus("idle");
    try {
      const res = await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: customer.id, notes }),
      });
      const data = await res.json();
      if (data.ok) {
        setNotesStatus("saved");
        onNotesSaved(notes);
        setTimeout(() => setNotesStatus("idle"), 2000);
      } else {
        setNotesStatus("error");
      }
    } catch {
      setNotesStatus("error");
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-wheat-dark/20 p-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-primary">{customer.fullName}</h2>
            <p className="text-sm text-primary/60" dir="ltr" style={{ textAlign: "right" }}>
              {customer.email}
            </p>
          </div>
          <button onClick={onClose} className="text-primary/40 hover:text-primary text-3xl leading-none">
            ×
          </button>
        </div>

        <div className="p-5 space-y-4">
          {customer.score !== undefined && (
            <div className="bg-wheat-light rounded-xl p-3 text-center">
              <span className="text-primary/60 text-sm">ניקוד: </span>
              <span className="font-black text-primary text-xl">{customer.score}/100</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {entries.map(([k, v]) => (
              <div key={k} className="bg-wheat-light/50 rounded-lg p-3">
                <div className="text-xs text-primary/60 mb-1">{DETAIL_LABELS[k]}</div>
                <div className="text-primary font-bold text-sm break-words">
                  {typeof v === "boolean" ? (v ? "כן" : "לא") : String(v)}
                </div>
              </div>
            ))}
          </div>

          {customer.status === "rejected" && customer.rejectionReason && (
            <div className="bg-danger/10 border border-danger/30 rounded-xl p-3">
              <div className="text-xs text-danger mb-1">סיבת דחייה:</div>
              <div className="text-primary text-sm">{customer.rejectionReason}</div>
            </div>
          )}

          {/* הערות פנימיות למנהל - לא מוצגות ללקוח */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-700" />
                <span className="font-bold text-amber-900 text-sm">
                  הערות פנימיות
                </span>
                <span className="text-xs text-amber-700/70">
                  (מוצג רק לך)
                </span>
              </div>
              {notesStatus === "saved" && (
                <span className="text-xs text-green font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  נשמר
                </span>
              )}
              {notesStatus === "error" && (
                <span className="text-xs text-danger font-bold">שגיאה</span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="הוסף הערה פנימית על הלקוח... (למשל: 'חבר של X', 'לבדוק שוב ב-1/5', 'התקשר אליי אחר כך')"
              rows={3}
              className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 resize-y"
            />
            <button
              onClick={saveNotes}
              disabled={!notesChanged || savingNotes}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {savingNotes ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {savingNotes ? "שומר..." : "שמור הערה"}
            </button>
          </div>

          {customer.status === "pending" && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={onApprove}
                className="flex-1 flex items-center justify-center gap-2 bg-green hover:bg-green/90 text-white font-bold py-3 rounded-xl"
              >
                <CheckCircle className="w-5 h-5" />
                אשר הרשמה
              </button>
              <button
                onClick={onReject}
                className="flex-1 flex items-center justify-center gap-2 bg-danger hover:bg-danger/90 text-white font-bold py-3 rounded-xl"
              >
                <XCircle className="w-5 h-5" />
                דחה
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApprovalResultModal({
  result,
  onClose,
}: {
  result: {
    fullName: string;
    email: string;
    password: string;
    loginUrl: string;
    emailSent: boolean;
    emailError?: string;
  };
  onClose: () => void;
}) {
  const [copied, setCopied] = useState("");

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green" />
          </div>
          <h2 className="text-xl font-black text-primary text-center mb-2">
            {result.fullName} אושר/ה בהצלחה!
          </h2>

          {result.emailSent ? (
            <p className="text-center text-primary/70 text-sm mb-5">
              מייל עם פרטי ההתחברות נשלח ל-{result.email}
            </p>
          ) : (
            <div className="bg-amber-100 border border-amber-300 rounded-xl p-3 mb-4 text-sm text-amber-900">
              <b>⚠️ המייל לא נשלח</b> — העתק את הפרטים למטה ושלח ידנית.
              {result.emailError && (
                <div className="text-xs mt-1 opacity-70">סיבה: {result.emailError}</div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <CopyField label='דוא"ל' value={result.email} copied={copied === "email"} onCopy={() => copy(result.email, "email")} />
            <CopyField label="סיסמה זמנית" value={result.password} mono copied={copied === "password"} onCopy={() => copy(result.password, "password")} />
            <CopyField label="קישור להתחברות" value={result.loginUrl} copied={copied === "url"} onCopy={() => copy(result.loginUrl, "url")} />
          </div>

          <button onClick={onClose} className="w-full mt-5 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl">
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}

function CopyField({
  label,
  value,
  mono,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="text-xs text-primary/60 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div
          className={`flex-1 bg-wheat-light border border-wheat-dark/30 rounded-lg px-3 py-2 text-primary font-bold break-all ${
            mono ? "font-mono text-lg tracking-wider" : "text-sm"
          }`}
          dir="ltr"
          style={{ textAlign: "right" }}
        >
          {value}
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 px-3 py-2 bg-gold hover:bg-gold-dark text-white rounded-lg text-sm font-bold whitespace-nowrap"
        >
          <Copy className="w-4 h-4" />
          {copied ? "הועתק!" : "העתק"}
        </button>
      </div>
    </div>
  );
}
