// src/components/RecognitionArea.js
import React, { useState } from 'react';
import CameraCapture from '../imagenes';

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
        <div style={styles.container}>
            <div style={styles.imagePlaceholder}>
                <CameraCapture></CameraCapture>
            </div>
        </div>
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
