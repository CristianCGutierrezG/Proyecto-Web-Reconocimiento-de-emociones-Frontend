import React from 'react';
import Menu from '../../../../components/menu';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Divider, Grid } from '@mui/material';
import ListaEstudianteInscribir from '../../../../components/listaEstudiantesInscribir';
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
            <div className='profesorPage-mainMateriaEstudiante'>
                <div className='profesorPage-materiaEmocion'>
                    <div className='profesorPage-tituloMateria'>
                        <div>
                            {materiaInfo?.nombre}
                            <div className='subtitulo'>
                                Grupo {materiaInfo?.grupo}
                            </div>
                        </div>
                    </div>
                    
                    <div className='profesorPage-materiaEstudianteInterior'>
                    <div>
                        <Typography variant="subtitle2" className="profesorPage-subTitle">
                            Horario
                        </Typography>
                        <Divider className="profesorPage-divider" />
                        <Grid container spacing={2} className="profesorPage-grid">
                            {materiaInfo?.horarios.map((dia, index) => (
                                <Grid item xs={4} key={index}>
                                    <Typography variant="body2" className="profesorPage-dia">{dia.dia}</Typography>
                                    <Typography variant="body2" className="profesorPage-hora">{dia.horaInicio}</Typography>
                                    <Typography variant="body2"className="profesorPage-hora">{dia.horaFin}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                        {materiaInfo && materiaInfo.inscritos && (
                            <ListaEstudianteInscribir inscritos={materiaInfo.inscritos} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}