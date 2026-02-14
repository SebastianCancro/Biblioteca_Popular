// src/services/authService.js
import { api } from "./api";

export const authService = {
  // Login de usuario //
  login: (email, password) =>
    api
      .post("/users/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data),

  // Registro de usuario //
  register: (payload) =>
    api
      .post("/users/register", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data),

  me: () => api.get("/me").then((res) => res.data),

  // Cerrar sesion //
  logout: () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } catch {}
    return Promise.resolve({ ok: true });
  },
};
