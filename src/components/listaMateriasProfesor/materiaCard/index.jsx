import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './styles.css'; 

function MateriaCard({ materia, onClick }) {
  return (
    <Card onClick={() => onClick(materia)} className='materiaCard'>
      <CardContent style={{padding: 0}} className='materiaCard-content'>
        <Typography variant="h6" component="div">
          {materia.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Grupo {materia.grupo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {materia.profesor.nombres} {materia.profesor.apellidos}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MateriaCard;
