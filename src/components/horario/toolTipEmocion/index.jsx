import React from "react";
import { Box, Typography } from "@mui/material";
import "./styles.css";

const TooltipEmocion = ({ emocionesPorHora }) => {
  const totalEmociones = emocionesPorHora.reduce((total, emocion) => total + emocion.count, 0);
  return (
    <Box className="tooltip-emocion">
      {emocionesPorHora.map(({ emocion, count }, index) => {
        const porcentaje = ((count / totalEmociones) * 100).toFixed(2);
        return (
          <Box key={index} className="tooltip-item">
            <Typography variant="body2">
              {emocion}: {porcentaje}%
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TooltipEmocion;
