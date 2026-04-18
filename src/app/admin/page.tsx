"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
  TrendingUp,
  Banknote,
  UserPlus,
  Activity,
} from "lucide-react";
import WheatLogo from "@/components/WheatLogo";

const pendingApplicants = [
  { id: 1, name: "דניאל אברמוב", date: "13/04/2026", score: 82, city: "תל אביב", car: "מאזדה 3 2023" },
  { id: 2, name: "שרה גולדשטיין", date: "13/04/2026", score: 91, city: "הרצליה", car: "טויוטה RAV4 2024" },
  { id: 3, name: "עמית בן דוד", date: "12/04/2026", score: 65, city: "נתניה", car: "קיא ספורטאז' 2022" },
  { id: 4, name: "רינת כהן", date: "12/04/2026", score: 78, city: "ראשון לציון", car: "יונדאי i35 2021" },
];

const activeClaims = [
  { id: "#128", member: "ישראל ישראלי", date: "14/04/2026", amount: 0, status: "ai_review", desc: "נזק פגוש אחורי" },
  { id: "#127", member: "יוסי כהן", date: "08/04/2026", amount: 4200, status: "appraiser", desc: "נזק שמשה קדמית" },
  { id: "#126", member: "מיכל לוי", date: "05/04/2026", amount: 8500, status: "approved", desc: "תאונת חניון" },
  { id: "#125", member: "אבי מזרחי", date: "01/04/2026", amount: 3100, status: "paid", desc: "שריטת דלת" },
];

const tabs = [
  { id: "overview", label: "סקירה כללית", icon: BarChart3 },
  { id: "applicants", label: "בקשות הצטרפות", icon: UserPlus },
  { id: "claims", label: "ניהול אירועים", icon: FileText },
  { id: "financial", label: "דשבורד פיננסי", icon: Banknote },
  { id: "members", label: "ניהול חברים", icon: Users },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-cream">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-primary-dark min-h-screen fixed right-0 top-0 z-40">
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-md">
                <WheatLogo className="text-white" size={28} />
              </div>
              <div>
                <span className="text-white font-bold block text-sm">אלומת שיבולים</span>
                <span className="text-gold text-xs">פאנל ניהול</span>
              </div>
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
                <span className="font-medium text-sm">{tab.label}</span>
                {tab.id === "applicants" && (
                  <span className="mr-auto bg-gold text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    4
                  </span>
                )}
                {tab.id === "claims" && (
                  <span className="mr-auto bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 right-0 left-0 bg-primary-dark z-40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WheatLogo className="text-gold" size={26} />
            <span className="text-white font-bold text-sm">ניהול</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-lg shrink-0 ${
                  activeTab === tab.id ? "bg-white/10 text-gold" : "text-white/40"
                }`}
              >
                <tab.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <main className="flex-1 md:mr-64 pt-16 md:pt-0">
          <div className="p-6 md:p-10">
            {/* Overview */}
            {activeTab === "overview" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-8">סקירה כללית</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <AdminStatCard icon={Users} label="חברים פעילים" value="2,418" trend="+12 החודש" trendUp />
                  <AdminStatCard icon={Banknote} label="הכנסות חודשיות" value="₪72,540" trend="דמי ניהול" />
                  <AdminStatCard icon={FileText} label="אירועים פתוחים" value="2" trend="בטיפול" />
                  <AdminStatCard icon={TrendingUp} label="עמלות אירועים" value="₪3,420" trend="3-5% מאירועים" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pending applications */}
                  <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-primary flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-gold-dark" />
                        בקשות הצטרפות ממתינות
                      </h2>
                      <span className="bg-gold/10 text-gold-dark text-sm font-bold px-3 py-1 rounded-full">
                        {pendingApplicants.length}
                      </span>
                    </div>
                    {pendingApplicants.slice(0, 3).map((a) => (
                      <div key={a.id} className="flex items-center justify-between py-3 border-b border-wheat-dark/10 last:border-0">
                        <div>
                          <p className="font-medium text-primary text-sm">{a.name}</p>
                          <p className="text-xs text-primary/30">{a.city} | {a.car}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${a.score >= 70 ? "text-green" : "text-danger"}`}>
                            {a.score}
                          </span>
                          <button className="w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center hover:bg-green/20">
                            <CheckCircle className="w-4 h-4 text-green" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100">
                            <XCircle className="w-4 h-4 text-danger" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active claims */}
                  <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-primary flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gold-dark" />
                        אירועים אחרונים
                      </h2>
                    </div>
                    {activeClaims.map((c) => (
                      <div key={c.id} className="flex items-center justify-between py-3 border-b border-wheat-dark/10 last:border-0">
                        <div>
                          <p className="font-medium text-primary text-sm">
                            {c.id} - {c.desc}
                          </p>
                          <p className="text-xs text-primary/30">{c.member} | {c.date}</p>
                        </div>
                        <ClaimStatusBadge status={c.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applicants */}
            {activeTab === "applicants" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-2">בקשות הצטרפות</h1>
                <p className="text-primary/40 mb-8">אישור ודחיית מועמדים חדשים לקהילה</p>

                <div className="space-y-4">
                  {pendingApplicants.map((a) => (
                    <div key={a.id} className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-primary text-lg">{a.name}</h3>
                          <p className="text-primary/40 text-sm">{a.city} | {a.car}</p>
                          <p className="text-primary/30 text-xs mt-1">הוגש: {a.date}</p>
                        </div>
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
                            a.score >= 70 ? "bg-green/10 text-green" : "bg-red-50 text-danger"
                          }`}>
                            {a.score}
                          </div>
                          <p className="text-xs text-primary/30 mt-1">ניקוד</p>
                        </div>
                      </div>

                      {a.score < 70 && (
                        <div className="mt-4 flex items-center gap-2 bg-red-50 rounded-xl p-3">
                          <AlertTriangle className="w-4 h-4 text-danger" />
                          <span className="text-sm text-danger">ציון מתחת לסף המינימום (70)</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-wheat-dark/10">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green text-white rounded-xl font-bold hover:bg-green-dark transition-colors">
                          <CheckCircle className="w-5 h-5" />
                          אשר חבר
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-danger border-2 border-danger/20 rounded-xl font-bold hover:bg-red-50 transition-colors">
                          <XCircle className="w-5 h-5" />
                          דחה בקשה
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-wheat-light text-primary rounded-xl font-medium">
                          <Eye className="w-5 h-5" />
                          צפה
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Claims Management */}
            {activeTab === "claims" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-2">ניהול אירועים</h1>
                <p className="text-primary/40 mb-8">מעקב וניהול אירועי הקהילה</p>

                <div className="space-y-4">
                  {activeClaims.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-bold text-primary">{c.id}</span>
                            <ClaimStatusBadge status={c.status} />
                          </div>
                          <p className="text-primary/60">{c.desc}</p>
                          <p className="text-sm text-primary/30 mt-1">חבר: {c.member} | תאריך: {c.date}</p>
                        </div>
                        {c.amount > 0 && (
                          <div className="text-left">
                            <p className="text-xs text-primary/30">סכום</p>
                            <p className="text-xl font-bold text-primary">₪{c.amount.toLocaleString()}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-wheat-dark/10">
                        {c.status === "ai_review" && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold-dark rounded-lg font-medium text-sm">
                            <Eye className="w-4 h-4" />
                            צפה בניתוח AI
                          </button>
                        )}
                        {c.status === "appraiser" && (
                          <>
                            <button className="flex items-center gap-2 px-4 py-2 bg-green text-white rounded-lg font-medium text-sm">
                              <CheckCircle className="w-4 h-4" />
                              אשר אירוע
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-danger border border-danger/20 rounded-lg font-medium text-sm">
                              <XCircle className="w-4 h-4" />
                              דחה
                            </button>
                          </>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 bg-wheat-light text-primary rounded-lg font-medium text-sm mr-auto">
                          <Eye className="w-4 h-4" />
                          פרטים מלאים
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Dashboard */}
            {activeTab === "financial" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-8">דשבורד פיננסי</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                    <p className="text-xs text-primary/30 mb-1">הכנסות חודשיות - דמי ניהול</p>
                    <p className="text-3xl font-black text-primary">₪72,540</p>
                    <p className="text-xs text-green mt-1">2,418 חברים × ₪30</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                    <p className="text-xs text-primary/30 mb-1">עמלות אירועים (3-5%)</p>
                    <p className="text-3xl font-black text-gold-dark">₪3,420</p>
                    <p className="text-xs text-primary/40 mt-1">מ-4 אירועים החודש</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                    <p className="text-xs text-primary/30 mb-1">סך פיצויים החודש</p>
                    <p className="text-3xl font-black text-danger">₪15,800</p>
                    <p className="text-xs text-primary/40 mt-1">חולק בין 2,418 חברים</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6">
                  <h2 className="font-bold text-primary mb-4">סיכום חודשי - אפריל 2026</h2>
                  <div className="space-y-3">
                    {[
                      { label: "הכנסה מדמי ניהול", value: "₪72,540", color: "text-green" },
                      { label: "הכנסה מעמלות אירועים", value: "₪3,420", color: "text-green" },
                      { label: "סך פיצויים ששולמו", value: "₪15,800", color: "text-danger" },
                      { label: "ממוצע תשלום לחבר", value: "₪36.53", color: "text-primary" },
                      { label: "ממוצע כולל לחבר (ניהול+השתתפות)", value: "₪66.53", color: "text-primary" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between py-2 border-b border-wheat-dark/10 last:border-0">
                        <span className="text-primary/50">{row.label}</span>
                        <span className={`font-bold ${row.color}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Members Management */}
            {activeTab === "members" && (
              <div>
                <h1 className="text-3xl font-black text-primary mb-2">ניהול חברים</h1>
                <p className="text-primary/40 mb-8">2,418 חברים פעילים בקהילה</p>

                <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-wheat-light">
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">שם</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">רכב</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">ציון</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">סטטוס</th>
                        <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "ישראל ישראלי", car: "טויוטה קורולה 2022", score: 87, status: "active" },
                        { name: "יוסי כהן", car: "הונדה סיוויק 2023", score: 92, status: "active" },
                        { name: "מיכל לוי", car: "מאזדה 3 2021", score: 85, status: "active" },
                        { name: "אבי מזרחי", car: "יונדאי טוסון 2023", score: 79, status: "active" },
                        { name: "שרון דוד", car: "סקודה אוקטביה 2022", score: 73, status: "warning" },
                      ].map((m, i) => (
                        <tr key={i} className="border-b border-wheat-dark/10">
                          <td className="px-6 py-4 font-medium text-primary text-sm">{m.name}</td>
                          <td className="px-6 py-4 text-primary/50 text-sm">{m.car}</td>
                          <td className="px-6 py-4">
                            <span className={`font-bold ${m.score >= 80 ? "text-green" : m.score >= 70 ? "text-gold-dark" : "text-danger"}`}>
                              {m.score}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              m.status === "active" ? "bg-green/10 text-green" : "bg-gold/10 text-gold-dark"
                            }`}>
                              {m.status === "active" ? "פעיל" : "אזהרה"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-gold-dark font-medium hover:underline">
                              צפה בפרופיל
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminStatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-5 h-5 text-gold-dark" />
        {trendUp && <TrendingUp className="w-4 h-4 text-green" />}
      </div>
      <p className="text-2xl font-black text-primary">{value}</p>
      <p className="text-xs text-primary/30">{label}</p>
      <p className="text-xs text-primary/40 mt-1">{trend}</p>
    </div>
  );
}

function ClaimStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    ai_review: { label: "בדיקת AI", className: "bg-blue-50 text-blue-600" },
    appraiser: { label: "שמאי", className: "bg-gold/10 text-gold-dark" },
    approved: { label: "אושר", className: "bg-green/10 text-green" },
    paid: { label: "שולם", className: "bg-primary/10 text-primary" },
    rejected: { label: "נדחה", className: "bg-red-50 text-danger" },
  };
  const c = config[status] || config.ai_review;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.className}`}>
      {c.label}
    </span>
  );
}
