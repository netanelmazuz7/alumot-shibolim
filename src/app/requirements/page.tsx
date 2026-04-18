import Link from "next/link";
import {
  ShieldCheck,
  FileCheck,
  Car,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "דרישות הצטרפות - אלומת שיבולים",
  description:
    "תנאי הסף להצטרפות לקהילת אלומת שיבולים - כולל דרישת ביטוח חובה וצד ג׳, מסמכים נדרשים, וקריטריונים לנהג ולרכב.",
};

const mustHaves = [
  {
    icon: ShieldCheck,
    title: "ביטוח חובה תקף",
    body: "כל חבר חייב להחזיק בפוליסת ביטוח חובה תקפה בחברת ביטוח מורשית בישראל. זו חובה חוקית בסיסית - ללא ביטוח חובה אסור לנהוג בישראל כלל.",
    note: "דרישה חוקית מוחלטת",
  },
  {
    icon: ShieldCheck,
    title: "ביטוח צד שלישי תקף",
    body: "כל חבר חייב להחזיק בפוליסת ביטוח צד ג׳ תקפה בחברת ביטוח מורשית. הביטוח הזה מכסה נזקים שאתה עלול לגרום לרכבים ולרכוש אחרים, והוא קריטי להגנה על כולם.",
    note: "תנאי להצטרפות ולהישארות בקהילה",
  },
  {
    icon: UserCheck,
    title: "רישיון נהיגה תקף",
    body: "רישיון נהיגה ישראלי בתוקף, המתאים לסוג הרכב. הרישיון נבדק בעת ההצטרפות, וכל חידוש נדרש להיות עדכני לאורך תקופת החברות.",
    note: "עדכני לאורך כל תקופת החברות",
  },
  {
    icon: Car,
    title: "רכב רשום על שמך",
    body: "הרכב שמצטרף לקהילה צריך להיות רשום על שמך (או על שם בן/בת זוג עם אישור מתאים). זה מבטיח שאתה האדם האחראי לרכב.",
    note: "נבדק מול משרד הרישוי",
  },
];

const checks = [
  "אימות זהות מאובטח (תעודת זהות)",
  "בדיקת תוקף רישיון נהיגה מול משרד הרישוי",
  "אישור קיום ביטוח חובה וצד ג׳ בחברת ביטוח מורשית",
  "הצגת רישיון רכב תקף",
  "בדיקת התאמה לקריטריוני הקהילה",
];

const disqualifiers = [
  "נהיגה ללא ביטוח חובה או בזמן שתוקף הביטוח פג",
  "שלילת רישיון בתוקף או הגבלה חמורה",
  "היסטוריה של תביעות הונאה בתחום הביטוח",
  "אי-עמידה בקריטריוני הקהילה לאורך זמן",
];

export default function RequirementsPage() {
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
            <FileCheck className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">תנאי סף</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            דרישות הצטרפות לקהילה
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            קהילה אחראית מתחילה בקריטריונים ברורים. כאן מפורטים כל התנאים
            שצריך לעמוד בהם לפני שמצטרפים - ולמה.
          </p>
        </div>
      </section>

      {/* Critical insurance notice */}
      <section className="py-12 bg-amber-50 border-y-2 border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary mb-3">
                הדרישה החשובה ביותר
              </h2>
              <p className="text-primary/80 leading-relaxed text-lg mb-3">
                <span className="font-black">
                  כל חבר בקהילת אלומת שיבולים מחויב להחזיק בביטוח חובה ובביטוח
                  צד שלישי תקפים בחברת ביטוח מורשית בישראל - לאורך כל תקופת
                  החברות.
                </span>
              </p>
              <p className="text-primary/70 leading-relaxed">
                אלומת שיבולים אינה חברת ביטוח, אינה מוכרת פוליסות ביטוח, ואינה
                מחליפה את הביטוחים האלה. הקהילה היא שכבה משלימה לעזרה הדדית,
                שפועלת לצד ביטוח החובה וצד ג׳ שכל נהג חייב להחזיק לפי חוק.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Must-haves */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              4 תנאי הסף
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto">
              לפני ההצטרפות אנחנו מוודאים שכל חבר עומד בכל התנאים האלה - ללא
              יוצא מן הכלל.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mustHaves.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gold-dark tracking-wider mb-1">
                        תנאי {i + 1}
                      </div>
                      <h3 className="text-xl font-black text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-primary/70 leading-relaxed mb-4">
                    {item.body}
                  </p>
                  <div className="bg-cream rounded-lg px-3 py-2 text-sm text-primary/70 font-medium flex items-center gap-2">
                    <Info className="w-4 h-4 text-gold-dark" />
                    {item.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we check */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span className="text-sm font-bold text-green-700">
                  תהליך הבדיקה
                </span>
              </div>
              <h2 className="text-4xl font-black text-primary mb-4">
                מה אנחנו בודקים
              </h2>
              <p className="text-primary/70 leading-relaxed">
                תהליך הבדיקה שקוף, מהיר, ודיגיטלי. לא נזיל אותך לבירוקרטיה -
                הרוב נעשה אוטומטית, בהסכמתך המפורשת.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-6 border-2 border-wheat-dark/20">
              <ul className="space-y-3">
                {checks.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-primary/80">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When we don't accept */}
      <section className="py-20 bg-gradient-to-b from-wheat-light to-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-3">
              מתי לא ניתן להתקבל
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              אנחנו מאמינים בשקיפות גם כאן. הנה המצבים שבהם לא נוכל לצרף אותך
              לקהילה - לא כי אתה לא בסדר, אלא כי זה לא מתאים למודל שלנו.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10">
            <ul className="space-y-4">
              {disqualifiers.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b border-wheat-dark/10"
                >
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-primary/80">{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-cream rounded-xl border border-wheat-dark/20 text-sm text-primary/70 leading-relaxed">
              <span className="font-bold">לידיעתך:</span> במקרה של אי-התאמה
              נשלח לך הודעה מנומקת. אפשר לפנות לצוות לבירור ולערעור.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            עומד בתנאים? ברוך הבא
          </h2>
          <p className="text-lg text-white/80 mb-6">
            בדיקת ההתאמה חינם, לוקחת 3 דקות, ותקבל תשובה מיידית.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-3 bg-white text-primary font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            בדיקת התאמה
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
