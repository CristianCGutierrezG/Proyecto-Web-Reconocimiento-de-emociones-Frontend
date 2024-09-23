import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Divider
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import useFormPost from '../../hooks/useFormPost';
import './styles.css';

const transformData = (formData) => {
    const horarios = formData.horarios.map(horario => ({
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
    }));

    return {
        nombre: formData.materia,
        grupo: formData.grupo,
        horarios: horarios,
    };
};

export default function EditarMateriaDialog({ open, onClose, materiaData }) {

    const initialValues = {
        materia: materiaData?.nombre || '',
        grupo: materiaData?.grupo || '',
        horarios: materiaData?.horarios || [{ dia: '', horaInicio: '', horaFin: '' }]
    };

    const requiredFields = {
        materia: true,
        grupo: true,
        horarios: [{ dia: true, horaInicio: true, horaFin: true}]
    };

    const [customError, setCustomError] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        data,
        loading,
        error,
        errorResponse,
        resetForm
    } = useFormPost(
        initialValues,
        requiredFields,
        `http://localhost:3001/api/v1/materias/${materiaData.id}`,
        'PATCH',
        null,
        (formData) => transformData(formData)
    );
    
    useEffect(() => {
        if (data) {
            onClose();
            Swal.fire({
                title: 'Materia actualizada',
                text: 'La materia ha sido actualizada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    onClose();
                    window.location.reload();
                }
            });
        }
    }, [data, onClose]);

    useEffect(() => {
        if (error && error.message === 'Unauthorized') {
            setCustomError('No autorizado para realizar esta acción');
        } else if (error) {
            setCustomError(error.message);
        }
    }, [error]);

    const handleAddHorario = () => {
        if (formData.horarios.length < 4) {
            handleChange({
                target: {
                    name: 'horarios',
                    value: [...formData.horarios, { dia: '', horaInicio: '', horaFin: '' }]
                }
            });
            setIsDirty(true);
        } else {
            Swal.fire({
                title: 'Límite alcanzado',
                text: 'No puedes agregar más de 4 horarios.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleRemoveHorario = (index) => {
        const newHorarios = [...formData.horarios];
        newHorarios.splice(index, 1);
        handleChange({
            target: {
                name: 'horarios',
                value: newHorarios
            }
        });
        setIsDirty(true);
    };

    const handleCancel = () => {
        if (isDirty) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Estás a punto de cancelar los cambios. ¿Deseas continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'No, seguir editando'
            }).then((result) => {
                if (result.isConfirmed) {
                    resetForm(); 
                    setIsDirty(false); 
                    onClose();
                }
            });
        } else {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle className="crearMateria-title">Editar materia</DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="materia"
                    label="Materia"
                    name="materia"
                    value={formData.materia}
                    onChange={(e) => {
                        handleChange(e);
                        setIsDirty(true);
                    }}
                    error={!!errors.materia}
                    helperText={errors.materia}
                    className="crearMateria-textfield"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="grupo"
                    label="Grupo"
                    name="grupo"
                    value={formData.grupo}
                    onChange={(e) => {
                        handleChange(e);
                        setIsDirty(true);
                    }}
                    error={!!errors.grupo}
                    helperText={errors.grupo}
                    className="crearMateria-textfield"
                />
                <Typography variant="h6" gutterBottom className="crearMateria-horario">
                    Horario
                </Typography>
                <Divider className="crearMateria-divider" />
                {formData.horarios.map((horario, index) => (
                    <Box key={index} display="flex" alignItems="center" marginBottom={2} >
                        <FormControl fullWidth margin="normal">
                            <InputLabel id={`dia-label-${index}`}>Día</InputLabel>
                            <Select
                                labelId={`dia-label-${index}`}
                                id={`dia-${index}`}
                                name="dia"
                                value={horario.dia}
                                error={!!errors.dia}
                                onChange={(event) => {
                                    const newHorarios = [...formData.horarios];
                                    newHorarios[index].dia = event.target.value;
                                    handleChange({
                                        target: {
                                            name: 'horarios',
                                            value: newHorarios
                                        }
                                    });
                                    setIsDirty(true);
                                }}
                            >
                                <MenuItem value="Lunes">Lunes</MenuItem>
                                <MenuItem value="Martes">Martes</MenuItem>
                                <MenuItem value="Miércoles">Miércoles</MenuItem>
                                <MenuItem value="Jueves">Jueves</MenuItem>
                                <MenuItem value="Viernes">Viernes</MenuItem>
                                <MenuItem value="Sábado">Sábado</MenuItem>
                                <MenuItem value="Domingo">Domingo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="horaInicio"
                            label="Hora de inicio"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={horario.horaInicio}
                            onChange={(event) => {
                                const newHorarios = [...formData.horarios];
                                newHorarios[index].horaInicio = event.target.value;
                                handleChange({
                                    target: {
                                        name: 'horarios',
                                        value: newHorarios
                                    }
                                });
                                setIsDirty(true);
                            }}
                            error={!!errors.horaInicio}
                            helperText={errors.horaInicio}
                            className="crearMateria-textfield"
                            inputProps={{
                                step: 3600,
                                min: "00:00",
                                max: "23:59",
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="horaFin"
                            label="Hora fin"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={horario.horaFin}
                            onChange={(event) => {
                                const newHorarios = [...formData.horarios];
                                newHorarios[index].horaFin = event.target.value;
                                handleChange({
                                    target: {
                                        name: 'horarios',
                                        value: newHorarios
                                    }
                                });
                                setIsDirty(true);
                            }}
                            error={!!errors.horaFin}
                            helperText={errors.horaFin}
                            className="crearMateria-textfield"
                            inputProps={{
                                step: 3600,
                                min: "00:00",
                                max: "23:59",
                            }}
                        />
                        <Button
                            className="crearMateria-remove"
                            onClick={() => handleRemoveHorario(index)}
                            disabled={formData.horarios.length <= 1}
                        >
                        <RemoveIcon />
                        </Button>
                    </Box>
                ))}
                <Button
                    className="crearMateria-add"
                    onClick={handleAddHorario}
                    disabled={formData.horarios.length >= 4}
                >
                    <AddIcon />
                </Button>
            </DialogContent>
            {customError && <div className="crearMateria-alert">Error: {customError} </div>}
            <DialogActions className="crearMateria-actions">
                <Button onClick={handleCancel} className="crearMateria-cancel">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit}  className="crearMateria-submit"  disabled={loading}>
                    Actualizar
                </Button>
            </DialogActions>
            
        </Dialog>
    );
}
