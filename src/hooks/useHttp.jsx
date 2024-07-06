import { useState, useCallback } from 'react';

function useHttp() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                console.log(response);
                throw new Error(response.statusText);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, sendRequest };
}

export default useHttp;