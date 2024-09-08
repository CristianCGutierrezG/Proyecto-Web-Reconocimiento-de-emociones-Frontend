import React, { useState, useContext, useMemo, useEffect } from 'react';
import { TextField, Grid, CircularProgress, IconButton, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useHttp from '../../hooks/useHttp';
import TarjetaMateria from './tarjetaMateria';
import PopupMateria from './PopupMateria';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

function BuscarMaterias() {
  const [busqueda, setBusqueda] = useState('');
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [page, setPage] = useState(2);
  const { authData, isTokenExpired, logout } = useContext(AuthContext);
  const { data: materias, loading, sendRequest } = useHttp();

  const limit = 6; 
  const offset = (page - 1) * limit;
  
  const headers = useMemo(() => {
    if (authData && authData.token) {
      return {
        'Authorization': `Bearer ${authData.token}`,
        'api': 'PEJC2024'
      };
    }
    return {};
  }, [authData]);



  useEffect(() => {
    if (busqueda.trim() !== '') {
      const materiasUrl = `http://localhost:3001/api/v1/materias/buscar/${busqueda}?limit=${limit}&offset=${offset}`;
      
      if (authData && isTokenExpired()) {
        logout();
      } else {
        sendRequest(materiasUrl, 'GET', null, headers);
      }
    }
  }, [busqueda, page, headers, authData, isTokenExpired, logout, sendRequest]);

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
      {loading && <CircularProgress size={24} />}
      <Grid container spacing={2} className="tarjetas-container">
        {materias && materias.map((materia) => (
          <Grid item xs={12} sm={6} md={4} key={materia.id}>
            <TarjetaMateria materia={materia} onClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      {materias && materias.length > 0 && (
        <Pagination
          count={Math.ceil(materias.totalCount / limit)} 
          page={page}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
        />
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
