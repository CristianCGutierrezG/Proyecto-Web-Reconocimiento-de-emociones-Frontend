import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import './styles.css';

const Materia = ({ id, nombre }) => {
  const [color, setColor] = useState('#f9f9f9');

  useEffect(() => {
    const materiasColors = JSON.parse(localStorage.getItem('materiasColors')) || {};
    setColor(materiasColors[id] || '#f9f9f9');
  }, [id]);

  return (
    <Box
      className="materia-root"
      style={{
        borderTop: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        borderLeft: `6px solid ${color}`,
      }}
    >
      <Typography variant="body4" className="materia-nombre">
        {nombre}
      </Typography>
    </Box>
  );
};

export default Materia;