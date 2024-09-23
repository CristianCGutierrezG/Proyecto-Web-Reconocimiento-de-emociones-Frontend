import { useEffect, useContext } from 'react';
import useHttp from './useHttp';
import { AuthContext } from '../context/AuthContext';

export function useFetchMateriasProfesor(materiaId) {
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const { data: materiaInfo, loading, error, sendRequest } = useHttp();

    useEffect(() => {
        if (authData && !isTokenExpired() && materiaId) {
            const url = `http://localhost:3001/api/v1/materias/${materiaId}`;

            sendRequest(url, 'GET', null,);
        }
    }, [materiaId, authData, isTokenExpired, logout, sendRequest]);

    return { materiaInfo, loading, error };
}
