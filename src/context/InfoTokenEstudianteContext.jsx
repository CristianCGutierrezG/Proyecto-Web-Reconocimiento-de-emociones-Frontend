import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

//Hooks
import useHttp from '../hooks/useHttp.jsx';

//Context
import { AuthContext } from './AuthContext.jsx'

const InfoTokenEstudianteContext = createContext();

const InfoTokenEstudianteProvider = ({ children }) => {
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
        if (authData && !isTokenExpired()) {
            const emocionesUrl = `http://localhost:3001/api/v1/profile/estudiante-emociones`;
            sendEmocionesRequest(emocionesUrl, 'GET', null, headers);
            
            const materiasUrl = `http://localhost:3001/api/v1/profile/estudiante-materias`;
            sendMateriasRequest(materiasUrl, 'GET', null, headers);
        }
    }, [authData, isTokenExpired, headers, sendEmocionesRequest, sendMateriasRequest]);

    useEffect(() => {
        if (emocionesData) {
            setEmociones(emocionesData);
        } else {
            setEmociones([]);
        }
    }, [emocionesData]);

    useEffect(() => {
        if (materiasData) {
            setMaterias(materiasData);
        } else {
            setMaterias([]);
        }
    }, [materiasData]);

    return (
        <InfoTokenEstudianteContext.Provider value={{ emociones, materias }}>
            {children}
        </InfoTokenEstudianteContext.Provider>
    );
};

export { InfoTokenEstudianteProvider, InfoTokenEstudianteContext };