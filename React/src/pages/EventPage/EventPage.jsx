import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "./EventPage.css"
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { eventService } from "../../services/eventService";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EventPage(){
    
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  
    const navigate = useNavigate();
    const ToForm=()=>{
      navigate("/cursos-y-eventos/form");
    };

    const [ events, setEvents ] = useState(undefined)
    async function fetchData(){
      const response = await eventService.getAllEvents()
      setEvents(response.data)
    }

    useEffect(() => {
      fetchData()
    }, [])

  
  const response = []
                    

return(
  <main className="event-page">
    {
      events ? events.map(curso=>{
      return <Card key={curso.id} className="event-Card" variant="outlined">
      <CardContent>
        <h1>{curso.title}</h1>
        <p>{curso.description}</p>
        <p>Fecha de Finalizacion:{curso.end_date}</p>
      </CardContent>
      <CardActions>
        <Button size="small"
                onClick={ToForm}
        >
          Inscribirse</Button>
        <Button size="small"
        onClick={handleOpen}>
         + Informacion
        </Button>
      </CardActions>
      </Card >

    }) :<p> Cargando...</p>
    }


    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Mas Informacion sobre el curso o evento, horarios,dias de semanas
            fechas</strong>
            
          </Typography>
          
        </Box>
      </Modal>

  </main>
);
}

export default EventPage