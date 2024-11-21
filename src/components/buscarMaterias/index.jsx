import React, { useState, useContext, useEffect } from 'react';
import { TextField, Grid, IconButton, Pagination, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useHttp from '../../hooks/useHttp';
import TarjetaMateria from './tarjetaMateria';
import PopupMateria from './PopupMateria';
import Loading from '../loading';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

function BuscarMaterias() {
  const [busqueda, setBusqueda] = useState('');
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { authData, isTokenExpired, logout } = useContext(AuthContext);
  const { data: materias, loading, error, sendRequest } = useHttp();

  const limit = 6;
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (busqueda.trim() !== '') {
      const materiasUrl = `http://localhost:3001/api/v1/materias/buscar/${busqueda}?limit=${limit}&offset=${offset}`;

      if (authData && isTokenExpired()) {
        logout();
      } else {
        sendRequest(materiasUrl, 'GET', null);
      }
    }
  }, [busqueda, page, authData, isTokenExpired, logout, sendRequest]);

  // Actualizamos el total de páginas cuando obtenemos los datos.
  useEffect(() => {
    if (materias && materias.metadata) {
      setTotalPages(Math.ceil(materias.metadata.total / limit));
    }
  }, [materias]);

  const handleCardClick = (materia) => {
    setSelectedMateria(materia);
  };

  const handleClosePopup = () => {
    setSelectedMateria(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="buscar-materias-container">
      <div className="search-bar-container">
        <TextField
          label="Buscar cursos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <IconButton
          color="primary"
          onClick={() => setPage(1)}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>

      {loading && <Loading />}

      {error && (
        <Alert severity="error" className="error-message">
          Ocurrió un error al cargar las materias: {error.message}
        </Alert>
      )}

      {!error && busqueda.trim() !== '' && materias && (
        <>
          <Grid container spacing={2} className="tarjetas-container">
            {materias.data.map((materia) => (
              <Grid item xs={12} sm={6} md={4} key={materia.id}>
                <TarjetaMateria materia={materia} onClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>

          {materias.data.length > 0 && totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              className="pagination"
            />
          )}
        </>
      )}

      {selectedMateria && (
        <PopupMateria
          materia={selectedMateria}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default BuscarMaterias;
