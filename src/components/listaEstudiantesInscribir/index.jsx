import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InscribirEstudianteDialog from './inscribirEstudianteDialog';
import Swal from 'sweetalert2';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

export default function ListaEstudianteInscribir({ inscritos, estudiantes, materiaId }) {
    const [open, setOpen] = useState(false);
    const { authData } = useContext(AuthContext);
    const { data, sendRequest: deleteRequest, errorResponse, error } = useHttp();

    const headers = useMemo(() => {
        if (authData && authData.token) {
            return {
                'Authorization': `Bearer ${authData.token}`,
                'api': 'PEJC2024',
            };
        }
        return {};
    }, [authData]);

    const handleAddClick = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = async (estudianteId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción! El estudiante quedara elimado de la materia",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {

            const url = `http://localhost:3001/api/v1/materias/remove-inscripcion`;
            const body = {
                materiaId: materiaId,
                estudianteId: estudianteId
            };

            try {
                await deleteRequest(url, 'PATCH', body, headers);
            } catch (err) {
                Swal.fire('Error', 'Hubo un problema al eliminar al estudiante.', 'error');
            }
        }
    };


    useEffect(() => {
        if (data) {
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El estudiante ha sido eliminado.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            }).then(() => {
                window.location.reload();
            });
        }
        if (error) {
            Swal.fire('Error', errorResponse || 'Hubo un problema al eliminar al estudiante.', 'error');
        }
    }, [data, error]);

    return (
        <div className="listaEstudiantes-container">
            <div className="listaEstudiantes-header">
                <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
                    Estudiantes
                </Typography>
                <IconButton className="listaEstudiantes-submit" onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </div>
            <Divider className="listaEstudiantes-divider" />
            <TableContainer component={Paper} className="tableInscripcion-container">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="header-cell">Estudiante</TableCell>
                            <TableCell className="header-cell">Código</TableCell>
                            <TableCell className="header-cell">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inscritos.map((estudiante) => (
                            <TableRow key={estudiante.EstudiantesMaterias.id} className="table-row">
                                <TableCell className="table-cell">
                                    {`${estudiante.nombres} ${estudiante.apellidos}`}
                                </TableCell>
                                <TableCell className="table-cell">{estudiante.codigoInstitucional}</TableCell>
                                <TableCell className="table-cell">
                                    <IconButton
                                        onClick={() => handleRemoveClick(estudiante.EstudiantesMaterias.estudianteId)}
                                        className="listaEstudiantes-cancel"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Diálogo para inscribir estudiantes */}
            <InscribirEstudianteDialog
                open={open}
                onClose={onClose}
                estudiantes={estudiantes}
                inscritos={inscritos}
                materiaId={materiaId}
            />
        </div>
    );
}
