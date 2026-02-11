import "./LoginPage.css";
import { Link, useNavigate } from "react-router";
import {
  Button,
  Container,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import { useState } from "react";

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
  const form = useForm({
    resolver: zodResolver(UserSchema),
  });

  const navigate = useNavigate();
  const [error, setError] = useState(undefined);

  async function onSubmit(formData) {
    try {
      setError(undefined);

      const formDataJson = JSON.stringify(formData);
      const response = await authService.login(formDataJson);

      //Verificamos que el backend devolvio un usuario valido//
      const user = response?.data?.user;

      if (user?.token) {
        // Guardamos todo para que el avatar lea el nombre y rol //
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.role);

        navigate("/admin");
      } else {
        throw new Error("El servidor no devolvió un token válido");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError(error.message || "Error al iniciar sesión");
    }
  }

  return (
    <main className="loginPage">
      <Container className="container">
        <header>
          <Title>Bienvenido!</Title>
          <Text>
            ¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link>
          </Text>
        </header>

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

          {error ? <p className="errorMessage">{error}</p> : null}

          <Button
            variant="filled"
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
          >
            Iniciar sesión
          </Button>
        </form>
      </Container>
    </main>
  );
}
