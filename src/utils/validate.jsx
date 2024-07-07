export const validate = (formData, requiredFields = {}) => {
    const errors = {};

    if (requiredFields.nombres && !formData.nombres) {
        errors.nombres = "Nombre es requerido";
    }

    if (requiredFields.apellidos && !formData.apellidos) {
        errors.apellidos = "Apellido es requerido";
    }

    if (requiredFields.fechaNacimiento && !formData.fechaNacimiento) {
        errors.fechaNacimiento = "Fecha de nacimiento es requerida";
    }

    if (requiredFields.codigoInstitucional) {
        if (!formData.codigoInstitucional) {
            errors.codigoInstitucional = "Código institucional es requerido";
        } else if (formData.codigoInstitucional.length < 10) {
            errors.codigoInstitucional = "El Código institucional debe tener al menos 10 caracteres";
        }
    }

    if (requiredFields.email) {
        if (!formData.email) {
            errors.email = "Email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Ingresa una dirección email válida";
        }
    }

    if (requiredFields.password) {
        if (!formData.password) {
            errors.password = "Contraseña es requerida";
        } else if (formData.password.length < 8) {
            errors.password = "La contraseña debe tener al menos 8 caracteres";
        }
    }
    
    if (requiredFields.confirmPassword) {
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirmar contraseña es requerido";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Las contraseñas no coinciden";
        }
    }

    return errors;
};