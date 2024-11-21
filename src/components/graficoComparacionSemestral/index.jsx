import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetchEmociones from '../../hooks/useFetchEmociones';
import { EmocionesContext } from '../../context/EmocionesContext';
import { format, formatISO, parseISO, eachMonthOfInterval, startOfMonth } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import './styles.css';

// Función para contar la frecuencia de cada emoción por día ajustada a la zona horaria local
const contarEmocionesPorDia = (emociones, timeZone) => {
  const conteoPorDia = {};

  emociones.forEach(({ createdAt, emocion }) => {
    const zonedDate = toZonedTime(parseISO(createdAt), timeZone);
    
    const fecha = formatISO(zonedDate, { representation: 'date' });
    
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

const formatoMes = (fecha) => {
  return format(parseISO(fecha), 'MMM', { locale: es });
};

const formatoDia = (fecha, timeZone) => {
  const zonedDate = toZonedTime(parseISO(fecha), timeZone);
  return format(zonedDate, 'EEEE dd/MM', { locale: es }); 
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
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

  const datosContados = contarEmocionesPorDia(emociones, timeZone); // Pasar la zona horaria
  const datosOrdenados = datosContados.sort((a, b) => new Date(a.dia) - new Date(b.dia));

  const mesesEnElSemestre = eachMonthOfInterval({
    start: parseISO(dateRange.startDate),
    end: parseISO(dateRange.endDate),
  }).map(date => format(startOfMonth(date), 'MMMM', { locale: es }));

  const mesInicial = mesesEnElSemestre[0];
  const mesFinal = mesesEnElSemestre[mesesEnElSemestre.length - 1];

  const handleLegendClick = (e) => {
    const { value } = e;
    setActiveLines(prevState => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  const hasEmotionData = datosOrdenados.length > 0;

  return (
    <Box className="grafico-container">
      <Typography variant="h6" gutterBottom className="grafico-titulo">
        Comparación Semestral de Emociones ({mesInicial} - {mesFinal} {currentYear})
      </Typography>
      {hasEmotionData ? (
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
            <Tooltip labelFormatter={(label) => formatoDia(label, timeZone)} /> {/* Ajustar el tooltip */}
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
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          No se encontraron emociones registradas en este periodo de tiempo.
        </Typography>
      )}
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
