# AgriPen — Official Product Experience Website

The official web experience for **AgriPen**, a precision soil-sensing instrument
that combines embedded electronics, mobile software and artificial intelligence
to support smarter agricultural decisions.

This site is designed as a **product documentary** rather than a marketing page:
the AgriPen device is the protagonist, and every section reveals another layer
of the engineering, the data pipeline and the roadmap.

## Experience overview

1. **Hero — the device.** An interactive 3D AgriPen sits at the center of the
   first screen. The user can rotate, zoom, click hotspots, or trigger the
   **exploded view** to see the internal components (top cap, upper body, 18650
   battery cell, lower body, sensor probes).
2. **Narrative.** Seven scroll moments — *see it, understand it, open it,
   measure, connect, think, act* — walk the visitor from object to decision.
3. **Hardware architecture.** An interactive diagram of the pipeline:
   sensors → ESP32 → processing → wireless → application → AI → farmer.
4. **Current vs Future.** A toggle that separates the honest prototype
   (`ESP32`, `DHT11`, `BMP180`, `YL-69`, 3D-printed enclosure) from the
   roadmap (capacitive moisture, pH, EC, OLED, custom PCB, industrial
   enclosure).
5. **Mobile application.** A phone mockup shows the companion app —
   dashboard, live measurements, AI assistant, recommendations.
6. **AI experience.** Input → Analysis → Output, with an example of the
   reasoning grounded in real measurements.
7. **Live demo.** A clearly labelled **SIMULATION** of an AgriPen session,
   with animated moisture / temperature / humidity / pressure values and
   an AI recommendation card.
8. **Roadmap.** Six phases from Software MVP (completed) to Commercial
   product (vision).
9. **Use cases & technology stack.**
10. **Call to action** for investors, partners, and institutions.

## Honesty rules baked into the site

- Anything not yet built is labelled **PROTOTYPE**, **CONCEPT**, or
  **ROADMAP**.
- The interactive demo is labelled **SIMULATION** — it never claims to
  receive live measurements from a physical device.
- Only documented components (ESP32, DHT11, BMP180, YL-69, 18650 Li-ion)
  are presented as current; every future sensor is grouped under the
  roadmap toggle.

## Design system

The visual identity is extracted from the AgriPen logo (deep forest green,
leaf accent, earthy brown, warm bone background). Tokens live in
`src/styles.css` as OKLCH CSS variables and are mapped to Tailwind
utilities via `@theme inline`. Typography pairs **Instrument Serif** for
display with **Inter** for UI and **JetBrains Mono** for technical
labels.

## Tech stack

- **React 19** + **TanStack Start / Router** — routing and SSR shell.
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — the
  interactive 3D device viewer, exploded view and hotspot HUD.
- **Tailwind CSS v4** — utility styling with a token-driven design
  system.
- **Framer Motion** — installed for scroll and micro-interaction polish.
- **Vite 7** — build tooling.

## Development

```bash
bun install
bun run dev
```

The 3D viewer is client-only and lazy-loaded so the first paint stays
fast; the rest of the page renders as static HTML.
