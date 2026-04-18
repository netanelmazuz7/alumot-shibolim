import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Users,
  Shield,
  Banknote,
  TrendingDown,
  Eye,
  Heart,
  BarChart3,
  CheckCircle,
  ArrowLeft,
  Activity,
  Calendar,
} from "lucide-react";

// This would be live data from Supabase in production
const communityStats = {
  totalMembers: 2418,
  totalSaved: 4200000,
  totalClaims: 127,
  avgResponseTime: "48 שעות",
  avgMonthlyCost: 67,
  claimsApprovalRate: 94,
  monthlyEvents: [
    { month: "ינואר", claims: 8, amount: 28000 },
    { month: "פברואר", claims: 11, amount: 42000 },
    { month: "מרץ", claims: 9, amount: 31000 },
    { month: "אפריל", claims: 4, amount: 15800 },
  ],
  recentClaims: [
    { id: "#127", date: "08/04/2026", amount: 4200, type: "נזק שמשה", status: "שולם" },
    { id: "#126", date: "05/04/2026", amount: 8500, type: "תאונת חניון", status: "שולם" },
    { id: "#125", date: "01/04/2026", amount: 3100, type: "שריטת דלת", status: "שולם" },
    { id: "#124", date: "28/03/2026", amount: 12000, type: "נזק תאונה", status: "שולם" },
    { id: "#123", date: "22/03/2026", amount: 5400, type: "גניבת מראות", status: "שולם" },
  ],
};

export default function CommunityPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-bl from-cream via-wheat-light to-wheat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-dark font-bold text-sm tracking-wider">
            שקיפות מלאה
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-primary mt-2 mb-4">
            הקהילה שלנו - מספרים בזמן אמת
          </h1>
          <p className="text-xl text-primary/50 max-w-2xl mx-auto">
            אצלנו אין מה להסתיר. כל שקל מתועד, כל אירוע שקוף, כל חבר רואה
            בדיוק מה קורה.
          </p>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <LiveStat
              icon={Users}
              value={communityStats.totalMembers.toLocaleString()}
              label="חברי קהילה פעילים"
            />
            <LiveStat
              icon={TrendingDown}
              value={`₪${(communityStats.totalSaved / 1000000).toFixed(1)}M`}
              label="נחסך לחברים"
            />
            <LiveStat
              icon={Shield}
              value={communityStats.totalClaims.toString()}
              label="אירועים טופלו"
            />
            <LiveStat
              icon={CheckCircle}
              value={`${communityStats.claimsApprovalRate}%`}
              label="אחוז אישור אירועים"
            />
          </div>
        </div>
      </section>

      {/* Monthly Events */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-primary">
              סיכום חודשי - אירועים ותשלומים
            </h2>
            <p className="text-primary/40 mt-2">כל המספרים לעיון הקהילה</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {communityStats.monthlyEvents.map((m) => (
              <div
                key={m.month}
                className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 p-6 text-center"
              >
                <p className="text-sm text-primary/30 mb-1 flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {m.month} 2026
                </p>
                <p className="text-3xl font-black text-primary mb-1">{m.claims}</p>
                <p className="text-xs text-primary/40">אירועים</p>
                <div className="mt-3 pt-3 border-t border-wheat-dark/10">
                  <p className="text-lg font-bold text-gold-dark">
                    ₪{m.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-primary/30">סה&quot;כ פיצויים</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-bold text-primary">
                    ₪{Math.round(m.amount / communityStats.totalMembers)} לחבר
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent claims */}
          <div className="bg-white rounded-2xl shadow-md border border-wheat-dark/10 overflow-hidden">
            <div className="px-6 py-4 bg-wheat-light border-b border-wheat-dark/10">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Activity className="w-5 h-5 text-gold-dark" />
                אירועים אחרונים - שקיפות מלאה
              </h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-wheat-light/50">
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    מספר
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    תאריך
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    סוג
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    סכום
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    עלות לחבר
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-primary/50">
                    סטטוס
                  </th>
                </tr>
              </thead>
              <tbody>
                {communityStats.recentClaims.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-wheat-dark/10"
                  >
                    <td className="px-6 py-4 font-bold text-primary text-sm">{c.id}</td>
                    <td className="px-6 py-4 text-primary/50 text-sm">{c.date}</td>
                    <td className="px-6 py-4 text-primary/60 text-sm">{c.type}</td>
                    <td className="px-6 py-4 font-bold text-primary text-sm">
                      ₪{c.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gold-dark font-medium">
                      ₪{(c.amount / communityStats.totalMembers).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green/10 text-green text-xs font-bold px-3 py-1 rounded-full">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How we're different */}
      <section className="py-24 bg-wheat-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-primary">למה אנחנו שונים</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-wheat-dark/10 text-center">
              <Eye className="w-12 h-12 text-gold-dark mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">שקיפות 100%</h3>
              <p className="text-primary/50 leading-relaxed">
                כל שקל שנכנס וכל שקל שיצא - גלוי לכל חבר בקהילה. אין הפתעות,
                אין עלויות נסתרות.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-md border border-wheat-dark/10 text-center">
              <Banknote className="w-12 h-12 text-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">אין קופה מרכזית</h3>
              <p className="text-primary/50 leading-relaxed">
                כסף לא יושב בצד. כשקורה אירוע, כל חבר משלם את חלקו היחסי
                ישירות - ללא מתווכים.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-md border border-wheat-dark/10 text-center">
              <Heart className="w-12 h-12 text-danger mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">קהילה אמיתית</h3>
              <p className="text-primary/50 leading-relaxed">
                כולם מרוויחים מקהילה איכותית. הסינון הקפדני מבטיח שנהגים
                אחראיים מגנים אחד על השני.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-bl from-gold/20 via-wheat to-cream text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-primary mb-4">
            רוצים להיות חלק מהקהילה?
          </h2>
          <p className="text-primary/50 mb-8">
            הצטרפו לאלפי נהגים שכבר חוסכים אלפי שקלים בשנה
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-l from-gold to-gold-dark text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            הגישו בקשת הצטרפות
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

function LiveStat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <Icon className="w-8 h-8 text-gold mx-auto mb-2" />
      <p className="text-3xl md:text-4xl font-black text-white">{value}</p>
      <p className="text-white/40 text-sm mt-1">{label}</p>
    </div>
  );
}
