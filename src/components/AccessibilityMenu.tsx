"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Accessibility,
  X,
  Type,
  Contrast,
  Pause,
  Link as LinkIcon,
  Eye,
  MousePointer2,
  RotateCcw,
  FileText,
} from "lucide-react";

type ContrastMode = "normal" | "high" | "bw";

type A11ySettings = {
  fontScale: number;
  contrast: ContrastMode;
  noMotion: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
};

const DEFAULT_SETTINGS: A11ySettings = {
  fontScale: 1,
  contrast: "normal",
  noMotion: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
};

const STORAGE_KEY = "a11y-settings";

function applySettings(s: A11ySettings) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.style.setProperty("--a11y-font-scale", String(s.fontScale));
  html.classList.toggle("a11y-contrast-high", s.contrast === "high");
  html.classList.toggle("a11y-contrast-bw", s.contrast === "bw");
  html.classList.toggle("a11y-no-motion", s.noMotion);
  html.classList.toggle("a11y-highlight-links", s.highlightLinks);
  html.classList.toggle("a11y-readable-font", s.readableFont);
  html.classList.toggle("a11y-big-cursor", s.bigCursor);
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as A11ySettings;
        setSettings(parsed);
        applySettings(parsed);
      } else {
        applySettings(DEFAULT_SETTINGS);
      }
    } catch {
      applySettings(DEFAULT_SETTINGS);
    }
  }, []);

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      applySettings(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
  }, []);

  const fontSizes: { label: string; value: number }[] = [
    { label: "A-", value: 0.9 },
    { label: "A", value: 1 },
    { label: "A+", value: 1.2 },
    { label: "A++", value: 1.5 },
  ];

  return (
    <>
      <button
        type="button"
        aria-label="פתח תפריט נגישות"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-2xl hover:bg-primary-light flex items-center justify-center border-4 border-white focus:outline-none focus:ring-4 focus:ring-gold"
      >
        <Accessibility className="w-7 h-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          dir="rtl"
          className="fixed bottom-24 left-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-primary/10 p-5"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <Accessibility className="w-6 h-6 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-black text-primary">תפריט נגישות</h2>
            </div>
            <button
              type="button"
              aria-label="סגור תפריט נגישות"
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-primary/10"
            >
              <X className="w-5 h-5 text-primary" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-4 h-4 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-primary text-sm">גודל טקסט</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {fontSizes.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => update({ fontScale: f.value })}
                    aria-pressed={settings.fontScale === f.value}
                    className={`py-2 rounded-lg border-2 font-bold text-sm ${
                      settings.fontScale === f.value
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Contrast className="w-4 h-4 text-primary" aria-hidden="true" />
                <h3 className="font-bold text-primary text-sm">ניגודיות</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { label: "רגיל", value: "normal" },
                    { label: "גבוה", value: "high" },
                    { label: "שחור-לבן", value: "bw" },
                  ] as { label: string; value: ContrastMode }[]
                ).map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => update({ contrast: c.value })}
                    aria-pressed={settings.contrast === c.value}
                    className={`py-2 rounded-lg border-2 font-bold text-xs ${
                      settings.contrast === c.value
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <ToggleRow
              icon={<Pause className="w-4 h-4 text-primary" aria-hidden="true" />}
              label="עצירת אנימציות"
              checked={settings.noMotion}
              onChange={(v) => update({ noMotion: v })}
            />
            <ToggleRow
              icon={<LinkIcon className="w-4 h-4 text-primary" aria-hidden="true" />}
              label="הדגשת קישורים"
              checked={settings.highlightLinks}
              onChange={(v) => update({ highlightLinks: v })}
            />
            <ToggleRow
              icon={<Eye className="w-4 h-4 text-primary" aria-hidden="true" />}
              label="פונט קריא"
              checked={settings.readableFont}
              onChange={(v) => update({ readableFont: v })}
            />
            <ToggleRow
              icon={<MousePointer2 className="w-4 h-4 text-primary" aria-hidden="true" />}
              label="סמן גדול"
              checked={settings.bigCursor}
              onChange={(v) => update({ bigCursor: v })}
            />

            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-danger/10 text-danger border-2 border-danger/30 font-bold text-sm hover:bg-danger/20"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              אפס הכל
            </button>

            <Link
              href="/accessibility-statement"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/5 text-primary border-2 border-primary/20 font-bold text-sm hover:bg-primary/10"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="flex items-center gap-2 text-sm font-bold text-primary">
        {icon}
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-primary/20"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
            checked ? "right-0.5" : "right-[22px]"
          }`}
        />
      </button>
    </label>
  );
}
