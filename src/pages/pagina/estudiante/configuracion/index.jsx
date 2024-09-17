import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

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
        <div>
            <button onClick={handleButtonClick}>Mostrar Tiempo del Token</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {expirationTime && <p>El token expira el: {expirationTime}</p>}
        </div>
    );
}