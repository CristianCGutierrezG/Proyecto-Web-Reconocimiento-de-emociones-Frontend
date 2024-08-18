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
        const obtenerEstudiante = async () => {
            if (estudianteId && authData && !isTokenExpired()) {
                const url = `http://localhost:3001/api/v1/estudiantes/${estudianteId}`;
                fetchEstudiante(url, 'GET', null, headers);
            } else {
                // Usar los datos del contexto si no hay estudianteId o si el token ha expirado
                setEstudiante(datosPersonales);
            }
        };

        obtenerEstudiante();
    }, [estudianteId, datosPersonales, authData, isTokenExpired, fetchEstudiante, headers]);

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
