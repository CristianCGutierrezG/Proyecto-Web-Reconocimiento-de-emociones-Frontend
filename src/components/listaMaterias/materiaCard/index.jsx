import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import useHttp from '../../../hooks/useHttp';

const MateriaCard = ({ materia, allowColorCustomization, onColorChange, onSuccessUnenroll }) => {
    const { nombre, grupo, horarios, profesor, color } = materia;
    const [selectedColor, setSelectedColor] = useState(color);

    // Hook para enviar la petición PATCH
    const { sendRequest: patchRequest } = useHttp();

    // Actualiza el color en el local storage
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

        const savedColors = JSON.parse(localStorage.getItem('materiasColors')) || {};
        localStorage.setItem(
            'materiasColors',
            JSON.stringify({
                ...savedColors,
                [materia.id]: newColor,
            })
        );
    };

    // Manejo de la desinscripción
    const handleUnenrollClick = async () => {
        const confirmation = await Swal.fire({
            title: '¿Desea desinscribirse de esta materia?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, desinscribirse',
            cancelButtonText: 'Cancelar'
        });

        if (confirmation.isConfirmed) {
            const url = 'http://localhost:3001/api/v1/materias/remove-inscripcionToken';
            const body = { materiaId: materia.id };

            try {
                await patchRequest(url, 'PATCH', body);
                await Swal.fire({
                    title: 'Desinscripción exitosa',
                    text: 'Te has desinscrito de la materia.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                window.location.reload(); // Recargar después de que el usuario acepte el modal de éxito
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo desinscribir de la materia.', 'error');
            }
        }
    };

    return (
        <Box className="materia-card" style={cardStyle}>
            <Typography variant="h6">{nombre}</Typography>
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                {allowColorCustomization ? `Docente: ${profesor.nombres} ${profesor.apellidos}` : horarioTexto}
            </Typography>
            <Typography variant="body2">
                {allowColorCustomization ? `Grupo: ${grupo}` : ''}
            </Typography>

            {allowColorCustomization && (
                <Box
                    className="color-indicator"
                    style={{ position: 'relative', float: 'right', marginTop: '-60px' }}
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
                            outline: 'none'
                        }}
                    />

                    <IconButton
                        onClick={handleUnenrollClick}
                        className='deleteButton'
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )}


        </Box>
    );
};

export default MateriaCard;
