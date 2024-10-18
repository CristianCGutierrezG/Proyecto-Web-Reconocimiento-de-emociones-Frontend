import React, { useEffect, useState, useContext } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import Disgustado from '../../assets/img/Disgustado.png';
import Enojado from '../../assets/img/Enojado.png';
import Feliz from '../../assets/img/Feliz.png';
import Miedoso from '../../assets/img/Miedoso.png';
import Neutral from '../../assets/img/Neutral.png';
import Sorprendido from '../../assets/img/Sorprendido.png';
import Triste from '../../assets/img/Triste.png';
import { DatosPersonalesContext } from '../../context/DatosPersonalesContext';

import './styles.css';
import useFetchEmociones from '../../hooks/useFetchEmociones';

// Listas de mensajes por emoción
const mensajesPorEmocion = {
    Feliz: [
        "¡Celebra tus pequeños logros y disfruta de cada momento!",
        "Recuerda compartir tu felicidad con los demás; a veces, una sonrisa puede iluminar el día de alguien.",
        "Mantén un diario de gratitud y anota las cosas que te hacen sentir bien cada día.",
        "Dedica tiempo a tus pasatiempos favoritos, eso es esencial para mantenerte feliz.",
        "Practica la meditación o la atención plena para seguir cultivando esa felicidad interna.",
        "Aprovecha para hacer algo amable por alguien; la generosidad puede aumentar tu felicidad.",
        "Cuida de tu salud física: una buena alimentación y ejercicio contribuyen a mantener un estado de ánimo positivo.",
        "Haz una lista de las cosas que te hacen feliz y busca incorporarlas más a menudo en tu vida.",
        "Rodéate de personas que te hacen sentir bien y te apoyan en tus objetivos.",
        "Recuerda que está bien sentirse feliz; disfruta de esos momentos y siéntete orgulloso de tus emociones."
    ],
    Triste: [
        "Está bien sentirse triste; no te presiones para estar feliz todo el tiempo.",
        "Habla con alguien de confianza sobre lo que sientes; compartir tu carga puede aliviar el dolor.",
        "Considera llevar un diario para expresar tus emociones y reflexionar sobre ellas.",
        "Permítete sentir y llorar; a veces, liberar las emociones es necesario para sanar.",
        "Busca actividades que te hagan sentir bien, como ver una película divertida o dar un paseo al aire libre.",
        "Haz ejercicio: la actividad física puede liberar endorfinas que mejoran tu estado de ánimo.",
        "Considera practicar la meditación o la respiración profunda para calmar la mente.",
        "Escribe una carta a ti mismo en la que reconozcas tu tristeza y te ofrezcas apoyo.",
        "Intenta identificar la causa de tu tristeza y considera cómo puedes abordar esos sentimientos.",
        "Recuerda que siempre hay ayuda disponible; no dudes en buscar la ayuda de un profesional si lo necesitas."
    ],
    Enojado: [
        "Detente y respira profundamente antes de reaccionar; tomarte un momento puede evitar conflictos.",
        "Escribe lo que sientes en un papel; a veces, poner los pensamientos en palabras puede ayudar.",
        "Encuentra un pasatiempo físico, como el deporte, para canalizar tu energía de manera positiva.",
        "Identifica las situaciones que te hacen enojar y trata de evitar o manejarlas de otra manera.",
        "Habla con alguien sobre lo que sientes; expresar tus emociones puede aliviar la tensión.",
        "Practica la meditación o el yoga para ayudarte a encontrar la calma.",
        "Recuerda que está bien sentirse enojado, pero no dejes que ese sentimiento controle tus acciones.",
        "Haz una lista de las cosas que te frustran y reflexiona sobre cómo puedes cambiarlas.",
        "Considera establecer límites claros para proteger tu paz mental.",
        "Agradece lo que tienes y trata de ver las cosas desde una perspectiva diferente."
    ],
    Disgustado: [
        "Reconoce lo que te causa disgusto y trata de comprender por qué te afecta tanto.",
        "Tomarte un tiempo para ti mismo puede ser útil; considera darte un respiro.",
        "Habla con alguien sobre lo que te molesta para obtener una nueva perspectiva.",
        "Practica técnicas de relajación, como la respiración profunda, para calmar tus emociones.",
        "Encuentra algo positivo en la situación; a veces, un cambio de perspectiva puede ayudar.",
        "Haz una lista de las cosas que te disgustan y reflexiona sobre cómo puedes abordarlas.",
        "Establece límites saludables en tus relaciones para evitar situaciones desagradables.",
        "Intenta encontrar el humor en la situación; a veces, reírse de las cosas puede disminuir el disgusto.",
        "Recuerda que no todo está bajo tu control; acepta lo que no puedes cambiar.",
        "Haz una pausa y reflexiona sobre lo que realmente importa en tu vida."
    ],
    Miedoso: [
        "Es normal sentir miedo; reconócelo y no te sientas mal por ello.",
        "Practica la respiración profunda para calmar tus nervios cuando sientas miedo.",
        "Habla con alguien sobre tus miedos; compartir puede hacer que se sientan menos abrumadores.",
        "Intenta visualizar una situación en la que enfrentas tu miedo y la superas.",
        "Haz una lista de tus miedos y reflexiona sobre cuál es el peor escenario; a menudo, no es tan malo como parece.",
        "Enfrenta tus miedos poco a poco; cada pequeño paso cuenta.",
        "Considera practicar la atención plena para ayudar a centrarte en el presente.",
        "Encuentra formas de afrontar el miedo a través de la educación; conocer más sobre lo que temes puede reducir la ansiedad.",
        "Recuerda que buscar ayuda es un signo de fortaleza; no dudes en acudir a un profesional si lo necesitas.",
        "Dedica tiempo a actividades que te hagan sentir seguro y cómodo."
    ],
    Neutral: [
        "A veces, está bien no sentirse ni arriba ni abajo; acepta tu estado emocional.",
        "Dedica tiempo a actividades que disfrutes y que te ayuden a descubrir cómo te sientes.",
        "Practica la meditación para conectar contigo mismo y entender mejor tus emociones.",
        "Haz un balance de tu vida y piensa en lo que realmente deseas y en lo que te falta.",
        "Encuentra pequeñas alegrías en tu rutina diaria; a veces, los pequeños momentos pueden alegrar tu día.",
        "Establece metas a corto plazo que puedan ayudarte a sentir un sentido de logro.",
        "Permítete explorar nuevas actividades o intereses; puede llevarte a descubrir cosas que te emocionen.",
        "Habla con amigos o familiares para compartir lo que piensas; a veces, un cambio de conversación puede despertar tus emociones.",
        "Reflexiona sobre lo que es importante para ti y considera cómo puedes hacer cambios en tu vida.",
        "Recuerda que las emociones son fluctuantes; está bien estar en un estado neutral mientras trabajas en ti mismo."
    ],
    Sorprendido: [
        "La sorpresa es una parte emocionante de la vida; mantén la mente abierta a nuevas experiencias.",
        "Intenta ser curioso sobre lo que te rodea; la sorpresa puede conducir a aprendizajes inesperados.",
        "Aprovecha la sorpresa para reflexionar sobre cómo cambian las cosas a tu alrededor.",
        "Explora nuevas oportunidades que surjan y considera cómo pueden beneficiarte.",
        "Recuerda que la vida está llena de sorpresas; adopta una mentalidad positiva y adaptable.",
        "Encuentra momentos de sorpresa en lo cotidiano y agrégales un poco de asombro.",
        "Mantente atento a los pequeños detalles; a menudo, son las sorpresas más simples las que traen alegría.",
        "Permítete disfrutar de las sorpresas sin expectativas; la alegría puede surgir en los momentos inesperados.",
        "Considera cómo puedes sorprender a alguien más; la generosidad también puede traer sorpresas gratificantes.",
        "Reflexiona sobre cómo las sorpresas pueden ser oportunidades para el crecimiento personal."
    ]
};

const calcularEmocionPredominante = (emociones) => {
    const conteoEmociones = emociones.reduce((acc, emocion) => {
      acc[emocion.emocion] = (acc[emocion.emocion] || 0) + 1;
      return acc;
    }, {});
    
    const emocionesOrdenadas = Object.keys(conteoEmociones)
      .map((emocion) => ({
        emocion,
        porcentaje: ((conteoEmociones[emocion] / emociones.length) * 100).toFixed(0),
      }))
      .sort((a, b) => b.porcentaje - a.porcentaje);
    
    return emocionesOrdenadas[0];
  };
  
  // Función para seleccionar un mensaje aleatorio según la emoción
  const seleccionarMensajeAleatorio = (emocion) => {
    const mensajes = mensajesPorEmocion[emocion] || [];
    if (mensajes.length > 0) {
      return mensajes[Math.floor(Math.random() * mensajes.length)];
    }
    return '';
  };
  
  const Saludo = () => {
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const { datosPersonales } = useContext(DatosPersonalesContext);
    
    const currentDate = new Date();
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 }).toISOString().split('T')[0];
    const endDate = addDays(new Date(startDate), 6).toISOString().split('T')[0];
    
    if (!dateRange.startDate) {
      setDateRange({ startDate, endDate });
    }
    
    const emociones = useFetchEmociones(null, dateRange);
  
    if (emociones.length === 0) {
      return null;
    }
  
    const emocionPredominante = calcularEmocionPredominante(emociones);
    const mensajeRandom = seleccionarMensajeAleatorio(emocionPredominante.emocion);
  
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
  
    return (
      <Box className="saludo-container">
        <Typography variant="h5" className="saludo-header">
          Hola {datosPersonales?.nombres} {datosPersonales?.apellidos}
        </Typography>
        <Box className="saludo-content">
          <Box className="emoji-container">{getEmoji(emocionPredominante.emocion)}</Box>
          <Box className="saludo-text">
            <Typography className="saludo-subtitle">En estos días te has sentido</Typography>
            <Typography className={`saludo-feeling ${emocionPredominante.emocion.toLowerCase()}`}>
              {emocionPredominante.emocion}
            </Typography>
            <Typography className="saludo-advice">{mensajeRandom}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Saludo;