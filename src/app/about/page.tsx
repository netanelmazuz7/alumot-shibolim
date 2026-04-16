import Link from "next/link";
import {
  Heart,
  Target,
  Eye,
  Users,
  Sparkles,
  Shield,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WheatLogo from "@/components/WheatLogo";
import StrengthInUnity from "@/components/StrengthInUnity";

export const metadata = {
  title: "מי אנחנו — אלומות שיבולים",
  description:
    "הסיפור מאחורי אלומות שיבולים — קהילת ההגנה ההדדית הראשונה בישראל לרכב.",
};

export default function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-bl from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, #d4a843 0%, transparent 50%), radial-gradient(circle at 70% 80%, #2d8a4e 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">מי אנחנו</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            מהפכה קטנה שהתחילה מאירוע אחד
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            אנחנו לא עוד חברת הייטק. אנחנו קבוצה של אנשים שנמאס להם מחברות ביטוח
            שמתנהגות כאילו הכסף שלכם שייך להן.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 border border-wheat-dark/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-primary">הסיפור שלנו</h2>
            </div>
            <div className="prose prose-lg max-w-none text-primary/70 leading-relaxed space-y-5">
              <p>
                בחורף 2023, אחד המייסדים שלנו, <strong className="text-primary">עמית</strong>,
                קיבל הודעה מחברת הביטוח שלו: הפרמיה השנתית עלתה ב-32% — מ-3,600 ₪
                ל-4,750 ₪. הסיבה? &ldquo;עדכון חישוב סיכון&rdquo;. בפועל — שום דבר
                לא השתנה בחייו. לא עשה תאונה, לא קיבל קנסות, לא עבר דירה. פשוט
                החברה החליטה להעלות.
              </p>
              <p>
                כשעמית ניסה לערער, קיבל תשובה סטנדרטית: &ldquo;נבדוק ונחזור
                אליך&rdquo;. חמישה חודשים אחר כך, עדיין לא חזרו. המשפט הזה —{" "}
                <em className="text-gold-dark">&ldquo;נבדוק ונחזור אליך&rdquo;</em>{" "}
                — היה הניצוץ שהצית את אלומות שיבולים.
              </p>
              <p>
                אספנו צוות קטן של אנשים מתחום הטכנולוגיה, ביטוח ומשפט — כולם עם
                סיפורים דומים. מה אם, שאלנו את עצמנו, לא היה מתווך? מה אם אנחנו,
                הנהגים הטובים, היינו חוסכים לעצמנו את הכסף במקום לשלם לחברת
                ביטוח שתרוויח ממנו?
              </p>
              <p>
                אחרי שנתיים של מחקר, בניית מודל משפטי כשר, ופיתוח טכנולוגי —
                אלומות שיבולים נולדה. לא כחברת ביטוח. כקהילה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wheat Parable — moved from home */}
      <StrengthInUnity />

      {/* Mission & Vision */}
      <section className="py-20 bg-wheat-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary mb-3">
              הערכים שלנו
            </h2>
            <p className="text-primary/50 max-w-2xl mx-auto">
              לא סיסמאות שיווקיות — אלה העקרונות שמנחים כל החלטה שלנו.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "המשימה שלנו",
                text: "להחזיר את השליטה על הכסף לאנשים. כל שקל שגובה מוצדק, שקוף, ונשאר בקהילה.",
                color: "gold",
              },
              {
                icon: Eye,
                title: "החזון שלנו",
                text: "עד 2030, לפחות 100,000 נהגים ישראלים ישלמו פחות משליש מהפרמיה שהם משלמים היום.",
                color: "green",
              },
              {
                icon: Users,
                title: "הקהילה שלנו",
                text: "חברים שהופכים לאחים. סינון קפדני לא בשביל לדחות — בשביל ליצור קהילה שאפשר לסמוך עליה.",
                color: "primary",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-3xl p-8 shadow-lg border border-wheat-dark/10 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-${v.color}/10 flex items-center justify-center mb-4`}
                >
                  <v.icon className={`w-7 h-7 text-${v.color === "primary" ? "primary" : v.color + "-dark"}`} />
                </div>
                <h3 className="text-xl font-black text-primary mb-3">
                  {v.title}
                </h3>
                <p className="text-primary/60 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary mb-3">
              הצוות שלנו
            </h2>
            <p className="text-primary/50">
              אנשים אמיתיים, שאכפת להם, שאפשר להרים אליהם טלפון.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "עמית כהן",
                role: "מייסד ומנכ״ל",
                bio: "15 שנות ניסיון בפיננסים ו-fintech. היה מנהל מוצר בחברת ביטוח גדולה לפני שהחליט לשנות את המשחק.",
              },
              {
                name: "דנה לוי",
                role: "מייסדת־שותפה, סמנכ״לית משפטית",
                bio: "עו״ד ביטוח לשעבר עם 12 שנות ניסיון. הרגולטוריון המוביל שלנו שמוודא שהכל כשר חוקית.",
              },
              {
                name: "יובל גולדשטיין",
                role: "מייסד־שותף, CTO",
                bio: "מהנדס תוכנה לשעבר ב-Meta. אחראי על הפלטפורמה הטכנולוגית, ה-AI לזיהוי נזקים, ואבטחת המידע.",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-3xl p-8 shadow-lg text-center border border-wheat-dark/10"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <WheatLogo className="text-white" size={48} />
                </div>
                <h3 className="text-xl font-black text-primary mb-1">
                  {p.name}
                </h3>
                <p className="text-sm font-bold text-gold-dark mb-3">
                  {p.role}
                </p>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {p.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-gradient-to-l from-primary to-primary-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-3">
            במספרים
          </h2>
          <p className="text-white/50 mb-12">
            נתונים עדכניים ל-{new Date().toLocaleDateString("he-IL")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "2,400+", label: "חברי קהילה פעילים" },
              { num: "₪4.2M", label: "פיצויים ששולמו" },
              { num: "73%", label: "חיסכון ממוצע מול ביטוח" },
              { num: "4.9★", label: "דירוג חברים" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">
                  {s.num}
                </div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-wheat-light via-white to-wheat rounded-3xl p-10 md:p-14 shadow-xl border border-gold/20">
            <Shield className="w-12 h-12 text-gold-dark mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              מוכנים להצטרף לשינוי?
            </h2>
            <p className="text-primary/60 text-lg mb-8 leading-relaxed">
              בדיקת ההתאמה לוקחת כ-5 דקות, לא עולה כלום, ולא מחייבת אתכם לכלום.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-l from-gold via-gold-dark to-gold text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              בדיקת התאמה חינם
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
