import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../../components/menu';
import HorarioMateria from '../../../../components/horarioMateria';
import ListaDeMaterias from '../../../../components/listaMaterias';
import BuscarMaterias from '../../../../components/buscarMaterias';
import EstudianteInfo from '../../../../components/estudianteInfo';
import "./styles.css"

export default function Materias() {
    return (
        <div className='materiasPage-container'>
            <Menu />
            <div className='materiasPage-main'>
                <div className='materiasPage-horario'>
                    <HorarioMateria/>
                </div>
                <div className='materiasPage-sidebar'>
                    <div className='materiasPage-estudiante-info'>
                      <EstudianteInfo estudianteId={null}/>
                    </div>
                    <div className='materiasPage-materia'>
                        <ListaDeMaterias estudianteId={null} allowColorCustomization={true}/>
                    </div>
                </div>
                <div className="materiasPage-Buscador ">
                   <BuscarMaterias/>	
                </div>
                
            </div>
        </div>
    )
}