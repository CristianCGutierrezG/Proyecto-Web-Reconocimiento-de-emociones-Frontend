import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const MateriaCard = ({ materia, allowColorCustomization }) => {
    const { nombre, grupo, horarios, profesor, color } = materia;
    const [selectedColor, setSelectedColor] = useState(color);  // Estado para manejar el color

    // Procesa los horarios y únelos con saltos de línea.
    const horarioTexto = horarios.map(horario => (
        `${horario.dia} ${horario.horaInicio} - ${horario.horaFin}`
    )).join('\n');  // Usamos \n para hacer el salto de línea

    // Estilo del borde basado en el color seleccionado
    const cardStyle = {
        border: `2px solid ${selectedColor}`,
        borderTop: `10px solid ${selectedColor}`,
        borderRadius: '8px',
        padding: '8px',
        backgroundColor: '#F5F5F5',  // Fondo neutro
    };

    // Manejador del cambio de color
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
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
