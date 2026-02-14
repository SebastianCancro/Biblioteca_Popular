// UserManagerPage //
import { useEffect, useState } from "react";
import {
  Container, Typography, Box, Button, TextField, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Tooltip
} from "@mui/material";
import { Edit, Delete, CheckCircle, Cancel } from "@mui/icons-material";
import { userService } from "../../../services/userService";
import UserEditModal from "./UserEditModal";
import "./UserManagerPage.css";
const R = (r) =>
  (r || "").toLowerCase() === "super_adm" ? "Administrador" :
  (r || "").toLowerCase() === "admin" ? "Administrativo" : "Visitante";
const A = (u) => u?.apellido ?? u?.last_name ?? u?.lastname ?? "";
const D = (u) => u?.dni ?? u?.document ?? u?.doc ?? u?.doc_number ?? u?.document_number ?? "";

export default function UserManagerPage() {
  const [tab, setTab] = useState("requests");
  const [users, setUsers] = useState([]), [reqs, setReqs] = useState([]), [blocks, setBlocks] = useState([]);
  const [q, setQ] = useState(""), [editUser, setEditUser] = useState(null);
  const [ok, setOk] = useState(false), [gate, setGate] = useState(false);
  const [msg, setMsg] = useState(""), [type, setType] = useState("success");

  const show = (t, m) => { setType(t); setMsg(m); setTimeout(() => setMsg(""), 3500); };
  const loadAll = async () => {
    try {
      const [r,u,b] = await Promise.all([userService.getPending(), userService.getAllActive(), userService.getBlocked()]);
      setReqs(Array.isArray(r)?r:[]); setUsers(Array.isArray(u)?u:[]); setBlocks(Array.isArray(b)?b:[]);
    } catch { setReqs([]); setUsers([]); setBlocks([]); }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "super_adm") { setOk(true); loadAll(); }
    else { setGate(true); setTimeout(()=>{ setGate(false); window.location.href="/admin"; }, 2000); }
  }, []);

  const approve = async (id) => {
    try {
      await userService.approve(id);
      setReqs(await userService.getPending());
      setUsers(await userService.getAllActive());
      show("success","Usuario aprobado correctamente.");
    } catch {
      show("error","No se pudo aprobar.");
    }
  };
  const reject  = async (id) => {
    try {
      await userService.reject(id);
      setReqs(await userService.getPending());
      show("info","Solicitud rechazada.");
    } catch {
      show("error","No se pudo rechazar.");
    }
  };

  const remove  = async (id) => {
    try {
      await userService.delete(id);
      await loadAll();
      show("success","Usuario eliminado correctamente.");
    } catch {
      show("error","No se pudo eliminar.");
    }
  };

  if (gate) {
    return (
      <Container className="restriction-container">
        <Alert variant="filled" severity="error" className="restriction-alert">
          ❌ Solo acceso a administradores
        </Alert>
      </Container>
    );
  }
  if (!ok) return null;

  const emoji = type === "success" ? "✅" : type === "info" ? "ℹ️" : "❌";

  return (
    <Container className="user-container user-container--lg">
      <Typography variant="h5" className="user-title">Gestión de Usuarios</Typography>

      {msg && (
        <Alert
          variant="filled"
          severity={type}
          className={`user-alert ${
            type === "success" ? "user-alert--success" :
            type === "info"    ? "user-alert--info"    :
                                  "user-alert--error"
          }`}
        >
          {emoji} {msg}
        </Alert>
      )}

      <Box className="tab-menu">
        {["requests","users","blocked"].map(t=>(
          <Button
            key={t}
            onClick={()=>setTab(t)}
            className={tab===t ? "tab-active tab-lg" : "tab-btn tab-lg"}
          >
            {t==="requests"?"Solicitudes Pendientes":t==="users"?"Usuarios Activos":"Usuarios Bloqueados"}
          </Button>
        ))}
      </Box>

      {tab==="requests" && (
        <TableContainer component={Paper} className="user-table-container hover-zoom">
          <Table className="user-table--lg" size="small">
            <TableHead>
              <TableRow className="user-table-header">
                <TableCell>ID</TableCell><TableCell>Nombre</TableCell><TableCell>Apellido</TableCell>
                <TableCell>DNI</TableCell><TableCell>Email</TableCell><TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(reqs||[]).length?reqs.map(r=>(
                <TableRow key={r.id} className="user-row row-hover">
                  <TableCell>{r.id}</TableCell><TableCell>{r.name}</TableCell><TableCell>{A(r)}</TableCell>
                  <TableCell>{D(r)}</TableCell><TableCell>{r.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Aprobar"><IconButton className="btn-approve btn-icon-lg" onClick={()=>approve(r.id)}><CheckCircle/></IconButton></Tooltip>
                    <Tooltip title="Rechazar"><IconButton className="btn-reject btn-icon-lg" onClick={()=>reject(r.id)}><Cancel/></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              )):(<TableRow><TableCell colSpan={6}>No hay solicitudes</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab==="users" && (
        <>
          <Box style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
            <TextField
              label="Buscar por email"
              size="small"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
          </Box>

          <TableContainer component={Paper} className="user-table-container hover-zoom">
            <Table className="user-table--lg" size="small">
              <TableHead>
                <TableRow className="user-table-header">
                  <TableCell>ID</TableCell><TableCell>Nombre</TableCell><TableCell>Apellido</TableCell>
                  <TableCell>DNI</TableCell><TableCell>Email</TableCell><TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell><TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(users||[]).filter(u=>(u.email||"").toLowerCase().includes(q.toLowerCase())).map(u=>(
                  <TableRow key={u.id} className="user-row row-hover">
                    <TableCell>{u.id}</TableCell><TableCell>{u.name}</TableCell><TableCell>{A(u)}</TableCell>
                    <TableCell>{D(u)}</TableCell><TableCell>{u.email}</TableCell>
                    <TableCell>{R(u.role)}</TableCell>
                    <TableCell>{u.is_blocked?"Bloqueado":(u.is_active?"Activo":"Inactivo")}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar"><IconButton className="btn-edit btn-icon-lg" onClick={()=>setEditUser(u)}><Edit/></IconButton></Tooltip>
                      <Tooltip title="Eliminar"><IconButton className="btn-delete btn-icon-lg" onClick={()=>remove(u.id)}><Delete/></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {(!users || users.length===0) && (<TableRow><TableCell colSpan={8}>No hay usuarios activos</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>

          {editUser && (
            <UserEditModal
              user={editUser}
              onClose={()=>setEditUser(null)}
              onSave={async ()=>{
                setEditUser(null);
                const u = await userService.getAllActive();
                setUsers(Array.isArray(u)?u:[]);
                setType("success"); setMsg("Usuario editado con éxito."); setTimeout(()=>setMsg(""), 3500);
              }}
            />
          )}
        </>
      )}

      {tab==="blocked" && (
        <TableContainer component={Paper} className="user-table-container hover-zoom">
          <Table className="user-table--lg" size="small">
            <TableHead>
              <TableRow className="user-table-header">
                <TableCell>ID</TableCell><TableCell>Nombre</TableCell><TableCell>Apellido</TableCell>
                <TableCell>DNI</TableCell><TableCell>Email</TableCell><TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell><TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(blocks||[]).length?blocks.map(u=>(
                <TableRow key={u.id} className="user-row row-hover">
                  <TableCell>{u.id}</TableCell><TableCell>{u.name}</TableCell><TableCell>{A(u)}</TableCell>
                  <TableCell>{D(u)}</TableCell><TableCell>{u.email}</TableCell>
                  <TableCell>{R(u.role)}</TableCell><TableCell>Bloqueado</TableCell>
                  <TableCell><Tooltip title="Eliminar"><IconButton className="btn-delete btn-icon-lg" onClick={()=>remove(u.id)}><Delete/></IconButton></Tooltip></TableCell>
                </TableRow>
              )):(<TableRow><TableCell colSpan={8}>No hay usuarios bloqueados</TableCell></TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
