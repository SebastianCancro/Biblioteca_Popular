// Gestión de Usuarios //
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel, ArrowBack } from "@mui/icons-material";
import { userService } from "../../../services/userService";
import UserEditModal from "./UserEditModal";
import "./UserManagerPage.css";

export default function UserManagerPage() {
  // Estados principales //
  const [activeTab, setActiveTab] = useState("requests");
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showRestriction, setShowRestriction] = useState(false);

  // Verifico rol desde localStorage //
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "super_adm") {
      setIsAuthorized(true);
    } else {
      // No es super_adm → cartel y redirección al panel //
      setShowRestriction(true);
      const timer = setTimeout(() => {
        setShowRestriction(false);
        window.location.href = "/admin"; // vuelve al panel administrativo
      }, 4000);
      return () => clearTimeout(timer);
    }

    setChecked(true);
  }, []);

  // Traer usuarios activos //
  const fetchUsers = async () => {
    try {
      const response = await userService.getAllActive();
      setUsers(response.data);
      localStorage.setItem("users_cache", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error al traer usuarios:", error);
    }
  };

  // Traer solicitudes pendientes //
  const fetchRequests = async () => {
    try {
      const response = await userService.getPending();
      setRequests(response.data);
      localStorage.setItem("requests_cache", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error al traer solicitudes:", error);
    }
  };

  // Cargo datos si tiene permisos //
  useEffect(() => {
    if (isAuthorized) {
      fetchRequests();
      fetchUsers();
    }
  }, [isAuthorized]);

  // Acciones de usuario //
  const handleApprove = async (id) => {
    try {
      await userService.approve(id);
      await fetchRequests();
      await fetchUsers();
    } catch (err) {
      console.error("Error al aprobar usuario:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await userService.reject(id);
      await fetchRequests();
    } catch (err) {
      console.error("Error al rechazar usuario:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.delete(id);
      await fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  // Filtro de búsqueda //
  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (!checked && !showRestriction) return null;

  // Pantalla de restricción temporal //
  if (showRestriction && !isAuthorized) {
    return (
      <Container className="restriction-container">
        <Alert severity="error" className="restriction-alert">
          🚫 Solo acceso a administradores (super_adm).
        </Alert>
      </Container>
    );
  }

  // Pantalla principal de gestión (solo super_adm) //
  return (
    <Container className="user-container">
      {/* Botón volver */}
      <Button startIcon={<ArrowBack />} className="btn-back" onClick={() => window.history.back()}>
        Volver
      </Button>

      <Typography variant="h4" className="user-title">
        Gestión de Usuarios
      </Typography>

      {/* Pestañas */}
      <Box className="tab-menu">
        <Button
          className={activeTab === "requests" ? "tab-active" : "tab-btn"}
          onClick={() => setActiveTab("requests")}
        >
          Solicitudes Pendientes
        </Button>
        <Button
          className={activeTab === "users" ? "tab-active" : "tab-btn"}
          onClick={() => setActiveTab("users")}
        >
          Usuarios Activos
        </Button>
      </Box>

      {/* Solicitudes pendientes */}
      {activeTab === "requests" && (
        <TableContainer component={Paper} className="user-table-container">
          <Table>
            <TableHead>
              <TableRow className="user-table-header">
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <TableRow key={req.id} className="user-row">
                    <TableCell>{req.id}</TableCell>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.email}</TableCell>
                    <TableCell>
                      <IconButton className="btn-edit" onClick={() => handleApprove(req.id)}>
                        <CheckCircle />
                      </IconButton>
                      <IconButton className="btn-delete" onClick={() => handleReject(req.id)}>
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No hay solicitudes pendientes</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Usuarios activos */}
      {activeTab === "users" && (
        <>
          <Box className="user-actions">
            <TextField
              label="Buscar por email"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="user-search"
            />
          </Box>

          <TableContainer component={Paper} className="user-table-container">
            <Table>
              <TableHead>
                <TableRow className="user-table-header">
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="user-row">
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === "super_adm"
                          ? "Super Admin"
                          : user.role === "admin"
                          ? "Administrador"
                          : "Visitante"}
                      </TableCell>
                      <TableCell>{user.is_active ? "Activo" : "Inactivo"}</TableCell>
                      <TableCell>
                        <IconButton className="btn-edit" onClick={() => setEditUser(user)}>
                          <Edit />
                        </IconButton>
                        <IconButton className="btn-delete" onClick={() => handleDelete(user.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No hay usuarios activos</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal de edición */}
          {editUser && (
            <UserEditModal
              user={editUser}
              onClose={() => setEditUser(null)}
              onSave={() => {
                setEditUser(null);
                fetchUsers();
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}
