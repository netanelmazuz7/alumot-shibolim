"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  User,
  Car,
  CreditCard,
  FileText,
  Bell,
  LogOut,
  Plus,
  Calendar,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  Eye,
  Banknote,
  Users,
} from "lucide-react";
import WheatLogo from "@/components/WheatLogo";

// Mock data
const memberData = {
  name: "ישראל ישראלי",
  memberSince: "מרץ 2026",
  score: 87,
  vehicle: {
    plate: "12-345-67",
    make: "טויוטה קורולה",
    year: 2022,
    value: 120000,
  },
  monthlyFee: 30,
  avgParticipation: 37,
  monthlyCap: 150,
  totalSaved: 3420,
};

const payments = [
  { date: "14/04/2026", desc: "דמי ניהול — אפריל", amount: 30, type: "fee" },
  { date: "10/04/2026", desc: "השתתפות — אירוע #127", amount: 18.5, type: "claim" },
  { date: "14/03/2026", desc: "דמי ניהול — מרץ", amount: 30, type: "fee" },
  { date: "22/03/2026", desc: "השתתפות — אירוע #119", amount: 42, type: "claim" },
  { date: "14/02/2026", desc: "דמי ניהול — פברואר", amount: 30, type: "fee" },
];

const claims = [
  { id: "#127", date: "08/04/2026", status: "approved", amount: 4200, member: "יוסי כ.", desc: "נזק שמשה קדמית" },
  { id: "#119", date: "18/03/2026", status: "approved", amount: 8500, member: "מיכל ל.", desc: "תאונת חניון" },
  { id: "#112", date: "02/02/2026", status: "approved", amount: 3100, member: "אבי מ.", desc: "שריטה דלת" },
];

const tabs = [
  { id: "overview", label: "סקירה", icon: Eye },
  { id: "payments", label: "תשלומים", icon: CreditCard },
  { id: "claims", label: "אירועים", icon: FileText },
  { id: "profile", label: "פרופיל", icon: User },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-cream">
      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-primary min-h-screen fixed right-0 top-0 z-40">
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-md">
                <WheatLogo className="text-white" size={28} />
              </div>
              <span className="text-white font-bold">אלומות שיבולים</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-colors ${
                  activeTab === tab.id
                    ? "bg-white/10 text-gold"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}

            <Link
              href="/claims/new"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/20 text-gold hover:bg-gold/30 transition-colors mt-4"
            >
              <Plus className="w-5 h-5" />
              <span className="font-bold">דיווח אירוע</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gold/30 flex items-center justify-center">
                <User className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{memberData.name}</p>
                <p className="text-white/30 text-xs">חבר מ{memberData.memberSince}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 right-0 left-0 bg-primary z-40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WheatLogo className="text-gold" size={26} />
            <span className="text-white font-bold text-sm">אלומות שיבולים</span>
          </div>
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-lg ${
                  activeTab === tab.id ? "bg-white/10 text-gold" : "text-white/40"
                }`}
              >
                <tab.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:mr-64 pt-16 md:pt-0">
          <div className="p-6 md:p-10">
            {/* Overview */}
            {activeTab === "overview" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-2">
                  שלום, {memberData.name}!
                </h1>
                <p className="text-primary/40 mb-8">
                  הנה סיכום החשבון שלכם באלומות שיבולים
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={TrendingDown}
                    label="חיסכון כולל"
                    value={`₪${memberData.totalSaved.toLocaleString()}`}
                    color="text-green"
                    bgColor="bg-green/10"
                  />
                  <StatCard
                    icon={CreditCard}
                    label="עלות חודש נוכחי"
                    value="₪48.50"
                    color="text-gold-dark"
                    bgColor="bg-gold/10"
                  />
                  <StatCard
                    icon={Shield}
                    label="ציון חבר"
                    value={`${memberData.score}/100`}
                    color="text-primary"
                    bgColor="bg-primary/10"
                  />
                  <StatCard
                    icon={Users}
                    label="חברי קהילה"
                    value="2,418"
                    color="text-primary-light"
                    bgColor="bg-primary/5"
                  />
                </div>

                {/* Vehicle Card */}
                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-6 h-6 text-gold-dark" />
                    <h2 className="text-xl font-bold text-primary">הרכב שלי</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-primary/30">מספר רישוי</p>
                      <p className="font-bold text-primary">{memberData.vehicle.plate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/30">רכב</p>
                      <p className="font-bold text-primary">{memberData.vehicle.make}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/30">שנה</p>
                      <p className="font-bold text-primary">{memberData.vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/30">שווי שוק</p>
                      <p className="font-bold text-primary">
                        ₪{memberData.vehicle.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                  <h2 className="text-xl font-bold text-primary mb-4">
                    פעילות אחרונה
                  </h2>
                  <div className="space-y-3">
                    {payments.slice(0, 3).map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-wheat-dark/10 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              p.type === "fee" ? "bg-primary/10" : "bg-gold/10"
                            }`}
                          >
                            {p.type === "fee" ? (
                              <CreditCard className="w-4 h-4 text-primary" />
                            ) : (
                              <Banknote className="w-4 h-4 text-gold-dark" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-primary text-sm">{p.desc}</p>
                            <p className="text-xs text-primary/30">{p.date}</p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">₪{p.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-2">תשלומים</h1>
                <p className="text-primary/40 mb-8">
                  היסטוריית התשלומים שלכם — דמי ניהול + השתתפות באירועים
                </p>

                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-primary/30">דמי ניהול חודשי</p>
                      <p className="text-2xl font-black text-primary">₪30</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/30">ממוצע השתתפות</p>
                      <p className="text-2xl font-black text-gold-dark">₪37</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary/30">תקרה חודשית</p>
                      <p className="text-2xl font-black text-green">₪150</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-wheat-light">
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">תאריך</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">תיאור</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">סכום</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p, i) => (
                        <tr key={i} className="border-b border-wheat-dark/10">
                          <td className="px-6 py-4 text-sm text-primary/50">{p.date}</td>
                          <td className="px-6 py-4 text-sm font-medium text-primary">{p.desc}</td>
                          <td className="px-6 py-4 text-sm font-bold text-primary">₪{p.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Claims Tab */}
            {activeTab === "claims" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-primary">אירועים</h1>
                    <p className="text-primary/40">אירועי קהילה והשתתפותכם</p>
                  </div>
                  <Link
                    href="/claims/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    דיווח אירוע
                  </Link>
                </div>

                <div className="space-y-4">
                  {claims.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-primary">{c.id}</span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                c.status === "approved"
                                  ? "bg-green/10 text-green"
                                  : c.status === "pending"
                                  ? "bg-gold/10 text-gold-dark"
                                  : "bg-red-50 text-danger"
                              }`}
                            >
                              {c.status === "approved" ? "אושר" : c.status === "pending" ? "בטיפול" : "נדחה"}
                            </span>
                          </div>
                          <p className="text-primary/60">{c.desc}</p>
                          <p className="text-sm text-primary/30 mt-1">
                            חבר: {c.member} | תאריך: {c.date}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-primary/30">סכום כולל</p>
                          <p className="text-xl font-bold text-primary">
                            ₪{c.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-8">פרופיל</h1>

                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-8">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-wheat-dark/10">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-gold-dark" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-primary">{memberData.name}</h2>
                      <p className="text-primary/40">חבר מ{memberData.memberSince}</p>
                    </div>
                    <div className="mr-auto bg-green/10 px-4 py-2 rounded-xl">
                      <p className="text-xs text-green/60">ציון חבר</p>
                      <p className="text-xl font-black text-green">{memberData.score}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="שם מלא" value={memberData.name} />
                    <ProfileField label="רכב" value={`${memberData.vehicle.make} ${memberData.vehicle.year}`} />
                    <ProfileField label="מספר רישוי" value={memberData.vehicle.plate} />
                    <ProfileField label="שווי רכב" value={`₪${memberData.vehicle.value.toLocaleString()}`} />
                    <ProfileField label="דמי ניהול חודשי" value="₪30" />
                    <ProfileField label="תקרה חודשית" value="₪150" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-5">
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className="text-xs text-primary/30">{label}</p>
      <p className={`text-2xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-wheat-light rounded-xl px-4 py-3">
      <p className="text-xs text-primary/30">{label}</p>
      <p className="font-bold text-primary">{value}</p>
    </div>
  );
}
