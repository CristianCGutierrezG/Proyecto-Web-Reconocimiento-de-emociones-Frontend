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
    header: {
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#F4F4F9',
        borderBottom: '1px solid #ddd',
    },
    title: {
        color: '#8a2be2',
    },
};

export default Header;