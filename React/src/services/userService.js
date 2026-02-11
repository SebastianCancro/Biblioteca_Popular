import { api } from "./api";

// Headers con token //
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "X-API-KEY": token,
  };
};

export const userService = {
  // Lista usuarios activos //
  getAllActive: () => api.get("/users/active", { headers: getHeaders() }),

  // Lista solicitudes pendientes //
  getPending: () => api.get("/users/pending", { headers: getHeaders() }),

  // Buscar usuario por email //
  searchByEmail: (email) =>
    api.get(`/users/search?email=${email}`, { headers: getHeaders() }),

  // Actualizar usuario (rol y estado) //
  update: async (id, data) => {
    const response = await api.put(`/users/${id}`, data, { headers: getHeaders() });

    // ✅ Actualiza cache local si existe
    const cache = localStorage.getItem("users_cache");
    if (cache) {
      const users = JSON.parse(cache);
      const updated = users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      );
      localStorage.setItem("users_cache", JSON.stringify(updated));
    }

    return response;
  },

  // Eliminar usuario //
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`, { headers: getHeaders() });

    // ✅ Elimina del cache local
    const cache = localStorage.getItem("users_cache");
    if (cache) {
      const users = JSON.parse(cache);
      const filtered = users.filter((u) => u.id !== id);
      localStorage.setItem("users_cache", JSON.stringify(filtered));
    }

    return response;
  },

  // Aprobar solicitud pendiente //
  approve: async (id) => {
    const response = await api.put(`/users/approve/${id}`, null, { headers: getHeaders() });
    const pendingCache = localStorage.getItem("requests_cache");
    const usersCache = localStorage.getItem("users_cache");

    if (pendingCache) {
      const requests = JSON.parse(pendingCache).filter((u) => u.id !== id);
      localStorage.setItem("requests_cache", JSON.stringify(requests));
    }

    if (usersCache) {
      const users = JSON.parse(usersCache);
      users.push(response.data);
      localStorage.setItem("users_cache", JSON.stringify(users));
    }

    return response;
  },

  // Rechazar solicitud pendiente //
  reject: async (id) => {
    const response = await api.delete(`/users/${id}`, { headers: getHeaders() });

    // Elimina del cache de solicitudes //
    const cache = localStorage.getItem("requests_cache");
    if (cache) {
      const requests = JSON.parse(cache);
      const filtered = requests.filter((u) => u.id !== id);
      localStorage.setItem("requests_cache", JSON.stringify(filtered));
    }

    return response;
  },
};
