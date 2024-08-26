import React, { useState } from 'react';
import { Button } from '@mui/material';
import NuevaMateriaDialog from './nuevaMateriaDialog';

const NuevaMateriaButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Nueva Materia
      </Button>
      <NuevaMateriaDialog open={open} onClose={handleClose} />
    </>
  );
};

export default NuevaMateriaButton;
