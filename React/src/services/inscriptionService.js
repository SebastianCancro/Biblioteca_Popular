import { api } from "./api";

export const inscriptionService = {
    createInscription: (data) => api.post("/inscription-cursos-eventos", data),
};
