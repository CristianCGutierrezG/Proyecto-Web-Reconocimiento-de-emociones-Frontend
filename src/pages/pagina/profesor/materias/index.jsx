import React from 'react';
import ListaMateriasProfesor from '../../../../components/listaMateriasProfesor';
import Menu from '../../../../components/menu';
import NuevaMateriaButton from '../../../../components/nuevaMateria';
import { Typography } from '@mui/material';

export default function Materias() {
  const baseUrl = '/materiasEstudiante'; 

  return (
    <div className='profesorPage-container'>
      <Menu />
      <div className='profesorPage-main'>
        <div className="profesorPage-title">
          <Typography variant="h4" component="h1" gutterBottom>
            Mis materias
          </Typography>
          <NuevaMateriaButton styles={{margin:0}} />
        </div>
        <div className='profesorPage-materia'>
          <ListaMateriasProfesor baseUrl={baseUrl} />
        </div>
      </div>
    </div>
  );
}
