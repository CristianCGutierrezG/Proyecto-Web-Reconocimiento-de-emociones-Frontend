import React, { useContext, useEffect, useState } from 'react';
import useFormPost from '../../../hooks/useFormPost';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Loading from '../../../components/loading';
import '../auth.styles.css';

const TOKEN_DURATION = 3600;

export default function LogIn() {
    const { setAuthData } = useContext(AuthContext);
    const [customError, setCustomError] = useState('');
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const requiredFields = {
        email: true,
        password: true
    };
    

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        data,
        loading,
        error
    } = useFormPost(initialValues, requiredFields, 'http://localhost:3001/api/v1/auth/login');

    useEffect(() => {
        if (data) {
            const decodedToken = jwtDecode(data.token);
            setAuthData({
                token: data.token,
                user: data.user,
                expiration: decodedToken.exp * 1000, 
            });
            navigate('/home');
        }
    }, [data, setAuthData, navigate]);

    useEffect(() => {
        if (error && error.message === 'Unauthorized') {
            setCustomError('Usuario o contraseña incorrecto');
        } else if (error) {
            setCustomError(error.message);
        }
    }, [error]);

    return (
        <Container component="main" maxWidth="sm" className='container'>
            <Box className="root">
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <NavLink to="/registrar" className="link" >
                    Crea una cuenta
                </NavLink>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        className="textfield"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        className="textfield"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <NavLink to="/recuperacion" className="link" >
                        ¿Olvidaste la contraseña?
                    </NavLink>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        Iniciar sesión
                    </Button>
                </form>
                {loading && <Loading />}
                {error && <Typography color="error">Error: {customError}</Typography>}
            </Box>
        </Container>
    );
}