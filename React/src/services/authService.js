import { api } from "./api";

export const authService = {

  // Login de usuario //
  login: async (data) => {
    const res = await api.post("/users/login", data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Respuesta login:", res.data); 

    if (res.data.user?.token) {
      localStorage.setItem("token", res.data.user.token);
    }
    if (res.data.user?.role) {
      localStorage.setItem("role", res.data.user.role.toLowerCase()); 
    }

    return res;
  },
 // Registro de usuario //
  register: (data) =>
    api.post("/users/register", data, {
      headers: { "Content-Type": "application/json" },
    }),

};
