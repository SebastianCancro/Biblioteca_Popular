import { Navigate, Outlet } from "react-router";
import AdminNavBar from "./components/AdminNavBar/AdminNavBar";
// El usuario no debe tener un token //
export function PublicRoute() {
	const token = localStorage.getItem("token");
	if (token) return <Navigate to="/admin" replace />;
	return <Outlet />; 
}
// El usuario debe tener un token //
export function PrivateRoute({ role }) {
	const token = localStorage.getItem("token");
	const userRole = localStorage.getItem("role"); 

	if (!token) return <Navigate to="/login" replace />;

	// Acepto por rol //
	if (role && userRole !== role) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<AdminNavBar />
			<Outlet />
		</>
	);
}

