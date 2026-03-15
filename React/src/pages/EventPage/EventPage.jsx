import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import "./EventPage.css";
import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";
import InscriptionForm from "./InscriptionForm";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  async function fetchData() {
    try {
      setLoading(true);
      const response = await eventService.getAllEvents();
      const data = Array.isArray(response.data) ? response.data : [];
      setEvents(data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main id="eventos" className="page-wrapper">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      ) : events.length === 0 ? (
        <p className="no-events">No hay eventos disponibles.</p>
      ) : (
        <div className="event-page">
          {events.map((curso) => (
            <Card key={curso.id} className="event-Card" variant="outlined">
              <CardContent>
                {curso?.image?.trim() ? (
                  <img
                    src={curso.image.trim()}
                    alt={curso.title}
                    className="event-image"
                  />
                ) : (
                  <img
                    src="/Images/Default.png"
                    alt="default"
                    className="event-image"
                  />
                )}

                <h2>{curso.title}</h2>

                <p>{curso.description}</p>

                <p>
                  Fecha de Finalización:{" "}
                  {curso?.end_date
                    ? new Date(curso.end_date).toLocaleDateString("es-AR")
                    : "-"}
                </p>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleOpenModal(curso)}
                  className="event-button"
                >
                  Inscribirse
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      <InscriptionForm
        open={openModal}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </main>
  );
}

export default EventPage;