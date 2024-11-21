import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import './styles.css';

const EmotionRecorder = () => {
    const [isActive, setIsActive] = useState(false);

    // Cambiar estado entre Activo e Inactivo
    const toggleActiveState = () => {    
        setIsActive(!isActive);
        if (!isActive) {
            alert("¡El detector de emociones se ha activado!");
        }
    };

    return (
        <Box className={`emotion-recorder-container ${isActive ? 'active' : 'inactive'}`}>
            <Box className="emotion-recorder-box">
                <Typography variant="h3" className="emotion-recorder-text">IA</Typography>
                <div className={`circle ${isActive ? 'active-circle' : 'inactive-circle'}`} />
            </Box>

            <Box className="emotion-recorder-content">
                <Button 
                    variant="contained" 
                    color={isActive ? "error" : "primary"} 
                    onClick={toggleActiveState}
                    className="emotion-recorder-button"
                >
                    {isActive ? "Detener emociones" : "Empieza a guardar tus emociones"}
                </Button>
                <Typography 
                    variant="body1" 
                    className={`status-text ${isActive ? 'status-activo' : 'status-inactivo'}`}
                >
                    {isActive ? "ACTIVO" : "INACTIVO"}
                </Typography>
            </Box>
        </Box>
    );
};

export default EmotionRecorder;
