"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  User,
  Camera,
  Car,
  FileText,
  ShieldCheck,
  CheckCircle,
  Upload,
  Info,
  Lock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import WheatLogo from "@/components/WheatLogo";
import DatePicker from "@/components/DatePicker";
import CarSelect from "@/components/CarSelect";
import CitySelect from "@/components/CitySelect";
import VerifiedInput from "@/components/VerifiedInput";
import { highRiskCities } from "@/lib/israeliCars";

type FormData = {
  // Step 1
  fullName: string;
  idNumber: string;
  birthDate: string;
  gender: string;
  city: string;
  street: string;
  phone: string;
  phoneVerified: boolean;
  email: string;
  emailVerified: boolean;
  maritalStatus: string;
  incomeRange: string;
  hasCriminalRecord: string;
  // Step 2
  idFrontFile: File | null;
  idBackFile: File | null;
  selfieFile: File | null;
  // Step 3
  licensePlate: string;
  manufacturer: string;
  model: string;
  year: string;
  marketValue: string;
  mileage: string;
  usage: string;
  carPhotos: File[];
  // Step 4
  drivingYears: string;
  currentInsurer: string;
  claimsCount: string;
  trafficViolations: string;
  // Step 5
  consentCriminal: boolean;
  consentCredit: boolean;
  consentInsurance: boolean;
  consentVehicle: boolean;
  consentClaims: boolean;
  consentEmployment: boolean;
  agreeTerms: boolean;
};

const initialForm: FormData = {
  fullName: "",
  idNumber: "",
  birthDate: "",
  gender: "",
  city: "",
  street: "",
  phone: "",
  phoneVerified: false,
  email: "",
  emailVerified: false,
  maritalStatus: "",
  incomeRange: "",
  hasCriminalRecord: "",
  idFrontFile: null,
  idBackFile: null,
  selfieFile: null,
  licensePlate: "",
  manufacturer: "",
  model: "",
  year: "",
  marketValue: "",
  mileage: "",
  usage: "",
  carPhotos: [],
  drivingYears: "",
  currentInsurer: "",
  claimsCount: "",
  trafficViolations: "",
  consentCriminal: false,
  consentCredit: false,
  consentInsurance: false,
  consentVehicle: false,
  consentClaims: false,
  consentEmployment: false,
  agreeTerms: false,
};

const steps = [
  { icon: User, label: "פרטים אישיים" },
  { icon: Camera, label: "אימות זהות" },
  { icon: Car, label: "פרטי הרכב" },
  { icon: FileText, label: "היסטוריית נהיגה" },
  { icon: ShieldCheck, label: "הסכמות ובדיקה" },
];

// Calculate candidate score (0-100) with auto-disqualifiers
type ScoreResult = {
  score: number;
  accepted: boolean;
  disqualified: boolean;
  reasons: string[];
};

function calculateScore(form: FormData): ScoreResult {
  const reasons: string[] = [];
  let disqualified = false;

  // Auto-disqualifiers (cannot pass under any condition)
  if (form.hasCriminalRecord === "yes") {
    disqualified = true;
    reasons.push("עבר פלילי פעיל - פסילה אוטומטית");
  }

  if (form.claimsCount === "3 ומעלה") {
    disqualified = true;
    reasons.push("3 אירועים ומעלה ב-3 שנים אחרונות - פסילה אוטומטית");
  }

  if (form.trafficViolations === "3 ומעלה") {
    disqualified = true;
    reasons.push("3 עבירות תנועה ומעלה בשנה האחרונה - פסילה אוטומטית");
  }

  // Birth date check - under 25
  if (form.birthDate) {
    const age = Math.floor(
      (Date.now() - new Date(form.birthDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );
    if (age < 25) {
      disqualified = true;
      reasons.push(`גיל ${age} - מינימום לחברות הוא 25`);
    }
  }

  // Scoring calculation
  let score = 0;

  // Claims history (0-30)
  if (form.claimsCount === "0") score += 30;
  else if (form.claimsCount === "1") score += 15;
  else if (form.claimsCount === "2") score += 5;

  // Traffic violations (0-15)
  if (form.trafficViolations === "0") score += 15;
  else if (form.trafficViolations === "1") score += 8;
  else if (form.trafficViolations === "2") score += 3;

  // Age (0-15)
  if (form.birthDate) {
    const age = Math.floor(
      (Date.now() - new Date(form.birthDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );
    if (age >= 30 && age <= 55) score += 15;
    else if (age >= 25 && age < 30) score += 10;
    else if (age > 55 && age <= 65) score += 10;
    else if (age > 65) score += 5;
  }

  // Driving experience (0-15)
  if (form.drivingYears === "15+ שנים") score += 15;
  else if (form.drivingYears === "10-15 שנים") score += 13;
  else if (form.drivingYears === "5-10 שנים") score += 10;
  else if (form.drivingYears === "3-5 שנים") score += 5;

  // Marital status (0-5)
  if (form.maritalStatus === "נשוי/אה") score += 5;
  else if (form.maritalStatus === "גרוש/ה") score += 2;

  // Income (0-10)
  if (form.incomeRange === "מעל 25,000 ₪") score += 10;
  else if (form.incomeRange === "15,000-25,000 ₪") score += 8;
  else if (form.incomeRange === "10,000-15,000 ₪") score += 5;
  else if (form.incomeRange === "5,000-10,000 ₪") score += 3;

  // Residence risk - high-theft cities lose points (up to -15)
  if (form.city && highRiskCities.includes(form.city.trim())) {
    score -= 15;
    reasons.push(
      "עיר מגורים ברמת סיכון גבוהה לגניבות רכב - הציון הופחת ב-15 נק'"
    );
  } else if (form.city) {
    score += 10;
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  // Require score >= 90 for acceptance (plus no disqualifiers)
  const accepted = !disqualified && score >= 90;

  return { score, accepted, disqualified, reasons };
}

export default function JoinPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const set = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Step-level validation - returns list of missing field labels
  const getStepErrors = (s: number): string[] => {
    const errs: string[] = [];
    if (s === 0) {
      if (!form.fullName.trim()) errs.push("שם מלא");
      if (form.idNumber.length !== 9) errs.push("מספר ת.ז חייב 9 ספרות");
      if (!form.birthDate) errs.push("תאריך לידה");
      if (!form.gender) errs.push("מין");
      if (!form.city) errs.push("עיר מגורים");
      if (!form.street.trim()) errs.push("רחוב ומספר");
      if (!form.phone.trim()) errs.push("טלפון");
      else if (!form.phoneVerified) errs.push("אימות טלפון (קוד SMS)");
      if (!form.email.trim()) errs.push('דוא"ל');
      else if (!form.emailVerified) errs.push("אימות מייל (קוד)");
      if (!form.maritalStatus) errs.push("מצב משפחתי");
      if (!form.hasCriminalRecord) errs.push("שאלת עבר פלילי");
    }
    if (s === 1) {
      if (!form.idFrontFile) errs.push("תמונת ת.ז קדמית");
      if (!form.idBackFile) errs.push("תמונת ת.ז אחורית");
      if (!form.selfieFile) errs.push("סלפי עם ת.ז");
    }
    if (s === 2) {
      if (!form.licensePlate || form.licensePlate.length < 7)
        errs.push("מספר רישוי (7-8 ספרות)");
      if (!form.manufacturer) errs.push("יצרן");
      if (!form.model) errs.push("דגם");
      if (!form.year || form.year.length !== 4) errs.push("שנת ייצור");
      if (!form.marketValue) errs.push("שווי שוק");
      if (!form.mileage) errs.push("קילומטראז'");
      if (!form.usage) errs.push("מטרת שימוש");
      const validPhotos = form.carPhotos.filter(Boolean).length;
      if (validPhotos < 4) errs.push(`4 תמונות רכב (הועלו ${validPhotos})`);
    }
    if (s === 3) {
      if (!form.drivingYears) errs.push("שנות ניסיון");
      if (!form.claimsCount) errs.push("מספר אירועים");
      if (!form.trafficViolations) errs.push("עבירות תנועה");
    }
    if (s === 4) {
      if (!form.consentCriminal) errs.push("הסכמה לבדיקת עבר פלילי");
      if (!form.consentCredit) errs.push("הסכמה לבדיקת אשראי");
      if (!form.consentInsurance) errs.push("הסכמה להיסטוריית נהיגה");
      if (!form.consentVehicle) errs.push("הסכמה לבדיקת נתוני רכב");
      if (!form.consentClaims) errs.push("הסכמה לבדיקת מאגר דיווחים");
      if (!form.agreeTerms) errs.push("אישור תקנון ופרטיות");
    }
    return errs;
  };

  // Gather missing fields across ALL steps, grouped by step
  const allStepsErrors = [0, 1, 2, 3, 4].map((i) => ({
    step: i,
    label: steps[i].label,
    errors: getStepErrors(i),
  }));
  const totalMissingCount = allStepsErrors.reduce(
    (sum, s) => sum + s.errors.length,
    0
  );
  const canSubmit = totalMissingCount === 0;

  // Free navigation - no blocking between steps
  const next = () => {
    setStep((s) => Math.min(s + 1, 4));
  };
  const prev = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      setShowValidation(true);
      // Scroll to top to make sure user sees the error panel
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const res = calculateScore(form);
    setResult(res);
    setSubmitted(true);
  };

  if (submitted && result) {
    const { score, accepted, disqualified, reasons } = result;
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 max-w-xl w-full text-center">
          {accepted ? (
            <>
              <div className="w-24 h-24 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-green" />
              </div>
              <h1 className="text-4xl font-black text-primary mb-3">
                ברוכים הבאים לקהילה! 🌾
              </h1>
              <div className="inline-flex items-center gap-2 bg-green/10 border-2 border-green/30 rounded-full px-5 py-2 mb-5">
                <span className="font-bold text-green">
                  ניקוד שלכם: {score}/100
                </span>
              </div>
              <p className="text-primary/60 leading-relaxed mb-6">
                מזל טוב! עברתם את תהליך הסינון הקפדני שלנו. חבר/ה מהצוות יצור
                איתכם קשר תוך <strong className="text-primary">48 שעות</strong>{" "}
                להשלמת תהליך ההצטרפות.
              </p>
            </>
          ) : disqualified ? (
            <>
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-16 h-16 text-danger" />
              </div>
              <h1 className="text-3xl font-black text-primary mb-3">
                לצערנו, אינכם עומדים בתנאי סף
              </h1>
              <p className="text-primary/60 leading-relaxed mb-5">
                הקריטריונים שלנו נועדו לשמור על קהילה בטוחה ואיכותית - וחלק מהם
                הם תנאי סף שאינם גמישים.
              </p>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-6 text-right">
                <p className="font-bold text-danger mb-3">סיבת הדחייה:</p>
                <ul className="space-y-2">
                  {reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-primary/70">
                      <XCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-16 h-16 text-orange-500" />
              </div>
              <h1 className="text-3xl font-black text-primary mb-3">
                ציון מתחת לסף
              </h1>
              <div className="inline-flex items-center gap-2 bg-orange-100 border-2 border-orange-300 rounded-full px-5 py-2 mb-5">
                <span className="font-bold text-orange-700">
                  ניקוד שלכם: {score}/100 (נדרש: 90+)
                </span>
              </div>
              <p className="text-primary/60 leading-relaxed mb-5">
                הציון שלכם לא הגיע לסף הנדרש של 90 נקודות. אתם מוזמנים להגיש
                שוב בעוד תקופה, או לפנות אלינו לבירור פרטני.
              </p>
              {reasons.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6 text-right">
                  <p className="font-bold text-orange-700 mb-2 text-sm">נקודות לתשומת לב:</p>
                  <ul className="space-y-1 text-sm text-primary/60">
                    {reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold"
            >
              חזרה לדף הבית
            </Link>
            {!accepted && (
              <a
                href="mailto:info@alumot-shibolim.co.il"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary border-2 border-primary/20 rounded-xl font-bold hover:border-primary/40 transition-colors"
              >
                פנייה לצוות
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-white border-b border-wheat-dark/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-md">
              <WheatLogo className="text-white" size={28} />
            </div>
            <span className="font-bold text-primary">אלומת שיבולים</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-primary/40">
            <Lock className="w-4 h-4" />
            <span>חיבור מאובטח</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    i < step
                      ? "bg-green text-white"
                      : i === step
                      ? "bg-gradient-to-br from-gold to-gold-dark text-white shadow-lg"
                      : "bg-wheat text-primary/30"
                  }`}
                >
                  {i < step ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <s.icon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i <= step ? "text-primary" : "text-primary/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-wheat rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-gold to-gold-dark rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-primary/40 mt-2">
            שלב {step + 1} מתוך 5
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-wheat-dark/10 p-8 md:p-12">
          {/* Step 1: Personal Details */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                פרטים אישיים
              </h2>
              <p className="text-primary/40 mb-8">
                הזינו את הפרטים האישיים שלכם.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="שם מלא"
                  required
                  value={form.fullName}
                  onChange={(v) => set("fullName", v)}
                  placeholder="ישראל ישראלי"
                />
                <InputField
                  label="מספר תעודת זהות"
                  required
                  value={form.idNumber}
                  onChange={(v) => set("idNumber", v)}
                  placeholder="000000000"
                  maxLength={9}
                  numeric
                />
                <DatePicker
                  label="תאריך לידה"
                  required
                  value={form.birthDate}
                  onChange={(v) => set("birthDate", v)}
                />
                <SelectField
                  label="מין"
                  required
                  value={form.gender}
                  onChange={(v) => set("gender", v)}
                  options={["", "זכר", "נקבה", "אחר"]}
                  labels={["בחרו", "זכר", "נקבה", "אחר"]}
                />
                <CitySelect
                  label="עיר מגורים"
                  required
                  value={form.city}
                  onChange={(v) => set("city", v)}
                />
                <InputField
                  label="רחוב ומספר"
                  required
                  value={form.street}
                  onChange={(v) => set("street", v)}
                  placeholder="הרצל 1"
                />
                <VerifiedInput
                  type="phone"
                  label="טלפון נייד"
                  required
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  verified={form.phoneVerified}
                  onVerifiedChange={(v) => set("phoneVerified", v)}
                  placeholder="050-0000000"
                />
                <VerifiedInput
                  type="email"
                  label='דוא"ל'
                  required
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  verified={form.emailVerified}
                  onVerifiedChange={(v) => set("emailVerified", v)}
                  placeholder="name@email.com"
                />
                <SelectField
                  label="מצב משפחתי"
                  required
                  value={form.maritalStatus}
                  onChange={(v) => set("maritalStatus", v)}
                  options={["", "רווק/ה", "נשוי/אה", "גרוש/ה", "אלמן/ה"]}
                  labels={["בחרו", "רווק/ה", "נשוי/אה", "גרוש/ה", "אלמן/ה"]}
                />
                <SelectField
                  label="טווח הכנסה חודשית נטו (אופציונלי)"
                  value={form.incomeRange}
                  onChange={(v) => set("incomeRange", v)}
                  options={[
                    "",
                    "עד 5,000 ₪",
                    "5,000-10,000 ₪",
                    "10,000-15,000 ₪",
                    "15,000-25,000 ₪",
                    "מעל 25,000 ₪",
                  ]}
                  labels={[
                    "בחרו (אופציונלי)",
                    "עד 5,000 ₪",
                    "5,000-10,000 ₪",
                    "10,000-15,000 ₪",
                    "15,000-25,000 ₪",
                    "מעל 25,000 ₪",
                  ]}
                />
              </div>

              {/* Criminal record - mandatory disqualifier question */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-primary mb-2">
                  האם יש לך עבר פלילי פעיל? <span className="text-danger">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => set("hasCriminalRecord", "no")}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                      form.hasCriminalRecord === "no"
                        ? "bg-green text-white border-green shadow-md"
                        : "bg-white text-primary/60 border-wheat-dark/30 hover:border-green/40"
                    }`}
                  >
                    לא - אין לי עבר פלילי
                  </button>
                  <button
                    type="button"
                    onClick={() => set("hasCriminalRecord", "yes")}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                      form.hasCriminalRecord === "yes"
                        ? "bg-danger text-white border-danger shadow-md"
                        : "bg-white text-primary/60 border-wheat-dark/30 hover:border-danger/40"
                    }`}
                  >
                    כן, יש לי
                  </button>
                </div>
                {form.hasCriminalRecord === "yes" && (
                  <div className="mt-3 flex items-start gap-2 bg-red-50 rounded-xl p-3 border border-red-200">
                    <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                    <p className="text-sm text-danger">
                      עבר פלילי פעיל הוא תנאי סף - לצערנו לא ניתן להתקבל לקהילה
                      עם עבר פלילי.
                    </p>
                  </div>
                )}
              </div>

              {/* High-risk city warning */}
              {form.city && highRiskCities.includes(form.city) && (
                <div className="mt-4 flex items-start gap-2 bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-700">
                    שימו לב: עיר המגורים שלכם ברמת סיכון גבוהה לגניבות רכב.
                    זה עשוי להפחית את הציון שלכם בבדיקה.
                  </p>
                </div>
              )}

              <div className="mt-6 flex items-start gap-2 bg-blue-50 rounded-xl p-4">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  טווח ההכנסה אופציונלי אך עשוי לשפר את הניקוד שלכם בבדיקה.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Identity Verification */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                אימות זהות
              </h2>
              <p className="text-primary/40 mb-8">
                צלמו את תעודת הזהות שלכם משני הצדדים + סלפי עם ת.ז ביד. הנתונים
                מאומתים מול מאגר האוכלוסין.
              </p>
              <div className="mb-6 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700">
                  התמונות נמחקות אוטומטית לאחר האימות. פרטים נוספים ב
                  <Link href="/privacy" className="font-bold underline">מדיניות הפרטיות</Link>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUploadBox
                  label="צד קדמי של ת.ז"
                  icon={Camera}
                  file={form.idFrontFile}
                  onFile={(f) => set("idFrontFile", f)}
                  accept="image/*"
                />
                <FileUploadBox
                  label="צד אחורי של ת.ז"
                  icon={Camera}
                  file={form.idBackFile}
                  onFile={(f) => set("idBackFile", f)}
                  accept="image/*"
                />
                <FileUploadBox
                  label="סלפי עם ת.ז ביד"
                  icon={User}
                  file={form.selfieFile}
                  onFile={(f) => set("selfieFile", f)}
                  accept="image/*"
                />
              </div>

              <div className="mt-8 bg-wheat-light rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green" />
                  אימות אוטומטי
                </h3>
                <ul className="space-y-2 text-sm text-primary/50">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green/50" />
                    התמונות מאומתות מול מאגר האוכלוסין
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green/50" />
                    זיהוי פנים מוודא התאמה בין הסלפי לתמונת ת.ז
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green/50" />
                    התמונות נמחקות אוטומטית מיד לאחר האימות
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                פרטי הרכב
              </h2>
              <p className="text-primary/40 mb-8">
                הזינו את מספר הרישוי - נשלוף את פרטי הרכב אוטומטית. העלו 4
                תמונות של הרכב מכל הצדדים.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField
                    label="מספר רישוי"
                    required
                    value={form.licensePlate}
                    onChange={(v) => set("licensePlate", v)}
                    placeholder="12345678"
                    numeric
                    maxLength={8}
                    hint="עד 8 ספרות - שליפת פרטי הרכב אוטומטית מרשות הרישוי"
                  />
                </div>
                <CarSelect
                  manufacturer={form.manufacturer}
                  model={form.model}
                  onManufacturerChange={(v) => set("manufacturer", v)}
                  onModelChange={(v) => set("model", v)}
                />
                <InputField
                  label="שנת ייצור"
                  value={form.year}
                  onChange={(v) => set("year", v)}
                  placeholder="2023"
                  numeric
                  maxLength={4}
                />
                <InputField
                  label="שווי שוק משוער (₪)"
                  value={form.marketValue}
                  onChange={(v) => set("marketValue", v)}
                  placeholder="120000"
                  numeric
                  maxLength={9}
                />
                <InputField
                  label="קילומטראז'"
                  value={form.mileage}
                  onChange={(v) => set("mileage", v)}
                  placeholder="45000"
                  numeric
                  maxLength={7}
                />
                <SelectField
                  label="מטרת שימוש"
                  required
                  value={form.usage}
                  onChange={(v) => set("usage", v)}
                  options={["", "פרטי", "עסקי", "מסחרי"]}
                  labels={["בחרו", "פרטי", "עסקי", "מסחרי"]}
                />
              </div>

              <div className="mt-8">
                <label className="block text-sm font-bold text-primary mb-3">
                  4 תמונות הרכב מכל הצדדים{" "}
                  <span className="text-danger">*</span>
                </label>
                <p className="text-xs text-primary/40 mb-4">
                  קדמי, אחורי, ימין ושמאל - ה-AI שלנו מנתח אוטומטית נזקים
                  קיימים
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["קדמי", "אחורי", "צד ימין", "צד שמאל"].map(
                    (side, i) => (
                      <FileUploadBox
                        key={side}
                        label={side}
                        icon={Car}
                        file={form.carPhotos[i] || null}
                        onFile={(f) => {
                          const photos = [...form.carPhotos];
                          if (f) photos[i] = f;
                          set("carPhotos", photos);
                        }}
                        accept="image/*"
                        small
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Insurance History */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                היסטוריית נהיגה
              </h2>
              <p className="text-primary/40 mb-8">
                מידע על הניסיון שלכם בנהיגה ועל עברכם כנהגים. זה חלק חשוב
                בחישוב הניקוד.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="שנות ניסיון נהיגה"
                  required
                  value={form.drivingYears}
                  onChange={(v) => set("drivingYears", v)}
                  options={[
                    "",
                    "פחות משנה",
                    "1-3 שנים",
                    "3-5 שנים",
                    "5-10 שנים",
                    "10-15 שנים",
                    "15+ שנים",
                  ]}
                  labels={[
                    "בחרו",
                    "פחות משנה",
                    "1-3 שנים",
                    "3-5 שנים",
                    "5-10 שנים",
                    "10-15 שנים",
                    "15+ שנים",
                  ]}
                />
                <InputField
                  label="הסדר הגנה נוכחי (אופציונלי)"
                  value={form.currentInsurer}
                  onChange={(v) => set("currentInsurer", v)}
                  placeholder="שם הגורם הנוכחי"
                />
                <SelectField
                  label="מספר אירועים/דיווחים ב-3 שנים אחרונות"
                  required
                  value={form.claimsCount}
                  onChange={(v) => set("claimsCount", v)}
                  options={["", "0", "1", "2", "3 ומעלה"]}
                  labels={["בחרו", "0 - ללא אירועים", "1", "2", "3 ומעלה"]}
                />
                <SelectField
                  label="עבירות תנועה בשנה האחרונה"
                  required
                  value={form.trafficViolations}
                  onChange={(v) => set("trafficViolations", v)}
                  options={["", "0", "1", "2", "3 ומעלה"]}
                  labels={["בחרו", "0 - ללא עבירות", "1", "2", "3 ומעלה"]}
                />
              </div>

              {form.claimsCount === "3 ומעלה" && (
                <div className="mt-6 flex items-start gap-2 bg-red-50 rounded-xl p-4 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <p className="text-sm text-danger">
                    שימו לב: 3 אירועים ומעלה ב-3 שנים אחרונות עלולים להוביל
                    לדחיית הבקשה. אנחנו מעודדים אתכם להגיש בכל מקרה - כל בקשה
                    נבדקת באופן אישי.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* Step 5: Consent & Background Check */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                הסכמות לבדיקת רקע
              </h2>
              <p className="text-primary/40 mb-8">
                כדי להבטיח קהילה בטוחה ואמינה, אנחנו מצלבים נתונים מול מאגרים
                רשמיים. נתנו הסכמתכם לבדיקות הבאות:
              </p>

              <div className="space-y-4">
                <ConsentCheckbox
                  checked={form.consentCriminal}
                  onChange={(v) => set("consentCriminal", v)}
                  title="בדיקת עבר פלילי"
                  desc="אימות מול מאגר משטרת ישראל"
                  required
                />
                <ConsentCheckbox
                  checked={form.consentCredit}
                  onChange={(v) => set("consentCredit", v)}
                  title="בדיקת דירוג אשראי"
                  desc="אימות מול BDI / נתוני אשראי"
                  required
                />
                <ConsentCheckbox
                  checked={form.consentInsurance}
                  onChange={(v) => set("consentInsurance", v)}
                  title="בדיקת היסטוריית נהיגה"
                  desc="אימות מול מאגרי נתונים רלוונטיים (3 שנים אחרונות)"
                  required
                />
                <ConsentCheckbox
                  checked={form.consentVehicle}
                  onChange={(v) => set("consentVehicle", v)}
                  title="בדיקת נתוני רכב"
                  desc="רשות הרישוי - שווי שוק, עבר תאונות"
                  required
                />
                <ConsentCheckbox
                  checked={form.consentClaims}
                  onChange={(v) => set("consentClaims", v)}
                  title='בדיקת מאגר דיווחים ("מאגר הנהגים")'
                  desc="היסטוריית דיווחים ואירועים"
                  required
                />
                <ConsentCheckbox
                  checked={form.consentEmployment}
                  onChange={(v) => set("consentEmployment", v)}
                  title="נתוני שכר ותעסוקה (אופציונלי)"
                  desc="עשוי לשפר את הניקוד שלכם"
                />
              </div>

              <div className="mt-8 border-t border-wheat-dark/20 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => set("agreeTerms", e.target.checked)}
                    className="w-5 h-5 mt-1 rounded border-primary/30 text-gold accent-gold"
                  />
                  <span className="text-sm text-primary/60 group-hover:text-primary transition-colors">
                    קראתי ואני מסכים/ה ל
                    <Link href="/terms" className="text-gold-dark font-bold underline">
                      תקנון השימוש
                    </Link>{" "}
                    ול
                    <Link href="/privacy" className="text-gold-dark font-bold underline">
                      מדיניות הפרטיות
                    </Link>{" "}
                    של אלומת שיבולים.
                  </span>
                </label>
              </div>

              <div className="mt-6 bg-green/5 rounded-2xl p-6 border border-green/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-green" />
                  <span className="font-bold text-green">
                    תהליך הבדיקה
                  </span>
                </div>
                <p className="text-sm text-primary/40">
                  תוצאת הבקשה תימסר תוך 48 שעות לאחר בדיקה ידנית של הצוות.
                  הצלבת הנתונים נעשית מול מאגרים רשמיים בלבד.
                </p>
              </div>
            </div>
          )}

          {/* Validation errors display - ONLY shown after trying to submit */}
          {showValidation && totalMissingCount > 0 && (
            <div className="mt-8 bg-red-50 border-2 border-red-300 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-7 h-7 text-danger shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-black text-danger text-lg mb-1">
                    לא ניתן לשלוח את הטופס
                  </p>
                  <p className="text-sm text-danger/80">
                    חסרים <strong>{totalMissingCount}</strong> שדות חובה. יש
                    להשלים את הפרטים הבאים:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {allStepsErrors
                  .filter((s) => s.errors.length > 0)
                  .map((s) => (
                    <div
                      key={s.step}
                      className="bg-white rounded-xl p-4 border border-red-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-primary">
                          שלב {s.step + 1}: {s.label}
                        </p>
                        <button
                          type="button"
                          onClick={() => setStep(s.step)}
                          className="text-xs font-bold text-gold-dark hover:underline"
                        >
                          עבור לשלב זה ←
                        </button>
                      </div>
                      <ul className="text-sm text-danger/90 space-y-1">
                        {s.errors.map((err, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 shrink-0" />
                            {err}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-wheat-dark/10">
            {step > 0 ? (
              <button
                onClick={prev}
                className="flex items-center gap-2 px-6 py-3 text-primary border-2 border-primary/10 rounded-xl font-medium hover:bg-primary/5 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                הקודם
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                הבא
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-green to-green-dark text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                שלחו בקשת הצטרפות
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Subtle hint on last step if fields still missing */}
          {step === 4 && !canSubmit && !showValidation && (
            <p className="mt-3 text-center text-sm text-primary/50">
              💡 טיפ: השדות עם * הם חובה. אם משהו חסר - לחיצה על &ldquo;שלחו&rdquo; תציג לך את הרשימה.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ FORM COMPONENTS ============ */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  maxLength,
  numeric,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  numeric?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-primary mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={numeric ? "text" : type}
        inputMode={numeric ? "numeric" : undefined}
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          if (numeric) {
            const digits = raw.replace(/\D/g, "").slice(0, maxLength);
            onChange(digits);
          } else {
            onChange(raw);
          }
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
      />
      {hint && <p className="text-xs text-primary/30 mt-1">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  labels,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labels: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-primary mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-wheat-light border border-wheat-dark/30 rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
      >
        {options.map((opt, i) => (
          <option key={opt} value={opt}>
            {labels[i]}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileUploadBox({
  label,
  icon: Icon,
  file,
  onFile,
  accept,
  small,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  file: File | null;
  onFile: (f: File | null) => void;
  accept: string;
  small?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-gold hover:bg-gold/5 ${
        file ? "border-green bg-green/5" : "border-wheat-dark/30"
      } ${small ? "p-4" : "p-8"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
      />
      {file ? (
        <>
          <CheckCircle
            className={`text-green mb-2 ${small ? "w-6 h-6" : "w-8 h-8"}`}
          />
          <span className="text-xs text-green font-medium text-center truncate max-w-full px-2">
            {file.name}
          </span>
        </>
      ) : (
        <>
          <Icon
            className={`text-primary/20 mb-2 ${small ? "w-6 h-6" : "w-10 h-10"}`}
          />
          <span
            className={`text-primary/30 font-medium text-center ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            {label}
          </span>
          <span className="text-xs text-primary/20 mt-1">לחצו להעלאה</span>
        </>
      )}
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  title,
  desc,
  required,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-4 p-4 bg-wheat-light rounded-2xl cursor-pointer hover:bg-wheat transition-colors border border-transparent hover:border-gold/20">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 mt-0.5 rounded border-primary/30 text-gold accent-gold"
      />
      <div>
        <span className="font-bold text-primary text-sm">
          {title}
          {required && <span className="text-danger mr-1">*</span>}
        </span>
        <p className="text-xs text-primary/40 mt-0.5">{desc}</p>
      </div>
    </label>
  );
}
