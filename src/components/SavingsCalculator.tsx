"use client";

import { useState } from "react";
import { TrendingDown, ArrowLeft } from "lucide-react";

export default function SavingsCalculator() {
  const [monthlyInsurance, setMonthlyInsurance] = useState(420);

  const alumotMonthly = 67;
  const monthlySaving = monthlyInsurance - alumotMonthly;
  const yearlySaving = monthlySaving * 12;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-wheat-dark/20">
      <h3 className="text-2xl font-bold text-primary mb-2 text-center">
        כמה תחסכו עם אלומות שיבולים?
      </h3>
      <p className="text-primary/50 text-center mb-8">
        הזיזו את הסליידר לעלות החודשית הנוכחית של ההגנה על הרכב
      </p>

      {/* Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-primary/50">עלות חודשית נוכחית (הגנה מקיפה)</span>
          <span className="text-2xl font-bold text-danger">₪{monthlyInsurance}</span>
        </div>
        <input
          type="range"
          min={200}
          max={800}
          step={10}
          value={monthlyInsurance}
          onChange={(e) => setMonthlyInsurance(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-l from-danger/30 to-danger/10 accent-danger"
          dir="ltr"
        />
        <div className="flex justify-between text-xs text-primary/30 mt-1" dir="ltr">
          <span>₪200</span>
          <span>₪800</span>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Current insurance */}
        <div className="bg-red-50 rounded-2xl p-5 text-center border border-red-100">
          <p className="text-sm text-primary/50 mb-1">הסדר מסורתי</p>
          <p className="text-3xl font-bold text-danger">₪{monthlyInsurance}</p>
          <p className="text-xs text-primary/40">לחודש</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-green" />
          </div>
        </div>

        {/* Alumot */}
        <div className="bg-green/5 rounded-2xl p-5 text-center border-2 border-green/30">
          <p className="text-sm text-primary/50 mb-1">אלומות שיבולים</p>
          <p className="text-3xl font-bold text-green">₪{alumotMonthly}</p>
          <p className="text-xs text-primary/40">לחודש בממוצע</p>
        </div>
      </div>

      {/* Savings result */}
      <div className="mt-8 bg-gradient-to-l from-gold/10 to-gold/5 rounded-2xl p-6 text-center border border-gold/30">
        <p className="text-primary/60 mb-1">החיסכון השנתי שלכם</p>
        <p className="text-5xl font-black text-gold-dark">
          ₪{yearlySaving.toLocaleString()}
        </p>
        <p className="text-primary/40 text-sm mt-2">
          {monthlySaving > 0
            ? `₪${monthlySaving} חיסכון כל חודש × 12 חודשים`
            : "הזינו סכום גבוה יותר"}
        </p>
      </div>

      <p className="text-center text-xs text-primary/30 mt-4">
        * ממוצע עלות חודשית באלומות שיבולים: 30₪ דמי ניהול + ~37₪ השתתפות באירועים
      </p>
    </div>
  );
}
