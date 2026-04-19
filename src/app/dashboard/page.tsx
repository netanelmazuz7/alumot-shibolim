"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  Car,
  Calendar,
  LogOut,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  FileText,
  Sparkles,
  XCircle,
  Users,
  Bell,
} from "lucide-react";
import WheatLogo from "@/components/WheatLogo";

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
  score?: number;
  formData: Record<string, unknown>;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.customer) {
          router.replace("/login");
          return;
        }
        setCustomer(d.customer);
        setLoading(false);
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  if (loading || !customer) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-primary/50">טוען...</div>
      </div>
    );
  }

  // הרשמה שעדיין ממתינה
  if (customer.status === "pending") {
    return (
      <PendingView customer={customer} onLogout={handleLogout} />
    );
  }

  if (customer.status === "rejected") {
    return (
      <RejectedView customer={customer} onLogout={handleLogout} />
    );
  }

  return <ApprovedView customer={customer} onLogout={handleLogout} />;
}

// ===== מסך לקוח ממתין (לא אמור להגיע לכאן בדר"כ - login חוסם) =====
function PendingView({
  customer,
  onLogout,
}: {
  customer: Customer;
  onLogout: () => void;
}) {
  return (
    <CenterCard onLogout={onLogout}>
      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
        <Clock className="w-11 h-11 text-amber-600" />
      </div>
      <h1 className="text-2xl font-black text-primary mb-3">
        הבקשה שלך בבדיקה
      </h1>
      <p className="text-primary/70 mb-5 leading-relaxed">
        שלום {customer.fullName}, תודה על ההרשמה.
        <br />
        אנחנו סוקרים את הבקשה שלך ונחזור אליך במייל בקרוב.
      </p>
    </CenterCard>
  );
}

// ===== מסך לקוח שנדחה =====
function RejectedView({
  customer,
  onLogout,
}: {
  customer: Customer;
  onLogout: () => void;
}) {
  return (
    <CenterCard onLogout={onLogout}>
      <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-5">
        <XCircle className="w-11 h-11 text-danger" />
      </div>
      <h1 className="text-2xl font-black text-primary mb-3">
        הבקשה לא אושרה
      </h1>
      <p className="text-primary/70 mb-3 leading-relaxed">
        שלום {customer.fullName},
        <br />
        לצערנו ההרשמה שלך לא עמדה בקריטריונים הנדרשים.
      </p>
      {customer.rejectionReason && (
        <div className="bg-wheat-light rounded-xl p-4 mb-4 text-right">
          <div className="text-xs text-primary/60 mb-1">הערה:</div>
          <div className="text-primary text-sm">{customer.rejectionReason}</div>
        </div>
      )}
      <p className="text-primary/60 text-sm">
        לפרטים נוספים ניתן לפנות אלינו דרך{" "}
        <Link href="/contact" className="font-bold text-gold hover:underline">
          דף יצירת הקשר
        </Link>
        .
      </p>
    </CenterCard>
  );
}

function CenterCard({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">
          {children}
          <button
            onClick={onLogout}
            className="mt-6 text-primary/50 hover:text-primary text-sm font-bold flex items-center gap-1 mx-auto"
          >
            <LogOut className="w-4 h-4" />
            התנתק
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== מסך לקוח מאושר (ה"אזור האישי" האמיתי) =====
function ApprovedView({
  customer,
  onLogout,
}: {
  customer: Customer;
  onLogout: () => void;
}) {
  const f = customer.formData;
  const memberSince = customer.approvedAt
    ? new Date(customer.approvedAt).toLocaleDateString("he-IL")
    : "—";

  const [communityStats, setCommunityStats] = useState<{
    approvedCount: number;
    activeClaims: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/community/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setCommunityStats({
            approvedCount: d.approvedCount ?? 0,
            activeClaims: d.activeClaims ?? 0,
          });
        }
      })
      .catch(() => {
        // השתקה - לא קריטי
      });
  }, []);

  const car = {
    plate: (f.licensePlate as string) || "—",
    manufacturer: (f.manufacturer as string) || "—",
    model: (f.model as string) || "—",
    year: (f.year as string) || "—",
    marketValue: (f.marketValue as string) || "—",
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="bg-white border-b border-wheat-dark/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <WheatLogo className="w-9 h-9 text-gold" />
            <span className="font-black text-primary hidden sm:inline">
              אלומת שיבולים
            </span>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-primary/60 hover:text-danger transition-colors text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">התנתק</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Welcome */}
        <div className="bg-gradient-to-br from-gold to-gold-dark rounded-3xl p-6 md:p-8 mb-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold text-sm opacity-95">ברוך הבא</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              שלום, {customer.fullName.split(" ")[0]}
            </h1>
            <p className="opacity-90 text-sm md:text-base">
              אתה חלק מקהילת אלומת שיבולים מאז {memberSince}
            </p>
          </div>
          <div className="absolute -left-4 -bottom-6 opacity-10">
            <WheatLogo className="w-40 h-40" />
          </div>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatusCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="סטטוס חברות"
            value="פעיל"
            color="green"
          />
          <StatusCard
            icon={<Shield className="w-6 h-6" />}
            label="ניקוד מועמד"
            value={customer.score !== undefined ? `${customer.score}/100` : "—"}
            color="gold"
          />
          <StatusCard
            icon={<Calendar className="w-6 h-6" />}
            label="חבר מאז"
            value={memberSince}
            color="blue"
          />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Personal */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-black text-primary text-lg">פרטים אישיים</h2>
            </div>
            <div className="space-y-3">
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="שם מלא"
                value={customer.fullName}
              />
              <InfoRow
                icon={<Mail className="w-4 h-4" />}
                label='דוא"ל'
                value={customer.email}
                ltr
              />
              {customer.phone && (
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label="טלפון"
                  value={customer.phone}
                  ltr
                />
              )}
              {Boolean(f.city) && (
                <InfoRow
                  icon={<MapPin className="w-4 h-4" />}
                  label="עיר"
                  value={String(f.city)}
                />
              )}
              {Boolean(f.street) && (
                <InfoRow
                  icon={<MapPin className="w-4 h-4" />}
                  label="כתובת"
                  value={String(f.street)}
                />
              )}
            </div>
          </div>

          {/* Car */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-gold" />
              </div>
              <h2 className="font-black text-primary text-lg">פרטי הרכב</h2>
            </div>
            <div className="space-y-3">
              <InfoRow
                icon={<FileText className="w-4 h-4" />}
                label="מספר רישוי"
                value={car.plate}
                ltr
              />
              <InfoRow
                icon={<Car className="w-4 h-4" />}
                label="יצרן ודגם"
                value={`${car.manufacturer} ${car.model}`}
              />
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="שנת ייצור"
                value={car.year}
              />
              <InfoRow
                icon={<Sparkles className="w-4 h-4" />}
                label="שווי שוק"
                value={car.marketValue !== "—" ? `₪${car.marketValue}` : "—"}
              />
            </div>
          </div>
        </div>

        {/* Community status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-lg bg-green/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-green" />
            </div>
            <h2 className="font-black text-primary text-lg">מצב הקהילה</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-wheat-light/40 rounded-xl p-4 text-center">
              <div className="text-primary/60 text-xs mb-1">חברים מאושרים</div>
              <div className="font-black text-primary text-3xl mb-1">
                {communityStats ? communityStats.approvedCount : "—"}
              </div>
              <div className="text-primary/50 text-xs">ברוכים הבאים לקהילה 🌾</div>
            </div>

            <div className="bg-green/5 rounded-xl p-4 text-center">
              <div className="text-primary/60 text-xs mb-1">תביעות פעילות</div>
              <div className="font-black text-green text-3xl mb-1">
                {communityStats ? communityStats.activeClaims : "—"}
              </div>
              <div className="text-primary/50 text-xs">
                {communityStats && communityStats.activeClaims === 0
                  ? "אין תביעות פעילות כרגע"
                  : "תביעות בטיפול"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4">
            <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-primary/80 text-sm leading-relaxed">
              <strong className="font-black">התראות אוטומטיות:</strong>{" "}
              תקבל מייל על כל אירוע קהילתי - תביעה חדשה, חבר חדש שמצטרף, או
              עדכון חשוב. אין צורך להיכנס לכאן כל יום.
            </div>
          </div>
        </div>

        {/* Coming soon banner */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-wheat-light flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-black text-primary text-lg mb-2">
            פיצ׳רים נוספים בדרך
          </h3>
          <p className="text-primary/60 text-sm max-w-lg mx-auto leading-relaxed">
            בקרוב כאן: ניהול תשלומים, מעקב אירועי קהילה, היסטוריית תביעות,
            והגדרות חשבון מתקדמות.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "green" | "gold" | "blue";
}) {
  const styles: Record<string, { bg: string; text: string }> = {
    green: { bg: "bg-green/10", text: "text-green" },
    gold: { bg: "bg-gold/10", text: "text-gold" },
    blue: { bg: "bg-primary/10", text: "text-primary" },
  };
  const s = styles[color];
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.text} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-primary/60 text-sm mb-1">{label}</div>
      <div className="font-black text-primary text-xl">{value}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  ltr,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-wheat-light flex items-center justify-center text-primary/50 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-primary/50 mb-0.5">{label}</div>
        <div
          className="text-primary font-bold text-sm break-words"
          dir={ltr ? "ltr" : undefined}
          style={ltr ? { textAlign: "right" } : undefined}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
