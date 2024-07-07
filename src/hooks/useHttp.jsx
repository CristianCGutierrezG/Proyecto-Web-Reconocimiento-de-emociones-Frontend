import { useState, useCallback } from 'react';

function useHttp() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        setError(null);

        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                const errorResponse = await response.json(); 
                setErrorResponse(errorResponse.message);
                throw new Error(errorResponse.message);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, errorResponse, sendRequest };
}

export default useHttp;