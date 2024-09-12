import React, {useContext, useState} from 'react';
//Contextos
import { AuthContext } from '../../context/AuthContext'
import { DatosPersonalesContext } from '../../context/DatosPersonalesContext';
import CameraCapture  from '../imagenes';


//Material UI
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Divider, Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';

//Estilos
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
    const { datosPersonales} = useContext(DatosPersonalesContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const links = {
        "Profesor": {
            home: '/home',
            emociones: '/emociones/profesor',
            materias: '/materias/profesor',
            contacto: '',
            ajustes: '/home',
        },
        "Estudiante": {
            home: '/home',
            emociones: '/emociones/estudiante',
            materias: '/materias/estudiante',
            contacto: '/materias/profesor',
            ajustes: '/configuracion/estudiante',
        },
        "Profesional de salud": {
            home: '/home',
            emociones: '/emociones/proSalud',
            materias: '',
            contacto: '/home',
            ajustes: '/home',
        },
    };

    const selectedLinks = links[authData?.user.role] || links.Profesor;

    return (
        <Box className="menu-container">
            <List>
                {Object.keys(selectedLinks).map(item => (
                    selectedLinks[item] ? (
                        <NavLink
                            key={item}
                            to={selectedLinks[item]}
                            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                        >
                            <CustomListItem button>
                                <ListItemIcon>
                                    {menuIcons[item]}
                                </ListItemIcon>
                                <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
                            </CustomListItem>
                        </NavLink>
                    ) : null
                ))}
            </List>
            <Divider className="menu-divider" />
            <Box
                className="user-info"
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
            >
                <Typography variant="subtitle1">{datosPersonales?.nombres} {datosPersonales?.apellidos}</Typography>
                <Typography variant="subtitle2">{datosPersonales?.codigoInstitucional}</Typography>
                {showLogout && (
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                )}
            </Box>
        </Box>
    );
}
