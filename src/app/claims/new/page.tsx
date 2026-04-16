"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowRight,
  Camera,
  Car,
  Upload,
  CheckCircle,
  FileText,
  MapPin,
  Calendar,
  Lock,
  Zap,
} from "lucide-react";

export default function NewClaimPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    eventDate: "",
    eventTime: "",
    location: "",
    description: "",
    photos: [] as File[],
    policeReport: false,
    policeReportNumber: "",
    thirdPartyInvolved: false,
    thirdPartyDetails: "",
    estimatedDamage: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const photosRef = useRef<HTMLInputElement>(null);

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-12 h-12 text-gold-dark" />
          </div>
          <h1 className="text-3xl font-black text-primary mb-4">
            הדיווח נשלח!
          </h1>
          <p className="text-primary/50 leading-relaxed mb-4">
            ה-AI שלנו מנתח את התמונות ונותן הערכת נזק ראשונית. תקבלו עדכון
            תוך דקות ספורות.
          </p>
          <div className="bg-wheat-light rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary/40">מספר אירוע</span>
              <span className="font-bold text-primary">#128</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary/40">סטטוס</span>
              <span className="text-gold-dark font-bold">בבדיקת AI</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary/40">זמן משוער</span>
              <span className="font-bold text-primary">דקות ספורות</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-green/5 rounded-xl p-3">
              <CheckCircle className="w-5 h-5 text-green" />
              <span className="text-sm text-green">תמונות התקבלו — ניתוח AI בתהליך</span>
            </div>
            <div className="flex items-center gap-3 bg-wheat-light rounded-xl p-3">
              <Zap className="w-5 h-5 text-gold-dark" />
              <span className="text-sm text-primary/50">הערכת נזק ראשונית — בקרוב</span>
            </div>
            <div className="flex items-center gap-3 bg-wheat-light rounded-xl p-3">
              <FileText className="w-5 h-5 text-primary/30" />
              <span className="text-sm text-primary/30">שמאי מורשה — ימונה בהמשך</span>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold mt-8"
          >
            חזרה לדשבורד
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-white border-b border-wheat-dark/20 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary/50 hover:text-primary">
            <ArrowRight className="w-5 h-5" />
            <span className="font-medium">חזרה לדשבורד</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-primary/40">
            <Lock className="w-4 h-4" />
            <span>מאובטח</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-primary">דיווח אירוע חדש</h1>
          <p className="text-primary/40 mt-2">
            מלאו את הפרטים וה-AI שלנו יתחיל לנתח את הנזק מיד
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-wheat-dark/10 p-8 md:p-12">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">פרטי האירוע</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-1.5">
                    תאריך האירוע <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => set("eventDate", e.target.value)}
                    className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-1.5">
                    שעה משוערת
                  </label>
                  <input
                    type="time"
                    value={form.eventTime}
                    onChange={(e) => set("eventTime", e.target.value)}
                    className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-primary mb-1.5">
                    מיקום האירוע <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="כתובת / צומת / תיאור מיקום"
                    className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-primary mb-1.5">
                    תיאור מפורט של האירוע <span className="text-danger">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={4}
                    placeholder="ספרו מה קרה בפירוט..."
                    className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <label className="flex items-center gap-3 bg-wheat-light rounded-xl p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.policeReport}
                    onChange={(e) => set("policeReport", e.target.checked)}
                    className="w-5 h-5 rounded accent-gold"
                  />
                  <span className="text-sm font-medium text-primary">
                    הוגש דו&quot;ח משטרה
                  </span>
                </label>
                <label className="flex items-center gap-3 bg-wheat-light rounded-xl p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.thirdPartyInvolved}
                    onChange={(e) => set("thirdPartyInvolved", e.target.checked)}
                    className="w-5 h-5 rounded accent-gold"
                  />
                  <span className="text-sm font-medium text-primary">
                    מעורב צד שלישי
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-2">
                תמונות הנזק
              </h2>
              <p className="text-primary/40 mb-6">
                העלו תמונות ברורות של הנזק מכל הזוויות. ה-AI ינתח אותן אוטומטית.
              </p>

              <div
                onClick={() => photosRef.current?.click()}
                className="border-2 border-dashed border-wheat-dark/30 rounded-2xl p-12 text-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors"
              >
                <input
                  ref={photosRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    set("photos", [...form.photos, ...files]);
                  }}
                />
                <Camera className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                <p className="text-primary/40 font-medium">
                  לחצו להעלאת תמונות או גררו לכאן
                </p>
                <p className="text-xs text-primary/20 mt-2">
                  JPG, PNG — עד 10 תמונות
                </p>
              </div>

              {form.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
                  {form.photos.map((f, i) => (
                    <div
                      key={i}
                      className="bg-green/5 border border-green/30 rounded-xl p-3 text-center"
                    >
                      <CheckCircle className="w-6 h-6 text-green mx-auto mb-1" />
                      <p className="text-xs text-primary/40 truncate">{f.name}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-bold text-primary mb-1.5">
                  הערכת נזק משוערת (₪)
                </label>
                <input
                  type="text"
                  value={form.estimatedDamage}
                  onChange={(e) => set("estimatedDamage", e.target.value)}
                  placeholder="אופציונלי — אם יש לכם הערכה"
                  className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-wheat-dark/10">
            {step > 0 ? (
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 px-6 py-3 text-primary border-2 border-primary/10 rounded-xl font-medium hover:bg-primary/5 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                חזרה
              </button>
            ) : (
              <div />
            )}

            {step === 0 ? (
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold shadow-lg"
              >
                הבא — העלאת תמונות
                <Camera className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-green to-green-dark text-white rounded-xl font-bold shadow-lg"
              >
                שלחו דיווח
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
