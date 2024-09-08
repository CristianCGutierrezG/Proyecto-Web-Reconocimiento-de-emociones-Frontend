import React from 'react';
import Menu from '../../../../components/menu';
import BuscarEstudiante from '../../../../components/buscarEstudiates';
import './styles.css';

export default function EmocionesProSalud() {
    return (
        <div className='saludPage-container'>
            <Menu />
            <div className='saludPage-main'>
                <div className='saludPage-interior'>   
                        <BuscarEstudiante />
                </div>
            </div>
        </div>
    )
}