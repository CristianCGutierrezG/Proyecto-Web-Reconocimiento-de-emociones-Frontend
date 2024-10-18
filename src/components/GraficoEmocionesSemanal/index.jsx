import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useFetchEmocionesFecha from '../../hooks/useFetchEmocionesFecha';
import { addDays, startOfWeek } from 'date-fns';
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

const GraficoEmocionesSemanal = () => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const emociones = useFetchEmocionesFecha(dateRange);

  useEffect(() => {
    const currentDate = new Date();
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 }).toISOString().split('T')[0];
    const endDate = addDays(new Date(startDate), 6).toISOString().split('T')[0];
    setDateRange({ startDate, endDate });
  }, []);

  console.log(emociones)
  const processData = () => {
    const emotionsCount = {
      Triste: 0,
      Enojado: 0,
      Feliz: 0,
      Neutral: 0,
      Miedoso: 0,
      Disgustado: 0,
      Sorprendido: 0,
    };

    emociones.forEach(estudiante => {
      estudiante.emociones.forEach(emocion => {
        if (emotionsCount[emocion.emocion] !== undefined) {
          emotionsCount[emocion.emocion]++;
        }
      });
    });

    return emotionsCount;
  };

  const emotionsCount = processData();
  const data = Object.keys(EMOTION_COLORS).map(emotion => ({
    name: emotion,
    value: emotionsCount[emotion],
  }));

  const hasEmotionData = Object.values(emotionsCount).some(count => count > 0);

  return (
    <Box className="grafico-container">
      <Typography variant="h6" gutterBottom className="grafico-titulo">
        Porcentaje de emociones en la última semana
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
              <Cell key={`cell-${index}`} fill={getComputedStyle(document.documentElement).getPropertyValue(`--${entry.name}-borderColor`).trim()} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => (
              <span
                className="legend-item"
                style={{ color: getComputedStyle(document.documentElement).getPropertyValue(`--${value}-borderColor`).trim() }}
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

export default GraficoEmocionesSemanal;
