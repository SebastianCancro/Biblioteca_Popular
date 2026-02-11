import { TextInput, Container, Button, Title } from "@mantine/core";
import "./InscriptionPage.css";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { inscriptionService } from "../../services/inscriptionService";


const UserSchema = z.object({
  name: z
    .string()
    .min(3, "Debe tener como mínimo 3 caracteres")
    .max(48, "Debe tener máximo 48 caracteres"),
  surname: z
    .string()
    .min(3, "Debe tener como mínimo 3 caracteres")
    .max(48, "Debe tener máximo 48 caracteres"),
  email: z
    
    .email("El correo electrónico no es válido")
    .max(48, "Debe tener máximo 48 caracteres"),
  phone: z
    .string()
    .regex(/^\d+$/, "Debe contener solo números")
    .min(7, "Debe tener mínimo 7 dígitos")
    .max(15, "Debe tener máximo 15 dígitos"),

});

function InscriptionPage() {
  const form = useForm({
    resolver: zodResolver(UserSchema),
  });

  const [error, setError] = useState(undefined);
  
  async function onSubmit(formData) {
    try {
      setError(undefined);

      const formDataJson = JSON.stringify(formData);
      const response = await inscriptionService.createInscription(formDataJson);
      
      if (response?.data?.status == 200) setSuccess("Inscripcion guardada correctamente") 
			else throw new Error("Ocurrió un error inesperado");
    
		} catch (error) {
			setError(error.message ?? "Error al guardar la inscripcion.");
		}
    }
    

  return (
    <main className="inscription-page">

      <Container className="inscription-section">
        
        <Title >Formulario de Inscripción</Title>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
         
          <TextInput className="TextInput"
            placeholder="Nombre"
            error={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextInput className="TextInput"
            placeholder="Apellido"
            error={form.formState.errors.surname?.message}
            {...form.register("surname")}
          />
          <TextInput className="TextInput"
            placeholder="Correo electrónico"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <TextInput className="TextInput"
            placeholder="Número de contacto"
            error={form.formState.errors.phone?.message}
            {...form.register("phone")} 
          />

          <Button
            className="inscriptinoButton"
            variant="filled"
			onClick={form.handleSubmit(onSubmit)}
			loading={form.formState.isSubmitting}
          >
            Inscribirme
          </Button>
        </form>
      </Container>
    </main>
  );
}

export default InscriptionPage;
