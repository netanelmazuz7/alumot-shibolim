import Link from "next/link";
import { FileText, ArrowLeft, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "תקנון השימוש — אלומות שיבולים",
  description: "תנאי השימוש המלאים של פלטפורמת אלומות שיבולים.",
};

export default function TermsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      <section className="pt-32 pb-12 bg-gradient-to-bl from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-4">
            <FileText className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">מסמך משפטי</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            תקנון השימוש
          </h1>
          <p className="text-white/60">
            עודכן לאחרונה: 16 באפריל 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-900 mb-1">הצהרה חשובה</p>
              <p className="text-sm text-yellow-800 leading-relaxed">
                אלומות שיבולים איננה חברת ביטוח ואין לה רישיון מבטח. הפלטפורמה
                מאפשרת הסכם עזרה הדדית בין חברי הקהילה. השירות אינו תחליף לביטוח
                חובה (שחובה בחוק) או לביטוח מקיף — מומלץ להתייעץ עם סוכן ביטוח.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8 border border-wheat-dark/10">
            <Section title="1. כללי">
              <p>
                תקנון זה (להלן: &ldquo;התקנון&rdquo;) מסדיר את היחסים בין
                &ldquo;אלומות שיבולים&rdquo; בע&ldquo;מ (להלן:
                &ldquo;הפלטפורמה&rdquo;) לבין המשתמש (להלן: &ldquo;החבר&rdquo;).
                השימוש בפלטפורמה מהווה הסכמה מלאה לתנאי תקנון זה.
              </p>
            </Section>

            <Section title="2. מהות השירות">
              <p>
                הפלטפורמה היא שירות טכנולוגי המאפשר לחברי הקהילה לקיים ביניהם
                הסדר עזרה הדדית לגבי אירועים הקשורים לכלי רכב. הפלטפורמה אינה
                צד להסדר העזרה ההדדית, אינה מבטחת את החברים, ואינה נושאת
                באחריות לתשלומי פיצוי. הפלטפורמה משמשת כמתווך טכנולוגי בלבד.
              </p>
            </Section>

            <Section title="3. תנאי הצטרפות">
              <p>חבר חייב לעמוד בתנאים הבאים:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>תושב ישראל בעל תעודת זהות תקפה</li>
                <li>בעל רישיון נהיגה ישראלי תקף</li>
                <li>גיל 25 ומעלה</li>
                <li>ללא עבר פלילי פעיל בעבירות מהותיות</li>
                <li>ציון סינון 90 ומעלה מתוך 100</li>
                <li>החזקת ביטוח חובה תקף במקביל לחברות</li>
              </ul>
            </Section>

            <Section title="4. זכויות וחובות החבר">
              <ul className="list-disc pr-6 space-y-1">
                <li>החבר יספק מידע מדויק ועדכני במסגרת תהליך ההצטרפות</li>
                <li>החבר יעדכן את הפלטפורמה על שינויים מהותיים (דירה, רכב, מצב משפחתי)</li>
                <li>החבר יחויב בחלקו היחסי באירועים שאושרו לפי ההסדר</li>
                <li>החבר זכאי לדיווח על אירועים הקשורים לרכבו ולקבלת פיצוי לפי ההסדר</li>
                <li>החבר זכאי לעזוב את הקהילה בכל עת, בכפוף לחיובים פתוחים</li>
              </ul>
            </Section>

            <Section title="5. תשלומים">
              <ul className="list-disc pr-6 space-y-1">
                <li>דמי חברות חודשיים: 30 ₪</li>
                <li>השתתפות יחסית באירועים: משתנה לפי החודש</li>
                <li>תקרה חודשית: 150 ₪</li>
                <li>עמלת הפלטפורמה על אירוע: 3-5%</li>
                <li>תשלום באמצעות כרטיס אשראי או הוראת קבע דרך Stripe</li>
              </ul>
            </Section>

            <Section title="6. פסילה אוטומטית מהקהילה">
              <p>חבר ייפסל מיידית מהקהילה במקרים הבאים:</p>
              <ul className="list-disc pr-6 space-y-1">
                <li>הונאה או ניסיון הונאה בדיווח אירוע</li>
                <li>אי-תשלום במשך 3 חודשים רצופים</li>
                <li>מסירת מידע כוזב במסגרת ההצטרפות</li>
                <li>הרשעה בעבר פלילי במהלך תקופת החברות</li>
                <li>הפרת חובותיו על פי תקנון זה</li>
              </ul>
            </Section>

            <Section title="7. יישוב סכסוכים">
              <p>
                סכסוכים בין חבר לחבר ייושבו באמצעות גישור פנימי חינמי. אם
                הגישור נכשל — בוררות חיצונית דרך המוסד לבוררות עסקית (מל&ldquo;י).
                החלטת הבוררות מחייבת את הצדדים.
              </p>
            </Section>

            <Section title="8. מגבלות אחריות">
              <p>
                הפלטפורמה אינה אחראית לתשלום פיצוי לחבר — זו אחריותם הקולקטיבית
                של חברי הקהילה. הפלטפורמה פועלת במיטב יכולתה ואינה אחראית
                להפסקות שירות טכניות, תקלות זמניות או נזקים עקיפים.
              </p>
            </Section>

            <Section title="9. שינויים בתקנון">
              <p>
                הפלטפורמה רשאית לעדכן את התקנון בהודעה מוקדמת של 30 ימים.
                שינויים מהותיים יחולו רק לאחר קבלת הסכמה מפורשת מהחבר.
              </p>
            </Section>

            <Section title="10. דין ומקום שיפוט">
              <p>
                על תקנון זה ועל השימוש בפלטפורמה חל הדין הישראלי בלבד. מקום
                השיפוט הבלעדי הוא בתי המשפט המוסמכים במחוז תל אביב.
              </p>
            </Section>

            <Section title="11. יצירת קשר">
              <p>
                לכל שאלה או בירור בנוגע לתקנון:
                <br />
                דוא&ldquo;ל:{" "}
                <a href="mailto:legal@alumot-shibolim.co.il" className="text-gold-dark font-bold underline">
                  legal@alumot-shibolim.co.il
                </a>
                <br />
                טלפון: 1-800-ALUMOT
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
