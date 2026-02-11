import { api } from "./api";

export const eventService = {
    getAllEvents: () => api.get("/events"),
    createEvent: (data) => api.post("/events", data),
};
