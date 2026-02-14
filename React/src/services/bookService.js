import { api } from "./api";

export const bookService = {
  search: (filters = {}) => api.post("/books", filters),
  getById: (id) => api.get(`/books/${id}`),
};

