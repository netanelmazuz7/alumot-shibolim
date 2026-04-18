import Link from "next/link";
import { Accessibility, ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "הצהרת נגישות - אלומת שיבולים",
  description:
    "הצהרת הנגישות של פלטפורמת אלומת שיבולים לפי תקנות שוויון זכויות לאנשים עם מוגבלות.",
};

export default function AccessibilityStatementPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      <section className="pt-32 pb-12 bg-gradient-to-bl from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-4">
            <Accessibility className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">נגישות</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            הצהרת נגישות
          </h1>
          <p className="text-white/60">תאריך הצהרה אחרונה: 17/04/2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green/5 border-2 border-green/30 rounded-2xl p-6 mb-8 flex items-start gap-3">
            <Shield className="w-7 h-7 text-green shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green mb-1">המחויבות שלנו לנגישות</p>
              <p className="text-sm text-primary/70 leading-relaxed">
                אנו ב&ldquo;אלומת שיבולים&rdquo; מאמינים כי שירות דיגיטלי צריך
                להיות נגיש לכל אדם, לרבות אנשים עם מוגבלות. אנו פועלים באופן
                מתמיד לשיפור נגישות האתר ולהתאמתו לדרישות חוק שוויון זכויות
                לאנשים עם מוגבלות, התשנ&ldquo;ח-1998, ותקנות שוויון זכויות
                לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&ldquo;ג-2013
                (תקנה 35).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8 border border-wheat-dark/10">
            <Section title="1. הצהרה על מחויבות לנגישות">
              <p>
                פלטפורמת &ldquo;אלומת שיבולים&rdquo; מחויבת לספק שירות נגיש לכלל
                הציבור, לרבות אנשים עם מוגבלות ראייה, שמיעה, מוטוריקה וקוגניציה.
                אנו רואים בנגישות ערך יסוד ושואפים להעניק חוויית גלישה מיטבית
                לכל גולש.
              </p>
            </Section>

            <Section title="2. רמת הנגישות">
              <p>
                האתר נבנה בהתאם להנחיות WCAG 2.1 של ארגון W3C ברמה AA, כנדרש
                בתקנות הישראליות. האתר תואם לתקן הישראלי ת&ldquo;י 5568.
              </p>
              <p>
                הנגשת האתר בוצעה בסביבת דפדפנים מודרניים (Chrome, Firefox, Edge,
                Safari) ועל גבי מחשבים שולחניים, מכשירים ניידים וטאבלטים.
              </p>
            </Section>

            <Section title="3. אמצעי נגישות באתר">
              <p>באתר זה מותקן תפריט נגישות המספק את הכלים הבאים:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>שינוי גודל טקסט (הקטנה, רגיל, הגדלה, הגדלה מקסימלית)</li>
                <li>התאמת ניגודיות צבעים (רגיל, ניגודיות גבוהה, שחור-לבן)</li>
                <li>עצירת אנימציות ותנועה</li>
                <li>הדגשת קישורים לזיהוי קל</li>
                <li>החלפה לפונט קריא (Arial)</li>
                <li>הגדלת סמן העכבר</li>
                <li>אפשרות איפוס כל ההגדרות</li>
              </ul>
              <p>בנוסף, האתר תומך ב:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>ניווט מלא באמצעות מקלדת</li>
                <li>תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)</li>
                <li>מבנה סמנטי תקין של כותרות ודפים</li>
                <li>טקסטים חלופיים לתמונות משמעותיות</li>
                <li>תוויות ברורות בשדות טפסים</li>
                <li>כיוון קריאה נכון בעברית (RTL)</li>
              </ul>
            </Section>

            <Section title="4. פטור מנגישות">
              <p>
                על אף מאמצינו להנגיש את כלל תכני האתר, ייתכן שחלקים מסוימים
                טרם הונגשו באופן מלא או נמצאים בתהליך הנגשה. מסמכים מצד שלישי
                (כגון קבצי PDF ממקורות חיצוניים) עשויים שלא להיות נגישים
                במלואם. במקרים אלה נספק סיוע פרטני לפי בקשה.
              </p>
            </Section>

            <Section title="5. דרכי פנייה לרכז הנגישות">
              <p>
                במקרה של תקלת נגישות באתר, הצעה לשיפור או בקשה לקבלת מידע
                בפורמט נגיש, ניתן לפנות אל רכז הנגישות של החברה:
              </p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>שם:</strong> גב&rsquo; מיכל כהן, רכזת נגישות
                </li>
                <li>
                  <strong>דוא&ldquo;ל:</strong>{" "}
                  <a
                    href="mailto:accessibility@alumot-shibolim.co.il"
                    className="text-gold-dark font-bold underline"
                  >
                    accessibility@alumot-shibolim.co.il
                  </a>
                </li>
                <li>
                  <strong>טלפון:</strong> 03-1234567 (שלוחה 3)
                </li>
                <li>
                  <strong>כתובת:</strong> רחוב רוטשילד 1, תל אביב-יפו
                </li>
                <li>
                  <strong>זמן מענה:</strong> עד 10 ימי עסקים
                </li>
              </ul>
            </Section>

            <Section title="6. תאריך עדכון ההצהרה">
              <p>
                הצהרת נגישות זו עודכנה לאחרונה בתאריך 17 באפריל 2026. ההצהרה
                נבדקת ומתעדכנת אחת לשנה לפחות, ובכל מקרה של שינוי מהותי באתר.
              </p>
            </Section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              חזרה לדף הבית
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-black text-primary mb-3 pb-2 border-b-2 border-gold/30">
        {title}
      </h2>
      <div className="text-primary/70 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
