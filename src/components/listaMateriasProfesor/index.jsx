import React from 'react';
import { Grid } from '@mui/material';
import useFetchMaterias from '../../hooks/useFetchMaterias';
import MateriaCard from './materiaCard';

const ListaMateriasProfesor = ({ baseUrl }) => {
    const materias = useFetchMaterias(null);

    const handleCardClick = (materia) => {
      const fullUrl = `${baseUrl}/${materia.id}`;
      window.location.href = fullUrl;
    };
  
    return (
      <Grid container spacing={2}>
        {materias.map((materia) => (
          <Grid item xs={12} sm={6} md={4} key={materia.id}>
            <MateriaCard materia={materia} onClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    );
};

export default ListaMateriasProfesor;
