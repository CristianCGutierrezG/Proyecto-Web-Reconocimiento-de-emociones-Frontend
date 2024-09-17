import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Typography } from '@mui/material';
import { DatosPersonalesContext } from '../../context/DatosPersonalesContext';
import { AuthContext } from '../../context/AuthContext';
import useHttp from '../../hooks/useHttp';

function EstudianteInfo({ estudianteId }) {
    const { datosPersonales } = useContext(DatosPersonalesContext);
    const { authData, isTokenExpired } = useContext(AuthContext);
    const { data: estudianteData, sendRequest: fetchEstudiante } = useHttp();
    const [estudiante, setEstudiante] = useState(null);


    useEffect(() => {
        const obtenerEstudiante = async () => {
            if (estudianteId && authData && !isTokenExpired()) {
                const url = `http://localhost:3001/api/v1/estudiantes/${estudianteId}`;
                fetchEstudiante(url, 'GET', null);
            } else {
                setEstudiante(datosPersonales);
            }
        };

        obtenerEstudiante();
    }, [estudianteId, datosPersonales, authData, isTokenExpired, fetchEstudiante]);

    useEffect(() => {
        if (estudianteData) {
            setEstudiante(estudianteData);
        }
    }, [estudianteData]);

    if (!estudiante) {
        return <p>Cargando información del estudiante...</p>;
    }

    return (
        <div className='estudiante-info'>
            <Typography variant="h5">{estudiante.nombres} {estudiante.apellidos}</Typography>
            <Typography variant="h7">{estudiante.codigoInstitucional}</Typography>
        </div>
    );
}

export default EstudianteInfo;
