import React from "react";
import { Box, Typography } from "@mui/material";
import "./styles.css";

const Emocion = ({ emocion, hora }) => {
  const { borderColor, backgroundColor, textColor } = getEmotionStyles(
    emocion.emocion
  );

  return (
    <Box className="emocion" style={{ borderColor, backgroundColor }}>
      <Typography variant="body2" className="hora" style={{ color: textColor }}>
        {hora}:00
      </Typography>
      <Typography
        variant="body2"
        className="texto-emocion"
        style={{ color: textColor }}
      >
        {emocion.emocion}
      </Typography>
    </Box>
  );
};

const getEmotionStyles = (emocion) => {
  switch (emocion) {
    case "Feliz":
      return {
        borderColor: "var(--Feliz-borderColor)",
        backgroundColor: "var(--Feliz-backgroundColor)",
        textColor: "var(--Feliz-textColor)",
      };
    case "Enojado":
      return {
        borderColor: "var(--Enojado-borderColor)",
        backgroundColor: "var(--Enojado-backgroundColor)",
        textColor: "var(--Enojado-textColor)",
      };
    case "Triste":
      return {
        borderColor: "var(--Triste-borderColor)",
        backgroundColor: "var(--Triste-backgroundColor)",
        textColor: "var(--Triste-textColor)",
      };
    case "Miedoso":
      return {
        borderColor: "var(--Miedoso-borderColor)",
        backgroundColor: "var(--Miedoso-backgroundColor)",
        textColor: "var(--Miedoso-textColor)",
      };
    case "Disgustado":
      return {
        borderColor: "var(--Disgustado-borderColor)",
        backgroundColor: "var(--Disgustado-backgroundColor)",
        textColor: "var(--Disgustado-textColor)",
      };
    case "Sorprendido":
      return {
        borderColor: "var(--Sorprendido-borderColor)",
        backgroundColor: "var(--Sorprendido-backgroundColor)",
        textColor: "var(--Sorprendido-textColor)",
      };
    default:
      return {
        borderColor: "var(--Neutral-borderColor)",
        backgroundColor: "var(--Neutral-backgroundColor)",
        textColor: "var(--Neutral-textColor)",
      };
  }
};

export default Emocion;
