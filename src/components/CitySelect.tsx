"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, MapPin, AlertTriangle } from "lucide-react";
import { israeliCities, highRiskCities } from "@/lib/israeliCars";

type Props = {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  required?: boolean;
};

export default function CitySelect({
  value,
  onChange,
  label = "עיר מגורים",
  required,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = israeliCities.filter((c) => c.includes(search.trim()));
  const isHighRisk = value && highRiskCities.includes(value);

  return (
    <div className="relative" ref={wrapRef}>
      <label className="block text-sm font-bold text-primary mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-wheat-light border rounded-xl transition-colors ${
          isHighRisk
            ? "border-orange-400"
            : "border-wheat-dark/30 hover:border-gold/50"
        } focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold`}
      >
        <span className={`flex items-center gap-2 ${value ? "text-primary font-medium" : "text-primary/25"}`}>
          {isHighRisk ? (
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          ) : (
            <MapPin className="w-4 h-4 text-primary/40" />
          )}
          {value || "בחרו עיר"}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary/50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-wheat-dark/20 overflow-hidden">
          <div className="p-3 border-b border-wheat-dark/10 bg-wheat-light/50">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="חיפוש עיר..."
                className="w-full pr-10 pl-3 py-2 bg-white border border-wheat-dark/20 rounded-lg text-sm focus:border-gold focus:outline-none"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-center py-4 text-primary/40 text-sm">לא נמצאה עיר</p>
            ) : (
              filtered.map((c) => {
                const highRisk = highRiskCities.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm hover:bg-wheat-light transition-colors flex items-center justify-between ${
                      value === c
                        ? "bg-gold/10 text-gold-dark font-bold"
                        : "text-primary/70"
                    }`}
                  >
                    <span>{c}</span>
                    {highRisk && (
                      <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">
                        סיכון גבוה
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
