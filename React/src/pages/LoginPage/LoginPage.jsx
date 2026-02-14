import "./LoginPage.css";
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
import { useState, useEffect } from "react";

const UserSchema = z.object({
  email: z
    .email("El correo electrónico no es válido")
    .max(48, "Debe tener máximo 48 caracteres"),
  password: z
    .string("La contraseña no es válida")
    .min(4, "Debe tener mínimo 4 caracteres")
    .max(32, "Debe tener máximo 32 caracteres"),
});

export function LoginPage() {
  const form = useForm({ resolver: zodResolver(UserSchema) });
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [pendingMsg, setPendingMsg] = useState(undefined);
  // Oculta alertas a los 10s //
  useEffect(() => {
    if (!pendingMsg) return;
    const t = setTimeout(() => setPendingMsg(undefined), 6000);
    return () => clearTimeout(t);
  }, [pendingMsg]);

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(undefined), 6000);
    return () => clearTimeout(t);
  }, [error]);

  // Detecta bloqueado por status 423 //
  function mapBackendToMessage(status, payload) {
    const code =
      (payload && (payload.error?.code || payload.code)) || null;

    const raw =
      (typeof payload === "string"
        ? payload
        : payload?.error?.message || payload?.message || payload?.error || ""
      ) || "";

    // Usuario bloqueado //
    if (status === 423 || code === "USER_BLOCKED" || /bloquead/i.test(raw)) {
      return { error: "Tu cuenta está bloqueada. Contactá al administrador." };
    }
    //Pendiente//
    if (
      (status === 401 || status === 403) &&
      /autorizad|pendient|aprobaci|inactiv/i.test(raw)
    ) {
      return {
        pending:
          "Tu solicitud aún está pendiente. Un administrador debe aprobarla antes de iniciar sesión.",
      };
    }
    //Credenciales invalidas//
    if (
      status === 401 ||
      /credencial|password|contrase(?:ñ|n)a|clave|incorrect/i.test(raw)
    ) {
      return { error: "Correo o contraseña incorrectos." };
    }
   // mail invalido //
    if (status === 400 && /email|correo/i.test(raw)) {
      return { error: "El correo electrónico no es válido." };
    }

    if (raw) return { error: raw };
    return { error: "Error al iniciar sesión" };
  }
  async function onSubmit(values) {
    try {
      setError(undefined);
      setPendingMsg(undefined);
      const data = await authService.login(values.email, values.password);
      const user  = data?.user || {};
      const token = data?.token || user?.token || null;

      if (!token) {
        try { localStorage.removeItem("token"); } catch {}
        throw new Error("El servidor no devolvió un token válido");
      }
      const normalizado = {
        id: user.id,
        email: user.email,
        role: user.role,
        nombre: user.nombre ?? user.name ?? "",
        apellido: user.apellido ?? user.lastName ?? "",
      };
      // Guardado consistente //
      localStorage.setItem("token", token);
      if (normalizado.role) {
        localStorage.setItem("role", String(normalizado.role).toLowerCase());
      }
      localStorage.setItem("current_user", JSON.stringify(normalizado));

      // Cambio de avatar segun usuario //
      window.dispatchEvent(new Event("auth:user-changed"));

      navigate("/admin");
    } catch (err) {
      // info del error //
      const status = err?.response?.status;
      const data   = err?.response?.data;
      const code   = err?.code || data?.code; 
      const msg    = err?.message;
      // Mapeo de mensajes //
      if (!code && !msg?.length) {
        const fallback = mapBackendToMessage(status, data);
        if (fallback.pending) setPendingMsg(fallback.pending);
        if (fallback.error)   setError(fallback.error);
      } else {
        if (code === "USER_PENDING_APPROVAL") {
          setPendingMsg("Tu solicitud aún está pendiente. Un administrador debe aprobarla antes de iniciar sesión.");
        } else {
          setError(msg || "Error al iniciar sesión.");
        }
      }
      console.error("Error en login:", err);
    }
  }
  return (
    <main className="loginPage">
      <Container className="container">
        <header>
          <Title>Bienvenido!</Title>
        </header>
       {/* Solicitud pendiente */}
        {pendingMsg ? (
          <Alert className="pendingMsg" color="blue" variant="filled" radius="md" mt="md">
            {pendingMsg}
          </Alert>
        ) : null}
        {/* Errores credenciales/email/bloqueado */}
        {error ? (
          <Alert className="errorMsg" color="red" variant="light" radius="md" mt="md">
            {error}
          </Alert>
        ) : null}

        <form>
          <TextInput
            placeholder="Correo electrónico"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <PasswordInput
            placeholder="Contraseña"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />
          <Button
            fullWidth
            mt="md"
            variant="filled"
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
          >
            Iniciar sesión
          </Button>

          <Text ta="center" mt="md">
            ¿Aún no tienes una cuenta? <Link to="/register"className="login-register-link">Registrarse</Link>
          </Text>
        </form>
      </Container>
    </main>
  );
}
