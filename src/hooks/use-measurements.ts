import { useQuery } from "@tanstack/react-query";
import {
  fetchDeviceStatusSafe,
  fetchMeasurementSeriesSafe,
} from "@/lib/api/measurements";

export function useDeviceStatus(deviceId = "agripen-01") {
  return useQuery({
    queryKey: ["device-status", deviceId],
    queryFn: () => fetchDeviceStatusSafe(deviceId),
    refetchInterval: 15_000,
    staleTime: 5_000,
  });
}

export function useMeasurementSeries(
  deviceId = "agripen-01",
  minutes = 30,
) {
  return useQuery({
    queryKey: ["measurements", deviceId, minutes],
    queryFn: () => fetchMeasurementSeriesSafe(deviceId, minutes),
    refetchInterval: 5_000,
    staleTime: 2_000,
  });
}
