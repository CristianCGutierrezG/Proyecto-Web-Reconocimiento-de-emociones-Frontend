import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { format, startOfWeek, addWeeks, subWeeks, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import Emocion from "./emociones/index.jsx";
import Materia from "./materias/index.jsx";
import { InfoTokenEstudianteContext } from "../../context/InfoTokenEstudianteContext.jsx";
import { InfoEstudianteIdContext } from "../../context/InfoEstudianteIdContext.jsx";
import "./styles.css";

const Horario = ({ estudianteId }) => {
  const { emociones: contextEmociones, materias: contextMaterias } = useContext(InfoTokenEstudianteContext) || {};
  const { emociones: estudianteEmociones, materias: estudianteMaterias, setEstudianteId } = useContext(InfoEstudianteIdContext) || {};

  const [emociones, setEmociones] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0, locale: es })
  );

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (estudianteId) {
      // Cargar datos del localStorage si existen
      setEstudianteId(estudianteId);
      const storedEmociones = localStorage.getItem(`emociones`);
      const storedMaterias = localStorage.getItem(`materias`);
      if (storedEmociones) setEmociones(JSON.parse(storedEmociones));
      if (storedMaterias) setMaterias(JSON.parse(storedMaterias));
    } else {
      // Usa el contexto si no hay estudianteId
      setEmociones(contextEmociones || []);
      setMaterias(contextMaterias || []);
    }
  }, [estudianteId, contextEmociones, contextMaterias, estudianteEmociones, estudianteMaterias]);

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const getEmocionesForDay = (day) => {
    const emocionesDelDia = emociones.filter(
      (emocion) =>
        format(new Date(emocion.createdAt), "yyyy-MM-dd", { locale: es }) ===
        format(day, "yyyy-MM-dd", { locale: es })
    );

    const emocionesPorHora = emocionesDelDia.reduce((acc, emocion) => {
      const zonedDate = toZonedTime(new Date(emocion.createdAt), timeZone);
      const hora = zonedDate.getHours();

      if (!acc[hora]) {
        acc[hora] = [];
      }
      acc[hora].push(emocion);
      return acc;
    }, {});

    const emocionPredominantePorHora = Object.keys(emocionesPorHora).map(
      (hora) => {
        const emocionesEnHora = emocionesPorHora[hora];
        const conteoEmociones = emocionesEnHora.reduce((conteo, emocion) => {
          conteo[emocion.emocion] = (conteo[emocion.emocion] || 0) + 1;
          return conteo;
        }, {});

        const emocionPredominante = Object.keys(conteoEmociones).reduce(
          (a, b) => (conteoEmociones[a] > conteoEmociones[b] ? a : b)
        );
        return {
          hora: parseInt(hora, 10),
          emocion: emocionPredominante,
        };
      }
    );

    return emocionPredominantePorHora;
  };

  const getMateriasForDay = (day) => {
    return materias.filter(
      (materia) =>
        format(new Date(materia.createdAt), "yyyy-MM-dd", { locale: es }) ===
        format(day, "yyyy-MM-dd", { locale: es })
    );
  };

  const hours = [...Array(24)].map((_, i) => i);

  return (
    <Box className="horario-root">
      <Box className="horario-header">
        <IconButton onClick={handlePrevWeek}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          {format(currentWeek, "MMMM yyyy", { locale: es })}
        </Typography>
        <IconButton onClick={handleNextWeek}>
          <ArrowForward />
        </IconButton>
      </Box>
      <Box className="horario-container-sup">
        <Box className="horario-container">
          <Box className="horario-hours">
            {hours.map((hour) => (
              <Box key={hour} className="horario-hour">
                <Typography variant="caption">{`${hour}:00`}</Typography>
              </Box>
            ))}
          </Box>
          <Box className="horario-grid">
            {[...Array(7)].map((_, index) => (
              <Box key={index} className="horario-day">
                <Typography variant="subtitle1" className="horario-day-title">
                  {format(addDays(currentWeek, index), "EEE dd", { locale: es })}
                </Typography>
                {hours.map((hour) => {
                  const emocionPredominante = getEmocionesForDay(
                    addDays(currentWeek, index)
                  ).find((e) => e.hora === hour);
                  return (
                    <Box key={hour} className="horario-hour-slot">
                      {emocionPredominante && (
                        <Emocion
                          key={emocionPredominante.emocion}
                          emocion={{ emocion: emocionPredominante.emocion }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Horario;
