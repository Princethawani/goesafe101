const AI_BASE = import.meta.env.VITE_AI_URL || 'http://localhost:8080';

export interface Forecast {
  date: string;
  flood_risk: number; // 0.0 – 1.0
  rain_mm: number;
  wind_kph: number;
}

export interface ForecastResponse {
  area: string;
  lat: number;
  lon: number;
  forecast: Forecast[];
}

export async function fetchFloodForecast(lat: number, lon: number, area: string): Promise<ForecastResponse> {
  const res = await fetch(`${AI_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lon, area })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch forecast from AI engine');
  }

  return res.json();
}
