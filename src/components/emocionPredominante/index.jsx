import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Disgustado from '../../assets/img/Disgustado.png';
import Enojado from '../../assets/img/Enojado.png';
import Feliz from '../../assets/img/Feliz.png';
import Miedoso from '../../assets/img/Miedoso.png';
import Neutral from '../../assets/img/Neutral.png';
import Sorprendido from '../../assets/img/Sorprendido.png';
import Triste from '../../assets/img/Triste.png';

import { EmocionesContext } from '../../context/EmocionesContext';
import './styles.css';

const EmocionPredominante = () => {
  const { emociones } = useContext(EmocionesContext);
  const [emocionPredominante, setEmocionPredominante] = useState(null);

  useEffect(() => {
    if (emociones.length > 0) {
      const conteoEmociones = emociones.reduce((acc, emocion) => {
        acc[emocion.emocion] = (acc[emocion.emocion] || 0) + 1;
        return acc;
      }, {});

      const emocionMasFrecuente = Object.keys(conteoEmociones).reduce((a, b) =>
        conteoEmociones[a] > conteoEmociones[b] ? a : b
      );

      setEmocionPredominante({
        emocion: emocionMasFrecuente,
        porcentaje: ((conteoEmociones[emocionMasFrecuente] / emociones.length) * 100).toFixed(0)
      });
    }
  }, [emociones]);

  const getEmoji = (emocion) => {
    switch (emocion) {
      case 'Feliz':
        return <img src={Feliz} alt="Feliz" className="emoji-img" />;
      case 'Triste':
        return <img src={Triste} alt="Triste" className="emoji-img" />;
      case 'Enojado':
        return <img src={Enojado} alt="Enojado" className="emoji-img" />;
      case 'Disgustado':
        return <img src={Disgustado} alt="Disgustado" className="emoji-img" />;
      case 'Miedoso':
        return <img src={Miedoso} alt="Miedoso" className="emoji-img" />;
      case 'Neutral':
        return <img src={Neutral} alt="Neutral" className="emoji-img" />;
      case 'Sorprendido':
        return <img src={Sorprendido} alt="Sorprendido" className="emoji-img" />;
      default:
        return null;
    }
  };

  const getColorClass = (emocion) => {
    switch (emocion) {
      case 'Feliz':
        return 'feliz';
      case 'Triste':
        return 'triste';
      case 'Enojado':
        return 'enojado';
      case 'Disgustado':
        return 'disgustado';
      case 'Miedoso':
        return 'miedoso';
      case 'Neutral':
        return 'neutral';
      case 'Sorprendido':
        return 'sorprendido';
      default:
        return '';
    }
  };

  if (!emocionPredominante) {
    return null;
  }

  return (
    <Box className={`emocion-container ${getColorClass(emocionPredominante.emocion)}`}>
      <Typography variant="h6"  className="emocion-title">Emocion predominante</Typography>
      <Box className="emocion-info">
        <Box className="emocion-text-container">
          <Typography className="emocion-value">
            {emocionPredominante.emocion}
          </Typography>
          <Typography className="emocion-percentage">
            {emocionPredominante.porcentaje}%
          </Typography>
        </Box>
        <Box className="emocion-emoji">{getEmoji(emocionPredominante.emocion)}</Box>
      </Box>
    </Box>
  );
};

export default EmocionPredominante;
