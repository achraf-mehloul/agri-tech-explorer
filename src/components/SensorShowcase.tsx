import { useState } from "react";

type Sensor = {
  id: string;
  name: string;
  role: string;
  status: "PROTOTYPE" | "PLANNED";
  desc: string;
  icon: (active: boolean) => JSX.Element;
};

const SENSORS: Sensor[] = [
  {
    id: "esp32",
    name: "ESP32",
    role: "Microcontroller",
    status: "PROTOTYPE",
    desc: "Dual-core WiFi/Bluetooth microcontroller. Runs the AgriPen firmware — sampling loop, filtering, and wireless transmission of readings.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="50" y="50" width="100" height="100" rx="6" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <rect x="70" y="70" width="60" height="60" rx="2" className={a ? "fill-primary" : "fill-foreground/70"} />
        <text x="100" y="106" textAnchor="middle" className="fill-background" fontSize="14" fontFamily="monospace">ESP32</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <line x1={60 + i * 10} y1="50" x2={60 + i * 10} y2="42" stroke="currentColor" strokeWidth="2" className="text-border-strong" />
            <line x1={60 + i * 10} y1="150" x2={60 + i * 10} y2="158" stroke="currentColor" strokeWidth="2" className="text-border-strong" />
            <line x1="50" y1={60 + i * 10} x2="42" y2={60 + i * 10} stroke="currentColor" strokeWidth="2" className="text-border-strong" />
            <line x1="150" y1={60 + i * 10} x2="158" y2={60 + i * 10} stroke="currentColor" strokeWidth="2" className="text-border-strong" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: "dht11",
    name: "DHT11",
    role: "Temperature & humidity",
    status: "PROTOTYPE",
    desc: "Digital temperature and humidity sensor used during current prototype experimentation to establish the environmental measurement pipeline.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="65" y="45" width="70" height="90" rx="6" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <g className={a ? "fill-primary" : "fill-foreground/60"}>
          {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 4 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={78 + c * 15} cy={60 + r * 12} r="2.5" />
          )))}
        </g>
        {[0, 1, 2].map((n) => (
          <line key={n} x1={80 + n * 20} y1="135" x2={80 + n * 20} y2="170" stroke="currentColor" strokeWidth="1.5" className="text-border-strong" />
        ))}
      </svg>
    ),
  },
  {
    id: "bmp180",
    name: "BMP180",
    role: "Barometric pressure",
    status: "PROTOTYPE",
    desc: "Barometric pressure sensor. Provides atmospheric context that helps interpret microclimate patterns around the field.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="60" y="70" width="80" height="60" rx="4" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <circle cx="100" cy="100" r="14" className={a ? "fill-primary" : "fill-foreground/60"} />
        <circle cx="100" cy="100" r="6" className="fill-background" />
        {[0, 1, 2, 3].map((n) => (
          <line key={n} x1={70 + n * 20} y1="130" x2={70 + n * 20} y2="150" stroke="currentColor" strokeWidth="1.5" className="text-border-strong" />
        ))}
      </svg>
    ),
  },
  {
    id: "yl69",
    name: "YL-69 / FC-28",
    role: "Soil moisture",
    status: "PROTOTYPE",
    desc: "Resistive soil-moisture probe. First sensing element used to validate the moisture-reading pipeline of the AgriPen prototype.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="70" y="30" width="60" height="30" rx="3" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <rect x="85" y="60" width="6" height="120" className={a ? "fill-primary" : "fill-foreground/70"} />
        <rect x="109" y="60" width="6" height="120" className={a ? "fill-primary" : "fill-foreground/70"} />
      </svg>
    ),
  },
  {
    id: "battery",
    name: "Li-ion 18650",
    role: "Power",
    status: "PROTOTYPE",
    desc: "Rechargeable 3.7V Li-ion cell, ~1000–1500mAh. Powers the current AgriPen prototype through the day of field work.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="55" y="70" width="80" height="60" rx="4" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <rect x="135" y="88" width="10" height="24" rx="2" className={a ? "fill-accent" : "fill-border-strong"} />
        <rect x="62" y="80" width={a ? "50" : "35"} height="40" rx="2" className={a ? "fill-primary" : "fill-foreground/50"} />
      </svg>
    ),
  },
  {
    id: "resistors",
    name: "Resistors",
    role: "220Ω — 10kΩ",
    status: "PROTOTYPE",
    desc: "Standard through-hole resistors used across the prototype to condition signals and pull lines during hardware experimentation.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <line x1="20" y1="100" x2="70" y2="100" stroke="currentColor" strokeWidth="2" className="text-border-strong" />
        <rect x="70" y="85" width="60" height="30" rx="4" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <line x1="130" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="2" className="text-border-strong" />
        <rect x="82" y="85" width="4" height="30" className={a ? "fill-primary" : "fill-foreground/70"} />
        <rect x="94" y="85" width="4" height="30" className="fill-earth" />
        <rect x="106" y="85" width="4" height="30" className={a ? "fill-primary" : "fill-foreground/70"} />
      </svg>
    ),
  },
  {
    id: "breadboard",
    name: "Breadboard",
    role: "Prototyping",
    status: "PROTOTYPE",
    desc: "The hardware experimentation surface where the current AgriPen circuit was assembled and iterated on.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="30" y="50" width="140" height="100" rx="4" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, r) => Array.from({ length: 10 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={42 + c * 13} cy={62 + r * 14} r="1.5" className="fill-foreground/40" />
        )))}
      </svg>
    ),
  },
  {
    id: "iron",
    name: "Soldering iron",
    role: "Assembly",
    status: "PROTOTYPE",
    desc: "The tool that turned components into a working prototype. Every AgriPen joint was placed by hand.",
    icon: (a) => (
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <rect x="60" y="90" width="80" height="16" rx="4" className={a ? "fill-accent/15 stroke-accent" : "fill-muted stroke-border-strong"} strokeWidth="2" />
        <polygon points="140,90 170,98 140,106" className={a ? "fill-primary" : "fill-foreground/70"} />
        <path d="M60 98 L30 130" stroke="currentColor" strokeWidth="3" className="text-border-strong" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function SensorShowcase() {
  const [active, setActive] = useState(SENSORS[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      {/* Featured component */}
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-12"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div>
            <span className="mono-label rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
              ● {active.status}
            </span>
          </div>
          <span className="mono-label text-muted-foreground">
            {active.role}
          </span>
        </div>

        <div className="relative mx-auto my-6 aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative h-full w-full text-foreground">
            {active.icon(true)}
          </div>
        </div>

        <h3 className="text-4xl md:text-5xl font-display leading-none">{active.name}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{active.desc}</p>
      </div>

      {/* Grid of other components */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {SENSORS.map((s) => {
          const isActive = s.id === active.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className={`group relative flex flex-col rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-accent bg-background shadow-soft"
                  : "border-border bg-surface hover:border-border-strong hover:bg-background"
              }`}
              style={isActive ? { boxShadow: "var(--shadow-soft)" } : undefined}
            >
              <div className="aspect-square w-full">{s.icon(isActive)}</div>
              <p className="mt-2 text-sm font-medium font-sans truncate">{s.name}</p>
              <p className="mono-label text-muted-foreground truncate">{s.role}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
