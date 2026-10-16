import axios from "axios";

// Change ONLY this value to point the app at a real backend.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
export const WS_URL = import.meta.env.VITE_WS_URL || API_BASE_URL.replace(/^http/, "ws") + "/ws/live";

// Toggle this to false once the FastAPI backend above is reachable.
export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "true") === "true";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});
