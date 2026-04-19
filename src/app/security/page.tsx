import Link from "next/link";
import {
  Shield,
  Lock,
  Server,
  KeyRound,
  Eye,
  UserCheck,
  FileCheck,
  Database,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "אבטחה ופרטיות - אלומת שיבולים",
  description:
    "איך אנחנו מגנים על המידע שלך. תקני אבטחה, הצפנה, מדיניות פרטיות וההתחייבות שלנו לשמור על נתוני חברי הקהילה.",
};

const pillars = [
  {
    icon: Lock,
    title: "הצפנה מקצה לקצה",
    body: "כל תקשורת בין הדפדפן שלך לשרתים שלנו מוצפנת באמצעות TLS 1.3. המידע הרגיש שלך מוצפן גם במנוחה - גם אם מישהו יחדור פיזית לשרת, הוא לא יוכל לקרוא את הנתונים.",
  },
  {
    icon: KeyRound,
    title: "אימות חזק",
    body: "גישה לחשבון שלך מוגנת באימות רב-שלבי. סיסמאות מאוחסנות בצורה מוצפנת (hashing) - אפילו הצוות שלנו לא יכול לראות אותן.",
  },
  {
    icon: Database,
    title: "מינימום מידע נדרש",
    body: "אנחנו אוספים רק את המידע שחיוני לפעולת הקהילה. אין איסוף מידע רחב שלא מנוצל. כל נתון שאנחנו שומרים - יש לו מטרה ברורה.",
  },
  {
    icon: Eye,
    title: "שקיפות מה נאסף",
    body: "בכל עת אתה יכול לראות את המידע ששמור עליך, לבקש עותק מלא, או לבקש מחיקה (בכפוף לדרישות חוקיות מסוימות).",
  },
  {
    icon: Server,
    title: "תשתית מאובטחת",
    body: "השרתים שלנו מתארחים על תשתית ענן מובילה בעולם, עם תקני אבטחה מוכרים. יש לנו גיבויים אוטומטיים מוצפנים, ומערכות ניטור 24/7.",
  },
  {
    icon: UserCheck,
    title: "הרשאות מוגבלות",
    body: "גם בתוך הצוות שלנו, רק עובדים עם הצדקה ברורה יכולים לגשת למידע של משתמשים. כל גישה מתועדת ועוברת ביקורת.",
  },
];

const standards = [
  "הצפנת TLS 1.3 לכל תקשורת באתר",
  "אחסון סיסמאות עם bcrypt / argon2",
  "מדיניות גיבוי יומית מוצפנת",
  "ניטור איומים אוטומטי 24/7",
  "בדיקות חדירה תקופתיות על ידי מומחי אבטחה חיצוניים",
  "הקשחת שרתים לפי תקני תעשייה (CIS Benchmarks)",
  "הפרדה מלאה בין סביבת פיתוח לייצור",
  "תיעוד מלא של כל גישה למידע רגיש",
];

const userRights = [
  {
    title: "זכות עיון",
    body: "לראות איזה מידע אנחנו שומרים עליך בכל רגע.",
  },
  {
    title: "זכות תיקון",
    body: "לתקן מידע לא מדויק או חלקי.",
  },
  {
    title: "זכות מחיקה",
    body: "לבקש מחיקת המידע שלך, בכפוף לדרישות חוקיות.",
  },
  {
    title: "זכות הסכמה",
    body: "להסיר הסכמה לעיבוד מידע בכל עת.",
  },
];

export default function SecurityPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-bl from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, #d4a843 0%, transparent 50%), radial-gradient(circle at 70% 80%, #2d8a4e 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">
              אבטחה ופרטיות
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            המידע שלך שייך לך
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            אנחנו רואים באמון שלך ערך עליון. זו הסיבה שאנחנו משקיעים כל כך הרבה
            באבטחה, פרטיות, ושקיפות. הנה בדיוק איך אנחנו שומרים על הנתונים שלך.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-3">
                    {p.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical standards */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <FileCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">
                  תקנים טכניים
                </span>
              </div>
              <h2 className="text-4xl font-black text-primary mb-4">
                סטנדרטים ברורים
              </h2>
              <p className="text-primary/70 leading-relaxed">
                אנחנו לא מאמינים בהבטחות כלליות. הנה רשימה ספציפית של הפרקטיקות
                הטכניות שאנחנו מיישמים באופן שוטף:
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-6 border-2 border-wheat-dark/20">
              <ul className="space-y-3">
                {standards.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-primary/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* User rights */}
      <section className="py-20 bg-gradient-to-b from-wheat-light to-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              הזכויות שלך
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto">
              בהתאם לחוק הגנת הפרטיות בישראל, לכל משתמש יש זכויות ברורות לגבי
              המידע האישי שלו. אנחנו לא רק מכבדים אותן - אנחנו מקלים עליך להפעיל
              אותן.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {userRights.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-wheat-dark/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-dark font-black">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-primary mb-1">
                      {r.title}
                    </h3>
                    <p className="text-primary/70 text-sm leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report security issue */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-10 text-center shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              מצאת בעיית אבטחה?
            </h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              אם גילית פרצת אבטחה או חשש לפגיעה בפרטיות, נשמח שתדווח לנו בדחיפות.
              אנחנו מתייחסים לכל דיווח ברצינות ומטפלים בו במהירות.
            </p>
            <a
              href="mailto:security@alumat-shibolim.co.il"
              className="inline-flex items-center gap-2 bg-gold text-primary font-black px-6 py-3 rounded-xl hover:scale-105 transition-all"
            >
              security@alumat-shibolim.co.il
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            שקיפות מלאה - גם מעבר לאבטחה
          </h2>
          <p className="text-lg text-white/80 mb-6">
            קרא את מדיניות הפרטיות המלאה שלנו כדי להבין בדיוק איך אנחנו מטפלים
            במידע.
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-3 bg-white text-primary font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            למדיניות הפרטיות
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
