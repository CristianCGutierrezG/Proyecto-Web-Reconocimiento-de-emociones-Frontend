import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import useHttp from '../hooks/useHttp.jsx';
import { AuthContext } from './AuthContext.jsx';

const EmocionesPorMateriaContext = createContext();

const EmocionesPorMateriaProvider = ({ children }) => {
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const [emociones, setEmociones] = useState([]);
    const [materiaId, setMateriaId] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

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

    useEffect(() => {
        let emocionesUrl;
        if (authData && !isTokenExpired()) {
            if (materiaId) {
                emocionesUrl = `http://localhost:3001/api/v1/emociones?id=${materiaId}`;
            }

            if (emocionesUrl) {
                const params = new URLSearchParams();
                if (dateRange.startDate) params.append('startDate', dateRange.startDate);
                if (dateRange.endDate) params.append('endDate', dateRange.endDate);

                sendEmocionesRequest(`${emocionesUrl}&${params.toString()}`, 'GET', null, headers);
            }
        }
    }, [authData, materiaId, isTokenExpired, headers, sendEmocionesRequest, dateRange]);

    useEffect(() => {
        if (emocionesData) {
            setEmociones(emocionesData.emociones || emocionesData);
        }
    }, [emocionesData]);

    useEffect(() => {
        // Eliminar datos al cerrar sesión
        if (isTokenExpired()) {
            logout();
        }
    }, [logout, isTokenExpired]);

    return (
        <EmocionesPorMateriaContext.Provider value={{ emociones, setMateriaId, setDateRange, dateRange }}>
            {children}
        </EmocionesPorMateriaContext.Provider>
    );
};

export { EmocionesPorMateriaProvider, EmocionesPorMateriaContext };
