import { useEffect, useState, useMemo, useContext } from 'react';
import useHttp from './useHttp';
import { AuthContext } from '../context/AuthContext';

const useFetchEmocionesMaterias = (materiaId, dateRange) => {
  const [emociones, setEmociones] = useState([]);
  const { authData, isTokenExpired } = useContext(AuthContext);
  const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();

  const headers = useMemo(() => {
    if (authData && authData.token) {
      return {
        'Authorization': `Bearer ${authData.token}`,
        'api': 'PEJC2024',
      };
    }
    return {};
  }, [authData]);

  useEffect(() => {
    const fetchEmociones = async () => {
      if (authData && !isTokenExpired() && materiaId) {
        const emocionesUrl = `http://localhost:3001/api/v1/emociones?id=${materiaId}`;

        const params = new URLSearchParams();
        if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
        if (dateRange?.endDate) params.append('endDate', dateRange.endDate);

        sendEmocionesRequest(`${emocionesUrl}&${params.toString()}`, 'GET', null, headers);
      }
    };

    fetchEmociones();
  }, [authData, materiaId, isTokenExpired, sendEmocionesRequest, headers, dateRange]);

  useEffect(() => {
    if (emocionesData) {
      setEmociones(emocionesData.emociones || emocionesData);
    }
  }, [emocionesData]);

  return emociones;
};

export default useFetchEmocionesMaterias;
