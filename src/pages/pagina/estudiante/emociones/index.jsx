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
        <div className='container'>
            <Menu />
            <div className='main'>
                <div className='horario'>
                    <Horario estudianteId={estudianteId || null}/>
                </div>
                <div className='sidebar'>
                    <div className='estudiante-info'>
                      <EstudianteInfo estudianteId={estudianteId || null}/>
                    </div>
                    <EmocionPredominante estudianteId={estudianteId || null}/>
                    <div className='materia'>
                        <ListaDeMaterias estudianteId={estudianteId || null} allowColorCustomization={false}/>
                    </div>
                </div>
                <GraficoComparacionSemestral estudianteId={estudianteId || null} />
                <GraficoEmocionesMensual estudianteId={estudianteId || null}/>
            </div>
        </div>
    );
}
