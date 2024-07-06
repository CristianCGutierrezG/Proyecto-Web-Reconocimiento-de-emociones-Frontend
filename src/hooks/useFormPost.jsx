// src/hooks/useForm.js
import { useState, useContext } from 'react';
import useHttp from './useHttp.jsx';
import { validate } from '../utils/validate';
import { AuthContext } from '../context/AuthContext';

const useFormPost = (initialValues, url, method = 'POST', header = null) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const { data, loading, error, sendRequest } = useHttp();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (authData && isTokenExpired()) {
                alert('Session has expired. Please log in again.');
                logout();
            } else {
                await sendRequest(url, method, formData, null);
            }
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        data,
        loading,
        error,
    };
};

export default useFormPost;