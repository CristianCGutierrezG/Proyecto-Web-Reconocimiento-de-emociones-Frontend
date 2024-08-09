import Menu from '../../../../components/menu';
import Horario from '../../../../components/horario';
import "./styles.css"

export default function Emociones() {
    return (
        <div className='container'>
            <Menu />
            <div className='main'>
                <div className='horario'>
                    <Horario estudianteId={null}/>
                </div>
                <div className='sidebar'>
                    <div className='estudiante-info'>
                        <h2>Chet Russel</h2>
                        <p>9099608945</p>
                    </div>
                    <div className='emotion'>
                        <h3>Emoción predominante</h3>
                        <div className='emotion-details'>
                            <span>Felicidad</span>
                            <span>65%</span>
                        </div>
                    </div>
                    <div className='materia'>
                        <h3>Materias</h3>
                        <p>Cálculo Diferencial</p>
                        <p>Lunes 9 AM - 12 AM</p>
                    </div>
                </div>
                <div className='comparison'>
                    <h3>Comparación</h3>
                    <div className='comparison-chart'></div>
                </div>
                <div className='percentage'>
                    <h3>Porcentaje de aparición</h3>
                    <div className='percentage-chart'></div>
                </div>
            </div>
        </div>
    );
}
