import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Divider, Box } from '@mui/material';
import useHttp from '../../../hooks/useHttp';
import Swal from 'sweetalert2';
import Loading from '../../loading';
import './styles.css';

function PopupMateria({ materia, onClose }) {
  
  const [customError, setCustomError] = useState('');


  const { data: inscripcionData, loading, sendRequest: postRequest, error, errorResponse } = useHttp();

  // Manejo de la inscripción de un estudiante
  const handleEnrollClick = async () => {
    const url = 'http://localhost:3001/api/v1/materias/add-inscripcionToken';
    const body = {
      materiaId: materia?.id,
    };

    try {
      await postRequest(url, 'POST', body);
    } catch (error) {
      Swal.fire('Error', 'No se pudo inscribir a la materia.', 'error');
    }
  };

  // Manejo de la respuesta exitosa
  useEffect(() => {
    if (inscripcionData) {
      Swal.fire({
        title: 'Inscripción exitosa',
        text: `Su inscripción a la materia ${materia?.nombre} fue un éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        onClose();
        window.location.reload();  
      });
    }
    if (error) {
      setCustomError(errorResponse || 'Hubo un problema al inscribirse en la materia.');
    }
  }, [inscripcionData, error, errorResponse, materia?.nombre, onClose]);

  return (
    <Dialog
      open={Boolean(materia)}
      onClose={onClose}
      classes={{ paper: 'popupMateria' }}
      maxWidth="xs" 
      fullWidth
    >
      <Box className="popupMateria-header">
        <DialogTitle className="popupMateria-title">{materia?.nombre}</DialogTitle>
        <Typography variant="subtitle1" className="popupMateria-group">
          Grupo {materia?.grupo}
        </Typography>
      </Box>
      <DialogContent className="popupMateria-content">
        {loading ? ( 
          <Loading />  // Mostrar el componente de carga si está cargando
        ) : (
          <>
            <Typography variant="subtitle2" className="popupMateria-docenteTitle">
              Docente
            </Typography>
            <Typography variant="body2" className="popupMateria-docente">
              {materia?.profesor?.nombres} {materia?.profesor?.apellidos}
            </Typography>
            <Typography variant="subtitle2" className="popupMateria-horario">
              Horario
            </Typography>
            <Divider className="popupMateria-divider" />
            <Grid container spacing={2} className="popupMateria-grid">
              {materia?.horarios?.map((dia, index) => (
                <Grid item xs={4} key={index}>
                  <Typography variant="body2" className="popupMateria-dia">{dia.dia}</Typography>
                  <Typography variant="body2">{dia.horaInicio}</Typography>
                  <Typography variant="body2">{dia.horaFin}</Typography>
                </Grid>
              ))}
            </Grid>
            {error && <Typography color="error" className='popupMateria-error'>Error: {customError}</Typography>}
          </>
        )}
      </DialogContent>
      <DialogActions className="popupMateria-actions">
        <Button onClick={onClose} className="popupMateria-cancel">
          Cancelar
        </Button>
        <Button onClick={handleEnrollClick} className="popupMateria-submit" disabled={inscripcionData || loading}>
          {loading ? 'Inscribiendo...' : 'Inscribir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopupMateria;
