import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import app1 from "@/assets/app/app-1.png.asset.json";
import app3 from "@/assets/app/app-3.png.asset.json";
import app5 from "@/assets/app/app-5.png.asset.json";
import app6 from "@/assets/app/app-6.png.asset.json";
import app8 from "@/assets/app/app-8.png.asset.json";

/**
 * Cinematic product scroll.
 * One sticky viewport, one AgriPen prop, ~8 scenes driven by scroll progress.
 * The device is a stylized SVG built to look physical and engineered.
 */
export function ProductStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      ref={ref}
      id="story"
      className="relative"
      style={{ height: "760vh" }}
      aria-label="AgriPen product story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* soft ambient background */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

        {/* scene container */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4 md:px-8">
          <SoilLayer p={p} />
          <MeasurementRings p={p} />
          <DeviceStage p={p} />
          <DataStream p={p} />
          <PhoneStage p={p} />
          <SceneCaptions p={p} />
        </div>

        <ScrollHint p={p} />
      </div>
    </section>
  );
}

/* --------------------------- device --------------------------- */

function DeviceStage({ p }: { p: MotionValue<number> }) {
  // move down as user scrolls into "insert into soil" phase
  const y = useTransform(p, [0, 0.25, 0.45, 1], ["-4%", "-2%", "22%", "22%"]);
  const rotateZ = useTransform(p, [0, 0.1, 0.25, 0.45, 1], [-6, -4, -1, 0, 0]);
  const rotateY = useTransform(p, [0, 0.15, 0.28], [0, 25, 0]);
  const scale = useTransform(p, [0, 0.1, 0.55, 0.72, 1], [1.05, 1, 0.9, 0.6, 0.6]);
  const x = useTransform(p, [0, 0.72, 0.85, 1], ["0%", "0%", "-28%", "-28%"]);

  return (
    <motion.div
      style={{ y, x, rotateZ, rotateY, scale, transformPerspective: 1200 }}
      className="pointer-events-none absolute z-20 flex h-[85%] items-center justify-center"
    >
      <Pen />
    </motion.div>
  );
}

function Pen() {
  return (
    <svg
      viewBox="0 0 200 720"
      className="h-full w-auto drop-shadow-2xl"
      style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.35))" }}
    >
      <defs>
        <linearGradient id="body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0d1410" />
          <stop offset="0.35" stopColor="#1f2a20" />
          <stop offset="0.55" stopColor="#2b3a2c" />
          <stop offset="0.8" stopColor="#141c15" />
          <stop offset="1" stopColor="#080c09" />
        </linearGradient>
        <linearGradient id="cap" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#050805" />
          <stop offset="0.5" stopColor="#1a221b" />
          <stop offset="1" stopColor="#020402" />
        </linearGradient>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7d857f" />
          <stop offset="0.5" stopColor="#e6e9e4" />
          <stop offset="1" stopColor="#7d857f" />
        </linearGradient>
        <linearGradient id="ledGlow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a8de6b" />
          <stop offset="1" stopColor="#4b7b1e" />
        </linearGradient>
      </defs>

      {/* Top cap */}
      <g>
        <rect x="55" y="10" width="90" height="60" rx="14" fill="url(#cap)" />
        <rect x="60" y="14" width="80" height="4" rx="2" fill="#2c3a2d" opacity="0.6" />
        <circle cx="100" cy="42" r="6" fill="url(#ledGlow)">
          <animate attributeName="opacity" from="0.6" to="1" dur="1.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Upper body */}
      <g>
        <rect x="50" y="70" width="100" height="230" rx="10" fill="url(#body)" />
        {/* engraved brand line */}
        <text
          x="100" y="180"
          textAnchor="middle"
          fill="#8fa48f" opacity="0.55"
          fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="4"
        >
          AGRIPEN
        </text>
        {/* button */}
        <rect x="86" y="220" width="28" height="10" rx="5" fill="#0a0f0b" stroke="#3a4b3b" strokeWidth="0.6" />
        {/* usb-c */}
        <rect x="88" y="270" width="24" height="6" rx="3" fill="#020402" />
      </g>

      {/* Mid separator ring */}
      <rect x="48" y="300" width="104" height="5" rx="2" fill="#050805" />

      {/* Lower body */}
      <g>
        <rect x="50" y="305" width="100" height="180" rx="10" fill="url(#body)" />
        {/* subtle highlight */}
        <rect x="60" y="315" width="6" height="160" rx="3" fill="#ffffff" opacity="0.05" />
      </g>

      {/* Flared base */}
      <path d="M45 485 L155 485 L165 515 L35 515 Z" fill="url(#cap)" />

      {/* Sensor probes */}
      <g>
        {[70, 90, 110, 130].map((x, i) => (
          <g key={i}>
            <rect x={x - 2} y="515" width="4" height="180" rx="1.5" fill="url(#metal)" />
            <polygon
              points={`${x - 2},695 ${x + 2},695 ${x},710`}
              fill="#c8ccc4"
            />
          </g>
        ))}
        {/* central probe */}
        <rect x="98" y="515" width="4" height="200" rx="1.5" fill="url(#metal)" />
        <polygon points="98,715 102,715 100,730" fill="#e6e9e4" />
      </g>
    </svg>
  );
}

/* --------------------------- soil --------------------------- */

function SoilLayer({ p }: { p: MotionValue<number> }) {
  const y = useTransform(p, [0, 0.28, 0.42, 1], ["110%", "110%", "62%", "62%"]);
  const opacity = useTransform(p, [0.28, 0.42], [0, 1]);
  return (
    <motion.div
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[70%]"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.32 0.03 60) 12%, oklch(0.22 0.03 55) 45%, oklch(0.14 0.02 50) 100%)",
        }}
      />
      {/* soil texture speckle */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100}
            cy={20 + Math.random() * 80}
            r={0.3 + Math.random() * 0.6}
            fill="#000"
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* --------------------------- measurement rings --------------------------- */

function MeasurementRings({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.42, 0.5, 0.62, 0.7], [0, 1, 1, 0]);
  const scale = useTransform(p, [0.42, 0.62], [0.6, 1.4]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute z-20 flex h-full w-full items-end justify-center pb-[10vh]"
    >
      <motion.div style={{ scale }} className="relative h-64 w-64">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full border border-accent/50"
            style={{
              animation: `pulse-ring 2.4s ${i * 0.6}s ease-out infinite`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* --------------------------- data stream --------------------------- */

function DataStream({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.6, 0.68, 0.82, 0.88], [0, 1, 1, 0]);
  const steps = ["SOIL", "SENSORS", "ESP32", "DATA"];
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 top-[18%] z-30 flex justify-center"
    >
      <div className="flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-2 backdrop-blur-xl">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            <span className="mono-label text-foreground">{s}</span>
            {i < steps.length - 1 && (
              <span className="mono-label text-accent">→</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* --------------------------- phone --------------------------- */

function PhoneStage({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0.72, 0.85, 1], ["120%", "10%", "10%"]);
  const opacity = useTransform(p, [0.7, 0.82], [0, 1]);

  // choose the app screen based on scroll segment
  const screenIndex = useTransform(p, [0.82, 0.88, 0.93, 1], [0, 1, 2, 3]);
  const screens = [app1.url, app5.url, app6.url, app3.url];

  return (
    <motion.div
      style={{ x, opacity }}
      className="pointer-events-none absolute right-0 top-1/2 z-30 -translate-y-1/2 w-[52%] max-w-md flex justify-end"
    >
      <div className="relative w-[62%] max-w-[280px]">
        {/* device frame */}
        <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-foreground bg-foreground p-1.5 shadow-2xl">
          <div className="absolute left-1/2 top-1 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground" />
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-background">
            {screens.map((src, i) => (
              <PhoneScreen key={src} src={src} i={i} indexMv={screenIndex} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneScreen({ src, i, indexMv }: { src: string; i: number; indexMv: MotionValue<number> }) {
  const opacity = useTransform(indexMv, (v) => {
    const d = Math.abs(v - i);
    return d < 0.5 ? 1 - d * 2 : 0;
  });
  return (
    <motion.img
      src={src}
      alt=""
      style={{ opacity }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/* --------------------------- scene captions --------------------------- */

const SCENES = [
  { at: 0.02, eyebrow: "Meet the device", title: "This is AgriPen.", body: "A precision soil-sensing instrument, engineered to be held, dropped in the ground, and read at a glance." },
  { at: 0.16, eyebrow: "Engineered", title: "Every millimeter has a job.", body: "Sealed enclosure, status LED, USB-C, Li-ion cell, multi-probe sensor tip." },
  { at: 0.34, eyebrow: "In the field", title: "It enters the soil.", body: "The farmer pushes the probe tip into the earth — right where the plant lives." },
  { at: 0.5, eyebrow: "Measuring", title: "Moisture. Temp. Humidity. Pressure.", body: "AgriPen samples the environment continuously through its documented sensor stack." },
  { at: 0.66, eyebrow: "Data journey", title: "From soil to signal.", body: "Readings travel from the sensor tip → ESP32 → wireless link → mobile application." },
  { at: 0.82, eyebrow: "The app", title: "Real screens. Real product.", body: "The AgriPen mobile app receives measurements and turns them into a dashboard the farmer can actually read." },
  { at: 0.9, eyebrow: "AI reasoning", title: "From numbers to a decision.", body: "The AI layer reasons over the readings and weather context — and speaks Algerian dialect back to the farmer." },
  { at: 0.97, eyebrow: "Plant health", title: "Diagnose a sick plant.", body: "Snap a photo of a leaf and the assistant surfaces a possible diagnosis with observed symptoms." },
];

function SceneCaptions({ p }: { p: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center">
      <div className="w-full px-6 md:px-16 lg:w-[52%]">
        {SCENES.map((s, i) => (
          <Caption key={i} p={p} at={s.at} scene={s} />
        ))}
      </div>
    </div>
  );
}

function Caption({
  p, at, scene,
}: { p: MotionValue<number>; at: number; scene: (typeof SCENES)[number] }) {
  const window = 0.08;
  const opacity = useTransform(p, (v) => {
    const d = Math.abs(v - at);
    return d < window ? 1 - d / window : 0;
  });
  const y = useTransform(p, (v) => {
    const d = v - at;
    return d * 100;
  });
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute max-w-lg"
    >
      <p className="mono-label text-accent">{scene.eyebrow}</p>
      <h3 className="mt-3 text-balance text-4xl leading-[1.02] sm:text-5xl md:text-6xl font-display">
        {scene.title}
      </h3>
      <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
        {scene.body}
      </p>
    </motion.div>
  );
}

/* --------------------------- scroll hint --------------------------- */

function ScrollHint({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.05, 0.95, 1], [1, 0.7, 0, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="mono-label text-muted-foreground">Keep scrolling</span>
      <span className="h-8 w-px bg-muted-foreground/40 animate-pulse" />
    </motion.div>
  );
}
