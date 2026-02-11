import { api } from "./api";

export const articleService = {
   getAllArticles: (page = 1, limit = 6) => {
    return api.get("/articles", {
      params: { page, limit }
    }).then(res => res.data);
   },

    getArticleById: (id) => api.get("/articles/" + id),
    createArticle: (data) => api.post("/articles", data),
    deleteArticleById: (id) => api.delete("/articles/" + id),  
    updateArticle: (id, data) => api.put("/articles/" + id, data) 
};
