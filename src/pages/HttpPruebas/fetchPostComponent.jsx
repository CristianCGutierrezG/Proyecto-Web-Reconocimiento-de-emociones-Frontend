import React, { useState } from 'react';
import useHttp from '../../hooks/useHttp.jsx';

function ObjectEditor() {
    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
        // Añade más campos según sea necesario
    });
    const { data, loading, error, sendRequest } = useHttp();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest('http://localhost:3001/api/v1/auth/login', 'POST', formData, null);
    };

    return (
        <div>
            <h1>Edit and Submit Object</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        email:
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password:
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                {/* Añade más campos según sea necesario */}
                <button type="submit">Send POST Request</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ObjectEditor;