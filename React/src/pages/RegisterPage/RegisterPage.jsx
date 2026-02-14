import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import { useState } from "react";

//Valida solo letras//
const onlyLetters =
  /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü'´`¨^~\s-]{2,}$/; // nombres/apellidos con acentos, espacios, guiones//

const UserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Debe tener mínimo 2 caracteres")
    .max(48, "Debe tener máximo 48 caracteres")
    .regex(onlyLetters, "Usa solo letras y espacios"),
  apellido: z
    .string()
    .trim()
    .min(2, "Debe tener mínimo 2 caracteres")
    .max(48, "Debe tener máximo 48 caracteres")
    .regex(onlyLetters, "Usa solo letras y espacios"),
  dni: z
    .string()
    .trim()
    .regex(/^\d+$/, "El DNI debe contener solo números")
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(9, "El DNI debe tener como máximo 9 dígitos"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(48, "Debe tener máximo 48 caracteres"),
  password: z
    .string()
    .min(6, "Debe tener mínimo 6 caracteres")
    .max(32, "Debe tener máximo 32 caracteres"),
});

// Mapea errores del backend //
function mapBackendErrorToMessage(raw) {
  const txt = String(
    typeof raw === "string"
      ? raw
      : raw?.message || raw?.error || raw?.detail || ""
  );

  const low = txt.toLowerCase();
  if (/email.+(existe|uso|registrad)/i.test(low) || /correo.+(existe|uso)/i.test(low)) {
    return "Ese correo ya está en uso.";
  }
  if (/usuario.+(existe|registrad)/i.test(low)) {
    return "El usuario ya existe.";
  }
  if (/dni.+(existe|uso|registrad)/i.test(low)) {
    return "Ese DNI ya está registrado.";
  }
  if (/incomplet|faltan|requerid/i.test(low)) {
    return "Faltan datos del formulario.";
  }
  return txt || "No se pudo completar el registro.";
}
export function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      apellido: "",
      dni: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  // Manejo solo digitos en el campo DNI //
  const handleDniChange = (e) => {
    const onlyDigits = e.currentTarget.value.replace(/\D+/g, "");
    form.setValue("dni", onlyDigits, { shouldValidate: true });
  };

  async function onSubmit(values) {
    try {
      setError(undefined);

      const payload = {
        name: values.name.trim(),
        apellido: values.apellido.trim(),
        dni: values.dni.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      };
      // llamo al servicio de registro //
      const data = await authService.register(payload);
      const msg =
        data?.message ||
        "Usuario registrado correctamente. Tu solicitud quedó pendiente de aprobación por un Administrador. ¡Gracias!";

      setInfo(msg);

      setTimeout(() => {
        navigate("/login", { state: { message: msg } });
      }, 6000);
    } catch (err) {
      // Mapeo error del backend //
      const friendly = mapBackendErrorToMessage(err?.message || err);
      setError(friendly);
      console.error("Error en registro:", err);
    }
  }

  return (
    <main className="registerPage">
      <Container className="container">
        <header>
          <Title>Bienvenido!</Title>
          <Text>
            ¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link>
          </Text>
        </header>

        {/* mensaje informativo */}
        {info ? (
          <Alert
            className="pendingMsg"
            color="blue"
            variant="filled"
            radius="md"
            mt="md"
          >
            {info}
          </Alert>
        ) : null}

        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <TextInput
            placeholder="Nombre"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
          />

          <TextInput
            placeholder="Apellido"
            error={form.formState.errors.apellido?.message}
            {...form.register("apellido")}
          />

          <TextInput
            placeholder="DNI"
            inputMode="numeric"
            error={form.formState.errors.dni?.message}
            {...form.register("dni")}
            onChange={handleDniChange}
            value={form.watch("dni")}
          />

          <TextInput
            placeholder="Correo electrónico"
            type="email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />

          <PasswordInput
            placeholder="Contraseña"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />

          {error ? (
            <Alert
              color="red"
              variant="light"
              radius="md"
              mt="md"
              className="errorMessage"
            >
              {error}
            </Alert>
          ) : null}

          <Button
            type="submit"
            variant="filled"
            loading={form.formState.isSubmitting}
          >
            Registrarme
          </Button>
        </form>
      </Container>
    </main>
  );
}
