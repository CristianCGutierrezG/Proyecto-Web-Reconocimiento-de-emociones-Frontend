import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import useHttp from '../hooks/useHttp.jsx';
import { AuthContext } from './AuthContext.jsx';

const InfoEstudianteIdContext = createContext();

const InfoEstudianteIdProvider = ({ children }) => {
    const [estudianteId, setEstudianteId] = useState(null);
    const { authData, isTokenExpired } = useContext(AuthContext);
    const [emociones, setEmociones] = useState([]);
    const [materias, setMaterias] = useState([]);

    const headers = useMemo(() => {
        if (authData && authData.token) {
            return {
                'Authorization': `Bearer ${authData.token}`,
                'api': 'PEJC2024'
            };
        }
        return {};
    }, [authData]);

    const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();
    const { data: materiasData, sendRequest: sendMateriasRequest } = useHttp();

    useEffect(() => {
        if (estudianteId) {
            if (!isTokenExpired()) {
                const emocionesUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/emociones`;
                sendEmocionesRequest(emocionesUrl, 'GET', null, headers);

                const materiasUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/materias`;
                sendMateriasRequest(materiasUrl, 'GET', null, headers);
            }
        } else {
            // Eliminar datos del localStorage si no hay estudianteId
            localStorage.removeItem('emociones');
            localStorage.removeItem('materias');
            setEmociones([]);
            setMaterias([]);
        }
    }, [estudianteId, authData, isTokenExpired, headers, sendEmocionesRequest, sendMateriasRequest]);

    useEffect(() => {
        if (estudianteId) {
            if (emocionesData) {
                const emocionesList = emocionesData.emociones || emocionesData;
                setEmociones(emocionesList);
                // Almacenar en localStorage
                localStorage.setItem(`emociones`, JSON.stringify(emocionesList));
            }

            if (materiasData) {
                const materiasList = materiasData.inscritos || materiasData;
                setMaterias(materiasList);
                // Almacenar en localStorage
                localStorage.setItem(`materias`, JSON.stringify(materiasList));
            }
        }
    }, [emocionesData, materiasData, estudianteId]);

    return (
        <InfoEstudianteIdContext.Provider value={{ emociones, materias, setEstudianteId }}>
            {children}
        </InfoEstudianteIdContext.Provider>
    );
};

export { InfoEstudianteIdProvider, InfoEstudianteIdContext };
