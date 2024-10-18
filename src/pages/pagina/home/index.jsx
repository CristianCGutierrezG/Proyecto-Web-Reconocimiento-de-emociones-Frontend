import React, { useContext } from 'react';
import Menu from '../../../components/menu';
import { Grid } from '@mui/material';
import Saludo from '../../../components/Saludo';
import ListaMateriasTop from '../../../components/listaMateriasTop';
import CardList from '../../../components/cardList';
import GraficoEmocionesUltimaSemana from '../../../components/GraficoEmocionesSemanal';
import EmotionRecorder from '../../../components/emotionRecorder';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import { AuthContext } from '../../../context/AuthContext';
import './styles.css';

export default function Home() {
    const {authData} = useContext(AuthContext); 
    const role = authData.user.role;

    const normalizedRole = role.replace(/\s+/g, '').toLowerCase(); 

    const renderContentByRole = () => {
        switch (normalizedRole) {
            case 'estudiante':
                return (
                    <>
                        <Grid item>
                            <Saludo />
                        </Grid>
                        <Grid item>
                            <EmotionRecorder />
                        </Grid>
                    </>
                );
            case 'profesor':
                return (
                    <>
                        <Grid item>
                            <ListaMateriasTop />
                        </Grid>
                    </>
                );
            case 'profesionaldesalud':
                return (
                    <>
                        <Grid item>
                            <GraficoEmocionesUltimaSemana />
                        </Grid>
                    </>
                );
            default:
                return <p>Rol no autorizado</p>;
        }
    };

    const cardsData = {
        estudiante: [
            {
                title: 'Registro de emociones',
                icon: <EmojiEmotionsIcon style={{ fontSize: 50, color: '#FFD700' }} />,
                text: 'Mira cómo te has sentido estos días',
                url: '/emociones/estudiante',
            },
            {
                title: 'Horario',
                icon: <CalendarTodayIcon style={{ fontSize: 50, color: 'gray' }} />,
                text: 'Lleva un registro de tus horarios de clase para saber cómo afectan tus emociones',
                url: '/materias/estudiante',
            },
            {
                title: '¿Necesitas ayuda?',
                icon: <PhoneIcon style={{ fontSize: 50, color: 'black' }} />,
                text: 'Contacta a un profesional de la salud',
                url: '/contacto/estudiante',
            },
        ],
        profesor: [
            {
                title: 'Registro de emociones',
                icon: <EmojiEmotionsIcon style={{ fontSize: 50, color: '#FFD700' }} />,
                text: 'Revisa las emociones de tus estudiantes por materia',
                url: '/emociones/profesor',
            },
            {
                title: 'Materias',
                icon: <CalendarTodayIcon style={{ fontSize: 50, color: 'gray' }} />,
                text: 'Organiza tus clases, horarios y estidiantes relacionados',
                url: '/materias/profesor',
            },
        ],
        profesionaldesalud: [
            {
                title: 'Registro de emociones',
                icon: <EmojiEmotionsIcon style={{ fontSize: 50, color: '#FFD700' }} />,
                text: 'Consulta las emociones de los estudiantes',
                url: '/emociones/proSalud',
            },
            {
                title: 'Contacto',
                icon: <PhoneIcon style={{ fontSize: 50, color: 'black' }} />,
                text: 'Contacta a algun estudiante',
                url: '/contactos/proSalud',
            },
        ],
    };

    return (
        <div className='homepage-container'>
            <Menu />
            <Grid container spacing={2} className='homepage-main'>

                {/* Primera columna con contenido condicional basado en el rol */}
                <Grid item xs={15} sm={8} container direction="column" spacing={2}>
                    {renderContentByRole()}
                </Grid>

                {/* Segunda columna con CardList condicional basado en el rol */}
                <Grid item xs={12} sm={4}>
                    <CardList data={cardsData[normalizedRole] || []} /> {/* Pasa la data según el rol */}
                </Grid>
            </Grid>
        </div>
    );
}