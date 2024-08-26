import React, { useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import useFormPost from '../../../hooks/useFormPost';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Loading from '../../../components/loading.jsx';
import Swal from 'sweetalert2';
import '../auth.styles.css';

const transformData = (formData) => {
    return {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        fechaNacimiento: formData.fechaNacimiento,
        codigoInstitucional: formData.codigoInstitucional,
        user: {
            email: formData.email,
            password: formData.password,
        }
    };
};

export default function Register() {

    const navigate = useNavigate();
 
    const initialValues = {
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        codigoInstitucional: '',
        email: '', 
        password: '',
        confirmPassword: '',
    };

    const requiredFields = {
        nombres: true,
        apellidos: true,
        fechaNacimiento: true,
        codigoInstitucional: true,
        email: true,
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
    } = useFormPost(initialValues, requiredFields, 'http://localhost:3001/api/v1/estudiantes', 'POST', null, transformData);

    useEffect(() => {
        if (data) {
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'El usuario ha sido registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/'); 
            });
        }
    }, [data, navigate]);

    return (
        <Container component="main" maxWidth="md" className='container'>
            <Box className="root">
                <Typography component="h1" variant="h5">
                    Crea tu cuenta gratis
                </Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <Box className="formSection">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nombres"
                            label="Nombre"
                            name="nombres"
                            autoComplete="fname"
                            autoFocus
                            value={formData.nombres}
                            onChange={handleChange}
                            error={!!errors.nombres}
                            helperText={errors.nombres}
                            className="textfield"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="apellidos"
                            label="Apellido"
                            name="apellidos"
                            autoComplete="lname"
                            value={formData.apellidos}
                            onChange={handleChange}
                            error={!!errors.apellidos}
                            helperText={errors.apellidos}
                            className="textfield"
                        />
                    </Box>
                    <Box className="formSection">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fechaNacimiento"
                            label="Fecha de nacimiento"
                            name="fechaNacimiento"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            error={!!errors.fechaNacimiento}
                            helperText={errors.fechaNacimiento}
                            className="textfield"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="codigoInstitucional"
                            label="Código institucional"
                            name="codigoInstitucional"
                            value={formData.codigoInstitucional}
                            onChange={handleChange}
                            error={!!errors.codigoInstitucional}
                            helperText={errors.codigoInstitucional}
                            className="textfield"
                        />
                    </Box>
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
                    <Box className="formSection" >
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
                    </Box>
                    <Typography variant="body2">
                        Utiliza 8 o más caracteres con una mezcla de letras, números y símbolos
                    </Typography>
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
                        Crear cuenta
                    </Button>
                </form>
                {loading && <Loading />}
                {error && <Typography color="error">Error: {errorResponse} </Typography>}                
            </Box>
        </Container>
    );
}