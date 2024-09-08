import React, { useState, useMemo, useContext, useEffect } from 'react';
import Menu from '../../../../components/menu';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Divider, Grid, Button } from '@mui/material';
import ListaEstudianteInscribir from '../../../../components/listaEstudiantesInscribir';
import { useFetchMateriasProfesor } from '../../../../hooks/useFetchMateriasProfesor';
import Swal from 'sweetalert2';
import EditarMateriaDialog from '../../../../components/editarMateria';
import useHttp from '../../../../hooks/useHttp';
import { AuthContext } from '../../../../context/AuthContext';
import './styles.css';

export default function EstudiantesPorMateria() {
    const { materiaId } = useParams();
    const navigate = useNavigate(); // Hook para redireccionar
    const { materiaInfo, loading, error } = useFetchMateriasProfesor(materiaId);
    const { authData } = useContext(AuthContext);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const { data, sendRequest: patchRequest, errorResponse } = useHttp();

    const headers = useMemo(() => {
        if (authData && authData.token) {
            return {
                'Authorization': `Bearer ${authData.token}`,
                'api': 'PEJC2024'
            };
        }
        return {};
    }, [authData]);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
    
        if (result.isConfirmed) {
            try {
                const url = `http://localhost:3001/api/v1/materias/deleteActive/${materiaId}`;
                await patchRequest(url, 'PATCH', null, headers);
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al eliminar la materia.', 'error');
            }
        }
    };

    useEffect(() => {
        if (data) {
            Swal.fire({
                title: '¡Eliminada!',
                text: 'La materia ha sido eliminada',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/materias/profesor');
            });
        } 
        if(error){
            Swal.fire('Error', 'Hubo un problema al eliminar la materia.', 'error');
        }
    }, [data, navigate]);

    const handleEdit = () => {
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

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
                                        <Typography variant="body2" className="profesorPage-hora">{dia.horaFin}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                        {materiaInfo && materiaInfo.inscritos && (
                            <ListaEstudianteInscribir inscritos={materiaInfo.inscritos} materiaId={materiaId}/>
                        )}

                        {/* Botones de Editar y Eliminar */}
                        <div className='profesorPage-buttons'>
                            <Button variant="contained" className='profesorPage-edit' onClick={handleEdit}>
                                Editar
                            </Button>
                            <Button variant="contained" className='profesorPage-cancel' onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {materiaInfo && (
                <EditarMateriaDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    materiaData={materiaInfo}
                />
            )}
        </div>
    );
}
