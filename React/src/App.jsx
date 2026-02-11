import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { PrivateRoute, PublicRoute } from "./Routes";

import Header from "./components/Header/Header";
import NavBar from './components/NavBar/NavBar';
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import InfoNosotros from './components/InfoNosotros/InfoNosotros';
import { DonationsPage } from "./pages/DonationsPage/DonationsPage";
import Questions from './components/Questions/Questions';
import InscriptionPage from "./pages/InscriptionPage/InscriptionPage";
import { ArticleManagerPage } from "./pages/Admin/Articles/ArticleManagerPage";
import { ArticleCreationPage } from "./pages/Admin/Articles/ArticleCreationPage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { ArticlePageDetail } from "./pages/ArticlePageDetail/ArticlePageDetail";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import EventPage from "./pages/EventPage/EventPage";
import { AdminHomePage } from "./pages/Admin/Home/AdminHomePage";
import { EventManagerPage } from "./pages/Admin/Events/EventManagerPage";

// CORRECCIÓN: default import para UserManagerPage
import UserManagerPage from "./pages/Admin/Users/UserManagerPage";

const MainLayout = () => (
  <>
    <Header />
    <NavBar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>

          {/* Rutas con la barra de navegación estándar */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<><Banner/></>} />
            <Route path='/noticias' element={<ArticlePage />} />
            <Route path='/articles/:id' element={<ArticlePageDetail />} />
            <Route path='/cursos-y-eventos' element={<EventPage />} />
            <Route path='/cursos-y-eventos/form' element={<InscriptionPage />} />
            <Route path='/nosotros' element={<InfoNosotros />} />
            <Route path='/catalogo' element={<CatalogPage />} />
            <Route path='/donaciones' element={<DonationsPage />} />
            <Route path='/preguntas' element={<Questions />} />
          </Route>

          {/* Rutas inaccesibles con token activo */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas inaccesibles sin token activo */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/articles" element={<ArticleManagerPage />} />
            <Route path="/admin/article-new" element={<ArticleCreationPage />} />
            <Route path="/admin/events" element={<EventManagerPage />} />
            {/* Usuarios: accesible por adm y super_adm */}
            <Route path="/admin/users" element={<UserManagerPage />} />
          </Route>

          {/* Rutas solo para super_adm */}
          <Route element={<PrivateRoute role="super_adm" />}>
            <Route path="/admin/users" element={<UserManagerPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
