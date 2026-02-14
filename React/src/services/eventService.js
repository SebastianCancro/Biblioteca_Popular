import { api } from "./api";

export const eventService = {
    getAllEvents: () => api.get("/events"),
    createEvent: (data) => api.post("/events", data),
    getEventById: (id) => api.get("/events/" + id),
    deleteEventById: (id) => api.delete("/events/" + id),  
    updateEvent: (id, data) => api.put("/events/" + id, data) 

};
