// HorarioMateria.jsx
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { format, startOfWeek, addWeeks, subWeeks, addDays } from "date-fns";
import { es } from "date-fns/locale";
import useFetchMaterias from "../../hooks/useFetchMaterias";
import Materia from "./materia";
import "./styles.css";

const HorarioMateria = ({ estudianteId }) => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0, locale: es })
  );

  const materias = useFetchMaterias(estudianteId);

  const handlePrevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const hours = [...Array(24)].map((_, i) => i);

  // Nueva función para obtener la materia que debe mostrarse por día y hora
  const getMateriaForDayAndHour = (day, hour) => {
    // Filtramos las materias que coinciden con el día y la hora
    const materiasEnHora = materias.filter((materia) =>
      materia.horarios.some(
        (horario) =>
          horario.dia.toLowerCase() === format(day, "EEEE", { locale: es }) &&
          parseInt(horario.horaInicio.split(":")[0], 10) === hour
      )
    );

    // Si hay varias materias, devolvemos solo una para la grilla (la primera)
    return materiasEnHora.length > 0 ? materiasEnHora[0] : null;
  };

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
                  const materia = getMateriaForDayAndHour(
                    addDays(currentWeek, index),
                    hour
                  );
                  return (
                    <Box key={hour} className="horario-hour-slot">
                      {materia && (
                        <Materia
                          key={materia.id}
                          id={materia.id}
                          nombre={materia.nombre}
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

export default HorarioMateria;
