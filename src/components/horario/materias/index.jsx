import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import './styles.css';

const Materia = ({ materia }) => {
    const inscrito = materia.inscritos[0]; // Assuming single user for simplicity

    return (
        <Tooltip title={materia.nombre}>
            <Box className="materia" style={{ backgroundColor: inscrito.EstudiantesMaterias.activo ? '#D4EDDA' : '#F8D7DA' }}>
                <Typography variant="body2">{materia.nombre}</Typography>
            </Box>
        </Tooltip>
    );
};

export default Materia;