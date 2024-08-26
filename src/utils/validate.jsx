export const validate = (formData, requiredFields = {}) => {
    const errors = {};

    // Validación de campos obligatorios
    if (requiredFields.materia && !formData.materia) {
        errors.materia = "Materia es requerida";
    }

    if (requiredFields.grupo && !formData.grupo) {
        errors.grupo = "Grupo es requerido";
    }

    if (requiredFields.horarios) {
        if (!formData.horarios || formData.horarios.length === 0) {
            errors.horarios = "Debe agregar al menos un horario";
        } else {
            formData.horarios.forEach((horario, index) => {
                if (!horario.dia) {
                    errors.dia = "Día es requerido";
                }
                if (!horario.horaInicio) {
                    errors.horaInicio = "Hora de inicio es requerida";
                }
                if (!horario.horaFin) {
                    errors.horaFin = "Hora de fin es requerida";
                }

                // Verificación de que horaInicio debe ser menor que horaFin
                if (horario.horaInicio && horario.horaFin) {
                    const [horaInicioH, horaInicioM] = horario.horaInicio.split(':').map(Number);
                    const [horaFinH, horaFinM] = horario.horaFin.split(':').map(Number);

                    if (horaInicioH > horaFinH || (horaInicioH === horaFinH && horaInicioM >= horaFinM)) {
                        errors.horaFin = "La hora de fin debe ser mayor que la hora de inicio";
                    }
                }
            });
        }
    }

    // Otras validaciones existentes
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
