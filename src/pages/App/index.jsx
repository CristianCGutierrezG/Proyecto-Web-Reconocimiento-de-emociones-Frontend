import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from '../../context/AuthContext.jsx';
import LogIn from '../Autorizacion/logIn/index.jsx';
import Recover from '../Autorizacion/recover/index.jsx';
import ChangePassword from '../Autorizacion/changePassword/index.jsx';
import Register from '../Autorizacion/register/index.jsx';
import Home from '../pagina/home/index.jsx';
import FetchGetComponent from '../HttpPruebas/fetchGetComponent.jsx';
import FetchPostComponent from '../HttpPruebas/fetchPostComponent.jsx';
import EmocionesProfesor from '../pagina/profesor/emociones/index.jsx';
import MateriasProfesor from '../pagina/profesor/materias/index.jsx';
import EmocionesEstudiante from '../pagina/estudiante/emociones/index.jsx';
import MateriasEstudiante from '../pagina/estudiante/materias/index.jsx';
import ConfiguracionEstudiante from '../pagina/estudiante/configuracion/index.jsx';
import EmocionesProSalud from '../pagina/proSalud/emociones/index.jsx';
import PrivateRoute from '../../components/privateRoute.jsx';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" end>Log in</NavLink></li>
        <li><NavLink to="/recuperacion">Recover Password</NavLink></li>
        <li><NavLink to="/cambio-contrasena">Cambiar Password</NavLink></li>
        <li><NavLink to="/registrar">Register</NavLink></li>
        <li><NavLink to="/home">home</NavLink></li>
        <li><NavLink to="/get">Fetch Get</NavLink></li>
        <li><NavLink to="/post">Fetch Post</NavLink></li>
        <li><NavLink to="/emociones-profesor">Emociones Profesor</NavLink></li>
        <li><NavLink to="/materias-profesor">Materias Profesor</NavLink></li>
        <li><NavLink to="/emociones-estudiante">Emociones Estudiante</NavLink></li>
        <li><NavLink to="/materias-estudiante">Materias Estudiante</NavLink></li>
        <li><NavLink to="/configuracion-estudiante">Configuración Estudiante</NavLink></li>
        <li><NavLink to="/emociones-proSalud">Emociones ProSalud</NavLink></li>
      </ul>
    </nav>
  );
};

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="/recuperacion" element={<Recover />} />
          <Route path="/cambio-contrasena" element={<ChangePassword />} />
          <Route path="/registrar" element={<Register />} />
          <Route element={<PrivateRoute roles={['Administrador', 'Profesor', 'ProSalud', 'Estudiante']} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/get" element={<FetchGetComponent />} />
          <Route path="/post" element={<FetchPostComponent />} />
          <Route element={<PrivateRoute roles={['Administrador', 'Profesor']} redirectTo={"/home"} />}>
            <Route path="/emociones-profesor" element={<EmocionesProfesor />} />
            <Route path="/materias-profesor" element={<MateriasProfesor />} />
          </Route>
          <Route element={<PrivateRoute roles={['Administrador', 'Estudiante', 'Profesor']} redirectTo={"/home"}  />}>
            <Route path="/emociones-estudiante" element={<EmocionesEstudiante />} />
          </Route>
          <Route element={<PrivateRoute roles={['Administrador', 'Estudiante']} redirectTo={"/home"}/>}>
            <Route path="/materias-estudiante" element={<MateriasEstudiante />} />
            <Route path="/configuracion-estudiante" element={<ConfiguracionEstudiante />} />
          </Route>
          <Route element={<PrivateRoute roles={['Administrador','ProSalud']} redirectTo={"/home"} />}>
            <Route path="/emociones-proSalud" element={<EmocionesProSalud />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );



};
export default App;