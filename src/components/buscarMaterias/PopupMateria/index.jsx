import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider, Box } from '@mui/material';
import useFormPost from '../../../hooks/useFormPost';
import { AuthContext } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import './styles.css';

function PopupMateria({ materia, onClose }) {
  
  const [customError, setCustomError] = useState('');
  const { authData } = useContext(AuthContext);

  const headers = useMemo(() => {
    if (authData && authData.token) {
      return {
        'Authorization': `Bearer ${authData.token}`,
        'api': 'PEJC2024'
      };
    }
    return {};
  }, [authData]);

  const initialValues = {
    materiaId: materia?.id,
  };

  const requiredFields = {
    materiaId: true
  };

  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    data,
    loading,
    error
  } = useFormPost(initialValues, requiredFields, 'http://localhost:3001/api/v1/materias/add-inscripcionToken', 'POST', headers);

  useEffect(() => {
    if (data) {
        onClose();
        Swal.fire({
            title: 'Inscripción exitosa',
            text: `Su inscripción a la materia ${materia.nombre} fue un éxito`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.reload();  // Recarga la página después de la inscripción exitosa
        });
    }
  }, [data, materia.nombre]);

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      setCustomError('No autorizado para realizar esta acción');
    } else if (error) {
      setCustomError(error.message);
    }
  }, [error]);

  return (
    <Dialog
      open={Boolean(materia)}
      onClose={onClose}
      classes={{ paper: 'popupMateria' }}
      maxWidth="xs" 
      fullWidth
    >
      <Box className="popupMateria-header">
        <DialogTitle className="popupMateria-title">{materia.nombre}</DialogTitle>
        <Typography variant="subtitle1" className="popupMateria-group">
          Grupo {materia.grupo}
        </Typography>
      </Box>
      <DialogContent className="popupMateria-content">
        <Typography variant="subtitle2" className="popupMateria-docenteTitle">
          Docente
        </Typography>
        <Typography variant="body2" className="popupMateria-docente">
          {materia.profesor.nombres} {materia.profesor.apellidos}
        </Typography>
        <Typography variant="subtitle2" className="popupMateria-horario">
          Horario
        </Typography>
        <Divider className="popupMateria-divider" />
        <Grid container spacing={2} className="popupMateria-grid">
          {materia.horarios.map((dia, index) => (
            <Grid item xs={4} key={index}>
              <Typography variant="body2" className="popupMateria-dia">{dia.dia}</Typography>
              <Typography variant="body2">{dia.horaInicio}</Typography>
              <Typography variant="body2">{dia.horaFin}</Typography>
            </Grid>
          ))}
        </Grid>
        {error && <Typography color="error" className='popupMateria-error'>Error: {customError}</Typography>}
      </DialogContent>
      <DialogActions className="popupMateria-actions">
        <Button onClick={onClose} className="popupMateria-cancel">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="popupMateria-submit" disabled={loading}>
          {loading ? 'Inscribiendo...' : 'Inscribir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopupMateria;
