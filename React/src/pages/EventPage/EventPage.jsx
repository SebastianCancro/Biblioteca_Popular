import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "./EventPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { eventService } from "../../services/eventService";

function EventPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const ToForm = (id) => {
    navigate(`/cursos-y-eventos/form/${id}`);
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
                {curso.image ? (
                  <img
                    src={curso.image.trim()}
                    alt={curso.title}
                    className="event-image"
                  />
                ) : (
                  <div className="event-image-placeholder">
                    <p>Sin imagen disponible</p>
                  </div>
                )}

                <h1>{curso.title}</h1>
                <p>{curso.description}</p>
                <p>
                  Fecha de Finalización:{" "}
                  {curso.end_date
                    ? curso.end_date.split("-").reverse().join("-")
                    : "-"}
                </p>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => ToForm(curso.id)}
                  className="event-button"
                >
                  Inscribirse
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

export default EventPage;
