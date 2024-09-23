import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useFetchEmocionesMaterias from '../../hooks/useFetchEmocionesMaterias';
import { EmocionesPorMateriaContext } from '../../context/EmocionesPorMateriaContext';
import { startOfMonth, endOfMonth, parseISO, format, startOfWeek, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import './styles.css';

const EMOTION_COLORS = {
  Feliz: 'var(--Feliz-borderColor)',
  Enojado: 'var(--Enojado-borderColor)',
  Disgustado: 'var(--Disgustado-borderColor)',
  Triste: 'var(--Triste-borderColor)',
  Miedoso: 'var(--Miedoso-borderColor)',
  Sorprendido: 'var(--Sorprendido-borderColor)',
  Neutral: 'var(--Neutral-borderColor)',
};

const GraficoEmocionesMensualMateria = ({ materiaId, horarios }) => {
  const { dateRange: dateRangeContext, setMateriaId } = useContext(EmocionesPorMateriaContext);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const emociones = useFetchEmocionesMaterias(materiaId, dateRange);

  useEffect(() => {
    if (dateRangeContext.startDate && dateRangeContext.endDate) {
      const startDate = startOfMonth(parseISO(dateRangeContext.startDate)).toISOString().split('T')[0];
      const endDate = endOfMonth(parseISO(dateRangeContext.startDate)).toISOString().split('T')[0];
      setDateRange({ startDate, endDate });
    }
    setMateriaId(materiaId);
  }, [dateRangeContext, materiaId, setMateriaId]);

  const isWithinAnySchedule = (date, horarios) => {
    return horarios.some(horario => {
      const [horaInicioHours, horaInicioMinutes] = horario.horaInicio.split(':').map(Number);
      const [horaFinHours, horaFinMinutes] = horario.horaFin.split(':').map(Number);

      const startCheck = new Date(date);
      startCheck.setHours(horaInicioHours, horaInicioMinutes, 0);

      const endCheck = new Date(date);
      endCheck.setHours(horaFinHours, horaFinMinutes, 0);

      return date >= startCheck && date <= endCheck;
    });
  };

  const getFormattedDateLabel = (dayOfWeek, date) => {
    return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${format(date, 'dd/MM')}`;
  };

  const getCSSVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  };

  const processData = () => {
    const currentDate = new Date(); // Fecha actual para cálculo de semana
    const daysOfWeek = horarios.map(h => h.dia.toLowerCase());
    const uniqueDaysOfWeek = [...new Set(daysOfWeek)];

    const emotionsCount = {};
    const labelsWithTime = [];

    uniqueDaysOfWeek.forEach(day => {
      emotionsCount[day] = {
        Triste: 0,
        Enojado: 0,
        Feliz: 0,
        Neutral: 0,
        Miedoso: 0,
        Disgustado: 0,
        Sorprendido: 0,
      };

      const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 });
      const dayIndex = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'].indexOf(day);
      const dateForDay = addDays(startOfWeekDate, dayIndex);

      labelsWithTime.push(getFormattedDateLabel(day, dateForDay));
    });

    emociones.forEach(estudiante => {
      estudiante.emociones.forEach(emocion => {
        const zonedDate = new Date(emocion.createdAt);
        const dayOfEmotion = format(zonedDate, 'EEEE', { locale: es }).toLowerCase();

        const horariosDelDia = horarios.filter(h => h.dia.toLowerCase() === dayOfEmotion);

        if (horariosDelDia.length > 0 && isWithinAnySchedule(zonedDate, horariosDelDia)) {
          if (emotionsCount[dayOfEmotion]) {
            emotionsCount[dayOfEmotion][emocion.emocion]++;
          }
        }
      });
    });

    return {
      emotionsCount,
      labelsWithTime,
    };
  };

  const { emotionsCount, labelsWithTime } = processData();

  const hasEmotionData = Object.values(emotionsCount).some(dayEmotions =>
    Object.values(dayEmotions).some(count => count > 0)
  );

  const data = Object.keys(EMOTION_COLORS).map(emotion => ({
    name: emotion,
    value: Object.values(emotionsCount).reduce((acc, dayEmotions) => acc + dayEmotions[emotion], 0),
  }));

  const formattedMonth = dateRange.startDate
    ? format(parseISO(dateRange.startDate), 'MMMM yyyy', { locale: es })
    : '';

  return (
    <Box className="graficoMaterias-container">
      <Typography variant="h6" gutterBottom className="grafico-titulo">
        Porcentaje de aparición mensual ({formattedMonth})
      </Typography>
      {hasEmotionData ? (
        <PieChart width={300} height={300} className="grafico-pie">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCSSVariable(`--${entry.name}-borderColor`)} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => (
              <span
                className="legend-item"
                style={{ color: getCSSVariable(`--${value}-borderColor`) }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No se encontraron emociones registradas en este periodo de tiempo
        </Typography>
      )}
    </Box>
  );
};

export default GraficoEmocionesMensualMateria;
