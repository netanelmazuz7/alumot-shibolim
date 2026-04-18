"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Shield,
  ShieldCheck,
  Wallet,
  Users,
  FileSearch,
  Lock,
  Search,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type FAQ = { q: string; a: string };
type Category = {
  id: string;
  title: string;
  icon: typeof Shield;
  items: FAQ[];
};

const categories: Category[] = [
  {
    id: "requirements",
    title: "דרישות סף להצטרפות",
    icon: ShieldCheck,
    items: [
      {
        q: "האם אני חייב להחזיק בביטוח חובה וצד ג׳?",
        a: "כן, זו דרישה מוחלטת וקבועה. כל חבר בקהילת אלומת שיבולים מחויב להחזיק בביטוח חובה תקף ובביטוח צד שלישי תקף בחברת ביטוח מורשית בישראל, לאורך כל תקופת החברות. זה מגן עליך, על הנוסעים ברכבך, ועל כל משתמשי הדרך. הקהילה היא שכבה משלימה - היא לא באה במקום ביטוח חובה או צד ג׳, והיא לא יכולה לבוא במקומם.",
      },
      {
        q: "למה הדרישה הזאת?",
        a: "מהסיבות הפשוטות ביותר: ביטוח חובה הוא חובה על פי חוק בישראל - אין נהיגה חוקית בלעדיו. ביטוח צד ג׳ מגן עליך במקרה שגרמת נזק לאחרים - נזק שיכול להגיע לסכומי עתק. אלומת שיבולים לא מחליפה את הכלים האלה אלא מוסיפה שכבת עזרה קהילתית על גביהם. קהילה שהחברים בה מבוטחים כראוי - היא קהילה יציבה ואחראית.",
      },
      {
        q: "אתם מוכרים ביטוח חובה או צד ג׳?",
        a: "לא. אנחנו אינם חברת ביטוח, איננו סוכני ביטוח, ואיננו מוכרים פוליסות ביטוח. את ביטוח החובה וצד ג׳ אתה רוכש בחברת ביטוח מורשית לפי בחירתך, באופן עצמאי לחלוטין מהחברות שלך בקהילה.",
      },
      {
        q: "מה קורה אם הביטוח שלי פג?",
        a: "אם הביטוח חובה או צד ג׳ שלך פג - החברות שלך בקהילה מוקפאת אוטומטית עד לחידוש. זה לא מידתי, זה קריטי: קהילה אחראית דורשת שכל חבריה יעמדו בחוק ויהיו מבוטחים כראוי.",
      },
    ],
  },
  {
    id: "legal",
    title: "חוקיות ורגולציה",
    icon: Shield,
    items: [
      {
        q: "האם זה חוקי? איך אתם לא חברת ביטוח?",
        a: "אלומת שיבולים פועלת כפלטפורמה לעזרה הדדית בין חברי קהילה - מודל שנקרא P2P Protection. אנחנו לא מוכרים פוליסות ביטוח, לא גובים פרמיות, ולא משווקים מוצר ביטוח. במקום זה, חברי הקהילה בוחרים להתחייב לעזור אחד לשני באירועי נזק מסוימים לרכב. הקהילה פועלת לצד שוק הביטוח המסורתי, לא במקומו - וכל חבר בה מחזיק בביטוח חובה וצד ג׳ כנדרש בחוק.",
      },
      {
        q: "האם אתם מפוקחים על ידי רשות שוק ההון?",
        a: "מכיוון שאנחנו לא חברת ביטוח, אלא פלטפורמת עזרה הדדית, הפעילות שלנו לא כפופה לפיקוח של רשות שוק ההון כמו חברת ביטוח רגילה. יחד עם זאת, אנחנו פועלים בשקיפות מלאה מול הרשויות הרלוונטיות ומתנהלים בהתאם לחוקי המדינה.",
      },
      {
        q: "מה קורה אם יש מחלוקת על אירוע?",
        a: "כל אירוע נבדק על ידי שמאי רכב מוסמך ובלתי תלוי, בעל רישיון בישראל. במקרה של מחלוקת, יש אפשרות לערער ולבקש בדיקה נוספת על ידי שמאי שני. הכל מתועד בכתב, ויש תהליך ברור לטיפול בתלונות.",
      },
    ],
  },
  {
    id: "money",
    title: "עלויות וכסף",
    icon: Wallet,
    items: [
      {
        q: "כמה זה עולה בחודש?",
        a: "דמי הניהול בקהילה נמוכים משמעותית ממחיר ביטוח רכב מסורתי, ונשארים קבועים לאורך זמן. בנוסף, כשיש אירוע לחבר בקהילה, העלות מתחלקת בין כל החברים - כך שהתשלום הכולל נשאר נמוך בהרבה מפרמיה רגילה. המחיר המדויק יוצג לך בתהליך ההרשמה, בהתאם לפרטי הרכב והנהג.",
      },
      {
        q: "איך אני יודע שהכסף שלי לא הולך לרווחים של מישהו?",
        a: "זה ההבדל המרכזי בינינו לבין חברת ביטוח. דמי הניהול שאתה משלם משמשים לתפעול הפלטפורמה, בדיקות שמאי ושירות לקוחות. כשיש אירוע - הכסף עובר ישירות לחבר שנפגע, לא לכיס שלנו. באזור האישי שלך תוכל לראות בדיוק איך הכסף מתחלק.",
      },
      {
        q: "מה קורה אם יש הרבה אירועים בחודש אחד?",
        a: "יש לנו מנגנון קרן יציבות שמבטיח שגם בחודש עם מספר אירועים חריג, התשלום של כל חבר לא יחרוג באופן משמעותי מהצפוי. בנוסף, מערכת הסינון הקפדנית שלנו מוודאת שהקהילה בנויה מנהגים זהירים - מה שמפחית משמעותית את הסיכון לחודשים כאלה.",
      },
      {
        q: "האם יש עלויות נסתרות?",
        a: "לא. אין עמלות סמויות, אין תוספות מפתיעות, אין 'אותיות קטנות'. דמי הניהול קבועים, ההשתתפות בעלויות של אירועים שקופה לחלוטין, וכל תנועה בחשבון מופיעה באזור האישי שלך. זה בדיוק מה שאנחנו רוצים לשנות בשוק.",
      },
    ],
  },
  {
    id: "join",
    title: "הצטרפות וחברות",
    icon: Users,
    items: [
      {
        q: "מי יכול להצטרף לקהילה?",
        a: "אנחנו מחפשים נהגים אחראיים עם רישיון תקף, ללא היסטוריית נהיגה בעייתית. הסינון הזה הוא מה שמאפשר לנו לשמור על עלויות נמוכות לכולם. בדיקת ההתאמה חינם ולוקחת פחות מ-3 דקות.",
      },
      {
        q: "אני יכול לעזוב מתי שאני רוצה?",
        a: "כן, בכל רגע. אין אצלנו אותיות קטנות, אין קנסות יציאה, ואין התחייבות לשנה. אם הרגשת שזה לא בשבילך - אתה חופשי לעזוב, והחשבון שלך נסגר בצורה מסודרת.",
      },
      {
        q: "מה עושים עם הרכב שלי בזמן שאני חבר?",
        a: "שום דבר לא משתנה. אתה ממשיך לנהוג כרגיל, הרכב שלך נשאר על שמך, וההגנה של הקהילה מתחילה מהרגע שהצטרפת. אנחנו רק דורשים שתמלא את הטפסים הבסיסיים ותספק את פרטי הרכב הנכונים.",
      },
      {
        q: "האם יש מגבלת גיל או סוג רכב?",
        a: "אנחנו מקבלים מגוון רחב של רכבים ונהגים, אך יש קריטריונים מסוימים שנועדו לשמור על איכות הקהילה. בבדיקת ההתאמה תקבל תשובה מיידית האם אתה והרכב שלך מתאימים.",
      },
    ],
  },
  {
    id: "claims",
    title: "תהליך דיווח",
    icon: FileSearch,
    items: [
      {
        q: "איך מדווחים על אירוע?",
        a: "דרך האפליקציה או האזור האישי באתר. אתה מצלם את הנזק, ממלא פרטים בסיסיים, והמערכת מתחילה לטפל. בשלב הראשון AI מבצע ניתוח ראשוני, ולאחר מכן שמאי מוסמך מאשר את הסכום. הכל מתועד בזמן אמת.",
      },
      {
        q: "כמה זמן לוקח לקבל את הכסף?",
        a: "זו אחת היתרונות הגדולים של המודל - התהליך מהיר בהרבה מחברת ביטוח רגילה. אחרי אישור השמאי, הכסף מועבר במהירות. אין בירוקרטיה, אין ויכוחים, אין התשה.",
      },
      {
        q: "מה קורה אם הנהג השני לא מבוטח?",
        a: "כמו בכל מקרה של נזק, האירוע מטופל לפי הנסיבות. הצוות שלנו מלווה אותך בתהליך, כולל סיוע מול הגורמים הרלוונטיים (משטרה, שמאי, מוסך). אנחנו כאן איתך לכל אורך הדרך.",
      },
      {
        q: "האם גניבת רכב מכוסה?",
        a: "אירועים שונים מטופלים בהתאם לתנאי החברות בקהילה, שמפורטים במלואם בתהליך ההצטרפות. באופן כללי, אירועים של נזק, גניבה ופגיעה ברכב מטופלים על ידי הקהילה - בכפוף לתנאים ולתקנות.",
      },
    ],
  },
  {
    id: "tech",
    title: "טכנולוגיה ופרטיות",
    icon: Lock,
    items: [
      {
        q: "איזה מידע אתם שומרים עליי?",
        a: "אנחנו שומרים רק את המידע הנדרש להפעלת הקהילה: פרטי זיהוי, פרטי רכב, היסטוריית אירועים שדיווחת עליהם. אנחנו פועלים בהתאם לחוק הגנת הפרטיות, המידע מוצפן, ולא משותף עם צדדים שלישיים מלבד לצורך הטיפול באירוע שלך.",
      },
      {
        q: "איזה AI אתם משתמשים ולמה?",
        a: "אנחנו משתמשים בטכנולוגיית AI לשני תפקידים: ניתוח ראשוני של תמונות נזק לזירוז התהליך, והצלבת מידע באירועים כדי למנוע הונאות. ההחלטה הסופית בכל אירוע מתקבלת על ידי שמאי אנושי מוסמך - ה-AI הוא כלי עזר בלבד.",
      },
      {
        q: "האם הנתונים שלי בטוחים?",
        a: "אנחנו משתמשים בתקני אבטחה מקובלים בתעשייה: הצפנת TLS לתקשורת, הצפנת מסדי נתונים, גיבויים מוצפנים, והרשאות גישה מוגבלות. אם את/ה רוצה לקרוא בהרחבה על זה - יש לנו עמוד אבטחה מפורט.",
      },
    ],
  },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) =>
          !query ||
          it.q.includes(query) ||
          it.a.includes(query)
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div dir="rtl" className="min-h-screen bg-cream">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-bl from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, #d4a843 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">מרכז התשובות</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            שאלות ותשובות
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            כל מה שרצית לדעת על הקהילה, המודל, והתהליך. אם לא מצאת תשובה - תמיד
            אפשר לפנות אלינו ישירות.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפש שאלה..."
              className="w-full pr-12 pl-4 py-4 rounded-2xl bg-white text-primary border-2 border-transparent focus:border-gold outline-none shadow-xl font-medium"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-primary/60 text-lg">
                לא נמצאו תשובות עבור החיפוש שלך.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-4 text-gold-dark font-bold hover:underline"
              >
                פנה אלינו ישירות ←
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {filtered.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-primary">
                        {cat.title}
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {cat.items.map((item, i) => {
                        const id = `${cat.id}-${i}`;
                        const isOpen = openItem === id;
                        return (
                          <div
                            key={id}
                            className="bg-white rounded-2xl shadow-md border-2 border-wheat-dark/10 overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                setOpenItem(isOpen ? null : id)
                              }
                              className="w-full text-right p-6 flex items-center justify-between gap-4 hover:bg-wheat-light/40 transition-colors"
                            >
                              <span className="font-bold text-primary text-lg">
                                {item.q}
                              </span>
                              <ChevronDown
                                className={`w-5 h-5 text-gold-dark flex-shrink-0 transition-transform ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-6 pb-6 text-primary/70 leading-relaxed border-t border-wheat-dark/10 pt-4">
                                {item.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-gradient-to-bl from-gold via-gold-dark to-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            עדיין יש שאלות?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            הצוות שלנו זמין ויענה על כל שאלה. אין שאלה טיפשית - רק נהג שמתלבט.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-primary font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            <span>פנה אלינו</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
