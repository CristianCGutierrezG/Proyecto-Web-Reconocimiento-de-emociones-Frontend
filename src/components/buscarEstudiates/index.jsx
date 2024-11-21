import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Divider, TextField, Alert, Pagination } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Loading from '../loading';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../context/AuthContext';
import "./styles.css";

export default function BuscarEstudiante() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20; // Límite por página
  const { data: estudiantesResponse, loading, error, sendRequest } = useHttp();
  const { authData, logout, isTokenExpired } = useContext(AuthContext);
  const navigate = useNavigate();

  // Actualización de datos cuando cambian los parámetros de búsqueda o paginación
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const offset = (page - 1) * limit;
      const searchUrl = `http://localhost:3001/api/v1/estudiantes/buscar/${searchTerm}?limit=${limit}&offset=${offset}`;

      if (authData && isTokenExpired()) {
        logout();
      } else {
        sendRequest(searchUrl, 'GET', null);
      }
    }
  }, [searchTerm, page, limit, authData, isTokenExpired, logout, sendRequest]);

  // Manejadores de eventos
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reiniciar a la primera página al cambiar el término de búsqueda
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleEmocionClick = (estudianteId) => {
    navigate(`/emociones/estudiante/${estudianteId}`);
  };

  // Extracción de datos y metadata
  const estudiantes = estudiantesResponse?.data || [];
  const totalResults = estudiantesResponse?.metadata?.total || 0;

  return (
    <div>
      {/* Barra de búsqueda */}
      <TextField
        label="Buscar estudiante"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
        margin="normal"
      />

      {/* Título */}
      <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
        Estudiantes
      </Typography>
      <Divider className="listaEstudiantes-divider" />

      {/* Indicador de carga */}
      {loading && <Loading />}

      {/* Mensaje de error */}
      {error && (
        <Alert severity="error" className="error-message">
          Ocurrió un error al cargar los estudiantes: {error.message}
        </Alert>
      )}

      {/* Tabla de estudiantes */}
      {!error && searchTerm.trim() !== '' && estudiantes.length > 0 && (
        <>
          <TableContainer component={Paper} className="tableEmociones-container">
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell className="header-cell">Estudiante</TableCell>
                  <TableCell className="header-cell">Código</TableCell>
                  <TableCell className="header-cell">Emoción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estudiantes.map((estudiante) => (
                  <TableRow key={estudiante.id} className="table-row">
                    <TableCell className="table-cell">
                      {`${estudiante.nombres} ${estudiante.apellidos}`}
                    </TableCell>
                    <TableCell className="table-cell">{estudiante.codigoInstitucional}</TableCell>
                    <TableCell className="table-cell">
                      <IconButton
                        onClick={() => handleEmocionClick(estudiante.id)}
                        className="emoji-icon"
                      >
                        <EmojiEmotionsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <Pagination
            count={Math.ceil(totalResults / limit)} // Total de páginas
            page={page}
            onChange={handlePageChange}
            color="primary"
            className="pagination"
            style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}

      {/* Sin resultados */}
      {!loading && estudiantes.length === 0 && searchTerm.trim() !== '' && (
        <Typography variant="body1" color="textSecondary" className="no-results">
          No se encontraron estudiantes para la búsqueda: "{searchTerm}"
        </Typography>
      )}
    </div>
  );
}
