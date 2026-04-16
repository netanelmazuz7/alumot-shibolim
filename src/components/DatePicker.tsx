"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  value: string; // "YYYY-MM-DD"
  onChange: (v: string) => void;
  label?: string;
  required?: boolean;
  minYear?: number;
  maxYear?: number;
};

const hebrewMonths = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

export default function DatePicker({
  value,
  onChange,
  label,
  required,
  minYear = 1940,
  maxYear = 2008, // Must be at least 18 years old
}: Props) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState<number>(() => {
    if (value) return Number(value.split("-")[0]);
    return 1990;
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (value) return Number(value.split("-")[1]) - 1;
    return 0;
  });
  const [mode, setMode] = useState<"days" | "months" | "years">("days");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setMode("days");
      }
    };
    if (open) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [open]);

  const selected = value ? new Date(value) : null;
  const today = new Date();

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const formatDisplay = (d: Date) => {
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  };

  const pickDay = (day: number) => {
    const y = viewYear.toString();
    const m = (viewMonth + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
    setOpen(false);
    setMode("days");
  };

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) years.push(y);

  // Calculate age if selected
  const age = selected
    ? Math.floor(
        (today.getTime() - selected.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      )
    : null;

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label className="block text-sm font-bold text-primary mb-2">
          {label}
          {required && <span className="text-danger mr-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-wheat-dark/30 rounded-xl focus:border-gold focus:outline-none hover:border-gold/50 transition-colors text-right"
      >
        <Calendar className="w-5 h-5 text-gold-dark" />
        <span className={selected ? "text-primary font-medium" : "text-primary/30"}>
          {selected ? (
            <>
              {formatDisplay(selected)}
              {age !== null && (
                <span className="text-primary/40 text-sm mr-2">(גיל {age})</span>
              )}
            </>
          ) : (
            "בחרו תאריך"
          )}
        </span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-wheat-dark/20 p-4 w-[340px]">
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-l from-gold to-gold-dark rounded-xl p-3 text-white">
            <button
              type="button"
              onClick={goPrevMonth}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              disabled={mode !== "days"}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode(mode === "months" ? "days" : "months")}
                className="font-bold hover:bg-white/20 rounded-lg px-3 py-1 transition-colors"
              >
                {hebrewMonths[viewMonth]}
              </button>
              <button
                type="button"
                onClick={() => setMode(mode === "years" ? "days" : "years")}
                className="font-bold hover:bg-white/20 rounded-lg px-3 py-1 transition-colors"
              >
                {viewYear}
              </button>
            </div>

            <button
              type="button"
              onClick={goNextMonth}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              disabled={mode !== "days"}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Days view */}
          {mode === "days" && (
            <>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {hebrewDays.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-bold text-primary/40 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected =
                    selected?.getDate() === day &&
                    selected?.getMonth() === viewMonth &&
                    selected?.getFullYear() === viewYear;
                  const isToday =
                    today.getDate() === day &&
                    today.getMonth() === viewMonth &&
                    today.getFullYear() === viewYear;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => pickDay(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-gold to-gold-dark text-white font-bold shadow-md scale-105"
                          : isToday
                          ? "bg-wheat border-2 border-gold/50 text-primary"
                          : "hover:bg-wheat-light text-primary/70"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Months view */}
          {mode === "months" && (
            <div className="grid grid-cols-3 gap-2">
              {hebrewMonths.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setViewMonth(i);
                    setMode("days");
                  }}
                  className={`py-3 rounded-lg text-sm font-medium transition-all ${
                    viewMonth === i
                      ? "bg-gradient-to-br from-gold to-gold-dark text-white font-bold shadow-md"
                      : "hover:bg-wheat-light text-primary/70 border border-wheat-dark/10"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          {/* Years view */}
          {mode === "years" && (
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    setViewYear(y);
                    setMode("months");
                  }}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    viewYear === y
                      ? "bg-gradient-to-br from-gold to-gold-dark text-white font-bold shadow-md"
                      : "hover:bg-wheat-light text-primary/70 border border-wheat-dark/10"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}

          {/* Footer info */}
          <div className="mt-4 pt-3 border-t border-wheat-dark/10 text-center">
            <p className="text-xs text-primary/40">
              לחצו על שם החודש או השנה למעבר מהיר
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
