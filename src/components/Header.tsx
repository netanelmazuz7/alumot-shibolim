"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import WheatLogo from "./WheatLogo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-wheat-dark/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <WheatLogo className="text-white" size={36} />
            </div>
            <div>
              <span className="text-xl font-bold text-primary block leading-tight">
                אלומת שיבולים
              </span>
              <span className="text-xs text-gold-dark font-medium">
                קהילת הגנה הדדית לרכב
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/#how-it-works"
              className="text-primary/70 hover:text-primary font-medium transition-colors"
            >
              איך זה עובד
            </Link>
            <Link
              href="/#savings"
              className="text-primary/70 hover:text-primary font-medium transition-colors"
            >
              חיסכון
            </Link>
            <Link
              href="/about"
              className="text-primary/70 hover:text-primary font-medium transition-colors"
            >
              מי אנחנו
            </Link>
            <Link
              href="/#community"
              className="text-primary/70 hover:text-primary font-medium transition-colors"
            >
              קהילה
            </Link>
            <Link
              href="/#faq"
              className="text-primary/70 hover:text-primary font-medium transition-colors"
            >
              שאלות נפוצות
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/5 text-primary border-2 border-primary/30 rounded-xl font-bold hover:bg-primary hover:text-white hover:border-primary transition-all group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              כניסה לחשבון
            </Link>
            <Link
              href="/join"
              className="relative px-7 py-3 bg-gradient-to-l from-gold via-gold-dark to-gold text-white rounded-xl font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-l from-green/0 via-green/30 to-green/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                בדיקת התאמה חינם
              </span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="תפריט"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-wheat-dark/20 shadow-xl">
          <nav className="flex flex-col p-6 gap-4">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-medium py-2"
            >
              איך זה עובד
            </Link>
            <Link
              href="/#savings"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-medium py-2"
            >
              חיסכון
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-medium py-2"
            >
              מי אנחנו
            </Link>
            <Link
              href="/#community"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-medium py-2"
            >
              קהילה
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-medium py-2"
            >
              שאלות נפוצות
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-wheat-dark/20">
              <Link
                href="/join"
                onClick={() => setMobileOpen(false)}
                className="text-center px-6 py-4 bg-gradient-to-l from-gold to-gold-dark text-white rounded-xl font-black text-lg shadow-lg"
              >
                🎯 בדיקת התאמה חינם
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-center px-5 py-3 bg-primary/5 text-primary border-2 border-primary/30 rounded-xl font-bold"
              >
                כניסה לחשבון
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
