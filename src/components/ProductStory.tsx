import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import app1 from "@/assets/app/app-1.png.asset.json";
import app3 from "@/assets/app/app-3.png.asset.json";
import app5 from "@/assets/app/app-5.png.asset.json";
import app6 from "@/assets/app/app-6.png.asset.json";

const SCENES = [
  {
    at: 0.04,
    eyebrow: "Meet the device",
    title: "This is AgriPen.",
    body: "A precision soil-sensing instrument, engineered to be held, inserted into the ground, and read at a glance.",
  },
  {
    at: 0.17,
    eyebrow: "Engineered",
    title: "Every millimeter has a job.",
    body: "Sealed enclosure, status LED, USB-C, Li-ion cell, ESP32 controller and multi-probe sensor tip.",
  },
  {
    at: 0.31,
    eyebrow: "In the field",
    title: "It enters the soil.",
    body: "The farmer pushes the probe tip into the earth — right where the plant roots live.",
  },
  {
    at: 0.46,
    eyebrow: "Measuring",
    title: "Moisture. Temp. Humidity. Pressure.",
    body: "AgriPen samples the environment continuously through its documented prototype sensor stack.",
  },
  {
    at: 0.61,
    eyebrow: "Data journey",
    title: "From soil to signal.",
    body: "Readings travel from the sensor tip to the ESP32, then through a wireless link into the mobile application.",
  },
  {
    at: 0.76,
    eyebrow: "The app",
    title: "Real screens. Real product.",
    body: "The Arabic AgriPen app receives measurements and turns them into a dashboard the farmer can actually read.",
  },
  {
    at: 0.88,
    eyebrow: "AI reasoning",
    title: "From numbers to a decision.",
    body: "The assistant reasons over readings and weather context — then speaks back in Algerian dialect.",
  },
  {
    at: 0.97,
    eyebrow: "Plant health",
    title: "Diagnose a sick plant.",
    body: "A leaf photo becomes observed symptoms, a possible diagnosis and a recommended field action.",
  },
] as const;

const STREAM_STEPS = ["SOIL", "SENSORS", "ESP32", "WIRELESS", "APP", "AI"];
const APP_SCREENS = [app1.url, app5.url, app6.url, app3.url];

export function ProductStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.45 });

  return (
    <section
      ref={ref}
      id="story"
      className="relative text-[var(--cinema-foreground)]"
      style={{ height: "860vh", background: "var(--cinema-bg)" }}
      aria-label="AgriPen product story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--cinema-gradient)" }} />
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "var(--cinema-floor)" }} />

        <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-16 pt-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] md:px-8 md:pb-12 md:pt-24">
          <SceneCaptions p={p} />

          <div className="relative h-[56vh] min-h-[430px] w-full md:h-[78vh] md:min-h-[620px]">
            <SoilLayer p={p} />
            <MeasurementRings p={p} />
            <DeviceStage p={p} />
            <DataStream p={p} />
            <PhoneStage p={p} />
          </div>
        </div>

        <ProgressRail p={p} />
        <ScrollHint p={p} />
      </div>
    </section>
  );
}

function DeviceStage({ p }: { p: MotionValue<number> }) {
  const y = useTransform(p, [0, 0.22, 0.38, 0.68, 1], ["-7%", "-4%", "17%", "17%", "2%"]);
  const x = useTransform(p, [0, 0.64, 0.78, 1], ["0%", "0%", "-26%", "-30%"]);
  // Scroll-linked cinematic rotation: pen tilts, spins a full 360°, then settles
  const rotateZ = useTransform(p, [0, 0.22, 0.38, 0.7, 1], [-18, -8, 0, 6, 0]);
  const rotateY = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [0, 180, 360, 540, 720]);
  const scale = useTransform(p, [0, 0.16, 0.62, 0.78, 1], [1.08, 1, 0.92, 0.72, 0.68]);

  return (
    <motion.div
      style={{ y, x, rotateZ, rotateY, scale, transformPerspective: 1200 }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      <div className="relative h-full max-h-[720px] min-h-[420px]">
        {/* backlight halo so the pen never blends into the dark cinema bg */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[110%] w-[240%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 40% 55% at 50% 50%, oklch(0.72 0.18 140 / 0.28), transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <Pen />
      </div>
    </motion.div>
  );
}

function Pen() {
  return (
    <svg
      viewBox="0 0 220 760"
      className="h-full w-auto"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 44px 74px oklch(0 0 0 / 0.62))" }}
    >
      <defs>
        <linearGradient id="storyBody" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1b241b" />
          <stop offset="0.2" stopColor="#33453a" />
          <stop offset="0.5" stopColor="#8ea690" />
          <stop offset="0.62" stopColor="#c9dccb" />
          <stop offset="0.78" stopColor="#4a5c4d" />
          <stop offset="1" stopColor="#141c14" />
        </linearGradient>
        <linearGradient id="storyCap" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0f150f" />
          <stop offset="0.5" stopColor="#3c4a3c" />
          <stop offset="1" stopColor="#101610" />
        </linearGradient>
        <linearGradient id="storyMetal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8b938c" />
          <stop offset="0.4" stopColor="#f6f8f0" />
          <stop offset="0.65" stopColor="#b6bdb2" />
          <stop offset="1" stopColor="#e3e8dc" />
        </linearGradient>
        <radialGradient id="storyLed" cx="50%" cy="45%" r="70%">
          <stop offset="0" stopColor="#e4ffb0" />
          <stop offset="0.55" stopColor="#8ed94f" />
          <stop offset="1" stopColor="#3a7622" />
        </radialGradient>
        <filter id="innerShadow">
          <feDropShadow dx="-8" dy="0" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
          <feDropShadow dx="7" dy="0" stdDeviation="7" floodColor="#e4ffc4" floodOpacity="0.14" />
        </filter>
      </defs>

      <ellipse cx="110" cy="733" rx="64" ry="14" fill="#000" opacity="0.36" />

      <g filter="url(#innerShadow)">
        <rect x="60" y="20" width="100" height="62" rx="18" fill="url(#storyCap)" />
        <rect x="66" y="27" width="88" height="4" rx="2" fill="#b9c5b2" opacity="0.13" />
        <circle cx="110" cy="53" r="7" fill="url(#storyLed)">
          <animate attributeName="opacity" values="0.65;1;0.65" dur="1.6s" repeatCount="indefinite" />
        </circle>

        <rect x="55" y="82" width="110" height="238" rx="14" fill="url(#storyBody)" />
        <rect x="66" y="98" width="9" height="202" rx="5" fill="#fff" opacity="0.06" />
        <rect x="145" y="98" width="6" height="202" rx="4" fill="#000" opacity="0.26" />
        <text x="110" y="202" textAnchor="middle" fill="#b6c9b0" opacity="0.62" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="4">
          AGRIPEN
        </text>
        <rect x="94" y="242" width="32" height="11" rx="6" fill="#060906" stroke="#6d7d67" strokeWidth="0.7" />
        <rect x="95" y="292" width="30" height="8" rx="4" fill="#020302" stroke="#3f493d" strokeWidth="0.6" />

        <rect x="52" y="320" width="116" height="7" rx="3.5" fill="#050705" />
        <rect x="55" y="327" width="110" height="188" rx="14" fill="url(#storyBody)" />
        <rect x="66" y="343" width="9" height="150" rx="5" fill="#fff" opacity="0.055" />

        <path d="M48 515 H172 L184 551 H36 Z" fill="url(#storyCap)" />
        <rect x="42" y="548" width="136" height="12" rx="6" fill="#111811" />
      </g>

      <g>
        {[76, 96, 124, 144].map((x) => (
          <g key={x}>
            <rect x={x - 2.4} y="558" width="4.8" height="156" rx="2.4" fill="url(#storyMetal)" />
            <polygon points={`${x - 2.4},714 ${x + 2.4},714 ${x},733`} fill="#eef1ea" />
          </g>
        ))}
        <rect x="107" y="558" width="6" height="176" rx="3" fill="url(#storyMetal)" />
        <polygon points="107,734 113,734 110,754" fill="#f6f8f0" />
      </g>
    </svg>
  );
}

function SoilLayer({ p }: { p: MotionValue<number> }) {
  const y = useTransform(p, [0, 0.24, 0.38, 1], ["120%", "120%", "56%", "56%"]);
  const opacity = useTransform(p, [0.22, 0.36], [0, 1]);
  const speckles = useMemo(
    () => Array.from({ length: 72 }, (_, i) => ({ x: (i * 37) % 100, y: 18 + ((i * 53) % 80), r: 0.28 + ((i * 11) % 7) / 12 })),
    [],
  );

  return (
    <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-x-[-20%] bottom-0 z-10 h-[72%]">
      <div className="h-full w-full" style={{ background: "var(--cinema-soil)" }} />
      <svg className="absolute inset-0 h-full w-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {speckles.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#050302" />)}
      </svg>
    </motion.div>
  );
}

function MeasurementRings({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.38, 0.46, 0.59, 0.67], [0, 1, 1, 0]);
  const scale = useTransform(p, [0.38, 0.62], [0.62, 1.35]);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center pb-[13vh]">
      <motion.div style={{ scale }} className="relative h-56 w-56 md:h-72 md:w-72">
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute inset-0 rounded-full border border-[var(--cinema-accent)]/60" style={{ animation: `pulse-ring 2.4s ${i * 0.55}s ease-out infinite` }} />
        ))}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cinema-accent)] shadow-[0_0_28px_var(--cinema-accent)]" />
      </motion.div>
    </motion.div>
  );
}

function DataStream({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.56, 0.64, 0.78, 0.86], [0, 1, 1, 0]);
  const y = useTransform(p, [0.56, 0.68, 0.86], [20, 0, -14]);

  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute inset-x-0 top-[9%] z-40 flex justify-center px-2">
      <div className="flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-[var(--cinema-border)] bg-[var(--cinema-panel)] px-3 py-2 shadow-2xl backdrop-blur-xl md:gap-3 md:px-4">
        {STREAM_STEPS.map((s, i) => (
          <span key={s} className="flex min-w-0 items-center gap-2 md:gap-3">
            <span className="mono-label whitespace-nowrap text-[var(--cinema-foreground)]">{s}</span>
            {i < STREAM_STEPS.length - 1 && <span className="mono-label text-[var(--cinema-accent)]">→</span>}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function PhoneStage({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0.7, 0.8, 1], ["105%", "18%", "12%"]);
  const opacity = useTransform(p, [0.68, 0.78], [0, 1]);
  const screenIndex = useTransform(p, [0.76, 0.84, 0.91, 1], [0, 1, 2, 3]);

  return (
    <motion.div style={{ x, opacity }} className="pointer-events-none absolute right-0 top-1/2 z-30 flex w-[66%] max-w-[390px] -translate-y-1/2 justify-end md:w-[54%]">
      <div className="relative w-[72%] max-w-[280px]">
        <div className="absolute -inset-8 rounded-full bg-[var(--cinema-accent)]/12 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.2rem] border-[6px] border-[var(--cinema-phone)] bg-[var(--cinema-phone)] p-1.5 shadow-2xl">
          <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[var(--cinema-phone)]" />
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.55rem] bg-background">
            {APP_SCREENS.map((src, i) => <PhoneScreen key={src} src={src} i={i} indexMv={screenIndex} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneScreen({ src, i, indexMv }: { src: string; i: number; indexMv: MotionValue<number> }) {
  const opacity = useTransform(indexMv, (v) => {
    const d = Math.abs(v - i);
    return d < 0.55 ? 1 - d * 1.75 : 0;
  });

  return <motion.img src={src} alt="AgriPen mobile app screen" style={{ opacity }} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />;
}

function SceneCaptions({ p }: { p: MotionValue<number> }) {
  return (
    <div className="relative z-40 flex min-h-[320px] items-center md:min-h-0">
      <div className="relative h-[360px] w-full max-w-xl md:h-[430px]">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cinema-accent)] shadow-[0_0_18px_var(--cinema-accent)]" />
          <span className="mono-label text-[var(--cinema-muted)]">AGRIPEN PRODUCT JOURNEY</span>
        </div>
        {SCENES.map((s) => <Caption key={s.title} p={p} at={s.at} scene={s} />)}
      </div>
    </div>
  );
}

function Caption({ p, at, scene }: { p: MotionValue<number>; at: number; scene: (typeof SCENES)[number] }) {
  const opacity = useTransform(p, (v) => {
    const d = Math.abs(v - at);
    if (d > 0.085) return 0;
    return Math.max(0, 1 - d / 0.085);
  });
  const y = useTransform(p, (v) => (v - at) * 120);

  return (
    <motion.div style={{ opacity, y }} className="absolute left-0 top-16 max-w-xl">
      <p className="mono-label text-[var(--cinema-accent)]">{scene.eyebrow}</p>
      <h3 className="mt-4 text-balance font-display text-4xl leading-[1.02] text-[var(--cinema-foreground)] sm:text-5xl md:text-6xl">
        {scene.title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--cinema-muted)] md:text-lg">
        {scene.body}
      </p>
    </motion.div>
  );
}

function ProgressRail({ p }: { p: MotionValue<number> }) {
  const scaleY = useTransform(p, [0, 1], [0.04, 1]);
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-50 hidden h-64 -translate-y-1/2 md:block">
      <div className="h-full w-px bg-[var(--cinema-border)]">
        <motion.div style={{ scaleY, transformOrigin: "top" }} className="h-full w-px bg-[var(--cinema-accent)]" />
      </div>
    </div>
  );
}

function ScrollHint({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.05, 0.92, 1], [1, 0.65, 0, 0]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      <span className="mono-label text-[var(--cinema-muted)]">Keep scrolling</span>
      <span className="h-9 w-px bg-[var(--cinema-muted)]/50" />
    </motion.div>
  );
}