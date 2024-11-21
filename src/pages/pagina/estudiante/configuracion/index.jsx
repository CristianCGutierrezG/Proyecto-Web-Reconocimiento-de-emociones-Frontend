import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Menu from '../../../../components/menu';
import Ajustes from '../../../../components/ajustes';

const styles = {
    appContainer: {
        display: 'flex',   
        height: '100vh',   
    },
    sidebar: {
        width: '20%',      
        backgroundColor: '#E8EAF6',
        minHeight: '100vh', 
        padding: '20px',
        boxSizing: 'border-box',
    },
    mainArea: {
        width: '80%',       
        padding: '5%',
        display: 'flex',    
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'relative',    
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

