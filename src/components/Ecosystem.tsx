import logoAsset from "@/assets/agripen-logo.png.asset.json";
import app5 from "@/assets/app/app-5.png.asset.json";

/**
 * Hardware → Device → Data → App → AI → Decision
 * A horizontal ecosystem strip that visually connects the real components
 * of the AgriPen system.
 */
export function Ecosystem() {
  const stages = [
    { label: "Sensors", sub: "Physical measurement" },
    { label: "ESP32", sub: "Embedded processing" },
    { label: "Data", sub: "Wireless transport" },
    { label: "AgriPen app", sub: "Real interface" },
    { label: "AI", sub: "Context reasoning" },
    { label: "Decision", sub: "Farmer action" },
  ];

  return (
    <div className="relative rounded-3xl border border-border bg-surface p-6 md:p-10">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none rounded-3xl" />

      {/* Visual row */}
      <div className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-6 items-stretch">
        {/* Sensors */}
        <EcoCard title="Real sensors" sub="Prototype hardware">
          <div className="flex flex-1 items-center justify-center gap-1">
            {["DHT11", "BMP180", "YL-69"].map((n) => (
              <span key={n} className="rounded border border-border-strong bg-muted px-1.5 py-0.5 mono-label">{n}</span>
            ))}
          </div>
        </EcoCard>

        {/* ESP32 */}
        <EcoCard title="ESP32" sub="Firmware">
          <div className="flex flex-1 items-center justify-center">
            <div className="grid h-16 w-16 place-items-center rounded-lg border-2 border-accent bg-background text-[10px] font-mono">
              ESP32
            </div>
          </div>
        </EcoCard>

        {/* Data */}
        <EcoCard title="Wireless" sub="WiFi / Bluetooth">
          <div className="flex flex-1 items-center justify-center">
            <svg viewBox="0 0 60 60" className="h-16 w-16 text-accent">
              <path d="M30 45 a4 4 0 1 1 0 -0.1 z" fill="currentColor" />
              <path d="M18 33 a17 17 0 0 1 24 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 25 a29 29 0 0 1 40 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <path d="M4 17 a41 41 0 0 1 52 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
            </svg>
          </div>
        </EcoCard>

        {/* App */}
        <EcoCard title="AgriPen app" sub="Real screenshots">
          <div className="flex flex-1 items-center justify-center">
            <div className="relative aspect-[9/16] h-20 overflow-hidden rounded-md border-2 border-foreground bg-background">
              <img src={app5.url} alt="AgriPen app" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </EcoCard>

        {/* AI */}
        <EcoCard title="AI" sub="Reasoning layer">
          <div className="flex flex-1 items-center justify-center">
            <svg viewBox="0 0 60 60" className="h-14 w-14 text-accent">
              <path d="M30 8 L38 22 L52 24 L42 34 L45 48 L30 41 L15 48 L18 34 L8 24 L22 22 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        </EcoCard>

        {/* Decision */}
        <EcoCard title="Decision" sub="Farmer action">
          <div className="flex flex-1 items-center justify-center">
            <img src={logoAsset.url} alt="AgriPen" className="h-16 w-16 object-contain" />
          </div>
        </EcoCard>
      </div>

      {/* Labels row (mobile shows above) */}
      <div className="mt-6 hidden lg:grid lg:grid-cols-6 lg:gap-4">
        {stages.map((s, i) => (
          <div key={s.label} className="relative">
            {i < stages.length - 1 && (
              <div className="absolute top-3 -right-2 h-px w-4 bg-border-strong" />
            )}
            <p className="mono-label text-accent">Stage {String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 text-sm font-medium">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcoCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col rounded-2xl border border-border bg-background p-4 min-h-[140px]">
      <div className="lg:hidden mb-2">
        <p className="text-sm font-medium">{title}</p>
        <p className="mono-label text-muted-foreground">{sub}</p>
      </div>
      {children}
    </div>
  );
}
