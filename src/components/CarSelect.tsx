"use client";

import { useState, useRef, useEffect } from "react";
import { Car, ChevronDown, Search } from "lucide-react";
import { israeliCars, israeliCarMakers } from "@/lib/israeliCars";

type Props = {
  manufacturer: string;
  model: string;
  onManufacturerChange: (v: string) => void;
  onModelChange: (v: string) => void;
};

export default function CarSelect({
  manufacturer,
  model,
  onManufacturerChange,
  onModelChange,
}: Props) {
  const [makerOpen, setMakerOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [makerSearch, setMakerSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const makerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (makerRef.current && !makerRef.current.contains(e.target as Node)) {
        setMakerOpen(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filteredMakers = israeliCarMakers.filter((m) =>
    m.includes(makerSearch.trim())
  );

  const availableModels = manufacturer ? israeliCars[manufacturer] || [] : [];
  const filteredModels = availableModels.filter((m) =>
    m.toLowerCase().includes(modelSearch.trim().toLowerCase())
  );

  return (
    <>
      {/* Manufacturer */}
      <div className="relative" ref={makerRef}>
        <label className="block text-sm font-bold text-primary mb-2">
          יצרן <span className="text-danger">*</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setMakerOpen(!makerOpen);
            setModelOpen(false);
          }}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-wheat-dark/30 rounded-xl focus:border-gold focus:outline-none hover:border-gold/50 transition-colors"
        >
          <span className={manufacturer ? "text-primary font-medium" : "text-primary/30"}>
            {manufacturer || "בחרו יצרן"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-primary/50 transition-transform ${
              makerOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {makerOpen && (
          <div className="absolute top-full right-0 left-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-wheat-dark/20 overflow-hidden">
            <div className="p-3 border-b border-wheat-dark/10 bg-wheat-light/50">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="text"
                  value={makerSearch}
                  onChange={(e) => setMakerSearch(e.target.value)}
                  placeholder="חיפוש יצרן..."
                  className="w-full pr-10 pl-3 py-2 bg-white border border-wheat-dark/20 rounded-lg text-sm focus:border-gold focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredMakers.length === 0 ? (
                <p className="text-center py-4 text-primary/40 text-sm">לא נמצא יצרן</p>
              ) : (
                filteredMakers.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      onManufacturerChange(m);
                      onModelChange("");
                      setMakerOpen(false);
                      setMakerSearch("");
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm hover:bg-wheat-light transition-colors ${
                      manufacturer === m
                        ? "bg-gold/10 text-gold-dark font-bold"
                        : "text-primary/70"
                    }`}
                  >
                    {m}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Model */}
      <div className="relative" ref={modelRef}>
        <label className="block text-sm font-bold text-primary mb-2">
          דגם <span className="text-danger">*</span>
        </label>
        <button
          type="button"
          disabled={!manufacturer}
          onClick={() => {
            if (!manufacturer) return;
            setModelOpen(!modelOpen);
            setMakerOpen(false);
          }}
          className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-wheat-dark/30 rounded-xl focus:border-gold focus:outline-none hover:border-gold/50 transition-colors ${
            !manufacturer ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className={model ? "text-primary font-medium" : "text-primary/30"}>
            {model || (manufacturer ? "בחרו דגם" : "בחרו קודם יצרן")}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-primary/50 transition-transform ${
              modelOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {modelOpen && manufacturer && (
          <div className="absolute top-full right-0 left-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-wheat-dark/20 overflow-hidden">
            <div className="p-3 border-b border-wheat-dark/10 bg-wheat-light/50">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="text"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="חיפוש דגם..."
                  className="w-full pr-10 pl-3 py-2 bg-white border border-wheat-dark/20 rounded-lg text-sm focus:border-gold focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredModels.length === 0 ? (
                <p className="text-center py-4 text-primary/40 text-sm">לא נמצא דגם</p>
              ) : (
                filteredModels.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      onModelChange(m);
                      setModelOpen(false);
                      setModelSearch("");
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm hover:bg-wheat-light transition-colors ${
                      model === m
                        ? "bg-gold/10 text-gold-dark font-bold"
                        : "text-primary/70"
                    }`}
                  >
                    {m}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
