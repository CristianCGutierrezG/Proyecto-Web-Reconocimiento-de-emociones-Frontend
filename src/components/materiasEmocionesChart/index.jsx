import React, { useState, useEffect, useContext } from 'react';
import { EmocionesPorMateriaContext } from '../../context/EmocionesPorMateriaContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { addDays, subDays, startOfWeek, endOfWeek, format } from 'date-fns';
import es from 'date-fns/locale/es';
import './styles.css';
import { color } from 'chart.js/helpers';

const MateriaEmocionesChart = ({ materiaId, horarios }) => {
    const { emociones, setDateRange, setMateriaId } = useContext(EmocionesPorMateriaContext);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setMateriaId(materiaId);
        const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 });
        const endOfWeekDate = addDays(endOfWeek(currentDate, { weekStartsOn: 0 }), 1);

        const startDate = format(startOfWeekDate, 'yyyy-MM-dd', { locale: es });
        const endDate = format(endOfWeekDate, 'yyyy-MM-dd', { locale: es });

        setDateRange({ startDate, endDate });
    }, [currentDate, setDateRange, materiaId, setMateriaId]);

    const handlePrevWeek = () => {
        setCurrentDate(subDays(currentDate, 7));
    };

    const handleNextWeek = () => {
        setCurrentDate(addDays(currentDate, 7));
    };

    const isWithinAnySchedule = (date, horarios) => {
        return horarios.some(horario => {
            const [horaInicioHours, horaInicioMinutes] = horario.horaInicio.split(':').map(Number);
            const [horaFinHours, horaFinMinutes] = horario.horaFin.split(':').map(Number);

            const startCheck = new Date(date);
            startCheck.setHours(horaInicioHours, horaInicioMinutes, 0);

            const endCheck = new Date(date);
            endCheck.setHours(horaFinHours, horaFinMinutes, 0);

            return (date >= startCheck && date <= endCheck);
        });
    };

    const getFormattedDateLabel = (dayOfWeek, date) => {
        return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${format(date, 'dd/MM')}`;
    };

    const getCSSVariable = (variableName) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };

    const processData = () => {
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
            labels: labelsWithTime,
            datasets: [
                {
                    label: 'Triste',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Triste),
                    backgroundColor:  getCSSVariable('--Triste-borderColor'),  
                },
                {
                    label: 'Enojado',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Enojado),
                    backgroundColor: getCSSVariable('--Enojado-borderColor'),  // Amarillo
                },
                {
                    label: 'Feliz',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Feliz),
                    backgroundColor: getCSSVariable('--Feliz-borderColor'),  // Azul
                },
                {
                    label: 'Neutral',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Neutral),
                    backgroundColor: getCSSVariable('--Neutral-borderColor'),  // Amarillo
                },
                {
                    label: 'Miedoso',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Miedoso),
                    backgroundColor: getCSSVariable('--Miedoso-borderColor'),  // Azul
                },
                {
                    label: 'Disgustado',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Disgustado),
                    backgroundColor: getCSSVariable('--Disgustado-borderColor'),  // Azul
                },
                {
                    label: 'Sorprendido',
                    data: uniqueDaysOfWeek.map(day => emotionsCount[day].Sorprendido),
                    backgroundColor: getCSSVariable('--Sorprendido-borderColor'),  // Azul
                },
            ],
        };
    };

    return (
        <div className="chart-container">
            <div className="date-navigation">
                <IconButton onClick={handlePrevWeek}>
                    <ArrowBackIosIcon />
                </IconButton>
                <h2>{format(currentDate, 'MMMM yyyy', { locale: es })}</h2>
                <IconButton onClick={handleNextWeek}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
            <Bar data={processData()} />
        </div>
    );
};

export default MateriaEmocionesChart;
