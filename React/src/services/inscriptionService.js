import { api } from "./api";

export const inscriptionService = {
    createInscription: (data) => api.post("/inscription-cursos-eventos", data),
    getAllInscriptions: () => api.get("/inscription-cursos-eventos"),
    getInscriptionById: (id) => api.get("/inscription-cursos-eventos/" + id),
    getInscriptionsByEvent: (eventId) => api.get("/inscription-cursos-eventos/event/" + eventId)
};
