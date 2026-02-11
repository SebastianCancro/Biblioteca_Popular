import "./CatalogPage.css";
import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MOCK_BOOKS = [
  { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez", category: "Novela",  available: true,  reservedCollection: false },
  { id: 2, title: "El Principito",        author: "Antoine de Saint-Exupéry", category: "Infantil", available: false, reservedCollection: false },
  { id: 3, title: "El Aleph",              author: "J. L. Borges",             category: "Ensayo",   available: true,  reservedCollection: true  },
];

export function CatalogPage() {
  const [q, setQ] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyReserved, setOnlyReserved] = useState(false);

  const authors = useMemo(() => Array.from(new Set(MOCK_BOOKS.map(b => b.author))), []);
  const categories = useMemo(() => Array.from(new Set(MOCK_BOOKS.map(b => b.category))), []);

  return (
    <div className="catalog-background">
      <Container maxWidth="lg" className="catalog">
        <Typography variant="h2" className="catalog-title">Catálogo</Typography>

        {/* Buscador */}
        <TextField
          className="catalog-search"
          fullWidth
          placeholder="Buscar por título..."
          variant="outlined"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filtros */}
        <Box className="filters-card">
          <Grid container spacing={2} alignItems="center">
            {/* Autor */}
<Grid item xs={12} md={4}>
  <div className="field-label">Autor</div>
  <TextField
    className="select-field"
    select
    fullWidth
    variant="outlined"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    SelectProps={{ displayEmpty: true }}
  >
    <MenuItem value="">
      <span className="select-placeholder">Todos los autores</span>
    </MenuItem>
    {authors.map((a) => (
      <MenuItem key={a} value={a}>{a}</MenuItem>
    ))}
  </TextField>
</Grid>

{/* Categoría */}
<Grid item xs={12} md={4}>
  <div className="field-label">Categoría</div>
  <TextField
    className="select-field"
    select
    fullWidth
    variant="outlined"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    SelectProps={{ displayEmpty: true }}
  >
    <MenuItem value="">
      <span className="select-placeholder">Todas las categorías</span>
    </MenuItem>
    {categories.map((c) => (
      <MenuItem key={c} value={c}>{c}</MenuItem>
    ))}
  </TextField>
</Grid>


            {/* Checks */}
            <Grid item xs={12} md={4} className="filters-checks">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                  />
                }
                label="Solo disponibles"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={onlyReserved}
                    onChange={(e) => setOnlyReserved(e.target.checked)}
                  />
                }
                label="Colección reservada"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
