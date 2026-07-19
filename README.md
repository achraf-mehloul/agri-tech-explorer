# AgriPen

The official product website for **AgriPen** — a precision soil-sensing
instrument that combines embedded electronics, a mobile application and
an AI reasoning layer to support smarter agricultural decisions.

The site is built as an interactive product documentary: a cinematic,
scroll-driven presentation of the AgriPen ecosystem from the physical
probe entering the soil to the recommendation delivered to the farmer.

---

## What the site contains

- **Hero — Cinematic Laboratory stage**
  - Editorial headline, engineering metadata, key stats (Response 0.4 s,
    Precision ±0.12 hPa, Depth 200 mm).
  - Interactive 3D device stage with ambient green glow, floating HUD
    panels (Moisture, Temperature, live spectrum) and dimension callouts.

- **Interactive 3D device (`AgriPen3D`)**
  - Three.js + `@react-three/fiber` + `@react-three/drei`.
  - Auto-rotate, drag to rotate, pinch/scroll to zoom.
  - **Exploded view** — top cap, upper body, 18650 battery, lower body
    and sensor probes separate along the vertical axis.
  - **X-Ray mode** — makes the enclosure translucent to reveal the
    internal PCB, battery cell and wires.
  - **Hotspots** — top cap, power button, USB-C, battery and sensor
    probes, each opening a component detail panel.

- **Cinematic Product Story (scroll-driven)**
  - A single sticky viewport that follows the AgriPen through eight
    connected scenes: introduction, engineering breakdown, soil
    approach, insertion, measurement, data journey, app handover, AI +
    plant health.

- **Real prototype hardware showcase**
  - Real photographs of the actual prototype components: ESP32, DHT11,
    BMP180, YL-69 / FC-28, 18650 Li-ion cell, resistors.
  - Each component carries engineering specs (interface, supply,
    accuracy, range) and its role in the AgriPen circuit.

- **Real application gallery**
  - Ten authentic screenshots of the current Arabic AgriPen mobile
    application, framed inside a phone mock with a thumbnail navigator
    (dashboard, live measurements, voice assistant, chat, plant
    diagnosis, crop library, NDVI-style farm map, account and more).

- **Hardware architecture explorer**
  - Interactive pipeline `Sensors → ESP32 → Processing → Wireless →
    Application → AI → Farmer`. Hovering or clicking any layer
    highlights the corresponding stage on the animated diagram.

- **Ecosystem visualisation**
  - Visual bridge between the physical device, the transmission layer,
    the software and the AI reasoning layer.

- **Current prototype vs Future vision**
  - Honest, on-screen toggle. The *current* view shows the real
    prototype board (ESP32, DHT11, BMP180, YL-69, 18650, resistors,
    breadboard). The *future* view lists the roadmap: capacitive
    moisture, pH, EC, OLED, custom PCB, industrial-grade enclosure.

- **AI reasoning module**
  - Input → Analysis → Output cards plus a worked example that turns
    measurements + weather context into a plain-language recommendation
    such as *"Irrigation may be required within 24 hours."*

- **Local-dialect voice assistant**
  - Positioned as a conversational product with listening, thinking and
    response states, using the actual Arabic app screens to show voice
    and chat interactions in Algerian dialect.

- **Plant disease detection flow**
  - Four-step camera diagnosis: capture, analyse, identify, recommend —
    written as *possible* diagnosis with observed symptoms, never as
    clinical certainty.

- **Live simulated session**
  - Clearly labelled **SIMULATION** dashboard with animated moisture,
    temperature, humidity and pressure values, a live signal chart and
    an AI recommendation card.

- **Roadmap timeline**
  - Six phases from Software MVP (completed) through Hardware
    prototype, Field validation, Custom electronics, Pilot deployment
    and Commercial product.

- **Use cases & technology stack**
  - Precision farming, greenhouses, research and education plus the
    full technology stack.

- **Call to action**
  - Dedicated section aimed at investors, agricultural partners and
    research institutions.

---

## Design system

Visual identity extracted from the AgriPen logo:

- **Forest green** — primary
- **Leaf green** — accent
- **Earth brown** — secondary accent
- **Warm bone / soft charcoal** — light / dark backgrounds

All tokens live in `src/styles.css` as OKLCH CSS variables and are
mapped to Tailwind utilities via `@theme inline`.

**Typography**

- *Instrument Serif* — display
- *Inter* — UI
- *JetBrains Mono* — technical labels

**Dark & light modes**

A sun/moon **theme toggle** lives in the navigation. The theme is
persisted in `localStorage`, respects `prefers-color-scheme` on first
visit, and uses a pre-hydration script to prevent any flash of the
wrong theme.

**Responsive**

Mobile-first. Grid + `min-w-0` + `shrink-0` patterns guarantee that
multi-item headers never clip on small screens. The 3D viewer stays
performant on phones; the cinematic scroll is tuned for mobile touch.

---

## Honesty rules

- Anything not yet built is labelled **PROTOTYPE**, **CONCEPT**, or **ROADMAP**.
- The interactive demo is labelled **SIMULATION** and never claims to
  receive readings from a physical device.
- Only documented components are presented as current hardware.
- Only the real Arabic application screens are used; no invented UI is
  passed off as the product.

---

## Tech stack

- **React 19** + **TanStack Start / Router** — SSR shell and routing.
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — the
  interactive 3D device viewer, exploded view, X-Ray shader and hotspot HUD.
- **Framer Motion** — the scroll-driven cinematic product story and
  micro-interactions.
- **Tailwind CSS v4** — token-driven design system in `src/styles.css`.
- **Vite 7** — build tooling.

The 3D viewer and cinematic story are client-only and lazy-loaded so
the first paint stays fast.

---

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:8080](http://localhost:8080).
