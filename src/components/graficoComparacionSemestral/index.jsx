import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetchEmociones from '../../hooks/useFetchEmociones';
import { EmocionesContext } from '../../context/EmocionesContext';
import { format, parseISO, eachMonthOfInterval, startOfMonth } from 'date-fns';
import './styles.css';

// Función para contar la frecuencia de cada emoción por día
const contarEmocionesPorDia = (emociones) => {
  const conteoPorDia = {};

  emociones.forEach(({ createdAt, emocion }) => {
    const fecha = createdAt.split('T')[0];
    if (!conteoPorDia[fecha]) {
      conteoPorDia[fecha] = {
        Feliz: 0,
        Enojado: 0,
        Disgustado: 0,
        Triste: 0,
        Miedoso: 0,
        Sorprendido: 0,
        Neutral: 0,
      };
    }
    if (conteoPorDia[fecha][emocion] !== undefined) {
      conteoPorDia[fecha][emocion] += 1;
    }
  });

  return Object.keys(conteoPorDia).map(fecha => ({
    dia: fecha,
    ...conteoPorDia[fecha],
  }));
};

// Función para formatear la fecha al mes
const formatoMes = (fecha) => {
  return format(parseISO(fecha), 'MMM'); // Formato: "Jul"
};

const GraficoComparacionSemestral = ({ estudianteId }) => {
  const { dateRange: dateRangeContext } = useContext(EmocionesContext);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [activeLines, setActiveLines] = useState({
    Feliz: true,
    Enojado: true,
    Disgustado: true,
    Triste: true,
    Miedoso: true,
    Sorprendido: true,
    Neutral: true,
  });

  const currentYear = new Date(dateRangeContext.startDate).getFullYear();

  const emociones = useFetchEmociones(estudianteId, dateRange);

  useEffect(() => {
    if (dateRangeContext.startDate && dateRangeContext.endDate) {
      const startMonth = new Date(dateRangeContext.startDate).getMonth() + 1;
      const isFirstSemester = startMonth <= 6;
      const startDate = isFirstSemester ? `${currentYear}-01-01` : `${currentYear}-07-01`;
      const endDate = isFirstSemester ? `${currentYear}-06-30` : `${currentYear}-12-31`;
      setDateRange({ startDate, endDate });
    }
  }, [dateRangeContext, currentYear]);

  const datosContados = contarEmocionesPorDia(emociones);
  const datosOrdenados = datosContados.sort((a, b) => new Date(a.dia) - new Date(b.dia));

  const mesesEnElSemestre = eachMonthOfInterval({
    start: parseISO(dateRange.startDate),
    end: parseISO(dateRange.endDate),
  }).map(date => format(startOfMonth(date), 'yyyy-MM-dd'));

  const handleLegendClick = (e) => {
    const { value } = e;
    setActiveLines(prevState => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  return (
    <Box className="grafico-container">
      <Typography variant="h6" gutterBottom className="grafico-titulo">
        Comparación Semestral de Emociones
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosOrdenados} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dia"
            tickFormatter={formatoMes}
            ticks={mesesEnElSemestre}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 'auto']} />
          <Tooltip />
          <Legend
            verticalAlign="top"
            height={36}
            onClick={handleLegendClick}
            formatter={(value) => (
              <span className={`legend-item ${activeLines[value] ? '' : 'inactive'}`}>
                {value}
              </span>
            )}
          />
          {Object.keys(activeLines).map((key) => (
            <Line
              key={key}
              type="linear"
              dataKey={key}
              stroke={getColorForEmotion(key)}
              className={`linea ${!activeLines[key] ? 'hidden' : ''}`}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

const getColorForEmotion = (emotion) => {
  switch (emotion) {
    case 'Feliz': return 'var(--Feliz-borderColor)';
    case 'Enojado': return 'var(--Enojado-borderColor)';
    case 'Disgustado': return 'var(--Disgustado-borderColor)';
    case 'Triste': return 'var(--Triste-borderColor)';
    case 'Miedoso': return 'var(--Miedoso-borderColor)';
    case 'Sorprendido': return 'var(--Sorprendido-borderColor)';
    case 'Neutral': return 'var(--Neutral-borderColor)';
    default: return '#000000';
  }
};

export default GraficoComparacionSemestral;
