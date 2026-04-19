import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import WheatLogo from "./WheatLogo";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-md">
                <WheatLogo className="text-white" size={30} />
              </div>
              <span className="text-lg font-bold">אלומת שיבולים</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              קהילת הגנה הדדית לרכבים בישראל. יחד אנחנו חוסכים אלפי שקלים בשנה
              על הגנה מקיפה לרכב.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                  מי אנחנו
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/60 hover:text-white transition-colors">
                  איך זה עובד
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="text-white/60 hover:text-white transition-colors">
                  תנאי הצטרפות
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-white/60 hover:text-white transition-colors">
                  בדיקת התאמה
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-white/60 hover:text-white transition-colors">
                  הקהילה שלנו
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gold mb-4">תמיכה ומידע</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-white/60 hover:text-white transition-colors">
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  צרו קשר
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-white/60 hover:text-white transition-colors">
                  אבטחה ופרטיות
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  תקנון השימוש
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement" className="text-white/60 hover:text-white transition-colors">
                  הצהרת נגישות
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gold mb-4">צרו קשר</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/60">
                <Phone className="w-4 h-4 text-gold" />
                <span>1-800-ALUMOT</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@alumot-shibolim.co.il</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4 text-gold" />
                <span>תל אביב, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} אלומת שיבולים. כל הזכויות שמורות.</p>
          <p className="mt-1">
            פלטפורמת עזרה הדדית - אינה חברת ביטוח | פועלת בהתאם לחוק הגנת הפרטיות
          </p>
        </div>
      </div>
    </footer>
  );
}
