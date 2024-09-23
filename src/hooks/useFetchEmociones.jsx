import { useEffect, useState, useContext } from 'react';
import useHttp from './useHttp';
import { AuthContext } from '../context/AuthContext';

const useFetchEmociones = (estudianteId, dateRange) => {
  const [emociones, setEmociones] = useState([]);
  const { authData, isTokenExpired} = useContext(AuthContext);
  const { data: emocionesData, sendRequest: sendEmocionesRequest } = useHttp();

  useEffect(() => {
    const fetchEmociones = async () => {
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
    };

    fetchEmociones();
  }, [authData, estudianteId, isTokenExpired, sendEmocionesRequest, dateRange]);

  useEffect(() => {
    if (emocionesData) {
        setEmociones(emocionesData.emociones || emocionesData);
    }
}, [emocionesData]);

  return emociones;
};

export default useFetchEmociones;
