import React, { useEffect, useState } from 'react';
import { useFetchMateriasProfesor } from '../../../hooks/useFetchMateriasProfesor';
import useFetchEmocionesMaterias from '../../../hooks/useFetchEmocionesMaterias';
import { CircularProgress, Alert } from '@mui/material';
import { startOfYear, endOfYear } from 'date-fns';
import './styles.css'; 

const TopEmocionesNegativas = ({ materiaId }) => {
    const { materiaInfo, loading: loadingMateria } = useFetchMateriasProfesor(materiaId);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const emociones = useFetchEmocionesMaterias(materiaId, dateRange);

    const emocionesNegativas = ['Triste', 'Enojado', 'Disgustado', 'Miedoso']; // Emociones negativas
    const todasEmociones = ['Triste', 'Enojado', 'Disgustado', 'Miedoso', 'Feliz', 'Neutral', 'Sorprendido']; // Todas las emociones

    // Lógica para verificar si una emoción ocurre dentro del horario de clase
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

    useEffect(() => {
        const today = new Date();
        const startOfYearDate = startOfYear(today);
        const endOfYearDate = endOfYear(today);
        const formattedStartDate = startOfYearDate.toISOString().split('T')[0];
        const formattedEndDate = endOfYearDate.toISOString().split('T')[0];

        setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate });
    }, []);

    if (loadingMateria) return <CircularProgress />;
    if (!materiaInfo || !emociones) return <Alert severity="warning">No hay datos disponibles</Alert>;

    // Filtrar emociones que estén dentro del horario de clase
    const filteredEmociones = emociones.filter(estudiante =>
        estudiante.emociones.some(emocion =>
            todasEmociones.includes(emocion.emocion) &&
            isWithinAnySchedule(new Date(emocion.createdAt), materiaInfo.horarios)
        )
    );

    if (filteredEmociones.length === 0) {
        return <Alert severity="info">No se registraron emociones durante los horarios de clase</Alert>;
    }

    // Contar todas las emociones y las negativas por estudiante
    const emotionCountByStudent = filteredEmociones.reduce((acc, estudiante) => {
        const allEmotions = estudiante.emociones.filter(emocion =>
            todasEmociones.includes(emocion.emocion) &&
            isWithinAnySchedule(new Date(emocion.createdAt), materiaInfo.horarios)
        );

        const negativeEmotions = allEmotions.filter(emocion => emocionesNegativas.includes(emocion.emocion));

        if (allEmotions.length > 0) {
            acc[estudiante.id] = {
                estudiante,
                totalEmotions: allEmotions.length,
                negativeEmotionCount: negativeEmotions.length,
                emotionCounts: allEmotions.reduce((emotionAcc, emocion) => {
                    if (!emotionAcc[emocion.emocion]) {
                        emotionAcc[emocion.emocion] = 0;
                    }
                    emotionAcc[emocion.emocion]++;
                    return emotionAcc;
                }, {})
            };
        }
        return acc;
    }, {});

    // Calcular el total de emociones y emociones negativas de todos los estudiantes
    let totalEmotionsCount = 0;
    let totalNegativeEmotionsCount = 0;

    const globalEmotionCounts = todasEmociones.reduce((acc, emotion) => {
        acc[emotion] = 0;
        return acc;
    }, {});

    Object.values(emotionCountByStudent).forEach(({ totalEmotions, negativeEmotionCount, emotionCounts }) => {
        totalEmotionsCount += totalEmotions;
        totalNegativeEmotionsCount += negativeEmotionCount;

        // Sumar las emociones de todos los estudiantes a los contadores globales
        Object.keys(emotionCounts).forEach(emotion => {
            globalEmotionCounts[emotion] += emotionCounts[emotion];
        });
    });

    // Calcular el porcentaje de emociones negativas
    const negativeEmotionsPercentage = totalEmotionsCount
        ? ((totalNegativeEmotionsCount / totalEmotionsCount) * 100).toFixed(2)
        : 0;

    // Calcular la emoción predominante en todos los estudiantes
    const predominantEmotion = Object.keys(globalEmotionCounts).reduce((a, b) =>
        globalEmotionCounts[a] > globalEmotionCounts[b] ? a : b
    );

    const percentagePredominantEmotion = totalEmotionsCount
        ? ((globalEmotionCounts[predominantEmotion] / totalEmotionsCount) * 100).toFixed(2)
        : 0;

    // Ordenar los estudiantes por el número total de emociones negativas
    const topStudents = Object.values(emotionCountByStudent).sort((a, b) => b.negativeEmotionCount - a.negativeEmotionCount);

    if (topStudents.length === 0) {
        return <Alert severity="info">No hay estudiantes con emociones negativas durante la clase</Alert>;
    }

    console.log(topStudents);

    return (
        <div className="homeTable-container">
            <div className="materia-title">
                {materiaInfo.nombre} 
            </div>
            <div className="materia-percentage">
                Emoción predominante entre todos los estudiantes: {predominantEmotion} ({percentagePredominantEmotion}%)
            </div>
            <div className="materia-percentage">
                <strong>Porcentaje de emociones negativas:</strong> {negativeEmotionsPercentage}%
            </div>
            <div className="homeTable-header">
                <div className="homeTable-cell">Estudiante</div>
                <div className="homeTable-cell">Código</div>
                <div className="homeTable-cell">Emoción Predominante</div>
            </div>
            {topStudents.slice(0, 3).map(({ estudiante, emotionCounts }) => {
                // Obtener la emoción predominante para este estudiante
                const predominantEmotionStudent = Object.keys(emotionCounts).reduce((a, b) =>
                    emotionCounts[a] > emotionCounts[b] ? a : b
                );

                return (
                    <div key={estudiante.id} className="homeTable-row">
                        <div className="homeTable-cell student-info">
                            <div>
                                {estudiante.nombres} {estudiante.apellidos}
                            </div>
                        </div>
                        <div className="homeTable-cell">{estudiante.codigoInstitucional}</div>
                        <div className="homeTable-cell">{predominantEmotionStudent}</div> {/* Mostrar emoción predominante del estudiante */}
                    </div>
                );
            })}
        </div>
    );
};

export default TopEmocionesNegativas;
