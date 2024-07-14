import React, { useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import useFormPost from '../../../hooks/useFormPost';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Loading from '../../../components/loading.jsx';
import Swal from 'sweetalert2';
import '../auth.styles.css';

export default function Recover() {
    const navigate = useNavigate();
 
    const initialValues = {
        email: '', 
    };

    const requiredFields = {
        email: true,
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
    } = useFormPost(initialValues, requiredFields, 'http://localhost:3001/api/v1/auth/recovery');

    useEffect(() => {
        if (data) {
            console.log(data)
            Swal.fire({
                title: 'Correo enviado',
                text: 'Se a enviado un correo con las instrucciones para realizar el cambio de contraseña',
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
                    Ingresa tu correo electronico de recuperación
                </Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        className="textfield"
                    />
                    <NavLink to="/" className="link" >
                        Iniciar sesión
                    </NavLink>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        Enviar correo
                    </Button>
                </form>
                {loading && <Loading />}
                {error && <Typography color="error">Error: {errorResponse} </Typography>}                
            </Box>
        </Container>
    );
}



