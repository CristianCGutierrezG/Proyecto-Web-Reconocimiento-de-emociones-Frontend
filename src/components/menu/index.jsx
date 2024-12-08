import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DatosPersonalesContext } from '../../context/DatosPersonalesContext';
import RecognitionArea from '../areaReconocimiento/areaReconocimiento';

// Material UI
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';

// Estilos
import './styles.css';

const CustomListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    color: theme.palette.text.primary,
    textDecoration: 'none',
}));

const menuIcons = {
    home: <HomeIcon />,
    emociones: <EventNoteIcon />,
    materias: <SchoolIcon />,
    contacto: <ContactMailIcon />,
    ajustes: <SettingsIcon />,
};

export default function Menu() {
    const { authData, logout } = useContext(AuthContext);
    const { datosPersonales } = useContext(DatosPersonalesContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const links = {
        Profesor: {
            home: '/home',
            emociones: '/emociones/profesor',
            materias: '/materias/profesor',
            contacto: '',
            ajustes: '/configuracion',
        },
        Estudiante: {
            home: '/home',
            emociones: '/emociones/estudiante',
            materias: '/materias/estudiante',
            contacto: '/contacto/estudiante',
            ajustes: '/configuracion',
        },
        'Profesional de salud': {
            home: '/home',
            emociones: '/emociones/proSalud',
            materias: '',
            contacto: '',
            ajustes: '/configuracion',
        },
    };

    const selectedLinks = links[authData?.user.role] || links.Profesor;

    return (
        <Box className="menu-container">
            <List>
                {Object.keys(selectedLinks).map(
                    (item) =>
                        selectedLinks[item] && (
                            <NavLink
                                key={item}
                                to={selectedLinks[item]}
                                className={({ isActive }) =>
                                    isActive ? 'menu-link active' : 'menu-link'
                                }
                            >
                                <CustomListItem button>
                                    <ListItemIcon>{menuIcons[item]}</ListItemIcon>
                                    <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
                                </CustomListItem>
                            </NavLink>
                        )
                )}
            </List>
            <Divider className="menu-divider" />

            <Box className="user-info">
                <Typography variant="subtitle1">
                    {datosPersonales?.nombres} {datosPersonales?.apellidos}
                </Typography>
                <Typography variant="subtitle2">{datosPersonales?.codigoInstitucional}</Typography>
                

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Cerrar Sesión
                </Button>
            </Box>
            
            <div style={{ display: 'none' }}>
                <RecognitionArea />
            </div>
        </Box>
    );
}
