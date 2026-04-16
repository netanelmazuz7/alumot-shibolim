"use client";

import { useState } from "react";
import { CheckCircle, Mail, Phone, Send, Loader2, X } from "lucide-react";

type Props = {
  type: "email" | "phone";
  label: string;
  value: string;
  onChange: (v: string) => void;
  verified: boolean;
  onVerifiedChange: (v: boolean) => void;
  placeholder?: string;
  required?: boolean;
};

export default function VerifiedInput({
  type,
  label,
  value,
  onChange,
  verified,
  onVerifiedChange,
  placeholder,
  required,
}: Props) {
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const Icon = type === "email" ? Mail : Phone;

  const isValidInput =
    type === "email"
      ? /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value.trim())
      : /^0\d{8,9}$/.test(value.replace(/[-\s]/g, ""));

  const handleSend = async () => {
    setError(null);
    setSending(true);
    // Simulate sending — in production, call backend API
    await new Promise((r) => setTimeout(r, 900));
    // Generate 6-digit code (for demo, always use 123456)
    const code = "123456";
    setSentCode(code);
    setSending(false);
    setOtpOpen(true);
  };

  const handleVerify = async () => {
    setError(null);
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 600));
    if (otp === sentCode) {
      onVerifiedChange(true);
      setOtpOpen(false);
      setOtp("");
    } else {
      setError("קוד שגוי — נסה שוב");
    }
    setVerifying(false);
  };

  const handleChangeValue = (v: string) => {
    onChange(v);
    if (verified) onVerifiedChange(false);
    setOtpOpen(false);
    setOtp("");
    setSentCode(null);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-primary mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
        {verified && (
          <span className="inline-flex items-center gap-1 text-xs text-green font-bold mr-2">
            <CheckCircle className="w-3.5 h-3.5" /> מאומת
          </span>
        )}
      </label>

      <div className="relative">
        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
        <input
          type={type === "email" ? "email" : "tel"}
          value={value}
          onChange={(e) => handleChangeValue(e.target.value)}
          placeholder={placeholder}
          disabled={verified}
          className={`w-full pr-10 pl-28 py-3 bg-wheat-light border-2 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors ${
            verified
              ? "border-green/40 bg-green/5"
              : "border-wheat-dark/30"
          }`}
        />
        {!verified && (
          <button
            type="button"
            disabled={!isValidInput || sending}
            onClick={handleSend}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-l from-gold to-gold-dark text-white text-xs font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all"
          >
            {sending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                שולח...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                שלח קוד
              </>
            )}
          </button>
        )}
        {verified && (
          <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-green" />
        )}
      </div>

      {/* OTP panel */}
      {otpOpen && !verified && (
        <div className="mt-3 bg-white border-2 border-gold/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-primary">
              הזן קוד בן 6 ספרות ש{type === "email" ? "נשלח למייל" : "נשלח ב-SMS"}
            </p>
            <button
              type="button"
              onClick={() => setOtpOpen(false)}
              className="text-primary/40 hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 text-xs text-blue-700">
            <strong>מצב דמו:</strong> הקוד הוא <code className="bg-blue-100 px-1.5 py-0.5 rounded font-bold">123456</code>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ""));
                setError(null);
              }}
              placeholder="______"
              className="flex-1 px-4 py-2.5 bg-wheat-light border-2 border-wheat-dark/30 rounded-lg text-primary tracking-[0.5em] text-center font-bold focus:outline-none focus:border-gold"
              autoFocus
            />
            <button
              type="button"
              disabled={otp.length !== 6 || verifying}
              onClick={handleVerify}
              className="px-5 py-2.5 bg-gradient-to-l from-green to-green-dark text-white font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all flex items-center gap-1"
            >
              {verifying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              אמת
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-danger font-bold">{error}</p>
          )}
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="mt-2 text-xs text-gold-dark font-bold hover:underline"
          >
            שלח קוד מחדש
          </button>
        </div>
      )}

      {!isValidInput && value && !otpOpen && (
        <p className="text-xs text-orange-600 mt-1">
          {type === "email"
            ? "פורמט מייל לא תקין"
            : "פורמט טלפון לא תקין (05X-XXXXXXX)"}
        </p>
      )}
    </div>
  );
}
