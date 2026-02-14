// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:9091";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
// Interceptar las solicitudes //
api.interceptors.request.use((config) => {
  // Si existe un token, lo incluye en los encabezados //
  const token = localStorage.getItem("token");
 // Aseguramos que el token no sea null //
  const hasToken = token && token !== "null" && token !== "undefined";
  if (hasToken) {
    config.headers["x-api-key"] = token;
    config.headers["X-API-KEY"] = token;
  } else {
    delete config.headers["x-api-key"];
    delete config.headers["X-API-KEY"];
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  // Aseguro que siempre pido JSON //
  if (!config.headers["Accept"]) {
    config.headers["Accept"] = "application/json";
  }

  return config;
});
// Intercepto las respuestas //
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error?.response;
    const status = res?.status;
    const data = res?.data || {};
    const code = data?.code || null;
    const retryAfter = res?.headers?.["retry-after"];
    // Mensaje del backend //
    const backendMessage = data?.message || data?.error || "";
    // Determino si es un error de red //
    const isNetworkError =
      !res ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error";
    // Determino si es un error de autenticación 401 por token invalido //
    const rawMsg = backendMessage.toString().toLowerCase();
    const isAuth401 =
      status === 401 &&
      (
        code === "INVALID_TOKEN" ||
        rawMsg.includes("token inválido") ||
        rawMsg.includes("token invalido") ||
        rawMsg.includes("falta x-api-key")
      );

    if (isNetworkError) {
      // No hay respuesta del servidor, cierro sesion //
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } catch {}
      const onLogin =
        typeof window !== "undefined" &&
        window.location.pathname === "/login";
      if (!onLogin) window.location.href = "/login";
      error.message = "No se pudo conectar con el servidor.";
      return Promise.reject(error);
    } else if (isAuth401) {
      // Error de autenticacion, cierro sesion //
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } catch {}
      const onLogin =
        typeof window !== "undefined" &&
        window.location.pathname === "/login";
      if (!onLogin) window.location.href = "/login";
    }
    error.message =
      backendMessage || error.message || "Error en la solicitud.";
    error.code       = code;
    error.retryAfter = retryAfter;
    return Promise.reject(error);
  }
);
