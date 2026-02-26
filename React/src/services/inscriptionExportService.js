import { api } from "./api";

export const inscriptionExportService = {
  exportByEvent: async (eventId) => {
    const response = await api.get(
      `/inscription-cursos-eventos/event/${eventId}/export`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  },
};