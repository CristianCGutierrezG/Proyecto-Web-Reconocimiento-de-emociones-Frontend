import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const savedAuthData = localStorage.getItem('authData');
        return savedAuthData ? JSON.parse(savedAuthData) : null; 
    });

    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (authData) { 
            localStorage.setItem('authData', JSON.stringify(authData));
        } else {
            localStorage.removeItem('authData');
        }
    }, [authData]);

    //Provisional si se agrega el recoverToken
    useEffect(() => {
        const checkExpiration = () => {
            if (authData && authData.expiration) {
                const expirationTime = new Date(authData.expiration).getTime();
                const currentTime = new Date().getTime();
                const timeRemaining = expirationTime - currentTime;

                if (timeRemaining <= 15 * 60 * 1000 && !alertShown) {
                    alert('Your session will expire in 15 minutes.');
                    setAlertShown(true);
                }

                if (timeRemaining <= 0) {
                    logout();
                }
            }
        };

        const interval = setInterval(checkExpiration, 1000);

        return () => clearInterval(interval);
    }, [authData, alertShown]);

    const logout = () => { 
        setAuthData(null);
        setAlertShown(false);
    };

    const isTokenExpired = () => {
        if (!authData || !authData.expiration) return true;
        return new Date().getTime() > new Date(authData.expiration).getTime();
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthData, logout, isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };