import { useEffect, useState, useContext } from 'react';
import useHttp from './useHttp';
import { AuthContext } from '../context/AuthContext';

const useFetchMaterias = (estudianteId) => {
  const [materias, setMaterias] = useState([]);
  const { authData, isTokenExpired } = useContext(AuthContext);
  const { data: materiasData, sendRequest: sendMateriasRequest } = useHttp();


  useEffect(() => {
    const fetchMaterias = async () => {
      let materiasUrl;

      if (authData && !isTokenExpired()) {
        if (estudianteId) {
          materiasUrl = `http://localhost:3001/api/v1/estudiantes/${estudianteId}/materias`;
        } else if (authData.user?.role === "Estudiante") {
          materiasUrl = `http://localhost:3001/api/v1/profile/estudiante-materias`;
        } else if (authData.user?.role === "Profesor") {
          materiasUrl = `http://localhost:3001/api/v1/profile/profesor-materias`;
        }

        if (materiasUrl) {
          sendMateriasRequest(materiasUrl, 'GET', null);
        }
      }
    };

    fetchMaterias();
  }, [authData, estudianteId, isTokenExpired, sendMateriasRequest]);

  useEffect(() => {
    if (materiasData) {
      const normalizedMaterias = estudianteId
        ? materiasData.inscritos.map(inscrito => ({
            id: inscrito.id,
            nombre: inscrito.nombre,
            grupo: inscrito.grupo,
            horarios: inscrito.horarios,
            profesor: inscrito.profesor,
          }))
        : materiasData.map(materia => ({
            id: materia.id,
            nombre: materia.nombre,
            grupo: materia.grupo,
            horarios: materia.horarios,
            profesor: materia.profesor,
          }));

      setMaterias(normalizedMaterias);
    }
  }, [materiasData, estudianteId]);

  return materias;
};

export default useFetchMaterias;
