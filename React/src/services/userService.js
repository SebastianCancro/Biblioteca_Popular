// src/services/userService.js
import { api } from "./api";
const baseHeaders = { Accept: "application/json" };
const pickArray = (res) => {
  try {
    const d = res?.data;
    if (Array.isArray(d)) return d;
    if (d && Array.isArray(d.data)) return d.data;
    return [];
  } catch {
    return [];
  }
};
// Cache local //
const getCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const setCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value || []));
  } catch {}

};

export const userService = {
  // Usuarios activos //
  getAllActive: async () => {
    const res = await api.get("/users/active", { headers: baseHeaders });
    const data = pickArray(res);
    setCache("users_cache", data);
    return data;
  },

  // Pendientes de aprobación //
  getPending: async () => {
    const res = await api.get("/users/pending", { headers: baseHeaders });
    const data = pickArray(res);
    setCache("requests_cache", data);
    return data;
  },

  // Bloqueados //
  getBlocked: async () => {
    const res = await api.get("/users/blocked", { headers: baseHeaders });
    return pickArray(res);
  },

  // Buscar por email //
  searchByEmail: async (email) => {
    const safe = encodeURIComponent(String(email || "").trim().toLowerCase());
    const res = await api.get(`/users/search/${safe}`, { headers: baseHeaders });
    return res.data;
  },

  // Actualizar usuario //
  update: async (id, data) => {
    const res = await api.put(`/users/${id}`, data, { headers: baseHeaders });
    const users = getCache("users_cache");
    const updated = users.map((u) => (u.id === id ? { ...u, ...data } : u));
    setCache("users_cache", updated);
    return res.data;
  },

  // Eliminar usuario //
  delete: async (id) => {
    const res = await api.delete(`/users/${id}`, { headers: baseHeaders });
    setCache("users_cache", getCache("users_cache").filter((u) => u.id !== id));
    setCache(
      "requests_cache",
      getCache("requests_cache").filter((u) => u.id !== id)
    );
    return res.data;
  },

  // Aprobar //
  approve: async (id) => {
    await api.put(`/users/approve/${id}`, {}, { headers: baseHeaders });
    const [active, pending] = await Promise.all([
      userService.getAllActive(),
      userService.getPending(),
    ]);
    return { active, pending };
  },

  // Eliminar pendientes //
  reject: async (id) => {
    await api.delete(`/users/${id}`, { headers: baseHeaders });
    setCache(
      "requests_cache",
      getCache("requests_cache").filter((u) => u.id !== id)
    );
    return { ok: true };
  },
};
