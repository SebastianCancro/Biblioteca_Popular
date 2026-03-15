import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box
} from "@mui/material";

import "./InscriptionForm.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { inscriptionService } from "../../services/inscriptionService";

const UserSchema = z.object({
  name: z.string().min(3, "Debe tener como mínimo 3 caracteres").max(48),
  surname: z.string().min(3, "Debe tener como mínimo 3 caracteres").max(48),
  email: z.string().email("El correo electrónico no es válido").max(48),
  phone: z
    .string()
    .regex(/^\d+$/, "Debe contener solo números")
    .min(7, "Debe tener mínimo 7 dígitos")
    .max(15, "Debe tener máximo 15 dígitos"),
});

function InscriptionForm({ open, onClose, event }) {
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: ""
    }
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      setError(undefined);
      setSuccess(false);
    }
  }, [open]);

  const onSubmit = async (formData) => {
    try {
      setError(undefined);
      setSuccess(false);

      if (!event?.id) throw new Error("Evento inválido");

      const payload = {
        ...formData,
        id_event: event.id
      };

      const resp = await inscriptionService.createInscription(payload);

      if (
        resp?.status === 201 ||
        resp?.status === 200 ||
        resp?.data?.status === 200
      ) {
        form.reset();
        setSuccess(true);
      } else {
        throw new Error("Ocurrió un error inesperado");
      }
    } catch (e) {
      console.error("Inscripción error:", e);
      setError(e?.message ?? "Error al guardar la inscripción.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {event
          ? `Formulario de inscripción: ${event.title}`
          : "Formulario de inscripción"}
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1
          }}
        >
          <TextField
            label="Nombre"
            {...form.register("name")}
            error={!!form.formState.errors.name}
            helperText={form.formState.errors.name?.message}
            fullWidth
          />

          <TextField
            label="Apellido"
            {...form.register("surname")}
            error={!!form.formState.errors.surname}
            helperText={form.formState.errors.surname?.message}
            fullWidth
          />

          <TextField
            label="Correo electrónico"
            {...form.register("email")}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            fullWidth
          />

          <TextField
            label="Número de contacto"
            {...form.register("phone")}
            error={!!form.formState.errors.phone}
            helperText={form.formState.errors.phone?.message}
            fullWidth
          />

          {success && (
            <Alert severity="success">
              ¡Tu inscripción fue enviada correctamente!
            </Alert>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose}>
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Enviando..."
                : "Inscribirme"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default InscriptionForm;