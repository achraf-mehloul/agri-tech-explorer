import { useState } from "react";
import app1 from "@/assets/app/app-1.png.asset.json";
import app2 from "@/assets/app/app-2.png.asset.json";
import app3 from "@/assets/app/app-3.png.asset.json";
import app4 from "@/assets/app/app-4.png.asset.json";
import app5 from "@/assets/app/app-5.png.asset.json";
import app6 from "@/assets/app/app-6.png.asset.json";
import app7 from "@/assets/app/app-7.png.asset.json";
import app8 from "@/assets/app/app-8.png.asset.json";
import app9 from "@/assets/app/app-9.png.asset.json";
import app10 from "@/assets/app/app-10.png.asset.json";

const SCREENS = [
  { url: app1.url, title: "Dashboard", desc: "Overview of soil, weather and quick access to every module." },
  { url: app5.url, title: "Live AgriPen readings", desc: "Real values from the device — pH, moisture, NPK, EC, temperature." },
  { url: app2.url, title: "AI assistant — chat", desc: "Conversational agronomic guidance in the farmer's own dialect." },
  { url: app3.url, title: "AI assistant — voice", desc: "Speak your question, receive spoken guidance in return." },
  { url: app4.url, title: "AI assistant — call", desc: "Full voice call with the AgriPen assistant, hands-free in the field." },
  { url: app6.url, title: "Farm map", desc: "Draw parcels, distribute AgriPen sampling points, layer NDVI imagery." },
  { url: app7.url, title: "Plant diagnosis", desc: "Photograph a plant, describe symptoms — AI identifies the disease." },
  { url: app8.url, title: "Diagnosis result", desc: "Symptoms, causes, treatment and prevention — from the AI, in dialect." },
  { url: app9.url, title: "Crop suitability", desc: "Score how well a crop matches your soil and climate before planting." },
  { url: app10.url, title: "Account & settings", desc: "Profile, farm summary, language, dialect and app preferences." },
];

export function AppGallery() {
  const [i, setI] = useState(0);
  const active = SCREENS[i];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 items-start">
      {/* Featured screenshot in a browser-window frame */}
      <div className="relative">
        <div
          className="overflow-hidden rounded-2xl border border-border bg-surface"
          style={{ boxShadow: "var(--shadow-product)" }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.68_0.18_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.17_140)]" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              app.agripen.io / {active.title.toLowerCase().replace(/\s+/g, "-")}
            </div>
            <span className="mono-label text-muted-foreground">v0.9</span>
          </div>
          <div className="relative aspect-[1408/932] w-full bg-black">
            {SCREENS.map((s, idx) => (
              <img
                key={s.url}
                src={s.url}
                alt={s.title}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="mono-label text-accent">Screen {String(i + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}</p>
            <h4 className="mt-1 text-2xl font-display">{active.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground max-w-lg">{active.desc}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => setI((i - 1 + SCREENS.length) % SCREENS.length)}
              className="h-10 w-10 rounded-full border border-border bg-surface transition hover:bg-muted"
              aria-label="Previous"
            >‹</button>
            <button
              onClick={() => setI((i + 1) % SCREENS.length)}
              className="h-10 w-10 rounded-full border border-border bg-surface transition hover:bg-muted"
              aria-label="Next"
            >›</button>
          </div>
        </div>
      </div>

      {/* Thumbnail list */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-2 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1">
        {SCREENS.map((s, idx) => (
          <button
            key={s.url}
            onClick={() => setI(idx)}
            className={`group relative overflow-hidden rounded-lg border transition ${
              idx === i
                ? "border-accent ring-2 ring-accent/30"
                : "border-border hover:border-border-strong"
            }`}
          >
            <div className="aspect-[1408/932] w-full bg-black">
              <img
                src={s.url}
                alt={s.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute inset-x-0 bottom-0 truncate bg-background/85 px-2 py-1 text-left text-[10px] font-medium backdrop-blur">
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
