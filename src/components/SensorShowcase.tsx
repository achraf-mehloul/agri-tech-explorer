import { useState } from "react";
import esp32 from "@/assets/hardware/esp32.jpeg.asset.json";
import dht11 from "@/assets/hardware/dht11.jpeg.asset.json";
import bmp180 from "@/assets/hardware/bmp180.jpeg.asset.json";
import yl69 from "@/assets/hardware/yl69.jpeg.asset.json";
import battery from "@/assets/hardware/battery.jpeg.asset.json";
import resistor from "@/assets/hardware/resistor.jpeg.asset.json";

type Sensor = {
  id: string;
  name: string;
  role: string;
  status: "PROTOTYPE" | "PLANNED";
  desc: string;
  specs: [string, string][];
  image: string;
};

const SENSORS: Sensor[] = [
  {
    id: "esp32",
    name: "ESP32",
    role: "Microcontroller · Wi-Fi + Bluetooth",
    status: "PROTOTYPE",
    desc: "Dual-core 240MHz microcontroller with Wi-Fi and Bluetooth. Runs the AgriPen firmware — the sampling loop, signal filtering and wireless transmission of every reading.",
    specs: [
      ["Cores", "2 × Xtensa 32-bit"],
      ["Clock", "up to 240 MHz"],
      ["Wireless", "Wi-Fi 802.11 b/g/n"],
      ["Bluetooth", "v4.2 BR/EDR + BLE"],
    ],
    image: esp32.url,
  },
  {
    id: "dht11",
    name: "DHT11",
    role: "Air temperature & humidity",
    status: "PROTOTYPE",
    desc: "Digital temperature and humidity sensor. Used in the current prototype to establish the environmental measurement pipeline surrounding the plant.",
    specs: [
      ["Temperature", "0 – 50 °C ± 2 °C"],
      ["Humidity", "20 – 90 % RH ± 5 %"],
      ["Interface", "1-Wire digital"],
    ],
    image: dht11.url,
  },
  {
    id: "bmp180",
    name: "BMP180",
    role: "Barometric pressure",
    status: "PROTOTYPE",
    desc: "Precision barometric pressure sensor. Provides the atmospheric context that helps AgriPen interpret microclimate patterns around the field.",
    specs: [
      ["Pressure", "300 – 1100 hPa"],
      ["Accuracy", "± 0.12 hPa"],
      ["Interface", "I²C"],
    ],
    image: bmp180.url,
  },
  {
    id: "yl69",
    name: "YL-69 / FC-28",
    role: "Soil moisture probe",
    status: "PROTOTYPE",
    desc: "Resistive soil-moisture probe. The first sensing element used to validate AgriPen's moisture-reading pipeline directly inside the soil.",
    specs: [
      ["Signal", "Analog + digital"],
      ["Supply", "3.3 – 5 V"],
      ["Depth", "insertion probe"],
    ],
    image: yl69.url,
  },
  {
    id: "battery",
    name: "Li-ion 3.7V",
    role: "Power cell",
    status: "PROTOTYPE",
    desc: "Rechargeable 3.7 V Li-ion cell, ~1000 – 1500 mAh. Powers the current AgriPen prototype through a full day of field work.",
    specs: [
      ["Nominal", "3.7 V"],
      ["Capacity", "1000 – 1500 mAh"],
      ["Chemistry", "Li-ion"],
    ],
    image: battery.url,
  },
  {
    id: "resistors",
    name: "Resistors",
    role: "Passives · 220 Ω – 10 kΩ",
    status: "PROTOTYPE",
    desc: "Standard through-hole metal-film resistors used across the prototype to condition signals, protect I/O lines and set reference thresholds.",
    specs: [
      ["Type", "Metal film 1/4 W"],
      ["Tolerance", "± 1 %"],
      ["Range", "220 Ω – 10 kΩ"],
    ],
    image: resistor.url,
  },
];

export function SensorShowcase() {
  const [active, setActive] = useState(SENSORS[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      {/* Featured component */}
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8 md:p-12"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="relative flex items-center justify-between gap-3">
          <span className="mono-label rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
            ● {active.status}
          </span>
          <span className="mono-label text-muted-foreground truncate">
            {active.role}
          </span>
        </div>

        <div className="relative mx-auto my-6 aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-2xl">
            <img
              key={active.id}
              src={active.image}
              alt={active.name}
              className="max-h-full max-w-full object-contain drop-shadow-xl animate-fade-in"
            />
          </div>
        </div>

        <h3 className="text-4xl md:text-5xl font-display leading-none">{active.name}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{active.desc}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
          {active.specs.map(([k, v]) => (
            <div key={k} className="border-t border-border pt-2">
              <dt className="mono-label text-muted-foreground">{k}</dt>
              <dd className="mt-0.5 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Grid of other components */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 self-start">
        {SENSORS.map((s) => {
          const isActive = s.id === active.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              className={`group relative flex flex-col rounded-2xl border p-3 text-left transition ${
                isActive
                  ? "border-accent bg-background shadow-soft"
                  : "border-border bg-surface hover:border-border-strong hover:bg-background"
              }`}
              style={isActive ? { boxShadow: "var(--shadow-soft)" } : undefined}
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-background/40">
                <img
                  src={s.image}
                  alt={s.name}
                  className={`max-h-[85%] max-w-[85%] object-contain transition ${
                    isActive ? "scale-105" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                  }`}
                />
              </div>
              <p className="mt-2 text-sm font-medium font-sans truncate">{s.name}</p>
              <p className="mono-label text-muted-foreground truncate">{s.role}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
