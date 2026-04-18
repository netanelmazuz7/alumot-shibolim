import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SavingsCalculator from "@/components/SavingsCalculator";
import FAQSection from "@/components/FAQSection";
import JoinAnimation from "@/components/JoinAnimation";
import {
  ProtectedTogetherAnimation,
  SavingTogetherAnimation,
  CarsCollideStrip,
  AIScanStrip,
  AppraiserStrip,
  CostDivideStrip,
  FastPaymentStrip,
  TransparencyStrip,
} from "@/components/HomeAnimations";
import {
  ArrowLeft,
  CheckCircle,
  Lock,
  Eye,
  Heart,
  FileCheck,
  UserCheck,
  Car,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      {/* ============ HERO SECTION ============ */}
      <section className="relative flex items-center pt-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-bl from-cream via-wheat-light to-wheat" />
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span className="text-sm font-bold text-gold-dark">
                  חדש בישראל - קהילת הגנה הדדית לרכב
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight mb-6">
                הגנה הדדית לרכב -
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-gold to-gold-dark">
                  חיסכון אמיתי
                </span>
              </h1>

              <p className="text-xl text-primary/60 leading-relaxed mb-8 max-w-lg">
                קהילה של נהגים אחראיים שמגנים על הרכבים שלהם יחד - ללא
                מתווכים. חסכו עד{" "}
                <strong className="text-green font-black">84%</strong> מעלות
                ההגנה המקיפה על הרכב.
              </p>

              {/* Attractive pricing highlight */}
              <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl border-2 border-gold/30">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-primary/50 text-lg">החל מ-</span>
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-l from-gold-dark to-gold">
                    30₪
                  </span>
                  <span className="text-primary/70 text-xl font-bold">לחודש*</span>
                </div>
                <p className="text-primary/50 text-sm leading-relaxed">
                  * דמי חברות קבועים. העלות הממוצעת הכוללת (כולל השתתפות באירועים)
                  צפויה להיות כ-<strong className="text-primary">67₪ לחודש</strong>{" "}
                  בהנחת ממוצע של 2 אירועים בקהילה בחודש.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/join"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-l from-gold via-gold-dark to-gold text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all overflow-hidden animate-cta-pulse"
                >
                  <span className="absolute inset-0 bg-gradient-to-l from-green/0 via-white/20 to-green/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <CheckCircle className="relative w-6 h-6" />
                  <span className="relative">בדיקת התאמה חינם</span>
                  <ArrowLeft className="relative w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-primary border-2 border-primary/10 rounded-2xl font-bold text-lg hover:border-primary/30 transition-colors"
                >
                  איך זה עובד?
                </Link>
              </div>

              <p className="text-xs text-primary/40 mt-3 text-center flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>✓ ללא התחייבות</span>
                <span>✓ תוצאה תוך 48 שעות</span>
                <span>✓ ללא עמלה על הבדיקה</span>
              </p>
            </div>

            {/* Calculator side */}
            <div className="lg:translate-y-4">
              <SavingsCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-gold">2,400+</p>
              <p className="text-white/50 text-sm">חברי קהילה</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gold">₪4.2M</p>
              <p className="text-white/50 text-sm">נחסך לחברים</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gold">98%</p>
              <p className="text-white/50 text-sm">שביעות רצון</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gold">48 שעות</p>
              <p className="text-white/50 text-sm">ממוצע טיפול בדיווח</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD PREVIEW CTA ============ */}
      <section className="py-12 bg-gradient-to-l from-wheat-light via-cream to-wheat-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-gold/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-green/10 border border-green/30 rounded-full px-3 py-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-green animate-ping" />
                <span className="text-xs font-bold text-green">חדש</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-primary mb-2">
                צפו באזור האישי - שקיפות מלאה
              </h3>
              <p className="text-primary/60 leading-relaxed">
                ראו בדיוק איך נראה הדשבורד שלכם: רכב, תשלומים, אירועים, ציון חבר
                - הכל בממשק אחד נקי ושקוף.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-primary via-primary-light to-primary text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-cta-pulse overflow-hidden whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-gradient-to-l from-gold/0 via-gold/30 to-gold/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Eye className="relative w-5 h-5" />
              <span className="relative">לצפייה באזור האישי</span>
              <ArrowLeft className="relative w-5 h-5 animate-arrow-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-dark font-bold text-sm tracking-wider">
              פשוט ושקוף
            </span>
            <h2 className="text-4xl font-black text-primary mt-2">
              איך ההגנה ההדדית עובדת?
            </h2>
            <p className="text-primary/50 mt-3 max-w-2xl mx-auto">
              במקום לשלם למתווך שלוקח רווחים עצומים, אתם חלק מקהילה
              שמגנה אחד על השני
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-wheat-dark/10 hover:shadow-xl transition-shadow group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                1
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 text-gold-dark">
                <JoinAnimation />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                מצטרפים לקהילה
              </h3>
              <p className="text-primary/50 leading-relaxed">
                עוברים תהליך סינון קפדני שמבטיח שרק נהגים אחראיים מצטרפים.
                משלמים 30₪ דמי ניהול חודשיים בלבד.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-wheat-dark/10 hover:shadow-xl transition-shadow group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                2
              </div>
              <div className="w-20 h-20 rounded-2xl bg-green/10 flex items-center justify-center mb-6">
                <ProtectedTogetherAnimation />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                מוגנים יחד
              </h3>
              <p className="text-primary/50 leading-relaxed">
                הרכב שלכם מוגן בהגנה מקיפה מלאה. כשקורה אירוע לחבר קהילה -
                כולם משתתפים בעלות בצורה יחסית והוגנת.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-wheat-dark/10 hover:shadow-xl transition-shadow group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                3
              </div>
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <SavingTogetherAnimation />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                חוסכים יחד
              </h3>
              <p className="text-primary/50 leading-relaxed">
                ללא מתווכים ורווחי ענק - העלות האמיתית של הגנה מקיפה נמוכה
                משמעותית. שקיפות מלאה לגבי כל שקל בקהילה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SAVINGS COMPARISON ============ */}
      <section id="savings" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-dark font-bold text-sm tracking-wider">
              ההבדל ברור
            </span>
            <h2 className="text-4xl font-black text-primary mt-2">
              הסדר מסורתי מול אלומת שיבולים
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="bg-red-50/50 rounded-3xl p-8 border-2 border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                  <X className="w-6 h-6 text-danger" />
                </div>
                <h3 className="text-xl font-bold text-primary">הסדר מסורתי</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "עלות ממוצעת: 420₪/חודש",
                  "המתווך לוקח 40-60% רווח",
                  "תהליך דיווח ארוך ומסורבל",
                  "חוזה שנתי מחייב",
                  "העלאת מחירים שנתית",
                  "קנסות על עזיבה מוקדמת",
                  "אין שקיפות פיננסית",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-danger/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-danger text-xs font-bold">✕</span>
                    </span>
                    <span className="text-primary/60">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-red-100/50 rounded-xl text-center">
                <p className="text-sm text-primary/40">עלות שנתית</p>
                <p className="text-3xl font-black text-danger">₪5,040</p>
              </div>
            </div>

            {/* Alumot */}
            <div className="bg-green/5 rounded-3xl p-8 border-2 border-green/30 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                חוסכים ₪4,236 בשנה!
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green" />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  אלומת שיבולים
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "30₪ דמי ניהול + ~37₪ השתתפות = 67₪/חודש",
                  "אין מתווך - כסף עובר ישירות בין חברים",
                  "דיווח אירוע מטופל תוך 48 שעות",
                  "ללא חוזה - עוזבים מתי שרוצים",
                  "מחיר יציב - תלוי בקהילה בלבד",
                  "שקיפות פיננסית מלאה - רואים כל שקל",
                  "קהילה מסוננת של נהגים אחראיים",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-green" />
                    </span>
                    <span className="text-primary/70 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-green/10 rounded-xl text-center">
                <p className="text-sm text-primary/40">עלות שנתית</p>
                <p className="text-3xl font-black text-green">₪804</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/join"
              className="group relative inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-l from-gold via-gold-dark to-gold text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-cta-pulse overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-l from-green/0 via-white/20 to-green/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">הצטרפו וחסכו עכשיו</span>
              <ArrowLeft className="relative w-5 h-5 animate-arrow-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ JOIN PROCESS PREVIEW ============ */}
      <section id="process" className="py-16 bg-wheat-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-dark font-bold text-sm tracking-wider">
              תהליך סינון קפדני
            </span>
            <h2 className="text-4xl font-black text-primary mt-2">
              רק נהגים מובחרים מצטרפים
            </h2>
            <p className="text-primary/50 mt-3 max-w-2xl mx-auto">
              הסינון הקפדני שלנו מבטיח קהילה איכותית - וזה מה שמאפשר מחירים כל
              כך נמוכים לכולם
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: UserCheck,
                step: "1",
                title: "פרטים אישיים",
                desc: "שם, ת.ז, כתובת, פרטי קשר",
              },
              {
                icon: Eye,
                step: "2",
                title: "אימות זהות",
                desc: "צילום ת.ז + סלפי + אימות מול מאגר",
              },
              {
                icon: Car,
                step: "3",
                title: "פרטי הרכב",
                desc: "מספר רישוי, 4 תמונות, ניתוח AI",
              },
              {
                icon: FileCheck,
                step: "4",
                title: "היסטוריית נהיגה",
                desc: "ניסיון נהיגה, אירועים, עבירות",
              },
              {
                icon: ShieldCheck,
                step: "5",
                title: "בדיקת רקע",
                desc: "אשראי, פלילי, היסטוריית נהיגה",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 text-center shadow-md border border-wheat-dark/10 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <s.icon className="w-8 h-8 text-primary/70 mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-1">{s.title}</h3>
                <p className="text-sm text-primary/40">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-md border border-wheat-dark/20">
              <Clock className="w-5 h-5 text-gold-dark" />
              <span className="text-primary/70">
                תוצאת הבקשה תוך <strong className="text-primary">48 שעות</strong>{" "}
                | ציון מינימום לקבלה:{" "}
                <strong className="text-gold-dark">90 מתוך 100</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLAIM PROCESS ============ */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-dark font-bold text-sm tracking-wider">
              פשוט ומהיר
            </span>
            <h2 className="text-4xl font-black text-primary mt-2">
              תהליך דיווח שקוף
            </h2>
            <p className="text-primary/50 mt-3">
              מהרגע שקרה אירוע ועד שהכסף בחשבון - הכל דיגיטלי, מהיר ושקוף
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                Strip: CarsCollideStrip,
                title: "דיווח על אירוע",
                desc: "מעלים תמונות + תיאור דרך האפליקציה. פשוט ומהיר.",
              },
              {
                Strip: AIScanStrip,
                title: "ניתוח AI מיידי",
                desc: "AI מתקדם מנתח את הנזק ונותן הערכה ראשונית תוך דקות.",
              },
              {
                Strip: AppraiserStrip,
                title: "אישור שמאי",
                desc: "שמאי מורשה מאשר את הנזק. לנזקים גדולים - חוקר פרטי נוסף.",
              },
              {
                Strip: CostDivideStrip,
                title: "חלוקת עלות",
                desc: "הסכום מתחלק בין כל חברי הקהילה - יחסית לשווי הרכב.",
              },
              {
                Strip: FastPaymentStrip,
                title: "תשלום מהיר",
                desc: "הכסף מועבר ישירות לחבר הנפגע. ללא ביורוקרטיה מיותרת.",
              },
              {
                Strip: TransparencyStrip,
                title: "שקיפות מלאה",
                desc: "כל חבר רואה בדיוק לאן הכסף הלך ומי קיבל כמה.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-md border border-wheat-dark/10"
              >
                <item.Strip />
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-primary/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY & TRANSPARENCY ============ */}
      <section id="community" className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold font-bold text-sm tracking-wider">
              שקיפות מלאה
            </span>
            <h2 className="text-4xl font-black text-white mt-2">
              קהילה פתוחה ושקופה
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto">
              אצלנו אין מה להסתיר. כל שקל מתועד, כל החלטה שקופה, כל חבר שווה
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <Lock className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                אבטחה ברמה הגבוהה ביותר
              </h3>
              <p className="text-white/50 leading-relaxed">
                כל הנתונים מוצפנים AES-256. אנחנו לא משתפים מידע עם גורמי חוץ.
                פועלים בהתאם לחוק הגנת הפרטיות.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <Eye className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                שקיפות פיננסית מלאה
              </h3>
              <p className="text-white/50 leading-relaxed">
                כל חבר רואה בזמן אמת: כמה חברים בקהילה, כמה אירועים היו, לאן
                הלך כל שקל. בלי הפתעות.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <Heart className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                קהילה אמיתית
              </h3>
              <p className="text-white/50 leading-relaxed">
                אנחנו לא מתווך - אנחנו קהילה של אנשים שמגנים אחד על
                השני. כשכולם אחראיים, כולם מרוויחים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 bg-wheat-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-dark font-bold text-sm tracking-wider">
              מה אומרים עלינו
            </span>
            <h2 className="text-4xl font-black text-primary mt-2">
              חברי הקהילה ממליצים
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "יוסי כהן",
                location: "תל אביב",
                car: "טויוטה קורולה 2022",
                text: "שילמתי 450₪ לחודש על כיסוי מקיף מסורתי. עכשיו עם אלומת שיבולים אני משלם ממוצע של 65₪. החיסכון הוא אדיר.",
                saving: "₪4,620",
              },
              {
                name: "מיכל לוי",
                location: "חיפה",
                car: "מאזדה 3 2021",
                text: "הייתה לי תאונה קטנה והדיווח טופל תוך יומיים. בהסדר הקודם שלי זה היה לוקח שבועות.",
                saving: "₪3,180",
              },
              {
                name: "אבי מזרחי",
                location: "באר שבע",
                car: "יונדאי טוסון 2023",
                text: "תהליך ההצטרפות היה קפדני אבל זה בדיוק מה שנותן ביטחון. יודע שאני בקהילה של נהגים רציניים.",
                saving: "₪2,880",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-8 shadow-lg border border-wheat-dark/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-5 h-5 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="text-primary/60 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-t border-wheat-dark/10 pt-4">
                  <p className="font-bold text-primary">{t.name}</p>
                  <p className="text-sm text-primary/40">
                    {t.location} | {t.car}
                  </p>
                  <p className="text-sm font-bold text-green mt-1">
                    חיסכון שנתי: {t.saving}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FAQSection />

      {/* ============ FINAL CTA ============ */}
      <section className="py-16 bg-gradient-to-bl from-gold/20 via-wheat to-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            מוכנים לחסוך אלפי שקלים?
          </h2>
          <p className="text-xl text-primary/50 mb-10 max-w-xl mx-auto">
            הצטרפו לקהילת אלומת שיבולים והתחילו לשלם את המחיר האמיתי של הגנה
            מקיפה - בלי שמתווך ייקח לכם 60% מהכסף.
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-l from-gold to-gold-dark text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            הגישו בקשת הצטרפות
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p className="text-primary/30 text-sm mt-4">
            תוצאה תוך 48 שעות | ללא התחייבות | עוזבים מתי שרוצים
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
