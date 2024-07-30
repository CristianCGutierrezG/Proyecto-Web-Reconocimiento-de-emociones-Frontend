import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import './styles.css';

const Emocion = ({ emocion }) => {
    return (
        <Tooltip title={emocion.emocion}>
            <Box className="emocion" style={{ backgroundColor: getEmotionColor(emocion.emocion) }}>
                <Typography variant="body2">{emocion.emocion}</Typography>
            </Box>
        </Tooltip>
    );
};

const getEmotionColor = (emocion) => {
    switch (emocion) {
        case 'Feliz':
            return '#FFF9C4';
        case 'Furioso':
            return '#FFCDD2';
        case 'Triste':
            return '#BBDEFB';
        case 'Aburrido':
            return '#E1BEE7';
        default:
            return '#FFFFFF';
    }
};

export default Emocion;