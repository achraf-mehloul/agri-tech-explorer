import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import logoAsset from "@/assets/agripen-logo.png.asset.json";

const AgriPen3D = lazy(() =>
  import("@/components/AgriPen3D").then((m) => ({ default: m.AgriPen3D })),
);

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { property: "og:image", content: logoAsset.url },
      { name: "twitter:image", content: logoAsset.url },
    ],
  }),
});

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Narrative />
      <Architecture />
      <CurrentVsFuture />
      <AppExperience />
      <AIExperience />
      <LiveDemo />
      <Roadmap />
      <UseCases />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  );
}

/* ------------------------------- NAV ------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="AgriPen" className="h-8 w-8" />
          <span className="font-display text-xl tracking-tight">AgriPen</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {[
            ["Device", "#device"],
            ["System", "#system"],
            ["Software", "#software"],
            ["Roadmap", "#roadmap"],
          ].map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="hidden rounded-full border border-border px-4 py-1.5 text-sm transition hover:bg-muted md:inline-block"
          >
            Live demo
          </a>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-1.5 text-sm text-background transition hover:opacity-90"
          >
            Request access
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------- HERO ------------------------------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 grid-lines pointer-events-none opacity-60" />
      <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-3xl text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="mono-label text-muted-foreground">
            Prototype · v0.9 · Engineering preview
          </span>
        </div>
        <h1 className="mt-6 text-balance text-5xl leading-[0.95] md:text-7xl">
          Understand your soil.
          <br />
          <span className="italic text-primary/80">Make better decisions.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          AgriPen connects sensing, data, and artificial intelligence to support
          smarter agricultural decisions — from the soil to the screen.
        </p>
      </div>

      {/* 3D Viewer */}
      <div className="relative z-0 h-[75svh] w-full max-w-5xl">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <div className="mono-label text-muted-foreground animate-pulse">
                Preparing device
              </div>
            </div>
          }
        >
          <AgriPen3D />
        </Suspense>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4 px-6">
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#device"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Explore the technology
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-background"
          >
            Request a demo
          </a>
        </div>
        <p className="mono-label text-muted-foreground">
          Drag to rotate · scroll to zoom · click hotspots
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- MARQUEE ------------------------------- */
function Marquee() {
  const items = [
    "Precision soil sensing",
    "Embedded electronics",
    "Edge intelligence",
    "Mobile companion app",
    "Field-ready enclosure",
    "Open agricultural data",
  ];
  return (
    <section className="border-y border-border bg-surface py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
        {items.map((i) => (
          <span
            key={i}
            className="mono-label text-muted-foreground flex items-center gap-3"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- NARRATIVE ------------------------------- */
const NARRATIVE = [
  {
    n: "01",
    title: "See it.",
    body: "A precision instrument, sized for the field. 200mm tall, 32mm across, engineered to be held.",
  },
  {
    n: "02",
    title: "Understand it.",
    body: "AgriPen combines multi-probe sensing, an ESP32 core, a Li-ion cell and wireless communication in one sealed body.",
  },
  {
    n: "03",
    title: "Open it.",
    body: "Inside: a control board, sensor module, buzzer, status LED and rechargeable 18650. Every part serves a measurement.",
  },
  {
    n: "04",
    title: "Measure.",
    body: "Probes enter the soil. The device samples the environment — temperature, humidity, pressure, moisture — through documented sensors.",
  },
  {
    n: "05",
    title: "Connect.",
    body: "Readings travel from the ESP32 to the mobile application through wireless communication.",
  },
  {
    n: "06",
    title: "Think.",
    body: "AI interprets the readings against weather context and farm history to surface useful guidance.",
  },
  {
    n: "07",
    title: "Act.",
    body: "The farmer sees a clear recommendation — irrigate, wait, treat — grounded in real measurements.",
  },
];

function Narrative() {
  return (
    <section id="device" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The story"
          title="One device. Seven moments."
          sub="Scroll through the AgriPen from object, to system, to decision."
        />
        <div className="mt-20 grid gap-x-12 gap-y-16 md:grid-cols-2">
          {NARRATIVE.map((s, i) => (
            <div
              key={s.n}
              className={`group relative ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="flex items-baseline gap-4">
                <span className="mono-label text-accent">{s.n}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 text-4xl md:text-5xl">{s.title}</h3>
              <p className="mt-3 max-w-md text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- ARCHITECTURE ------------------------------- */
const LAYERS = [
  { id: "sensors", label: "Sensors", desc: "Soil moisture, humidity, temperature, pressure probes." },
  { id: "esp32", label: "ESP32", desc: "Embedded controller running the sampling firmware." },
  { id: "process", label: "Processing", desc: "Local filtering and calibration of raw signals." },
  { id: "comms", label: "Wireless", desc: "Data transported through the communication layer." },
  { id: "cloud", label: "Application", desc: "Mobile companion app receives and stores readings." },
  { id: "ai", label: "AI analysis", desc: "Context-aware interpretation of the collected data." },
  { id: "farmer", label: "Farmer", desc: "A clear recommendation, ready to act on." },
];

function Architecture() {
  const [active, setActive] = useState<string>("sensors");
  const current = LAYERS.find((l) => l.id === active)!;
  return (
    <section id="system" className="relative py-32 px-6 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Hardware architecture"
          title="From the soil to the decision."
          sub="Every stage is a real component of the AgriPen pipeline."
        />
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <ol className="space-y-1">
            {LAYERS.map((l, i) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <button
                    onMouseEnter={() => setActive(l.id)}
                    onFocus={() => setActive(l.id)}
                    className={`group flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-primary/60 bg-background shadow-soft"
                        : "border-transparent hover:border-border hover:bg-background/60"
                    }`}
                    style={isActive ? { boxShadow: "var(--shadow-soft)" } : undefined}
                  >
                    <span className="mono-label w-8 text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-medium">{l.label}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition ${
                        isActive ? "text-accent translate-x-1" : "text-muted-foreground"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="relative rounded-3xl border border-border bg-background p-8 md:p-10">
            <p className="mono-label text-accent">Layer</p>
            <h4 className="mt-2 text-4xl">{current.label}</h4>
            <p className="mt-4 text-muted-foreground">{current.desc}</p>

            {/* Animated diagram */}
            <svg viewBox="0 0 400 220" className="mt-8 w-full">
              <defs>
                <linearGradient id="flow" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.17 140)" stopOpacity="0" />
                  <stop offset="50%" stopColor="oklch(0.68 0.17 140)" />
                  <stop offset="100%" stopColor="oklch(0.68 0.17 140)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {LAYERS.map((l, i) => {
                const x = 30 + (i * 340) / (LAYERS.length - 1);
                const isA = l.id === active;
                return (
                  <g key={l.id}>
                    {i < LAYERS.length - 1 && (
                      <line
                        x1={x + 8}
                        y1={110}
                        x2={30 + ((i + 1) * 340) / (LAYERS.length - 1) - 8}
                        y2={110}
                        stroke="currentColor"
                        strokeOpacity="0.2"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    )}
                    <circle
                      cx={x}
                      cy={110}
                      r={isA ? 10 : 6}
                      className={isA ? "fill-accent" : "fill-muted-foreground/40"}
                    />
                    {isA && (
                      <circle
                        cx={x}
                        cy={110}
                        r={18}
                        className="fill-accent/20"
                      >
                        <animate attributeName="r" from="10" to="24" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text
                      x={x}
                      y={140}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {l.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CURRENT VS FUTURE ------------------------------- */
function CurrentVsFuture() {
  const [mode, setMode] = useState<"current" | "future">("current");
  const data = {
    current: {
      label: "Current prototype",
      tag: "PROTOTYPE",
      items: [
        "ESP32 microcontroller",
        "DHT11 temperature & humidity",
        "BMP180 barometric pressure",
        "YL-69 soil moisture",
        "Prototype 3D-printed enclosure",
        "Data collection firmware",
        "Companion mobile software",
      ],
    },
    future: {
      label: "Future vision",
      tag: "ROADMAP",
      items: [
        "Capacitive soil moisture sensor",
        "Soil pH sensor",
        "Electrical conductivity (EC)",
        "Dedicated soil temperature probe",
        "OLED status display",
        "Custom PCB design",
        "Optimized battery system",
        "Industrial-grade enclosure",
      ],
    },
  }[mode];

  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Honesty by design"
          title="What exists today. What comes next."
          sub="AgriPen is being built in the open. We separate the prototype from the roadmap."
        />
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-surface p-1">
            {(["current", "future"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  mode === m
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "current" ? "Current prototype" : "Future vision"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-surface p-8 md:p-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="mono-label text-accent">{data.tag}</p>
              <h4 className="mt-1 text-3xl">{data.label}</h4>
            </div>
            <span className="mono-label text-muted-foreground">
              {data.items.length} items
            </span>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {data.items.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3"
              >
                <span
                  className={`mt-1 h-2 w-2 rounded-full ${
                    mode === "current" ? "bg-accent" : "bg-earth"
                  }`}
                />
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- APP EXPERIENCE ------------------------------- */
function AppExperience() {
  return (
    <section id="software" className="py-32 px-6 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mobile application"
          title="A companion for your field."
          sub="The AgriPen mobile app turns readings into a farm you can understand at a glance."
        />

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            {[
              ["Farm dashboard", "See every field, every plot, every device at a glance."],
              ["Live measurements", "Moisture, humidity, temperature and pressure from the AgriPen."],
              ["AI assistant", "Ask questions in plain language, grounded in your data."],
              ["Recommendations", "Actionable guidance based on measurements and context."],
              ["Alerts & history", "Track thresholds, trends and past decisions over time."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full border-2 border-accent/40 bg-accent/10" />
                <div>
                  <h4 className="text-lg font-medium font-sans">{t}</h4>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Phone mockup */}
          <div className="relative mx-auto w-full max-w-xs">
            <div
              className="relative aspect-[9/19] rounded-[3rem] border-[10px] border-foreground bg-background p-3"
              style={{ boxShadow: "var(--shadow-product)" }}
            >
              <div className="h-full w-full overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-primary/5 to-background p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mono-label text-muted-foreground">Field 03</p>
                    <p className="text-lg font-medium">South plot</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    ["Moisture", "42%"],
                    ["Temp", "23°C"],
                    ["Humidity", "68%"],
                    ["Pressure", "1013"],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-background p-3 border border-border/60">
                      <p className="mono-label text-muted-foreground">{l}</p>
                      <p className="mt-1 text-xl font-medium">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-accent/30 bg-accent/5 p-3">
                  <p className="mono-label text-accent">AI Insight</p>
                  <p className="mt-1 text-xs leading-relaxed">
                    Soil moisture trending low. Rain probability under 20% —
                    irrigation likely required in the next 24h.
                  </p>
                </div>

                <div className="mt-3 h-16 rounded-xl bg-primary/5 border border-border/60 flex items-end gap-1 p-2">
                  {[30, 42, 35, 55, 60, 48, 62, 70, 65, 58, 72, 68].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-accent/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- AI EXPERIENCE ------------------------------- */
function AIExperience() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Intelligence"
          title="No magic. Just logic."
          sub="The AI layer reasons over documented inputs — measurements, weather, farm context."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Input",
              items: ["Sensor readings", "Weather context", "Historical data", "Farm profile"],
            },
            {
              t: "Analysis",
              items: ["Threshold detection", "Trend evaluation", "Context matching", "Confidence scoring"],
            },
            {
              t: "Output",
              items: ["Plain-language guidance", "Action suggestions", "Alerts & warnings", "Explainable reasoning"],
            },
          ].map((c, i) => (
            <div
              key={c.t}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label text-accent">Step 0{i + 1}</span>
                {i < 2 && (
                  <svg viewBox="0 0 24 24" className="hidden h-4 w-4 text-muted-foreground md:block" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <h4 className="mt-2 text-2xl">{c.t}</h4>
              <ul className="mt-4 space-y-2">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-12">
          <p className="mono-label opacity-70">Example reasoning</p>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <p className="text-sm opacity-70">Measured</p>
              <p className="mt-2 font-mono text-sm">
                moisture: low<br />
                temperature: high<br />
                rain_probability: 0.12
              </p>
            </div>
            <div className="flex items-center justify-center opacity-40">→</div>
            <div>
              <p className="text-sm opacity-70">Possible recommendation</p>
              <p className="mt-2 font-display text-2xl italic">
                Irrigation may be required within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- LIVE DEMO ------------------------------- */
function LiveDemo() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const moisture = 38 + Math.round(Math.sin(t / 4) * 6);
  const temp = 22 + Math.round(Math.sin(t / 5 + 1) * 3);
  const humidity = 62 + Math.round(Math.cos(t / 3) * 5);
  const pressure = 1012 + Math.round(Math.sin(t / 6) * 2);
  const battery = 82;

  return (
    <section id="demo" className="py-32 px-6 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <SectionHeading
            eyebrow="Live demo"
            title="A simulated AgriPen session."
            sub=""
            align="left"
          />
          <span className="mono-label rounded-full border border-earth/40 bg-earth/10 px-3 py-1 text-earth">
            ● SIMULATION
          </span>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            ["Soil moisture", `${moisture}%`],
            ["Temperature", `${temp}°C`],
            ["Humidity", `${humidity}%`],
            ["Pressure", `${pressure} hPa`],
          ].map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-border bg-background p-5">
              <p className="mono-label text-muted-foreground">{l}</p>
              <p className="mt-2 font-display text-4xl">{v}</p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-1000"
                  style={{ width: `${Math.min(100, Math.max(20, Number(String(v).replace(/[^\d]/g, "")) / 12))}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="flex items-center justify-between">
              <p className="mono-label text-muted-foreground">Last 60 minutes</p>
              <p className="mono-label text-accent">● live</p>
            </div>
            <svg viewBox="0 0 400 120" className="mt-4 w-full">
              <path
                d={
                  "M0,80 " +
                  Array.from({ length: 40 }, (_, i) => {
                    const x = (i * 400) / 40;
                    const y = 60 + Math.sin(i / 3 + t / 4) * 25 + Math.cos(i / 5) * 8;
                    return `L${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(" ")
                }
                fill="none"
                stroke="oklch(0.68 0.17 140)"
                strokeWidth="2"
              />
              <path
                d={
                  "M0,120 " +
                  Array.from({ length: 40 }, (_, i) => {
                    const x = (i * 400) / 40;
                    const y = 60 + Math.sin(i / 3 + t / 4) * 25 + Math.cos(i / 5) * 8;
                    return `L${x.toFixed(1)},${y.toFixed(1)}`;
                  }).join(" ") +
                  " L400,120 Z"
                }
                fill="oklch(0.68 0.17 140 / 0.1)"
              />
            </svg>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 flex flex-col justify-between">
            <div>
              <p className="mono-label text-muted-foreground">AI recommendation</p>
              <p className="mt-3 font-display text-2xl italic leading-tight">
                Soil moisture stable. No irrigation needed in the next 6 hours.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Battery</span>
              <span className="font-mono">{battery}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- ROADMAP ------------------------------- */
const PHASES = [
  { p: "Phase 1", t: "Software MVP", s: "Completed", state: "done" },
  { p: "Phase 2", t: "Hardware prototype", s: "In progress", state: "active" },
  { p: "Phase 3", t: "Field validation", s: "Next", state: "next" },
  { p: "Phase 4", t: "Custom electronics", s: "Planned", state: "planned" },
  { p: "Phase 5", t: "Pilot deployment", s: "Planned", state: "planned" },
  { p: "Phase 6", t: "Commercial product", s: "Vision", state: "planned" },
];

function Roadmap() {
  return (
    <section id="roadmap" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Roadmap"
          title="Where AgriPen is going."
          sub="Six phases from software MVP to commercial product."
        />
        <ol className="mt-16 relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-border md:left-1/2" />
          {PHASES.map((p, i) => (
            <li
              key={p.p}
              className={`relative mb-10 flex flex-col gap-4 md:mb-16 md:grid md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              <div
                className={`absolute left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 ${
                  p.state === "done"
                    ? "bg-primary ring-4 ring-primary/20"
                    : p.state === "active"
                    ? "bg-accent ring-4 ring-accent/30 animate-pulse"
                    : "bg-background ring-2 ring-border"
                }`}
              />
              <div className={`pl-14 md:pl-0 ${i % 2 === 1 ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:pr-16"}`}>
                <p className="mono-label text-accent">{p.p} · {p.s}</p>
                <h4 className="mt-2 text-3xl">{p.t}</h4>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- USE CASES ------------------------------- */
function UseCases() {
  const cases = [
    { t: "Precision farming", d: "Ground-truth measurements for irrigation and fertilization decisions." },
    { t: "Greenhouses", d: "Continuous monitoring in controlled environments." },
    { t: "Research", d: "A field-ready sensing platform for agricultural studies." },
    { t: "Education", d: "A tangible tool for teaching sensors, embedded systems and data." },
  ];
  return (
    <section className="py-32 px-6 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Use cases" title="Built for the field." />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <div
              key={c.t}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40"
            >
              <span className="mono-label text-muted-foreground">
                0{i + 1} / 04
              </span>
              <h4 className="mt-6 text-2xl">{c.t}</h4>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
              <div
                className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- TECH ------------------------------- */
function TechStack() {
  const tech = [
    ["React", "UI"],
    ["TypeScript", "Language"],
    ["Three.js", "3D"],
    ["Tailwind CSS", "Styling"],
    ["ESP32", "Firmware"],
    ["C++", "Embedded"],
    ["Python", "AI"],
    ["Supabase", "Backend"],
  ];
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Technology" title="The stack behind AgriPen." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {tech.map(([n, r]) => (
            <div key={n} className="bg-background p-6">
              <p className="mono-label text-muted-foreground">{r}</p>
              <p className="mt-2 text-2xl font-display">{n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */
function CTA() {
  return (
    <section id="contact" className="py-32 px-6">
      <div
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border p-10 md:p-20 text-center relative"
        style={{ background: "var(--gradient-forest)" }}
      >
        <div className="grid-lines absolute inset-0 opacity-20" />
        <p className="mono-label text-accent">Get involved</p>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-background text-balance">
          Bring intelligence
          <br />
          <span className="italic opacity-80">to your soil.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-background/70">
          Investors, agricultural partners, research institutions — we'd like to
          hear from you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hello@agripen.io"
            className="rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
          >
            Contact the team
          </a>
          <a
            href="#top"
            className="rounded-full border border-background/30 px-6 py-3 text-sm font-medium text-background transition hover:bg-background/10"
          >
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER ------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="AgriPen" className="h-8 w-8" />
          <div>
            <p className="font-display text-lg leading-tight">AgriPen</p>
            <p className="mono-label text-muted-foreground">Precision soil intelligence</p>
          </div>
        </div>
        <p className="mono-label text-muted-foreground">
          © {new Date().getFullYear()} AgriPen — prototype engineering preview
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------- HELPERS ------------------------------- */
function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="mono-label text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-4xl md:text-6xl leading-[1.05]">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-muted-foreground ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
