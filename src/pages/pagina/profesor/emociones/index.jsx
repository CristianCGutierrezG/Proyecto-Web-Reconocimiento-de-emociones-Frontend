import React from 'react';
import ListaMateriasProfesor from '../../../../components/listaMateriasProfesor';
import Menu from '../../../../components/menu';
import { Typography } from '@mui/material';
import "./styles.css"

export default function Emociones() {
    const baseUrl = '/materiasEmocion'; 

    return (
        <div className='profesorPage-container'>
            <Menu />
            <div className='profesorPage-main'>
                <div className="profesorPage-title">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Estudiantes por materia
                    </Typography>
                </div>
                <div className='profesorPage-materia'>
                    <ListaMateriasProfesor baseUrl={baseUrl} />
                </div>
            </div>
        </div>
    );
};
