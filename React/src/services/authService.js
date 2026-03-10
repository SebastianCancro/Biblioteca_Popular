export const authService = {
  login: (email, password) =>
    api
      .post("/users/login", { email, password }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data),

  verify: () =>
    api.get("/users/verify")
       .then((res) => res.data),

  register: (payload) =>
    api
      .post("/users/register", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => res.data),

  me: () => api.get("/me").then((res) => res.data),

  logout: () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } catch {}
    return Promise.resolve({ ok: true });
  },
};