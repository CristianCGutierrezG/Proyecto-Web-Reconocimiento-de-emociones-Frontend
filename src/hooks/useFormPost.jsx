import { useState, useContext } from 'react';
import useHttp from './useHttp.jsx';
import { validate } from '../utils/validate';
import { AuthContext } from '../context/AuthContext';

const useFormPost = (initialValues, requiredFields, url, method = 'POST', header = null, transformData = null) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const { authData, isTokenExpired, logout } = useContext(AuthContext);
    const { data, loading, error, errorResponse, sendRequest } = useHttp();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData, requiredFields);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            if (authData && isTokenExpired()) {
                alert('Session has expired. Please log in again.');
                logout();
            } else {
                let transformedData = formData;
                if (transformData) {
                    transformedData = transformData(formData);
                }
                console.log(transformedData)
                await sendRequest(url, method, transformedData, header);
            }
        }
    };

    const resetForm = () => {
        setFormData(initialValues);
        setErrors({}); 
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        resetForm, 
        data,
        loading,
        error,
        errorResponse
    };
};

export default useFormPost;
