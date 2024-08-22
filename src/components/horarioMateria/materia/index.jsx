import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import './styles.css';

const Materia = ({ id, nombre }) => {
    const [color, setColor] = useState('#f9f9f9'); // Color por defecto

    useEffect(() => {
        // Función para obtener el color del localStorage
        const getColorFromLocalStorage = () => {
            const materiasColors = JSON.parse(localStorage.getItem('materiasColors')) || {};
            setColor(materiasColors[id] || '#f9f9f9'); // Color por defecto si no se encuentra el ID
        };

        getColorFromLocalStorage();

        // Listener para cambios en localStorage
        const handleStorageChange = () => {
            getColorFromLocalStorage();
        };

        window.addEventListener('storage', handleStorageChange);


        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [id]);

    return (
        <Box className="materia-root" style={{ borderColor: color, borderWidth: '2px', borderLeft: '6px', borderStyle: 'solid' }}>
            <Typography variant="body4" className="materia-nombre">{nombre}</Typography>
        </Box>
    );
};

export default Materia;
