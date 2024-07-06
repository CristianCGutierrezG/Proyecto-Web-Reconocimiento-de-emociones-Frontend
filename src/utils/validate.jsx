export const validate = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "La direcci&otilde;n Email es invalida";
    }

    if (!formData.password) {
        errors.password = "La contrase&ntilde;a es requerida ";
    } else if (formData.password.length < 8) {
        errors.password = "La contrase&ntilde;a debe tener al menos 8 caracteres";
    }

    return errors;
};