import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import useHttp from '../hooks/useHttp.jsx';
import { AuthContext } from './AuthContext.jsx';

const InfoTokenEstudianteContext = createContext();

const InfoTokenEstudianteProvider = ({ children }) => {
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
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
        if (authData && !isTokenExpired() && authData.user?.role === "Estudiante") {
            const emocionesUrl = `http://localhost:3001/api/v1/profile/estudiante-emociones`;
            sendEmocionesRequest(emocionesUrl, 'GET', null, headers);

            const materiasUrl = `http://localhost:3001/api/v1/profile/estudiante-materias`;
            sendMateriasRequest(materiasUrl, 'GET', null, headers);
        }
    }, [authData, isTokenExpired, headers, sendEmocionesRequest, sendMateriasRequest]);

    useEffect(() => {
        if (emocionesData) {
            setEmociones(emocionesData.emociones || emocionesData);
        }
    }, [emocionesData]);

    useEffect(() => {
        if (materiasData) {
            setMaterias(materiasData.inscritos || materiasData);
        }
    }, [materiasData]);

    useEffect(() => {
        // Eliminar datos al cerrar sesión
        if (isTokenExpired()) {
            logout();
        }
    }, [logout, isTokenExpired]);

    return (
        <InfoTokenEstudianteContext.Provider value={{ emociones, materias }}>
            {children}
        </InfoTokenEstudianteContext.Provider>
    );
};

export { InfoTokenEstudianteProvider, InfoTokenEstudianteContext };
