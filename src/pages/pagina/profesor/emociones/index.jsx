import React from 'react';
import ListaMateriasProfesor from '../../../../components/listaMateriasProfesor';
import Menu from '../../../../components/menu';
import { Typography } from '@mui/material';
import "./styles.css"

export default function Emociones() {
    const baseUrl = '/materias'; 

    return (
        <div className='emocionesProfesorPage-container'>
            <Menu />
            <div className='emocionesProfesorPage-main'>
                <div className="emocionesProfesorPage-title">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Estudiantes por materia
                    </Typography>
                </div>
                <div className='emocionesProfesorPage-materia'>
                    <ListaMateriasProfesor baseUrl={baseUrl} />
                </div>
            </div>
        </div>
    );
};
