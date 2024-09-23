import React, { createContext, useState, useEffect, useContext} from 'react';
import useHttp from '../hooks/useHttp.jsx';
import { AuthContext } from './AuthContext.jsx';

const EmocionesContext = createContext();

const EmocionesProvider = ({ children }) => {
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const [emociones, setEmociones] = useState([]);
    const [estudianteId, setEstudianteId] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });


    const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();

    useEffect(() => {
        let emocionesUrl;
        if (authData && !isTokenExpired()) {
            if (estudianteId) {
                emocionesUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/emociones`;
            } else if (authData.user?.role === "Estudiante") {
                emocionesUrl = `http://localhost:3001/api/v1/profile/estudiante-emociones`;
            }

            if (emocionesUrl) {
                const params = new URLSearchParams();
                if (dateRange.startDate) params.append('startDate', dateRange.startDate);
                if (dateRange.endDate) params.append('endDate', dateRange.endDate);

                sendEmocionesRequest(`${emocionesUrl}?${params.toString()}`, 'GET', null);
            }
        }
    }, [authData, estudianteId, isTokenExpired, sendEmocionesRequest, dateRange]);

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
        <EmocionesContext.Provider value={{ emociones, setEstudianteId, setDateRange, dateRange }}>
            {children}
        </EmocionesContext.Provider>
    );
};

export { EmocionesProvider, EmocionesContext };
