import { useMemo } from "react";
import {
  useDeviceStatus,
  useMeasurementSeries,
} from "@/hooks/use-measurements";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { IS_SIMULATED } from "@/lib/api/client";
import type { MeasurementDto } from "@/lib/api/measurements";

/* ------------------------------- STATUS BAR ------------------------------- */

function relativeTime(iso: string): string {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  return `${h}h ago`;
}

export function DeviceStatusBar() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDeviceStatus();

  const state: "loading" | "error" | "connected" | "disconnected" = isLoading
    ? "loading"
    : isError
      ? "error"
      : data?.status === "connected"
        ? "connected"
        : "disconnected";

  const dot = {
    loading: "bg-muted-foreground",
    error: "bg-destructive",
    connected: "bg-accent",
    disconnected: "bg-muted-foreground",
  }[state];

  const label = {
    loading: "Checking device…",
    error: "Connection error",
    connected: "Device connected",
    disconnected: "Device offline",
  }[state];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-sm"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          {state === "connected" && (
            <span className="absolute inset-0 rounded-full bg-accent/50 motion-safe:animate-ping" />
          )}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
        </span>
        <span className="font-medium">{label}</span>
        {data && (
          <span className="mono-label text-muted-foreground">
            · {data.deviceId}
          </span>
        )}
        {IS_SIMULATED && (
          <span className="mono-label rounded-full border border-border px-2 py-0.5 text-muted-foreground">
            Simulated
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {data?.batteryPct != null && (
          <span className="mono-label">Battery {data.batteryPct}%</span>
        )}
        {data?.rssi != null && (
          <span className="mono-label">RSSI {data.rssi} dBm</span>
        )}
        {data?.lastSeen && (
          <span className="mono-label">Updated {relativeTime(data.lastSeen)}</span>
        )}
        {isError && (
          <span className="text-destructive">
            {error instanceof Error ? error.message : "Unknown error"}
          </span>
        )}
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-full border border-border px-3 py-1 font-medium text-foreground transition hover:bg-muted disabled:opacity-50"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- CHART ------------------------------- */

type ChartProps = {
  title: string;
  unit: string;
  points: number[];
  formatValue?: (v: number) => string;
  accent?: string; // CSS color
};

function Chart({ title, unit, points, formatValue, accent = "var(--accent)" }: ChartProps) {
  const w = 320;
  const h = 90;
  const pad = 6;

  const { path, area, min, max, latest } = useMemo(() => {
    if (points.length === 0) {
      return { path: "", area: "", min: 0, max: 0, latest: 0 };
    }
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const stepX = (w - pad * 2) / Math.max(1, points.length - 1);
    const toXY = (v: number, i: number) => {
      const x = pad + i * stepX;
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return [x, y] as const;
    };
    const d = points
      .map((v, i) => {
        const [x, y] = toXY(v, i);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
    const first = toXY(points[0], 0);
    const last = toXY(points[points.length - 1], points.length - 1);
    const area = `${d} L${last[0].toFixed(1)},${(h - pad).toFixed(1)} L${first[0].toFixed(1)},${(h - pad).toFixed(1)} Z`;
    return { path: d, area, min, max, latest: points[points.length - 1] };
  }, [points]);

  const fmt = formatValue ?? ((v: number) => v.toFixed(1));

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4">
      <div className="flex items-baseline justify-between">
        <p className="mono-label text-muted-foreground">{title}</p>
        <p className="font-display text-2xl text-foreground">
          {fmt(latest)}
          <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
        </p>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-2 h-[90px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${title} trend`}
      >
        <defs>
          <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${title})`} />
        <path
          d={path}
          fill="none"
          stroke={accent}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "d 400ms ease" }}
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span className="mono-label">min {fmt(min)}</span>
        <span className="mono-label">max {fmt(max)}</span>
      </div>
    </div>
  );
}

function ChartSkeleton({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4">
      <div className="flex items-baseline justify-between">
        <p className="mono-label text-muted-foreground">{title}</p>
        <div className="h-6 w-16 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-3 h-[90px] w-full animate-pulse rounded-lg bg-muted" />
    </div>
  );
}

/* ------------------------------- PANEL ------------------------------- */

export function MeasurementsPanel() {
  const reduced = useReducedMotion();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useMeasurementSeries();

  const series = data?.points ?? [];
  const pick = (key: keyof Omit<MeasurementDto, "timestamp">) =>
    series.map((p) => p[key] as number);

  return (
    <div className="space-y-4">
      <DeviceStatusBar />

      {isError ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p className="font-medium text-destructive">
            Couldn't load measurements
          </p>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {isLoading ? (
            <>
              <ChartSkeleton title="Moisture · VWC" />
              <ChartSkeleton title="Temperature" />
              <ChartSkeleton title="Humidity · RH" />
              <ChartSkeleton title="Pressure" />
            </>
          ) : (
            <>
              <Chart
                title="Moisture · VWC"
                unit="%"
                points={pick("moisture")}
                accent="var(--accent)"
              />
              <Chart
                title="Temperature"
                unit="°C"
                points={pick("temperature")}
                accent="var(--earth)"
              />
              <Chart
                title="Humidity · RH"
                unit="%"
                points={pick("humidity")}
                accent="var(--primary-glow)"
              />
              <Chart
                title="Pressure"
                unit="hPa"
                points={pick("pressure")}
                formatValue={(v) => v.toFixed(1)}
                accent="var(--primary)"
              />
            </>
          )}
        </div>
      )}

      <p className="mono-label text-muted-foreground">
        {reduced
          ? "Reduced motion enabled — chart transitions disabled"
          : isFetching
            ? "Streaming from Spring Boot API…"
            : "Auto-refresh every 5 s"}
      </p>
    </div>
  );
}
