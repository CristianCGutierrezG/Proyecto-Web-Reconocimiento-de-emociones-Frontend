import { useEffect, useState, useContext } from 'react';
import useHttp from './useHttp';
import { AuthContext } from '../context/AuthContext';

const useFetchEmocionesFecha = (dateRange) => {
  const [emociones, setEmociones] = useState([]);
  const { authData, isTokenExpired } = useContext(AuthContext);
  const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();

  useEffect(() => {
    const fetchEmociones = async () => {
      if (authData && !isTokenExpired()) {
        const emocionesUrl = 'http://localhost:3001/api/v1/emociones';

        const params = new URLSearchParams();
        if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
        if (dateRange?.endDate) params.append('endDate', dateRange.endDate);

        sendEmocionesRequest(`${emocionesUrl}?${params.toString()}`, 'GET', null);
      }
    };

    fetchEmociones();
  }, [authData, isTokenExpired, sendEmocionesRequest, dateRange]);

  useEffect(() => {
    if (emocionesData) {
      setEmociones(emocionesData.emociones || emocionesData);
    }
  }, [emocionesData]);

  return emociones;
};

export default useFetchEmocionesFecha;
