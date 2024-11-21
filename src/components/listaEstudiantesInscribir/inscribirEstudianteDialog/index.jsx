import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Tooltip, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../loading';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthContext';
import useHttp from '../../../hooks/useHttp';

export default function InscribirEstudianteDialog({ open, onClose, inscritos, materiaId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { authData, isTokenExpired, logout } = useContext(AuthContext);
  const [customError, setCustomError] = useState(null);

  const { data: estudiantesResponse, loading, error: errorSearch, sendRequest } = useHttp();

  const limit = 4;
  const offset = (page - 1) * limit;

  // Manejo de la búsqueda y la solicitud GET
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const searchUrl = `http://localhost:3001/api/v1/estudiantes/buscar/${searchTerm}?limit=${limit}&offset=${offset}`;

      if (authData && isTokenExpired()) {
        logout();
      } else {
        sendRequest(searchUrl, 'GET', null);
      }
    }
  }, [searchTerm, page, authData, isTokenExpired, logout, sendRequest]);

  const { data: inscripcionData, sendRequest: postRequest, error, errorResponse } = useHttp();

  // Manejo de la inscripción de un estudiante
  const handleEnrollClick = async (studentId) => {
    const url = 'http://localhost:3001/api/v1/materias/add-inscripcion';
    const body = { materiaId, estudianteId: studentId };

    try {
      await postRequest(url, 'POST', body);
    } catch (error) {
      Swal.fire('Error', 'No se pudo inscribir al estudiante.', 'error');
    }
  };

  // Maneja la respuesta de inscripción exitosa
  useEffect(() => {
    if (inscripcionData) {
      Swal.fire({
        title: 'Inscripción exitosa',
        text: 'El estudiante fue inscrito con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        onClose();
        window.location.reload();
      });
    }
    if (error) {
      setCustomError(errorResponse || 'Hubo un problema al inscribir al estudiante.');
    }
  }, [inscripcionData, error, errorResponse, onClose]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const isStudentEnrolled = (studentId) => {
    return inscritos.some(est => est.EstudiantesMaterias.estudianteId === studentId);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Extraer datos y metadata de la respuesta
  const estudiantes = estudiantesResponse?.data || [];
  const totalResults = estudiantesResponse?.metadata?.total || 0;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Inscripción de Estudiantes</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <TextField
            autoFocus
            margin="dense"
            label="Buscar estudiante"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
          />
          <IconButton onClick={() => setPage(1)}>
            <SearchIcon />
          </IconButton>
        </div>

        {loading && <Loading />}

        {/* Mensaje de error */}
        {errorSearch && (
          <Alert severity="error" className="error-message">
            Ocurrió un error al cargar los estudiantes: {errorSearch.message}
          </Alert>
        )}

        {!errorSearch && searchTerm.trim() !== '' && estudiantes.length > 0 && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Estudiante</TableCell>
                    <TableCell>Código</TableCell>
                    <TableCell>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {estudiantes.map((estudiante) => (
                    <TableRow key={estudiante.id}>
                      <TableCell>{`${estudiante.nombres} ${estudiante.apellidos}`}</TableCell>
                      <TableCell>{estudiante.codigoInstitucional}</TableCell>
                      <TableCell>
                        <Tooltip title={isStudentEnrolled(estudiante.id) ? "El estudiante ya está inscrito en esta materia" : ""}>
                          <span>
                            <IconButton
                              className={isStudentEnrolled(estudiante.id) ? "profesorPage-edit" : "listaEstudiantes-submit"}
                              onClick={() => handleEnrollClick(estudiante.id)}
                              disabled={isStudentEnrolled(estudiante.id) || loading}
                            >
                              <AddIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              count={Math.ceil(totalResults / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              style={{ marginTop: '16px', justifyContent: 'center' }}
            />
          </>
        )}

        {error && <Typography color="error" className="popupMateria-error">Error: {customError}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="listaEstudiantes-cancel">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
