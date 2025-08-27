"use client";
import React, { useMemo, useState } from "react";


function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}


const ACCENTS = [
  { id: "yellow", hex: "#FFD34F" },
  { id: "orange", hex: "#FF8A3D" },
  { id: "pink", hex: "#FF67C1" },
  { id: "green", hex: "#34D399" },
  { id: "blue", hex: "#60A5FA" },
  { id: "purple", hex: "#8B5CF6" },
] as const;


function MiniWindow({
  bg = "bg-white",
  chrome = "bg-slate-100",
  line = "bg-slate-300",
  subtleLine = "bg-slate-400",
}: {
  bg?: string;
  chrome?: string;
  line?: string;
  subtleLine?: string;
}) {
  return (
    <div className={cx("relative h-28 w-44 rounded-2xl shadow-sm", bg)}>
      {/* top chrome */}
      <div className={cx("h-5 rounded-t-2xl", chrome)} />
      {/* content */}
      <div className="p-2 space-y-2">
        <div className={cx("h-3 w-32 rounded", line)} />
        <div className="space-y-1">
          <div className={cx("h-2 w-36 rounded", subtleLine)} />
          <div className={cx("h-2 w-28 rounded", subtleLine)} />
          <div className={cx("h-2 w-24 rounded", subtleLine)} />
        </div>
      </div>
    </div>
  );
}


function PreviewAuto() {
  return (
    <div className="relative">
      <MiniWindow />
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 w-1/2 bg-gradient-to-b from-purple-300/50 to-purple-500/40" />
      </div>
    </div>
  );
}

function PreviewLight() {
  return (
    <MiniWindow bg="bg-white" chrome="bg-slate-100" line="bg-slate-300" subtleLine="bg-slate-200" />
  );
}


function PreviewDark() {
  return (
    <div className="relative">
      <MiniWindow bg="bg-gradient-to-b from-[#4338CA] to-[#6D28D9]" chrome="bg-white/10" line="bg-white/70" subtleLine="bg-white/40" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none" />
    </div>
  );
}


function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        checked ? "bg-purple-600" : "bg-slate-300"
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}


const Icon = {
  Sparkle: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0v12h12V6H6zm2 2h3v3H8V8zm9 10l-4-5-3 4-2-2-3 3h12z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-3.5-3.5 1.4-1.4L11 12.2l4.7-4.7 1.4 1.4L11 16z" />
    </svg>
  ),
};


function ThemeCard({
  title,
  selected,
  onSelect,
  children,
}: {
  title: string;
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "group relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition",
        selected ? "border-purple-500 ring-2 ring-purple-300" : "border-slate-200 hover:border-slate-300"
      )}
    >
      <div className="relative">
        {children}
        {/* selection badge */}
        <div className={cx(
          "absolute -bottom-2 left-2 rounded-full bg-white shadow p-0.5 transition",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <Icon.CheckCircle />
        </div>
      </div>
      <span className="text-sm font-medium text-slate-800">{title}</span>
    </button>
  );
}

export default function AppearancePanel() {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState<"auto" | "light" | "dark">("light");
  const [accent, setAccent] = useState<typeof ACCENTS[number]["id"]>("purple");
  const [reduceMotion, setReduceMotion] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hqPhoto, setHqPhoto] = useState(false);

  
  const accentHex = useMemo(() => ACCENTS.find(a => a.id === accent)?.hex ?? "#8B5CF6", [accent]);

  return (
    <div className="min-h-screen w-full bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-lg ring-1 ring-black/5 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Appearance</h2>
          <p className="mt-1 text-sm text-slate-500">Set or customize your preferences for the system</p>
        </div>

        {/* Language */}
        <section className="mb-6 grid gap-3">
          <label className="text-sm font-medium text-slate-700">Language</label>
          <div className="relative w-56">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
            >
              <option>English</option>
              <option>Español</option>
              <option>Português</option>
              <option>Français</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</div>
          </div>
        </section>

        <section className="mb-6 grid gap-3">
          <label className="text-sm font-medium text-slate-700">Interface theme</label>
          <p className="-mt-1 text-xs text-slate-500">Customize your application appearance</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ThemeCard title="Auto" selected={theme === "auto"} onSelect={() => setTheme("auto")}> 
              <PreviewAuto />
            </ThemeCard>
            <ThemeCard title="Light" selected={theme === "light"} onSelect={() => setTheme("light")}>
              <PreviewLight />
            </ThemeCard>
            <ThemeCard title="Dark" selected={theme === "dark"} onSelect={() => setTheme("dark")}>
              <PreviewDark />
            </ThemeCard>
          </div>
        </section>

        
        <section className="mb-6 grid gap-3">
          <label className="text-sm font-medium text-slate-700">Accent color</label>
          <p className="-mt-1 text-xs text-slate-500">Pick your platform's main color</p>
          <div className="flex flex-wrap items-center gap-3">
            {ACCENTS.map((c) => (
              <button
                key={c.id}
                aria-label={`Choose ${c.id} accent`}
                onClick={() => setAccent(c.id)}
                className={cx(
                  "h-8 w-8 rounded-full ring-offset-2 transition focus:outline-none focus:ring-2",
                  accent === c.id ? "ring-2 ring-offset-white" : "ring-0"
                )}
                style={{ backgroundColor: c.hex, boxShadow: accent === c.id ? `0 0 0 4px ${c.hex}33` : undefined }}
              />
            ))}
          </div>
        </section>

       
        <section className="mb-6 grid gap-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <span className="text-purple-600"><Icon.Sparkle /></span>
              <div>
                <p className="text-sm font-medium text-slate-800">Reduce motion</p>
              </div>
            </div>
            <Toggle checked={reduceMotion} onChange={setReduceMotion} label="Reduce motion" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <span className="text-purple-600"><Icon.Play /></span>
              <div>
                <p className="text-sm font-medium text-slate-800">Auto play</p>
              </div>
            </div>
            <Toggle checked={autoPlay} onChange={setAutoPlay} label="Auto play" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <span className="text-purple-600"><Icon.Image /></span>
              <div>
                <p className="text-sm font-medium text-slate-800">High quality photo</p>
              </div>
            </div>
            <Toggle checked={hqPhoto} onChange={setHqPhoto} label="High quality photo" />
          </div>
        </section>

      
        <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-4"
            onClick={() => {
              setLanguage("English");
              setTheme("light");
              setAccent("purple");
              setReduceMotion(true);
              setAutoPlay(true);
              setHqPhoto(false);
            }}
          >
            
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-10 rounded-xl border border-slate-200 px-5 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-10 rounded-xl bg-gradient-to-r from-[#6C4CF7] to-[#6A3EEA] px-5 font-medium text-white shadow-md hover:opacity-95"
              style={{ boxShadow: `0 8px 24px -6px ${accentHex}66` }}
            >
              Save Preferences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
