import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useFormPost from '../../../hooks/useFormPost';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Loading from '../../../components/loading.jsx';
import Swal from 'sweetalert2';
import '../auth.styles.css';

const getTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
};

const transformData = (formData) => {
    return {
        token: getTokenFromUrl(),
        newPassword: formData.password
    };
};

export default function ChangePassword() {
    const navigate = useNavigate();

    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const requiredFields = {
        password: true,
        confirmPassword: true
    };

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        data,
        loading,
        error,
        errorResponse
    } = useFormPost(initialValues, requiredFields, 'http://localhost:3001/api/v1/auth/change-password', 'POST', null, transformData);

    useEffect(() => {
        if (data) {
            console.log(data)
            Swal.fire({
                title: 'Contraseña actualizada',
                text: 'Tu nueva contraseña se actualizó con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/');
            });
        }
    }, [data, navigate]);

    return (
        <Container component="main" maxWidth="sm">
            <Box className="root">
                <Typography component="h1" variant="h5">
                    Recuperar contraseña
                </Typography>
                <Typography variant="body2">
                    Ingresa una nueva contraseña
                </Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        className="textfield"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        className="textfield"
                    />
                    <Typography variant="body2">
                        Utiliza 8 o más caracteres con una mezcla de letras, números y símbolos
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        Cambiar contraseña
                    </Button>
                </form>
                {loading && <Loading />}
                {error && <Typography color="error">Error: {errorResponse} </Typography>}
            </Box>
        </Container>
    );
}