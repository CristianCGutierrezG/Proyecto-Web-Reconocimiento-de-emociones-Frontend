// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <div style={styles.header}>
            <h1 style={styles.title}>Reconocimiento de emociones</h1>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#6C757D',  // Color oscuro del fondo
        width: '100%',  // Para que ocupe el 100% del espacio
        padding: '10px', // Espacio alrededor del título
    },
    title: {
        color: '#6D28D9',  // Color del texto
        textAlign: 'center',  // Centrar el texto
        margin: 0,  // Remover margen para ajustar el espacio
        fontSize: '2rem',  // Ajustar el tamaño del texto
    },
};

export default Header;