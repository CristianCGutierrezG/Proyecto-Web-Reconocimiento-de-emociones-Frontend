import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../../components/menu';
import ListaProSalud from '../../../../components/listaProSalud';
import "./styles.css"

export default function Contacto() {
    const { estudianteId } = useParams();

    return (
        <div className='contactoPage-container'>
            <Menu />
            <div className='contactoPage-main'>
                <div className='contactoPage-interior'>   
                        <ListaProSalud />
                </div>
            </div>
        </div>
    );
}
