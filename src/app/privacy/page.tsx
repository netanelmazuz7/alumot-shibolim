import Link from "next/link";
import { Lock, ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "מדיניות הפרטיות - אלומת שיבולים",
  description: "מדיניות הפרטיות של פלטפורמת אלומת שיבולים.",
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
          <p className="text-white/60">עודכן לאחרונה: 17 באפריל 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green/5 border-2 border-green/30 rounded-2xl p-6 mb-8 flex items-start gap-3">
            <Shield className="w-7 h-7 text-green shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green mb-1">המחויבות שלנו אליכם</p>
              <p className="text-sm text-primary/70 leading-relaxed">
                הפרטיות שלכם חשובה לנו ברמה הגבוהה ביותר. מדיניות זו מפורטת
                בהתאם לחוק הגנת הפרטיות, התשמ&ldquo;א-1981, תקנות הגנת הפרטיות
                (אבטחת מידע), התשע&ldquo;ז-2017, ותיקון 13 לחוק הגנת הפרטיות
                (2024). כל הנתונים מוצפנים ב-AES-256, נשמרים במאגר מידע רשום
                בישראל ומנוהלים לפי תקן ISO 27001.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8 border border-wheat-dark/10">
            <Section title="1. בעל המאגר ופרטי התקשרות">
              <p>
                המידע נאסף ומנוהל על ידי &ldquo;אלומת שיבולים&rdquo; בע&ldquo;מ,
                ח.פ. [מספר ח.פ], מרחוב רוטשילד 1, תל אביב-יפו (להלן:
                &ldquo;החברה&rdquo;). מאגר המידע רשום אצל רשם מאגרי המידע ברשות
                להגנת הפרטיות.
              </p>
            </Section>

            <Section title="2. איזה מידע נאסף">
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>פרטים אישיים:</strong> שם מלא, מספר תעודת זהות,
                  תאריך לידה, כתובת מגורים, טלפון, דוא&ldquo;ל, מצב משפחתי.
                </li>
                <li>
                  <strong>מסמכי זהות ואימות:</strong> צילום תעודת זהות, צילום
                  רישיון נהיגה, תמונת סלפי לצורך אימות זהות.
                </li>
                <li>
                  <strong>נתוני רכב:</strong> מספר רישוי, יצרן, דגם, שנת
                  ייצור, שווי, תמונות הרכב וצילומי מד ק&ldquo;מ.
                </li>
                <li>
                  <strong>היסטוריית נהיגה:</strong> עבירות תעבורה, נקודות
                  ברישיון, תאונות קודמות.
                </li>
                <li>
                  <strong>נתוני BDI ואשראי:</strong> ציון BDI, היסטוריית
                  תשלומים, חובות (במסגרת חישוב ציון הסינון, בהסכמה מפורשת).
                </li>
                <li>
                  <strong>נתוני תשלום:</strong> פרטי אמצעי תשלום מעובדים אך
                  ורק דרך Stripe (תקן PCI-DSS Level 1). החברה אינה שומרת מספרי
                  כרטיסי אשראי מלאים בשרתיה.
                </li>
                <li>
                  <strong>נתוני שימוש ומטא-דאטה:</strong> כתובת IP, סוג דפדפן
                  ומערכת הפעלה, דפים נצפים, פעולות באתר, לוגים אבטחתיים.
                </li>
              </ul>
            </Section>

            <Section title="3. למה אנחנו אוספים את המידע">
              <ul className="list-disc pr-6 space-y-1">
                <li>מתן שירותי הפלטפורמה וניהול הסדר העזרה ההדדית</li>
                <li>אימות זהות והגנה מפני הונאה והתחזות</li>
                <li>חישוב ציון הסינון והתאמה לקהילה</li>
                <li>עיבוד דיווחי אירועים וחלוקת ההשתתפויות</li>
                <li>תקשורת שירותית ותמיכה</li>
                <li>
                  מילוי חובות על פי דין (חוק איסור הלבנת הון, חוק מע&ldquo;מ,
                  פקודת מס הכנסה)
                </li>
                <li>שיפור השירות וניטור אבטחתי</li>
              </ul>
              <p>
                בסיס חוקי לעיבוד: הסכמה מפורשת של החבר, ביצוע חוזה, וחובות
                חוקיות.
              </p>
            </Section>

            <Section title="4. שיתוף מידע עם צדדים שלישיים">
              <p>אנחנו משתפים מידע אך ורק עם הגורמים ההכרחיים הבאים:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>Stripe:</strong> לעיבוד תשלומים (PCI-DSS Level 1).
                </li>
                <li>
                  <strong>שמאים מורשים:</strong> רק פרטי האירוע הרלוונטיים,
                  לצורך הערכת הנזק.
                </li>
                <li>
                  <strong>חוקרים פרטיים:</strong> רק במקרים של חשד להונאה,
                  ובכפוף להסכמה מפורשת של החבר או לצו בית משפט.
                </li>
                <li>
                  <strong>מאגרים ממשלתיים:</strong> משרד התחבורה, משטרת ישראל
                  ו-BDI - לצורך בדיקות רקע בלבד, בהסכמה מפורשת.
                </li>
                <li>
                  <strong>רשויות מוסמכות:</strong> אך ורק על פי צו שיפוטי
                  תקף או חובה חוקית מפורשת.
                </li>
              </ul>
              <p className="font-bold text-primary mt-3">
                אנחנו לעולם לא מוכרים, משכירים או סוחרים במידע האישי שלכם,
                ואיננו מעבירים אותו לגורמי חוץ מסחריים לצרכי שיווק.
              </p>
            </Section>

            <Section title="5. אבטחת מידע">
              <p>
                אנו פועלים בהתאם לתקנות הגנת הפרטיות (אבטחת מידע),
                התשע&ldquo;ז-2017, ברמת אבטחה &ldquo;גבוהה&rdquo;:
              </p>
              <ul className="list-disc pr-6 space-y-1">
                <li>הצפנת נתונים בתקן AES-256 במנוחה</li>
                <li>הצפנת תקשורת TLS 1.3 בתעבורה</li>
                <li>מאגר מידע רשום ברשם מאגרי המידע</li>
                <li>עמידה בתקן ISO 27001 לניהול אבטחת מידע</li>
                <li>שרתים פיזיים במרכזי נתונים מאובטחים בישראל</li>
                <li>אימות דו-שלבי (2FA) חובה לעובדים עם גישה למידע</li>
                <li>בקרת גישה לפי עיקרון הצורך לדעת</li>
                <li>ביקורת אבטחה שנתית חיצונית ומבדקי חדירה</li>
                <li>תוכנית התאוששות מאסון (DRP) וגיבויים מוצפנים</li>
                <li>מחיקת מסמכי אימות (ת.ז, סלפי) אוטומטית תוך 7 ימים</li>
              </ul>
            </Section>

            <Section title="6. זכויותיך לפי החוק">
              <p>
                בהתאם לחוק הגנת הפרטיות ולתיקון 13 (2024), עומדות לך הזכויות
                הבאות:
              </p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>זכות עיון:</strong> לקבל העתק של כל המידע השמור
                  עליך.
                </li>
                <li>
                  <strong>זכות תיקון:</strong> לבקש תיקון מידע לא מדויק או לא
                  מעודכן.
                </li>
                <li>
                  <strong>זכות מחיקה (&ldquo;הזכות להישכח&rdquo;):</strong>{" "}
                  לבקש מחיקת מידע, בכפוף לחובות חוקיות לשמירה.
                </li>
                <li>
                  <strong>זכות ניידות:</strong> לקבל את נתוניך בפורמט דיגיטלי
                  מובנה.
                </li>
                <li>
                  <strong>זכות הגבלה והתנגדות:</strong> להגביל שימושים מסוימים
                  במידע.
                </li>
                <li>
                  <strong>זכות ביטול הסכמה:</strong> לחזור בך מהסכמות שניתנו
                  בעבר.
                </li>
                <li>
                  <strong>זכות הגשת תלונה:</strong> לרשות להגנת הפרטיות.
                </li>
              </ul>
              <p>
                מימוש הזכויות:{" "}
                <a
                  href="mailto:privacy@alumot-shibolim.co.il"
                  className="text-gold-dark font-bold underline"
                >
                  privacy@alumot-shibolim.co.il
                </a>
                . זמן מענה: עד 30 ימים.
              </p>
            </Section>

            <Section title="7. עוגיות וכלי מעקב">
              <p>
                האתר משתמש ב&ldquo;עוגיות&rdquo; (Cookies) לצרכים הבאים:
              </p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>עוגיות חיוניות:</strong> הפעלת הרשמה, שמירת סשן,
                  אבטחה - לא ניתן לבטל.
                </li>
                <li>
                  <strong>עוגיות העדפה:</strong> שמירת שפה, הגדרות נגישות.
                </li>
                <li>
                  <strong>עוגיות אנליטיות פנימיות:</strong> ניתוח שימוש
                  מצרפי בלבד, ללא זיהוי אישי.
                </li>
              </ul>
              <p>
                איננו משתמשים בעוגיות מעקב שיווקיות של צד שלישי (Facebook
                Pixel, Google Ads). ניתן לנהל עוגיות דרך הגדרות הדפדפן.
              </p>
            </Section>

            <Section title="8. תקופות שמירת מידע">
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>מבקשים שנדחו:</strong> עד 90 ימים ואז מחיקה
                  אוטומטית.
                </li>
                <li>
                  <strong>חברים פעילים:</strong> כל משך החברות.
                </li>
                <li>
                  <strong>חברים שעזבו:</strong> 7 שנים מיום העזיבה (בהתאם
                  לחובות חוקיות וחשבונאיות).
                </li>
                <li>
                  <strong>מסמכי אימות (ת.ז, סלפי):</strong> נמחקים תוך 7
                  ימים מאימות.
                </li>
                <li>
                  <strong>לוגים אבטחתיים:</strong> 24 חודשים.
                </li>
                <li>
                  <strong>רשומות תשלום:</strong> 7 שנים (חובה על פי פקודת מס
                  הכנסה).
                </li>
              </ul>
            </Section>

            <Section title="9. העברת מידע לחו&ldquo;ל">
              <p>
                המידע האישי נשמר בשרתים בישראל. עיבודים מסוימים מתבצעים דרך
                ספקים בינלאומיים (כגון Stripe לעיבוד תשלומים) במסגרת
                הוראות החוק הישראלי והאירופי (GDPR). כל העברה לחו&ldquo;ל
                מתבצעת רק למדינות המבטיחות רמת הגנה נאותה או תחת תניות חוזיות
                סטנדרטיות (SCC).
              </p>
            </Section>

            <Section title="10. קטינים">
              <p>
                הפלטפורמה מיועדת לבוגרים מעל גיל 25 בלבד, ואינה מיועדת או
                משווקת לקטינים. איננו אוספים ביודעין מידע של קטינים
                (גילאי פחות מ-25). אם יתגלה כי נאסף מידע כזה - הוא יימחק
                מיידית.
              </p>
            </Section>

            <Section title="11. שינויים במדיניות">
              <p>
                נעדכן את מדיניות הפרטיות מעת לעת. עדכונים מהותיים יישלחו
                בהודעה מראש של 30 ימים לדוא&ldquo;ל הרשום של החבר וייפורסמו
                באתר. המשך שימוש בפלטפורמה לאחר מועד העדכון מהווה הסכמה
                למדיניות המעודכנת.
              </p>
            </Section>

            <Section title="12. ממונה הגנת הפרטיות (DPO)">
              <p>
                ממונה הגנת הפרטיות של החברה אחראי על יישום מדיניות זו ועל
                מענה לפניות בנושאי פרטיות:
              </p>
              <ul className="list-disc pr-6 space-y-1">
                <li>
                  <strong>שם:</strong> עו&ldquo;ד דנה לוי, DPO
                </li>
                <li>
                  <strong>דוא&ldquo;ל:</strong>{" "}
                  <a
                    href="mailto:privacy@alumot-shibolim.co.il"
                    className="text-gold-dark font-bold underline"
                  >
                    privacy@alumot-shibolim.co.il
                  </a>
                </li>
                <li>
                  <strong>טלפון ישיר:</strong> 03-1234567 (שלוחה 2)
                </li>
                <li>
                  <strong>כתובת:</strong> רחוב רוטשילד 1, תל אביב-יפו
                </li>
              </ul>
              <p>
                בנוסף, לכל אדם זכות להגיש תלונה לרשות להגנת הפרטיות במשרד
                המשפטים.
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
