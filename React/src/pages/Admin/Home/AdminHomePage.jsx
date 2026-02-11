import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import "./AdminHomePage.css";

export function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <div className="admin-home-page">
      <Typography className="sentence" component="h1">
        Trabajar en la biblioteca es abrir puertas al conocimiento y al futuro de todos.
      </Typography>

      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Card className="admin-card" onClick={() => navigate("/admin/articles")}>
              <CardContent className="admin-card-content">
                <ArticleIcon fontSize="large" sx={{ mb: 1, color: "#5d3a00" }} />
                <Typography variant="h5">Noticias</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="admin-card" onClick={() => navigate("/admin/events")}>
              <CardContent className="admin-card-content">
                <EventIcon fontSize="large" sx={{ mb: 1, color: "#5d3a00" }} />
                <Typography variant="h5">Cursos y <br/> Eventos</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="admin-card" onClick={() => navigate("/admin/users")}>
              <CardContent className="admin-card-content">
                <PeopleIcon fontSize="large" sx={{ mb: 1, color: "#5d3a00" }} />
                <Typography variant="h5">Gestion de suarios</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
