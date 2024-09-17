import React, { useContext, useEffect, useState, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from './loading';

const PrivateRoute = ({ children, roles, redirectTo = "/" }) => {
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const [isAllowed, setIsAllowed] = useState(null);
    const alertShown = useRef(false); 
    useEffect(() => {
        if (isTokenExpired()) {
            if (!alertShown.current) {
                alert('La sesion a espirado, por favor ingrese otra vez');
                alertShown.current = true;  
                logout();
                setIsAllowed(false);
            }
        } else if (roles && !roles.includes(authData.user.role)) {
            setIsAllowed(false);
        } else {
            setIsAllowed(true);
        }
    }, [authData, isTokenExpired, logout, roles]);

    if (isAllowed === null) {
        return <Loading />;
    }

    if (!isAllowed) {
        return <Navigate to={redirectTo} />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;