// src/components/RecognitionArea.js
import React, { useState } from 'react';
import CameraCapture from '../imagenes';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ComputerIcon from '@mui/icons-material/Computer';
import Header from '../header/header';

const RecognitionArea = () => {
    const [emotion, setEmotion] = useState('FELIZ');
    const [percentage, setPercentage] = useState(20);

    const handleTestClick = () => {
        // Aquí iría la lógica de IA para reconocer emociones
        console.log("Probando la IA...");
        // Cambiar los valores simulados de la emoción y porcentaje
        setEmotion('FELIZ');
        setPercentage(20);
    };

    return (
        <Box display="flex" height="100vh" bgcolor="#F5F5F5">
            {/* Sidebar */}
            <Box width="25%" bgcolor="#B0BEC5" p={3} display="flex" flexDirection="column" alignItems="center">
                {/* Avatar and Info */}
               <Header></Header> 
            </Box>
            <CameraCapture></CameraCapture>
        </Box>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#F4F4F9',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    imagePlaceholder: {
        width: '300px',
        height: '300px',
        backgroundColor: '#E0E0E0',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    emotionInfo: {
        textAlign: 'center',
        color: '#8a2be2',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#8a2be2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default RecognitionArea;
