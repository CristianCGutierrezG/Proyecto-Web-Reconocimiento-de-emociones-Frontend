import React, { useContext, useState, useEffect, useMemo } from 'react';

//material
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { format, startOfWeek, addWeeks, subWeeks, addDays } from 'date-fns';

//componentes
import Emocion from './emociones/index.jsx';
import Materia from './materias/index.jsx';

//contextos
import { InfoTokenEstudianteContext } from '../../context/InfoTokenEstudianteContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx'

//hooks
import useHttp from '../../hooks/useHttp.jsx';

//estilos
import './styles.css';

const Horario = ({ estudianteId }) => {
    const { authData, isTokenExpired } = useContext(AuthContext);
    const { emociones: contextEmociones, materias: contextMaterias } = useContext(InfoTokenEstudianteContext);
    const [emociones, setEmociones] = useState(contextEmociones || []);
    const [materias, setMaterias] = useState(contextMaterias || []);
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));

    const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();
    const { data: materiasData, sendRequest: sendMateriasRequest } = useHttp();

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
        if (estudianteId) {
            const emocionesUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/emociones`;
            sendEmocionesRequest(emocionesUrl, 'GET', null, headers);
            
            const materiasUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/materias`;
            sendMateriasRequest(materiasUrl, 'GET', null, headers);
        }
    }, [estudianteId, sendEmocionesRequest, sendMateriasRequest, headers]);

    useEffect(() => {
        if (emocionesData) {
            setEmociones(emocionesData);
        }
    }, [emocionesData]);

    useEffect(() => {
        if (materiasData) {
            setMaterias(materiasData);
        }
    }, [materiasData]);

    const handlePrevWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const getEmocionesForDay = (day) => {
        return emociones.filter(emocion => 
            format(new Date(emocion.createdAt), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );
    };

    const getMateriasForDay = (day) => {
        return materias.filter(materia => 
            materia.inscritos.some(inscrito => 
                format(new Date(inscrito.EstudiantesMaterias.createdAt), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            )
        );
    };

    return (
        <Box className="horario-root">
            <Box className="horario-header">
                <IconButton onClick={handlePrevWeek}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4">{format(currentWeek, 'MMMM yyyy')}</Typography>
                <IconButton onClick={handleNextWeek}>
                    <ArrowForward />
                </IconButton>
            </Box>
            <Box className="horario-grid">
                {[...Array(7)].map((_, index) => (
                    <Box key={index} className="horario-day">
                        <Typography variant="subtitle1">
                            {format(addDays(currentWeek, index), 'EEE dd')}
                        </Typography>
                        {getEmocionesForDay(addDays(currentWeek, index)).map(emocion => (
                            <Emocion key={emocion.id} emocion={emocion} />
                        ))}
                        {getMateriasForDay(addDays(currentWeek, index)).map(materia => (
                            <Materia key={materia.id} materia={materia} />
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Horario;