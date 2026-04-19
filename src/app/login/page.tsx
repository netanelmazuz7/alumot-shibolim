"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react";
import WheatLogo from "@/components/WheatLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "שגיאה בהתחברות");
      }
    } catch {
      setError("שגיאת רשת - נסה שוב");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-6 group"
        >
          <WheatLogo className="w-12 h-12 text-gold" />
          <div className="text-center">
            <div className="text-2xl font-black text-primary group-hover:text-gold transition-colors">
              אלומת שיבולים
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-7">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-9 h-9 text-gold" />
            </div>
            <h1 className="text-2xl font-black text-primary mb-2">
              כניסה לאזור האישי
            </h1>
            <p className="text-primary/60 text-sm">
              הזן את הדוא״ל והסיסמה שקיבלת
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-1.5">
                דוא״ל
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="w-full pr-11 pl-4 py-3 bg-wheat-light border-2 border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-1.5">
                סיסמה
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-11 pl-4 py-3 bg-wheat-light border-2 border-wheat-dark/30 rounded-xl text-primary placeholder:text-primary/25 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-danger/10 border border-danger/30 rounded-xl p-3">
                <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                <p className="text-danger text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !email || !password}
              className="w-full bg-gold hover:bg-gold-dark disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              {submitting ? "מתחבר..." : "כניסה"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-wheat-dark/20 text-center">
            <p className="text-primary/60 text-sm">
              עדיין לא רשום?{" "}
              <Link href="/join" className="font-bold text-gold hover:text-gold-dark">
                הגש בקשה להצטרפות
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-primary/40 text-xs mt-6">
          קיבלת את פרטי ההתחברות במייל לאחר אישור הבקשה.
        </p>
      </div>
    </div>
  );
}
