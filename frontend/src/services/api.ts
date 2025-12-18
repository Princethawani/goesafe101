// frontend/src/services/api.ts

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* --------------------
   PUBLIC ENDPOINTS
-------------------- */

// Flood alerts (PUBLIC)
export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/api/alerts`);
  console.log('Fetch Alerts Response:', res);

  if (!res.ok) {
    throw new Error('Failed to fetch alerts');
  }

  return res.json();
}

/* --------------------
   PROTECTED ENDPOINTS
-------------------- */

// Dashboard stats (ADMIN)
export async function fetchDashboard() {
  // const token = localStorage.getItem('token');

  // if (!token) {
  //   throw new Error('Not authenticated');
  // }

  const res = await fetch(`${API_BASE}/api/dashboard`, {
    // headers: {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`
    // }
  });

  if (!res.ok) {
    throw new Error('Failed to load dashboard');
  }

  return res.json();
}
