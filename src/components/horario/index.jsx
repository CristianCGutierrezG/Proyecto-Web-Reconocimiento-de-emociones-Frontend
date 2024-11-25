import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { format, startOfWeek, addWeeks, subWeeks, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import Emocion from "./emociones/index.jsx";
import TooltipEmocion from "./toolTipEmocion/index.jsx";
import { EmocionesContext } from "../../context/EmocionesContext.jsx";
import "./styles.css";

const Horario = ({ estudianteId }) => {
  const { emociones, setEstudianteId, setDateRange, limpiarEmociones} = useContext(EmocionesContext) || {};
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 0, locale: es }));
  const [hoveredEmociones, setHoveredEmociones] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (estudianteId) {
        setEstudianteId(estudianteId);
    }
}, [estudianteId, setEstudianteId, limpiarEmociones]);

  useEffect(() => {
    const startOfCurrentWeek = currentWeek.toISOString();
    const endOfCurrentWeek = addDays(currentWeek, 7).toISOString();
    setDateRange({
      startDate: startOfCurrentWeek,
      endDate: endOfCurrentWeek,
    });
  }, [currentWeek, setDateRange]);

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

    return Object.keys(emocionesPorHora).map((hora) => {
      const emocionesEnHora = emocionesPorHora[hora];
      const conteoEmociones = emocionesEnHora.reduce((conteo, emocion) => {
        conteo[emocion.emocion] = (conteo[emocion.emocion] || 0) + 1;
        return conteo;
      }, {});

      const emocionesArray = Object.keys(conteoEmociones).map((emocion) => ({
        emocion,
        count: conteoEmociones[emocion],
      }));

      return {
        hora: parseInt(hora, 10),
        emociones: emocionesArray,
      };
    });
  };

  const emocionPredo = (emociones) => {
    const emocionConMayorCount = emociones.reduce((prev, current) => {
      return (prev.count > current.count) ? prev : current;
    });
    return emocionConMayorCount.emocion;
  }

  const handleMouseEnter = (emociones, event) => {
    if (emociones.length > 0) {
      setHoveredEmociones(emociones);
      setHoveredPosition({ x: event.clientX - 170, y: event.clientY - 15 });
    }
  };

  const handleMouseLeave = () => {
    setHoveredEmociones(null);
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

      <Box className="horario-days">
        <Box className="horario-days-box" />
        <Box className="horario-days-fixed">
          {[...Array(7)].map((_, index) => (
            <Box key={index} className="horario-day-fixed">
              <Typography variant="subtitle1" className="horario-day-title">
                {format(addDays(currentWeek, index), "EEE dd", { locale: es })}
              </Typography>
            </Box>
          ))}
        </Box>
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
                {hours.map((hour) => {
                  const emocionPredominante = getEmocionesForDay(addDays(currentWeek, index)).find((e) => e.hora === hour);
                  return (
                    <Box
                      key={hour}
                      className="horario-hour-slot"
                      onMouseEnter={(event) =>
                        emocionPredominante
                          ? handleMouseEnter(emocionPredominante.emociones, event)
                          : null
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {emocionPredominante && (
                        <Emocion
                          key={emocionPredominante.emocion}
                          emocion={{ emocion: emocionPredo(emocionPredominante.emociones) }}
                          hora={hour}
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
      {hoveredEmociones && (
        <Box
          className="tooltip-container"
          style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
        >
          <TooltipEmocion emocionesPorHora={hoveredEmociones} />
        </Box>
      )}
    </Box>
  );
};

export default Horario;
