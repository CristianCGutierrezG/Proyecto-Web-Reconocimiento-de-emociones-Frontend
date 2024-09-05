import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Divider, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./styles.css";

export default function ListaEstudianteInscribir({ inscritos }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleEmocionClick = (estudianteId) => {
        navigate(`/emociones/estudiante/${estudianteId}`);
    };

    const handleAddClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (estudianteId) => {
        // Aquí agregas la lógica para desinscribir un estudiante
    };

    
    return (
        <div className="lista-estudiantes-container">
            <div className="listaEstudiantes-header">
                <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
                    Estudiantes
                </Typography>
                <IconButton className="add-icon" onClick={handleAddClick}>
                    <AddIcon />
                </IconButton>
            </div>
            <Divider className="listaEstudiantes-divider" />
            <TableContainer component={Paper} className="table-container">
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
                                        className="remove-icon"
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogo para inscribir estudiantes */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Inscribir Estudiante</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre del Estudiante"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {/* Agrega otros campos necesarios para la búsqueda e inscripción */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => { /* Lógica para inscribir estudiante */ handleClose(); }}>Inscribir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
