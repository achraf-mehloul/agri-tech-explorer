# AgriPen — Official Product Experience Website

The official web experience for **AgriPen**, a precision soil-sensing
instrument that combines embedded electronics, a mobile application and
artificial intelligence to support smarter agricultural decisions.

This site is designed as a **product documentary** — a cinematic,
interactive presentation of the AgriPen ecosystem, from the physical
sensor probe entering the soil to the AI-generated recommendation
reaching the farmer's phone.

---

## The full experience

### 1. Cinematic Product Story (scroll-driven)

The centerpiece of the site. A single sticky viewport that follows the
AgriPen through **eight connected scenes**, driven entirely by the
scroll position:

1. **Meet the device** — a large, physical-looking AgriPen enters the frame.
2. **Engineered** — the device rotates to reveal the top cap, upper body,
   USB-C, button, lower body and sensor tip.
3. **In the field** — a soil layer rises, the device descends toward it.
4. **Insertion** — the sensor probes physically penetrate the soil.
5. **Measuring** — pulsing rings visualize sensor activity, live values
   appear (moisture, temperature, humidity, pressure).
6. **Data journey** — a labelled flow appears: `SOIL → SENSORS → ESP32 → DATA`.
7. **App handover** — a phone slides in on the right and displays the
   **real AgriPen application screenshots**.
8. **AI + plant health** — the assistant reasons over the data and the
   plant-diagnosis flow is introduced.

All scene captions cross-fade with the pen's motion — nothing floats
without meaning.

### 2. Interactive 3D device (Three.js)

A separate, hands-on **Explore AgriPen** section powered by
`@react-three/fiber` and `@react-three/drei`:

- 360° rotation, zoom, reset view.
- **Exploded view** — top cap, upper body, 18650 battery, lower body and
  sensor probes separate along the vertical axis.
- **Hotspots** — top cap, power button, USB-C, battery cell and sensor
  probes; each opens a component detail panel.
- Realistic lighting: studio environment, contact shadows, physical
  materials.

### 3. Real hardware showcase

An interactive gallery that uses **the actual photos of the components
we used in the prototype** — no stock illustrations. Featured components
each carry engineering specs (interface, supply, accuracy, range):

| Component        | Role                              |
|------------------|-----------------------------------|
| ESP32            | Dual-core Wi-Fi + Bluetooth MCU   |
| DHT11            | Air temperature & humidity        |
| BMP180           | Barometric pressure               |
| YL-69 / FC-28    | Soil moisture probe               |
| Li-ion 3.7V      | Rechargeable power cell           |
| Resistors        | 220 Ω – 10 kΩ passives            |

Selecting a component swaps in a high-resolution product photo, its
specs, its role in the AgriPen circuit, and its prototype status.

### 4. Real application gallery

**Ten authentic screenshots** of the current Arabic AgriPen mobile
application are presented inside a phone frame with a thumbnail
navigator: dashboard, live measurements, AI voice assistant, AI chat,
plant diagnosis, crop library, NDVI-style farm map, account, and more.
No mockups, no invented UI.

### 5. Hardware architecture explorer

An interactive pipeline that walks the visitor through every layer of
the AgriPen system: `Sensors → ESP32 → Processing → Wireless →
Application → AI → Farmer`. Hovering or clicking any layer highlights
the corresponding stage on an animated diagram.

### 6. Ecosystem visualisation

A visual bridge between the physical device, the transmission layer, the
software and the AI — designed to explain in one glance how the pieces
connect.

### 7. Current prototype vs Future vision

An honest, on-screen toggle that separates what already exists (ESP32,
DHT11, BMP180, YL-69, 3D-printed enclosure, companion mobile app) from
what is on the roadmap (capacitive moisture, pH, EC, OLED, custom PCB,
industrial-grade enclosure).

### 8. AI reasoning module

Three cards — **Input → Analysis → Output** — plus an example reasoning
card that shows how measurements + weather context become a
plain-language recommendation such as *"Irrigation may be required
within 24 hours."*

### 9. Local-dialect voice assistant (highlighted)

The site presents the assistant as a **conversational product** with
listening / thinking / response states, and uses the actual Arabic app
screens to show voice + chat interactions in Algerian dialect.

### 10. Plant disease detection flow

The narrative includes the four-step camera diagnosis flow — capture,
analyze, identify, recommend — using honest language ("possible
diagnosis", "AI-assisted analysis") rather than clinical certainty.

### 11. Live simulated session

A clearly labelled **SIMULATION** dashboard with animated moisture,
temperature, humidity and pressure values, a live signal chart, and an
AI recommendation card.

### 12. Roadmap timeline

Six phases from **Software MVP (completed)** through Hardware prototype,
Field validation, Custom electronics, Pilot deployment and Commercial
product.

### 13. Use cases & tech stack

Precision farming, greenhouses, research and education — plus the full
technology stack behind the product.

### 14. Call to action

A dedicated section aimed at investors, agricultural partners and
research institutions.

---

## Design system

The visual identity is extracted directly from the AgriPen logo:

- **Forest green** (primary)
- **Leaf green** (accent)
- **Earth brown** (secondary accent)
- **Warm bone / soft charcoal** (light / dark backgrounds)

All tokens live in `src/styles.css` as OKLCH CSS variables and are
mapped to Tailwind utilities via `@theme inline`.

**Typography**

- *Instrument Serif* — display
- *Inter* — UI
- *JetBrains Mono* — technical labels

**Dark & light modes**

An elegant sun/moon **theme toggle** lives in the navigation. The theme
is persisted in `localStorage`, respects `prefers-color-scheme` on first
visit, and uses a pre-hydration script to prevent any flash of the
wrong theme.

**Responsive**

Mobile-first. Grid + `min-w-0` + `shrink-0` patterns guarantee that
multi-item headers never clip on small screens. The 3D viewer stays
performant on phones; the cinematic scroll is tuned for mobile touch.

---

## Honesty rules baked into the site

- Anything not yet built is labelled **PROTOTYPE**, **CONCEPT**, or **ROADMAP**.
- The interactive demo is labelled **SIMULATION** — it never claims to
  receive readings from a physical device.
- Only documented components are presented as current hardware.
- Only the real Arabic application screens are used; no invented UI is
  passed off as the app.

---

## Tech stack

- **React 19** + **TanStack Start / Router** — SSR shell and routing.
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — the
  interactive 3D device viewer, exploded view and hotspot HUD.
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
