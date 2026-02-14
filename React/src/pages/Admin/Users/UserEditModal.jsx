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
  Alert,
} from "@mui/material";
import { useState } from "react";
import { userService } from "../../../services/userService";
import "./UserEditModal.css";
/* Mapea mensajes del backend a algo claro para el usuario */
function mapBackendErrorToMessage(raw) {
  const txt = String(
    typeof raw === "string"
      ? raw
      : raw?.message || raw?.error || raw?.detail || ""
  ).toLowerCase();

  if (/email.+(existe|uso|registrad)/i.test(txt) || /correo.+(existe|uso)/i.test(txt)) {
    return "Ese correo ya está en uso.";
  }
  if (/dni.+(existe|uso|registrad)/i.test(txt)) {
    return "Ese DNI ya está registrado.";
  }
  if (/usuario.+(no|existe)/i.test(txt)) {
    return "El usuario no existe.";
  }
  if (/requerid|faltan|incomplet/i.test(txt)) {
    return "Faltan datos para actualizar.";
  }
  return raw?.message || "No se pudo actualizar el usuario.";
}
export default function UserEditModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user?.name || "");
  const [apellido, setApellido] = useState(user?.apellido || "");
  const [dni, setDni] = useState(String(user?.dni ?? "")); 
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "visitor");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);

    try {
      const payload = {
        name: (name || "").trim(),
        apellido: (apellido || "").trim(),
        dni: (dni || "").trim(),
        email: (email || "").trim().toLowerCase(),
        role: role, // valores esperados "admin" y "super_adm"  //
      };

      if (!payload.name || !payload.apellido || !payload.dni || !payload.email) {
        setErrMsg("Completá nombre, apellido, DNI y email.");
        setLoading(false);
        return;
      }
      if (!/^\d+$/.test(payload.dni)) {
        setErrMsg("El DNI debe contener solo números.");
        setLoading(false);
        return;
      }

      await userService.update(user.id, payload);

      const cache = localStorage.getItem("users_cache");
      if (cache) {
        const users = JSON.parse(cache);
        const updated = users.map((u) =>
          u.id === user.id ? { ...u, ...payload } : u
        );
        localStorage.setItem("users_cache", JSON.stringify(updated));
      }

      await onSave?.();
      onClose?.();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setErrMsg(mapBackendErrorToMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDniChange = (v) => {
    const onlyDigits = v.replace(/\D+/g, "");
    setDni(onlyDigits);
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
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="DNI"
            value={dni}
            onChange={(e) => handleDniChange(e.target.value)}
            inputProps={{ inputMode: "numeric" }}
            fullWidth
            required
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
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
            <MenuItem value="admin">Administrativo/a</MenuItem>
            <MenuItem value="super_adm">Administrador/a</MenuItem>
          </TextField>

          {errMsg ? (
            <Alert severity="error">{errMsg}</Alert>
          ) : null}

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
