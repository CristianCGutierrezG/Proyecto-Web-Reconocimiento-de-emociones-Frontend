import React from 'react';
import Menu from '../../../../components/menu';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import ListaEstudiante from '../../../../components/listaEstudiantes';
import GraficoEmocionesMensualMateria from '../../../../components/graficoEmocionesMensualMateria';
import MateriaEmocionesChart from '../../../../components/materiasEmocionesChart';
import { useFetchMateriasProfesor } from '../../../../hooks/useFetchMateriasProfesor';
import './styles.css';

export default function EmocionesPorMateria() {
    const { materiaId } = useParams();
    const { materiaInfo, loading, error } = useFetchMateriasProfesor(materiaId);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error al cargar los datos</Typography>;

    return (
        <div className='profesorPage-container'>
            <Menu />
            <div className='profesorPage-mainMateriaEmocion'>
                <div className='profesorPage-materiaEmocion'>
                    <div className='profesorPage-tituloMateria'>
                        <div>
                            {materiaInfo?.nombre}
                            <div className='subtitulo'>
                                Grupo {materiaInfo?.grupo}
                            </div>
                        </div>
                    </div>
                    <div className='profesorPage-materiaEmocionInterior'>
                        {materiaInfo && materiaInfo.horarios && (
                            <div className='profesorPage-graficos'>
                                <MateriaEmocionesChart materiaId={materiaId} horarios={materiaInfo.horarios} />
                                <GraficoEmocionesMensualMateria materiaId={materiaId} horarios={materiaInfo.horarios} />
                            </div>
                        )}
                        {materiaInfo && materiaInfo.inscritos && (
                            <ListaEstudiante inscritos={materiaInfo.inscritos} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
