import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";
import { userService } from "../../../services/userService";
import "./UserEditModal.css";


export default function UserEditModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, email, role };

      //actualizo usuario en backend//
      await userService.update(user.id, payload);

      //actualizo cache local para no recargar todo//
      const cache = localStorage.getItem("users_cache");
      if (cache) {
        const users = JSON.parse(cache);
        const updated = users.map((u) =>
          u.id === user.id ? { ...u, ...payload } : u
        );
        localStorage.setItem("users_cache", JSON.stringify(updated));
      }
     //llamo a la función del padre para refrescar la lista //
      onSave();
      onClose();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("No se pudo actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} className="edit-user-dialog" fullWidth maxWidth="sm">
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Rol"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="visitor">Visitante</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="super_adm">Super Administrador</MenuItem>
          </TextField>

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Guardar cambios"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
