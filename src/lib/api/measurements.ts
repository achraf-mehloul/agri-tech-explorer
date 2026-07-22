// DTOs and endpoints for the Spring Boot backend.
// Endpoints mirror a typical REST layout under /api/v1.

import { apiFetch, IS_SIMULATED } from "./client";

export type DeviceStatus = "connected" | "disconnected" | "unknown";

export interface DeviceStatusDto {
  deviceId: string;
  status: DeviceStatus;
  batteryPct: number | null;
  rssi: number | null;
  lastSeen: string; // ISO-8601
}

export interface MeasurementDto {
  timestamp: string; // ISO-8601
  moisture: number; // % VWC
  temperature: number; // °C
  humidity: number; // % RH
  pressure: number; // hPa
}

export interface MeasurementSeriesDto {
  deviceId: string;
  points: MeasurementDto[];
}

/* ---------------- Real endpoints ---------------- */

export function fetchDeviceStatus(deviceId = "agripen-01") {
  return apiFetch<DeviceStatusDto>(`/api/v1/devices/${deviceId}/status`);
}

export function fetchLatestMeasurement(deviceId = "agripen-01") {
  return apiFetch<MeasurementDto>(
    `/api/v1/devices/${deviceId}/measurements/latest`,
  );
}

export function fetchMeasurementSeries(
  deviceId = "agripen-01",
  minutes = 30,
) {
  return apiFetch<MeasurementSeriesDto>(
    `/api/v1/devices/${deviceId}/measurements?window=${minutes}m`,
  );
}

/* ---------------- Simulated fallback ----------------
   Used only when VITE_API_BASE_URL is not configured (dev / preview).
   Deterministic + slowly drifting so charts feel alive. */

function seeded(t: number) {
  return (Math.sin(t / 40) + Math.cos(t / 17) + Math.sin(t / 9)) / 3;
}

function simulatedSeries(minutes: number): MeasurementDto[] {
  const now = Date.now();
  const step = (minutes * 60_000) / 30; // 30 points
  const out: MeasurementDto[] = [];
  for (let i = 29; i >= 0; i--) {
    const ts = now - i * step;
    const n = seeded(ts / 1000);
    out.push({
      timestamp: new Date(ts).toISOString(),
      moisture: 42 + n * 8,
      temperature: 24 + n * 3,
      humidity: 55 + n * 12,
      pressure: 1012 + n * 4,
    });
  }
  return out;
}

export async function fetchDeviceStatusSafe(
  deviceId = "agripen-01",
): Promise<DeviceStatusDto> {
  if (!IS_SIMULATED) return fetchDeviceStatus(deviceId);
  return {
    deviceId,
    status: "connected",
    batteryPct: 82,
    rssi: -58,
    lastSeen: new Date().toISOString(),
  };
}

export async function fetchMeasurementSeriesSafe(
  deviceId = "agripen-01",
  minutes = 30,
): Promise<MeasurementSeriesDto> {
  if (!IS_SIMULATED) return fetchMeasurementSeries(deviceId, minutes);
  // small artificial latency so skeletons flash briefly
  await new Promise((r) => setTimeout(r, 350));
  return { deviceId, points: simulatedSeries(minutes) };
}
