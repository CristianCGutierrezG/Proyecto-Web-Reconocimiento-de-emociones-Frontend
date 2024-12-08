import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import ComputerIcon from "@mui/icons-material/Computer";
import { AuthContext } from "../../context/AuthContext";
import { DatosPersonalesContext } from "../../context/DatosPersonalesContext"; // Asegúrate de importar tu contexto
import useFormPost from "../../hooks/useFormPost";
import "./styles.css"; // Importar los estilos externos

const Ajustes = () => {
  const [selectedSection, setSelectedSection] = useState("Perfil");
  const { authData } = useContext(AuthContext);
  const { datosPersonales } = useContext(DatosPersonalesContext);

  // Definir valores iniciales basados en los datos personales del usuario
  const initialValues = {
    nombres: datosPersonales?.nombres || "",
    apellidos: datosPersonales?.apellidos || "",
    fechaNacimiento: datosPersonales?.fechaNacimiento || "",
    codigoInstitucional: datosPersonales?.codigoInstitucional || "",
  };

  // Campos requeridos para validación
  const requiredFields = {
    nombres: true,
    apellidos: true,
    fechaNacimiento: true,
    codigoInstitucional: true,
  };


  // URL dinámica basada en el rol
  const urlBase = "http://localhost:3001/api/v1";
  const url =
    authData?.user.role === "Profesor"
      ? `${urlBase}/profesores`
      : authData?.user.role === "Profesional de salud"
      ? `${urlBase}/proSalud`
      : `${urlBase}/estudiantes`;

  console.log(url)
  console.log(authData?.role)
  // Hook para manejar el formulario
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    data,
    loading,
    error,
  } = useFormPost(initialValues, requiredFields, url, "PATCH", null);

  // Actualizar valores del formulario si cambian los datos personales
  useEffect(() => {
    resetForm(); // Reinicia el formulario con valores iniciales
  }, [datosPersonales]);

  const renderContent = () => {
    if (selectedSection === "Perfil") {
      return (
        <>
          <Typography variant="h4" className="content-title">
            Datos de cuenta
          </Typography>
          <Box
            component="form"
            className="form-ajustes"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Nombres"
              name="nombres"
              variant="outlined"
              fullWidth
              value={formData.nombres}
              onChange={handleChange}
              error={!!errors.nombres}
              helperText={errors.nombres}
              className="textfield"
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              variant="outlined"
              fullWidth
              value={formData.apellidos}
              onChange={handleChange}
              error={!!errors.apellidos}
              helperText={errors.apellidos}
              className="textfield"
            />
            <TextField
              label="Fecha de nacimiento"
              name="fechaNacimiento"
              variant="outlined"
              fullWidth
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              error={!!errors.fechaNacimiento}
              helperText={errors.fechaNacimiento}
              className="textfield"
            />
            <TextField
              label="Código institucional"
              name="codigoInstitucional"
              variant="outlined"
              fullWidth
              value={formData.codigoInstitucional}
              onChange={handleChange}
              error={!!errors.codigoInstitucional}
              helperText={errors.codigoInstitucional}
              className="textfield"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="form-button"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </Button>
            {data && (
              <Typography color="success">
                Datos actualizados correctamente.
              </Typography>
            )}
            {error && (
              <Typography color="error">
                Error al actualizar los datos: {error.message}
              </Typography>
            )}
          </Box>
        </>
      );
    } else if (selectedSection === "IA") {
      return (
        <>
          <Typography variant="h4" className="content-title">
            Inteligencia Artificial
          </Typography>
          <Typography>
            Aquí puedes explorar y configurar funcionalidades relacionadas con
            IA, como análisis de datos o recomendaciones personalizadas.
          </Typography>
        </>
      );
    } else if (selectedSection === "Información legal") {
      return (
        <>
          <Typography variant="h4" className="content-title">
            Información Legal
          </Typography>
          <Typography>
            Esta aplicación utiliza imágenes del usuario con su consentimiento
            para mejorar la experiencia. Todos los datos personales se manejan
            conforme a las leyes aplicables.
          </Typography>
        </>
      );
    }
  };

  return (
    <Box className="container-ajustes">
      {/* Sidebar */}
      <Box className="sidebar">
        <List component="nav" className="menu">
          <ListItem
            button
            className={`menu-item ${
              selectedSection === "Perfil" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("Perfil")}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem
            button
            className={`menu-item ${
              selectedSection === "IA" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("IA")}
          >
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary="IA" />
          </ListItem>
          <ListItem
            button
            className={`menu-item ${
              selectedSection === "Información legal" ? "active" : ""
            }`}
            onClick={() => setSelectedSection("Información legal")}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Información legal" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box className="content">{renderContent()}</Box>
    </Box>
  );
};

export default Ajustes;
