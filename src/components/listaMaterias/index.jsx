import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import MateriaCard from './MateriaCard';
import useFetchMaterias from '../../hooks/useFetchMaterias';
import './styles.css';

const ListaDeMaterias = ({ estudianteId, allowColorCustomization = false }) => {
  const materias = useFetchMaterias(estudianteId);
  const [materiasConColor, setMateriasConColor] = useState([]);

  // Función para generar un color aleatorio en formato hexadecimal
  const generarColorAleatorio = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('materiasColors')) || {};

    const materiasConColorInicial = materias.map((materia) => {
      // Si no existe un color guardado, genera uno aleatorio
      const color = savedColors[materia.id] || generarColorAleatorio();
      return { ...materia, color };
    });

    // Actualiza el estado con los colores asignados
    setMateriasConColor(materiasConColorInicial);

    // Guarda los colores generados en localStorage
    const nuevosColores = materiasConColorInicial.reduce((acc, materia) => {
      acc[materia.id] = materia.color;
      return acc;
    }, {});

    localStorage.setItem(
      'materiasColors',
      JSON.stringify({
        ...savedColors,
        ...nuevosColores,
      })
    );
  }, [materias]);

  const handleColorChange = (materiaId, color) => {
    const updatedMaterias = materiasConColor.map((materia) =>
      materia.id === materiaId ? { ...materia, color } : materia
    );
    setMateriasConColor(updatedMaterias);
    localStorage.setItem(
      'materiasColors',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('materiasColors') || '{}'),
        [materiaId]: color,
      })
    );
  };

  return (
    <div className="lista-materias-wrapper">
      <Typography variant="h6" color="var(--terniary-color)" gutterBottom>
        Materias
      </Typography>
      <div className="lista-materias-container">
        <Grid container spacing={2} direction="column">
          {materiasConColor.map((materia) => (
            <Grid item key={materia.id}>
              <MateriaCard
                materia={materia}
                allowColorCustomization={allowColorCustomization}
                onColorChange={handleColorChange}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ListaDeMaterias;
