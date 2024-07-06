import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext'

export default function Configuracion() {
    const { authData } = useContext(AuthContext);

    return (
        <pre>{JSON.stringify(authData, null, 2)}</pre>
    )
}