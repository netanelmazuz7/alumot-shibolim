import Link from "next/link";
import { Lock, ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "מדיניות הפרטיות — אלומות שיבולים",
  description: "מדיניות הפרטיות של פלטפורמת אלומות שיבולים.",
};

export default function PrivacyPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      <section className="pt-32 pb-12 bg-gradient-to-bl from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-4">
            <Lock className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">פרטיות ואבטחה</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            מדיניות הפרטיות
          </h1>
          <p className="text-white/60">
            עודכן לאחרונה: 16 באפריל 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green/5 border-2 border-green/30 rounded-2xl p-6 mb-8 flex items-start gap-3">
            <Shield className="w-7 h-7 text-green shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green mb-1">המחויבות שלנו אליכם</p>
              <p className="text-sm text-primary/70 leading-relaxed">
                הפרטיות שלכם חשובה לנו יותר מהפעילות העסקית. כל הנתונים שלכם
                מוצפנים בתקן AES-256, נשמרים בשרתים מאובטחים בישראל, ולעולם לא
                ימכרו, יושכרו או ישותפו עם גורמי חוץ. תמיד זכותכם לבקש מחיקה
                מלאה.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8 border border-wheat-dark/10">
            <Section title="1. מי אוספים את המידע">
              <p>
                המידע נאסף על ידי &ldquo;אלומות שיבולים&rdquo; בע&ldquo;מ
                (להלן: &ldquo;החברה&rdquo;), רשומה בישראל, שכתובתה הרשומה:
                רחוב רוטשילד 1, תל אביב.
              </p>
            </Section>

            <Section title="2. איזה מידע נאסף">
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>פרטים אישיים:</strong> שם, ת.ז, תאריך לידה, כתובת,
                  טלפון, דוא&ldquo;ל
                </li>
                <li>
                  <strong>תמונות אימות:</strong> צילום ת.ז (מוחק אחרי אימות),
                  סלפי (מוחק אחרי אימות)
                </li>
                <li>
                  <strong>פרטי רכב:</strong> מספר רישוי, יצרן, דגם, שנת ייצור,
                  שווי, תמונות
                </li>
                <li>
                  <strong>היסטוריה:</strong> דיווחי אירועים קודמים, עבירות
                  תנועה
                </li>
                <li>
                  <strong>נתונים פיננסיים:</strong> טווח הכנסה (אופציונלי),
                  פרטי אמצעי תשלום (דרך Stripe בלבד — לא נשמר אצלנו)
                </li>
                <li>
                  <strong>נתוני שימוש:</strong> IP, סוג דפדפן, דפים שנצפו
                </li>
              </ul>
            </Section>

            <Section title="3. למה המידע נאסף">
              <ul className="list-disc pr-6 space-y-1">
                <li>אימות זהות וכשירות להצטרפות לקהילה</li>
                <li>חישוב ציון הסינון וההתאמה לקהילה</li>
                <li>ניהול הסדר העזרה ההדדית ותשלומי ההשתתפות</li>
                <li>טיפול בדיווחי אירועים</li>
                <li>שיפור השירות וזיהוי הונאות</li>
                <li>מילוי חובות חוקיות (למשל: חוק איסור הלבנת הון)</li>
              </ul>
            </Section>

            <Section title="4. עם מי המידע משותף">
              <p>אנחנו משתפים מידע רק עם הגורמים ההכרחיים:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>Stripe</strong> — עיבוד תשלומים (תקן PCI-DSS מלא)
                </li>
                <li>
                  <strong>שמאים מורשים</strong> — לצורך הערכת אירועים (רק
                  פרטים רלוונטיים לאירוע)
                </li>
                <li>
                  <strong>מאגרים רשמיים</strong> — משטרת ישראל, BDI, רשות
                  הרישוי — לצורך בדיקות רקע, רק בהסכמתכם המפורשת
                </li>
                <li>
                  <strong>רשויות חוקיות</strong> — רק במקרה של צו בית משפט
                  תקף
                </li>
              </ul>
              <p className="font-bold text-primary mt-3">
                אנחנו לעולם לא מוכרים, משכירים או סוחרים בנתונים שלכם.
              </p>
            </Section>

            <Section title="5. אבטחת המידע">
              <ul className="list-disc pr-6 space-y-1">
                <li>הצפנת כל הנתונים בתקן AES-256</li>
                <li>שרתים פיזיים בישראל בלבד</li>
                <li>הצפנת תקשורת TLS 1.3</li>
                <li>אימות דו-שלבי חובה לגישה לנתונים</li>
                <li>ביקורת אבטחה שנתית חיצונית</li>
                <li>מוחיקת תמונות אימות אוטומטית אחרי 7 ימים</li>
              </ul>
            </Section>

            <Section title="6. הזכויות שלכם">
              <p>בהתאם לחוק הגנת הפרטיות תשמ״א-1981, זכותכם:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>לעיין בכל הנתונים האישיים השמורים עליכם</li>
                <li>לבקש תיקון נתונים שגויים</li>
                <li>לבקש מחיקת נתונים (&ldquo;הזכות להישכח&rdquo;)</li>
                <li>לבקש יצוא של כל נתוניכם בפורמט דיגיטלי</li>
                <li>להגביל את השימוש בנתוניכם</li>
                <li>לבטל הסכמות שנתתם בעבר</li>
              </ul>
              <p>
                לממוש כל אחת מהזכויות:{" "}
                <a href="mailto:privacy@alumot-shibolim.co.il" className="text-gold-dark font-bold underline">
                  privacy@alumot-shibolim.co.il
                </a>
              </p>
            </Section>

            <Section title="7. שמירת נתונים">
              <p>
                נתוני חברים פעילים נשמרים כל זמן החברות ועוד 7 שנים אחרי
                עזיבה (לצרכים חוקיים/חשבונאיים). נתוני מבקשים שנדחו נמחקים
                תוך 90 ימים. תמונות אימות נמחקות אוטומטית תוך 7 ימים.
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                אנחנו משתמשים ב-cookies חיוניים בלבד (login session, העדפות).
                אין אצלנו cookies של מעקב שיווקי של צד שלישי (Facebook
                Pixel, Google Ads וכו&apos;).
              </p>
            </Section>

            <Section title="9. קטינים">
              <p>
                הפלטפורמה מיועדת למעל גיל 25 בלבד. אין אנו אוספים ביודעין
                מידע של קטינים. אם גילינו כי נאסף מידע כזה — הוא יימחק מיידית.
              </p>
            </Section>

            <Section title="10. שינויים במדיניות">
              <p>
                נעדכן את המדיניות מעת לעת. עדכונים מהותיים יישלחו בהתראה
                מראש של 30 ימים למייל הרשום שלכם.
              </p>
            </Section>

            <Section title="11. קשר עם הממונה על הגנת הפרטיות">
              <p>
                הממונה על הגנת הפרטיות אצלנו:
                <br />
                עו&ldquo;ד דנה לוי
                <br />
                דוא&ldquo;ל:{" "}
                <a href="mailto:privacy@alumot-shibolim.co.il" className="text-gold-dark font-bold underline">
                  privacy@alumot-shibolim.co.il
                </a>
                <br />
                טלפון ישיר: 03-1234567
              </p>
            </Section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              חזרה לטופס ההצטרפות
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
