import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../../components/menu';
import Horario from '../../../../components/horario';
import EmocionPredominante from '../../../../components/emocionPredominante';
import ListaDeMaterias from '../../../../components/listaMaterias';
import GraficoEmocionesMensual from '../../../../components/porcentajeAparicion';
import GraficoComparacionSemestral from '../../../../components/graficoComparacionSemestral';
import EstudianteInfo from '../../../../components/estudianteInfo';
import "./styles.css"

export default function Emociones() {
    const { estudianteId } = useParams();

    return (
        <div className='emocionesPage-container'>
            <Menu />
            <div className='emocionesPage-main'>
                <div className='emocionesPage-horario'>
                    <Horario estudianteId={estudianteId || null}/>
                </div>
                <div className='emocionesPage-sidebar'>
                    <div className='emocionesPage-estudiante-info'>
                      <EstudianteInfo estudianteId={estudianteId || null}/>
                    </div>
                    <EmocionPredominante estudianteId={estudianteId || null}/>
                    <div className='emocionesPage-materia'>
                        <ListaDeMaterias estudianteId={estudianteId || null} allowColorCustomization={false}/>
                    </div>
                </div>
                <GraficoComparacionSemestral estudianteId={estudianteId || null} />
                <GraficoEmocionesMensual estudianteId={estudianteId || null}/>
            </div>
        </div>
    );
}
