import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Divider } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./styles.css";

export default function ListaEstudiante({ inscritos }) {
    const navigate = useNavigate();

    const handleEmocionClick = (estudianteId) => {
        navigate(`/emociones/estudiante/${estudianteId}`);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
                Estudiantes
            </Typography>
            <Divider className="listaEstudiantes-divider" />
            <TableContainer component={Paper} className="tableEmociones-container">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="header-cell">Estudiante</TableCell>
                            <TableCell className="header-cell">Código</TableCell>
                            <TableCell className="header-cell">Emoción</TableCell>
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
                                        onClick={() => handleEmocionClick(estudiante.EstudiantesMaterias.estudianteId)}
                                        className="emoji-icon"
                                    >
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
