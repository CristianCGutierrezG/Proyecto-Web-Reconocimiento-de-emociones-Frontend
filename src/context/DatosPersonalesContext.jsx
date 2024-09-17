import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

//Hooks
import useHttp from '../hooks/useHttp.jsx';

//Context
import { AuthContext } from './AuthContext'

const DatosPersonalesContext = createContext();

const  DatosPersonalesProvider = ({ children }) => {
    const { authData, isTokenExpired } = useContext(AuthContext);
    const [datosPersonales, setDatosPersonales] = useState(null);
    

    const { data, loading, error, sendRequest } = useHttp();

    useEffect(() => {
        if (authData && !isTokenExpired()) {
            let fetchUrl = '';
            switch (authData.user.role) {
                case 'Profesor':
                    fetchUrl = `http://localhost:3001/api/v1/profile/profesor-info`;
                    break;
                case 'Profesional de salud':
                    fetchUrl = `http://localhost:3001/api/v1/profile/proSalud-info`;
                    break;
                case 'Estudiante':
                    fetchUrl = 'http://localhost:3001/api/v1/profile/estudiante-info';
                    break;
                default:
                    fetchUrl = 'http://localhost:3001/api/v1/profile/estudiante-info';
                    break;
            }

            sendRequest(fetchUrl, 'GET', null);
        }
    }, [authData, isTokenExpired, sendRequest]);

    useEffect(() => {
        if (data) {
            setDatosPersonales(data);
        }else{
            setDatosPersonales(null);
        }
    }, [data]);

    return (
        <DatosPersonalesContext.Provider value={{ datosPersonales, loading, error }}>
            {children}
        </DatosPersonalesContext.Provider>
    );
};

export { DatosPersonalesProvider, DatosPersonalesContext };