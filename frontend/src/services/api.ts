const API_BASE = 'http://localhost:5000/api';

export async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
