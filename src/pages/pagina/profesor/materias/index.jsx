import React from 'react';
import ListaMateriasProfesor from '../../../../components/listaMateriasProfesor';
import Menu from '../../../../components/menu';
import NuevaMateriaButton from '../../../../components/nuevaMateria';
import { Typography } from '@mui/material';

export default function Materias() {
  const baseUrl = '/materias'; 

  return (
    <div className='emocionesProfesorPage-container'>
      <Menu />
      <div className='emocionesProfesorPage-main'>
        <div className="emocionesProfesorPage-title">
          <Typography variant="h4" component="h1" gutterBottom>
            Mis materias
          </Typography>
          <NuevaMateriaButton styles={{margin:0}} />
        </div>
        <div className='emocionesProfesorPage-materia'>
          <ListaMateriasProfesor baseUrl={baseUrl} />
        </div>
      </div>
    </div>
  );
}
