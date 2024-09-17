import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const savedAuthData = localStorage.getItem('authData');
        return savedAuthData ? JSON.parse(savedAuthData) : null;
    });

    useEffect(() => {
        if (authData) {
            localStorage.setItem('authData', JSON.stringify(authData));
        } else {
            localStorage.removeItem('authData');
        }
    }, [authData]);

    const recoverToken = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/auth/recover-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`,
                },
                body: JSON.stringify({ id: authData.user.id }),
            });
            const data = await response.json();
            if (response.ok) {
                const decodedToken = jwtDecode(data.token);
                setAuthData({
                    ...authData,
                    token: data.token,
                    expiration: decodedToken.exp * 1000,
                });
            } else {
                console.error('Error al recuperar el token');
            }
        } catch (error) {
            console.error('Error en la solicitud de recuperación de token', error);
        }
    };

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (authData && authData.token) {
                const decodedToken = jwtDecode(authData.token);
                const currentTime = Date.now();
                const tokenExpirationTime = decodedToken.exp * 1000;
                const timeRemaining = tokenExpirationTime - currentTime;

                if (timeRemaining <= 5 * 60 * 1000) { // Si faltan menos de 5 minutos
                    recoverToken();
                }

                if (timeRemaining <= 0) {
                    logout();
                }
            }
        };

        const interval = setInterval(checkTokenExpiration, 60 * 1000); // Comprobar cada minuto

        return () => clearInterval(interval);
    }, [authData]);

    const logout = () => {
        setAuthData(null);
    };

    const isTokenExpired = () => {
        if (!authData || !authData.expiration) return true;
        return Date.now() > authData.expiration;
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthData, logout, isTokenExpired, recoverToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
