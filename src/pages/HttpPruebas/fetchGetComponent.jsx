import React, { useMemo, useEffect } from 'react';
import useHttp from '../../hooks/useHttp.jsx';

function DataFetchingComponent() {
    // const [fetchUrl, setFetchUrl] = useState('http://localhost:3001/api/v1/estudiantes');
    const headers = useMemo(() => ({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjg2LCJyb2xlIjoiUHJvZmVzb3IiLCJpYXQiOjE3MTYzMzYwNjR9.ZBVa4gIOPA-PhPRKNsTxyNyUcO9NKJu0Sv8HDgBk7Z0',
        'api': 'PEJC2024'
    }), []);
    
    // const { data, loading, error } = useHttp(fetchUrl, 'GET', null, headers);

    const { data, loading, error, sendRequest } = useHttp();

    useEffect(() => {
        sendRequest('http://localhost:3001/api/v1/estudiantes', 'GET', null, headers);
    }, [sendRequest, headers])
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default DataFetchingComponent;