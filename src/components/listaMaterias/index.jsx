import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import MateriaCard from './materiaCard';
import useFetchMaterias from '../../hooks/useFetchMaterias';
import './styles.css';

const ListaDeMaterias = ({ estudianteId, allowColorCustomization = false }) => {
  const materias = useFetchMaterias(estudianteId);
  const [materiasConColor, setMateriasConColor] = useState([]);

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('materiasColors')) || {};

    const materiasConColorInicial = materias.map((materia) => {
      const color = savedColors[materia.id] || generarColorAleatorio();
      return { ...materia, color };
    });

    setMateriasConColor(materiasConColorInicial);
  }, [materias]);

  const handleColorChange = (materiaId, color) => {
    const updatedMaterias = materiasConColor.map((materia) =>
      materia.id === materiaId ? { ...materia, color } : materia
    );
    setMateriasConColor(updatedMaterias);
  };

  const generarColorAleatorio = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
    <Typography variant="h6" color="var(--terniary-color)" gutterBottom>
        Materias
      </Typography>
    <div className="lista-materias-wrapper">
      
      <div className="lista-materias-container">
        <Grid container spacing={2} direction="column">
          {materiasConColor.length > 0 ? (
            materiasConColor.map((materia) => (
              <Grid item key={materia.id}>
                <MateriaCard
                  materia={materia}
                  allowColorCustomization={allowColorCustomization}
                  onColorChange={handleColorChange}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              No se encontraron materias registradas.
            </Typography>
          )}
        </Grid>
      </div>
    </div>
    </>
  );
};

export default ListaDeMaterias;
