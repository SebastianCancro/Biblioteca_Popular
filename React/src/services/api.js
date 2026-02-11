import axios from "axios";

const API_BASE_URL = "http://localhost:9091";

export const api = axios.create({
	baseURL: API_BASE_URL,
});

// Interceptar las solicitudes //
api.interceptors.request.use((config) => {
// Si existe un token, lo incluye en los encabezados //
	const token = localStorage.getItem("token");
	if (token) config.headers["x-api-key"] = token;

	if (!config.headers["Content-Type"]) {
		config.headers["Content-Type"] = "application/json";
	}

	return config;
});

// Interceptar las respuestas //
api.interceptors.response.use(
	(config) => config,
	(error) => {

		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}

	// Devuelve el mensaje de error del servidor //
		return Promise.reject({
			message:
				error.response?.data?.message ||
				"Ocurrió un error sin respuesta del servidor",
		});
	}
);
