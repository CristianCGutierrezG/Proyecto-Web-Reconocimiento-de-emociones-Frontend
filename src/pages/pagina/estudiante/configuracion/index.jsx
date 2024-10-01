import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Menu from '../../../../components/menu';
import Ajustes from '../../../../components/ajustes';

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

export default function Configuracion() {
    const { authData, recoverToken } = useContext(AuthContext);
    const [expirationTime, setExpirationTime] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleButtonClick = async () => {
        if (!authData || !authData.token) {
            setErrorMessage('No hay token disponible');
            return;
        }

        try {
            await recoverToken(); // Recuperar el token
            console.log(authData.token);
            const decodedToken = jwtDecode(authData.token);
            const expirationTimeInMillis = decodedToken.exp * 1000;
            const expirationDate = new Date(expirationTimeInMillis);
            setExpirationTime(expirationDate.toLocaleString());
        } catch (error) {
            setErrorMessage('Error al recuperar el token');
        }
    };

    return (
        <div  style={styles.appContainer}>
            <Menu style={styles.sidebar} />
            <div style={styles.mainArea}>
                <Ajustes></Ajustes>
            </div>
        </div>
    );
}

