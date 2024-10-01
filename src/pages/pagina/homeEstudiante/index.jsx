import React, { useState, useEffect } from 'react';
import Menu from '../../../components/menu';
import Header from '../../../components/header/header';
import RecognitionArea from '../../../components/areaReconocimiento/areaReconocimiento';

const styles = {
    appContainer: {
        display: 'flex',   // Alinea los componentes horizontalmente
        height: '100vh',   // Hace que el contenedor ocupe toda la altura de la pantalla
    },
    sidebar: {
        width: '20%',      // El menú izquierdo ocupa el 20% del ancho
        backgroundColor: '#E8EAF6',
        minHeight: '100vh', // Asegura que el menú ocupe toda la altura de la pantalla
        padding: '20px',
        boxSizing: 'border-box', // Para incluir el padding en el ancho
    },
    mainArea: {
        width: '80%',       // El área principal ocupa el 80% del ancho
        padding: '5%',
        display: 'flex',    // Hace que el contenido dentro de mainArea sea flexible
        flexDirection: 'column', // Alinea los elementos internos verticalmente
        alignItems: 'center',
        position: 'relative',    // Para colocar el botón de información en la esquina
        backgroundColor: '#677C99',
    }
};

export default function HomeEstudiante() {
    const [triggerCapture, setTriggerCapture] = useState(false);

    // Función para disparar la captura cada 15 segundos
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTriggerCapture(prevState => !prevState);  // Alterna el estado para disparar el evento en el componente Imagen
        }, 15000);  // Intervalo de 15 segundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles.appContainer}>
            <Menu style={styles.sidebar} />
            <div style={styles.mainArea}>
                <Header />
                <RecognitionArea triggerCapture={triggerCapture} />
            </div>
        </div>
    );
}
