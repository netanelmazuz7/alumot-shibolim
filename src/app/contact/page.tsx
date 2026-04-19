"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend endpoint
    setSubmitted(true);
  };

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
            <MessageCircle className="w-4 h-4 text-gold" />
            <span className="text-sm font-bold text-gold">צרו קשר</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            אנחנו כאן לכל שאלה
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            בין אם אתם רוצים להבין טוב יותר את המודל, זקוקים לעזרה בתהליך
            הרשמה, או שיש לכם הערה - הצוות שלנו זמין וזה יהיה כיף לדבר איתכם.
          </p>
        </div>
      </section>

      {/* Contact channels */}
      <section className="py-16 -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">טלפון</h3>
              <p className="text-primary/70 mb-2">1-800-ALUMOT</p>
              <p className="text-sm text-primary/50">ימים א׳-ה׳, 9:00-18:00</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">
                דוא״ל
              </h3>
              <p className="text-primary/70 mb-2">info@alumat-shibolim.co.il</p>
              <p className="text-sm text-primary/50">מענה תוך 24 שעות</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-wheat-dark/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black text-primary mb-2">משרד</h3>
              <p className="text-primary/70 mb-2">תל אביב, ישראל</p>
              <p className="text-sm text-primary/50">בתיאום מראש</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-wheat-dark/10 p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-3">
                  תודה שפנית אלינו!
                </h3>
                <p className="text-primary/70 mb-6">
                  ההודעה שלך התקבלה. נחזור אליך תוך 24 שעות.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      topic: "general",
                      message: "",
                    });
                  }}
                  className="text-gold-dark font-bold hover:underline"
                >
                  שליחת הודעה נוספת
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-primary mb-2">
                  שליחת הודעה
                </h2>
                <p className="text-primary/60 mb-8">
                  מלא את הטופס ונחזור אליך בהקדם.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-primary font-bold mb-2 text-sm">
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-wheat-dark/20 focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-primary font-bold mb-2 text-sm">
                        טלפון
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-wheat-dark/20 focus:border-gold outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-primary font-bold mb-2 text-sm">
                      דוא״ל
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-wheat-dark/20 focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-bold mb-2 text-sm">
                      נושא הפנייה
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) =>
                        setForm({ ...form, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-wheat-dark/20 focus:border-gold outline-none bg-white"
                    >
                      <option value="general">שאלה כללית</option>
                      <option value="join">הצטרפות לקהילה</option>
                      <option value="claim">דיווח על אירוע</option>
                      <option value="billing">חיוב ותשלומים</option>
                      <option value="tech">תמיכה טכנית</option>
                      <option value="press">פנייה עיתונאית</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-primary font-bold mb-2 text-sm">
                      תוכן ההודעה
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-wheat-dark/20 focus:border-gold outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-l from-gold via-gold-dark to-gold text-white font-black text-lg px-8 py-4 rounded-xl shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    שלח הודעה
                  </button>
                  <p className="text-xs text-primary/50 text-center">
                    בלחיצה על &quot;שלח&quot; אתה מאשר כי קראת את{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-gold-dark"
                    >
                      מדיניות הפרטיות
                    </Link>
                    . המידע שלך מוצפן ולא ישותף עם צדדים שלישיים.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-cream rounded-2xl p-6">
              <Shield className="w-10 h-10 text-gold-dark flex-shrink-0" />
              <div>
                <h4 className="font-black text-primary mb-1">
                  הפניות מוצפנות
                </h4>
                <p className="text-sm text-primary/70">
                  כל הודעה שאתה שולח עוברת בערוץ מאובטח ומוצפן.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-cream rounded-2xl p-6">
              <Clock className="w-10 h-10 text-gold-dark flex-shrink-0" />
              <div>
                <h4 className="font-black text-primary mb-1">מענה מהיר</h4>
                <p className="text-sm text-primary/70">
                  אנחנו מתחייבים לחזור לכל פנייה תוך 24 שעות עסקים.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
