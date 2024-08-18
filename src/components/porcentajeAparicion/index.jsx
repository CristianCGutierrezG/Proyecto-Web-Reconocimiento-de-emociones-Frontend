import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import useFetchEmociones from '../../hooks/useFetchEmociones';
import { EmocionesContext } from '../../context/EmocionesContext';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
import './styles.css';

// Mapa de colores según la emoción
const EMOTION_COLORS = {
  Feliz: 'var(--Feliz-borderColor)',
  Enojado: 'var(--Enojado-borderColor)',
  Disgustado: 'var(--Disgustado-borderColor)',
  Triste: 'var(--Triste-borderColor)',
  Miedoso: 'var(--Miedoso-borderColor)',
  Sorprendido: 'var(--Sorprendido-borderColor)',
  Neutral: 'var(--Neutral-borderColor)',
};

const EMOTIONS_MAP = {
  Feliz: 'Feliz',
  Enojado: 'Enojado',
  Disgustado: 'Disgustado',
  Triste: 'Triste',
  Miedoso: 'Miedoso',
  Sorprendido: 'Sorprendido',
  Neutral: 'Neutral',
};

const GraficoEmocionesMensual = ({ estudianteId }) => {
  const { dateRange: dateRangeContext } = useContext(EmocionesContext);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const emociones = useFetchEmociones(estudianteId, dateRange);

  useEffect(() => {
    if (dateRangeContext.startDate && dateRangeContext.endDate) {
      // Obtener el primer y último día del mes basado en la fecha de inicio del contexto
      const startDate = startOfMonth(parseISO(dateRangeContext.startDate)).toISOString().split('T')[0];
      const endDate = endOfMonth(parseISO(dateRangeContext.startDate)).toISOString().split('T')[0];
      setDateRange({ startDate, endDate });
    }
  }, [dateRangeContext]);

  // Prepara los datos para el gráfico
  const data = Object.keys(EMOTIONS_MAP).map(emotion => ({
    name: EMOTIONS_MAP[emotion],
    value: emociones.filter(e => e.emocion === emotion).length,
  }));



  return (
    <Box className="grafico-container">
      <Typography variant="h6" gutterBottom className="grafico-titulo">
        Porcentaje de aparición mensual
      </Typography>
      <PieChart width={300} height={300} className='grafico-pie'>
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
            <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          formatter={(value, entry, index) => (
            <span
              className="legend-item"
              style={{ color: EMOTION_COLORS[value] }}
            >
              {value}
            </span>
          )}
        />
      </PieChart>
    </Box>
  );
};

export default GraficoEmocionesMensual;
