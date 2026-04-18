import Link from "next/link";
import {
  Shield,
  Users,
  Cpu,
  FileSearch,
  Scale,
  Wallet,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Eye,
  Lock,
  ClipboardCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "איך זה עובד - אלומת שיבולים",
  description:
    "המדריך המלא למודל העזרה ההדדית של אלומת שיבולים. שלב אחר שלב - מההצטרפות, דרך תהליך הדיווח, ועד חלוקת העלויות בקהילה.",
};

const steps = [
  {
    num: "01",
    icon: FileSearch,
    title: "הצטרפות וסינון איכותי",
    sub: "רק נהגים אחראיים",
    body: "לא כל נהג יכול להצטרף לקהילה. אנחנו משתמשים בטכנולוגיה מתקדמת ובבדיקות רקע שקופות (בהסכמתך המפורשת) כדי לוודא שהקהילה בנויה מנהגים זהירים בלבד. זו הסיבה שהעלויות נשארות נמוכות - כשכולם אחראיים, יש פחות אירועים.",
    bullets: [
      "בדיקת רישיון תקף והיסטוריית נהיגה",
      "אימות זהות מאובטח",
      "התאמה בין סוג הרכב לפרופיל הנהג",
    ],
  },
  {
    num: "02",
    icon: Wallet,
    title: "דמי ניהול קבועים ונמוכים",
    sub: "אנחנו לא מרוויחים מהנזקים שלך",
    body: "דמי החברות הקבועים בקהילה משמשים לתפעול הפלטפורמה, בדיקות שמאי מוסמך, ושירות לקוחות. המודל שלנו שקוף לחלוטין: אנחנו מרוויחים מהשירות שאנחנו נותנים לך - לא מהתאונות שקורות. זה ההבדל הגדול בין קהילה לחברת ביטוח.",
    bullets: [
      "אין רווחי עתק על חשבון הנזקים שלך",
      "דמי ניהול קבועים - יודעים בדיוק על מה משלמים",
      "ללא עמלות סמויות, ללא תוספות מפתיעות",
    ],
  },
  {
    num: "03",
    icon: Scale,
    title: "מנגנון העזרה ההדדית",
    sub: "חולקים עלויות - לא משלמים פרמיה",
    body: "כשקורה אירוע לחבר בקהילה - תאונה, גניבה או נזק - העלות מתחלקת באופן שוויוני ויחסי בין כל חברי הקהילה. במקום שחברת ביטוח תשים את הכסף בכיס, הכסף מועבר ישירות לחבר שנפגע. הכל מתועד באזור האישי שלך.",
    bullets: [
      "חלוקה אוטומטית ומיידית של העלות",
      "רואים בדיוק לאן הכסף הלך",
      "כל אירוע מתועד ועובר בדיקת שמאי מוסמך",
    ],
  },
  {
    num: "04",
    icon: Cpu,
    title: "טכנולוגיית AI לטיפול מהיר",
    sub: "דקות במקום שבועות",
    body: "במקום תהליך בירוקרטי ארוך, אנחנו משתמשים במערכות AI לניתוח ראשוני של האירוע. אתה מצלם, המערכת מנתחת, השמאי המוסמך מאשר - והתשלום מגיע. כל השלבים שקופים וניתנים למעקב בזמן אמת.",
    bullets: [
      "דיווח על אירוע דרך האפליקציה",
      "בדיקה ראשונית אוטומטית",
      "אישור סופי של שמאי מוסמך בישראל",
    ],
  },
];

const safeguards = [
  {
    icon: Shield,
    title: "קרן יציבות",
    body: "מנגנון רזרבה מובנה שמבטיח שגם בחודש עם מספר אירועים חריג, התשלום של כל חבר לא יחרוג מהצפוי.",
  },
  {
    icon: Eye,
    title: "שקיפות מלאה",
    body: "כל שקל מתועד. בכל רגע נתון אתה יכול לראות לאן הלך הכסף שלך ומי עזר למי.",
  },
  {
    icon: Lock,
    title: "אבטחת מידע מחמירה",
    body: "אנחנו פועלים בהתאם לחוק הגנת הפרטיות. המידע שלך מוצפן ולא משותף עם צדדים שלישיים.",
  },
  {
    icon: ClipboardCheck,
    title: "פיקוח מקצועי",
    body: "כל אירוע נבדק על ידי שמאי רכב מוסמך ובלתי תלוי. אין לנו אינטרס בהפחתת סכומי הפיצוי.",
  },
];

export default function HowItWorksPage() {
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
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">המדריך המלא</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            איך זה עובד - צעד אחר צעד
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            אנחנו מאמינים שאתה ראוי להבין בדיוק איך הכסף שלך עובד. אין פה
            אותיות קטנות, אין סעיפים מוחבאים - רק מודל שקוף שבנוי על עזרה הדדית.
          </p>
        </div>
      </section>

      {/* Intro comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <div className="text-red-600 font-black text-sm mb-3 tracking-wider">
                המודל הישן
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                אתה משלם פרמיה. מישהו מרוויח.
              </h3>
              <ul className="space-y-2 text-primary/70">
                <li>• תשלום גבוה שמחושב לפי "סיכון" וסטטיסטיקה</li>
                <li>• חלק ניכר מהכסף הולך לשיווק, משכורות ורווחים</li>
                <li>• אין לך מושג לאן הכסף שלך הלך</li>
                <li>• ויכוחים ארוכים על כל תביעה</li>
              </ul>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="text-green-700 font-black text-sm mb-3 tracking-wider">
                המודל החדש - אלומת שיבולים
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                אתה חלק מקהילה. עוזרים זה לזה.
              </h3>
              <ul className="space-y-2 text-primary/70">
                <li>• דמי ניהול קבועים ונמוכים - יודע בדיוק על מה</li>
                <li>• הכסף נשאר בקהילה ועוזר לחברים אחרים</li>
                <li>• שקיפות מלאה - רואה לאן כל שקל הולך</li>
                <li>• תהליך מהיר ומכבד עם AI ושמאי מוסמך</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-gradient-to-b from-cream to-wheat-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              4 השלבים המלאים
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto">
              מההצטרפות ועד לטיפול בכל אירוע - הכל מתועד, הכל שקוף, הכל בשליטה
              שלך.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-xl border-2 border-wheat-dark/10 overflow-hidden"
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-0">
                    <div className="bg-gradient-to-b from-gold to-gold-dark p-8 md:p-10 flex md:flex-col items-center justify-center gap-4 md:min-w-[200px]">
                      <div className="text-white/40 font-black text-5xl md:text-7xl">
                        {step.num}
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-8 md:p-10">
                      <h3 className="text-2xl md:text-3xl font-black text-primary mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gold-dark font-bold mb-4">
                        {step.sub}
                      </p>
                      <p className="text-primary/70 leading-relaxed mb-5">
                        {step.body}
                      </p>
                      <ul className="space-y-2">
                        {step.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-primary/80"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Example calculation */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-bl from-primary to-primary-dark rounded-3xl p-10 md:p-14 shadow-2xl">
            <div className="text-center mb-8">
              <span className="inline-block bg-gold/20 text-gold font-bold px-4 py-2 rounded-full text-sm mb-4">
                דוגמה המחשתית
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                ככה זה עובד בפועל
              </h2>
              <p className="text-white/60">
                נניח שבקהילה יש אלפי חברים, ובחודש מסוים היה אירוע של נזק לרכב:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-gold text-sm font-bold mb-2">שלב 1</div>
                <div className="text-white font-bold mb-1">האירוע קרה</div>
                <p className="text-white/60 text-sm">
                  חבר בקהילה מדווח, המערכת בודקת, שמאי מאשר את הנזק
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-gold text-sm font-bold mb-2">שלב 2</div>
                <div className="text-white font-bold mb-1">חלוקה שוויונית</div>
                <p className="text-white/60 text-sm">
                  העלות מתחלקת בין כל חברי הקהילה - התשלום לכל חבר נמוך מאוד
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-gold text-sm font-bold mb-2">שלב 3</div>
                <div className="text-white font-bold mb-1">הכל מתועד</div>
                <p className="text-white/60 text-sm">
                  באזור האישי רואים את הסכום המדויק ואת מי עזרנו
                </p>
              </div>
            </div>

            <p className="text-center text-white/50 text-sm mt-8">
              הסכום המדויק משתנה לפי גודל הקהילה ומספר האירועים. המודל מבטיח שכל
              חבר משלם רק את חלקו היחסי.
            </p>
          </div>
        </div>
      </section>

      {/* Safeguards */}
      <section className="py-20 bg-gradient-to-b from-wheat-light to-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              מנגנוני ההגנה של הקהילה
            </h2>
            <p className="text-xl text-primary/60 max-w-2xl mx-auto">
              המודל לא עובד סתם על סמך אמון - יש מנגנונים מקצועיים שמבטיחים
              יציבות ואמינות.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {safeguards.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-wheat-dark/10"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal clarity */}
      <section className="py-16 bg-white border-t border-wheat-dark/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream border-2 border-wheat-dark/20 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary mb-3">
                  חשוב לדעת - אנחנו לא חברת ביטוח
                </h3>
                <p className="text-primary/70 leading-relaxed mb-3">
                  אלומת שיבולים היא פלטפורמה לעזרה הדדית בין חברי קהילה. אנחנו
                  איננו חברת ביטוח, איננו פועלים כחברת ביטוח, ואיננו מציעים
                  מוצרי ביטוח. המודל שלנו מבוסס על{" "}
                  <span className="font-bold">P2P Protection</span> - שיתוף
                  אחריות בין חברים, דומה למודלים חדשניים שפועלים במדינות מתקדמות
                  בעולם.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  הפלטפורמה פועלת בשקיפות מלאה מול הרשויות הרלוונטיות בישראל,
                  בהתאם לחוק הגנת הפרטיות ולדיני הצרכנות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            מוכנים להצטרף לקהילה?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            בדיקת ההתאמה לוקחת פחות מ-3 דקות, ללא התחייבות וללא עלות.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-3 bg-white text-primary font-black text-lg px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-all"
          >
            <span>בדיקת התאמה חינם</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
