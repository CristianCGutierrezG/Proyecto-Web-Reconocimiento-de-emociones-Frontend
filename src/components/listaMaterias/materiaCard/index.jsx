import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const MateriaCard = ({ materia, allowColorCustomization, onColorChange }) => {
    const { nombre, grupo, horarios, profesor, color } = materia;
    const [selectedColor, setSelectedColor] = useState(color);

    useEffect(() => {
        setSelectedColor(color);
    }, [color]);

    const horarioTexto = horarios.map(horario => (
        `${horario.dia} ${horario.horaInicio} - ${horario.horaFin}`
    )).join('\n');

    const cardStyle = {
        border: `2px solid ${selectedColor}`,
        borderTop: `10px solid ${selectedColor}`,
        borderRadius: '8px',
        padding: '8px',
        backgroundColor: '#F5F5F5',
    };

    const handleColorChange = (event) => {
        const newColor = event.target.value;
        setSelectedColor(newColor);
        onColorChange(materia.id, newColor);

        // Actualiza el localStorage inmediatamente
        const savedColors = JSON.parse(localStorage.getItem('materiasColors')) || {};
        localStorage.setItem(
            'materiasColors',
            JSON.stringify({
                ...savedColors,
                [materia.id]: newColor,
            })
        );
    };

    return (
        <Box
            className="materia-card"
            style={cardStyle}
        >
            <Typography variant="h6">
                {nombre}
            </Typography>
            <Typography
                variant="body2"
                style={{ whiteSpace: 'pre-line' }}
            >
                {allowColorCustomization ? `Docente: ${profesor.nombres} ${profesor.apellidos}` : horarioTexto}
            </Typography>
            <Typography variant="body2">
                {allowColorCustomization ? `Grupo: ${grupo}` : ''}
            </Typography>
            {allowColorCustomization && (
                <Box
                    className="color-indicator"
                    style={{
                        position: 'relative',
                        float: 'right',
                        marginTop: '-24px'
                    }}
                >
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                        style={{
                            width: '24px',
                            height: '24px',
                            padding: '0',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            outline: 'none',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default MateriaCard;
