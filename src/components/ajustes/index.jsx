import React from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ComputerIcon from '@mui/icons-material/Computer';
import './styles.css'; // Importar los estilos externos

const Ajustes = () => {
    return (
        <Box className="container">
            {/* Sidebar */}
            <Box className="sidebar">
                <Avatar alt="User Avatar" src="/path-to-avatar.jpg" className="avatar" />
                <Typography variant="h6" className="sidebar-title">
                    Soporte e-ducativa
                </Typography>
                <Typography variant="subtitle2" className="sidebar-subtitle">
                    @educativa
                </Typography>

                {/* Navigation Menu */}
                <List component="nav" className="menu">
                    <ListItem button className="menu-item">
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                    <ListItem button className="menu-item">
                        <ListItemIcon>
                            <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText primary="IA" />
                    </ListItem>
                    <ListItem button className="menu-item">
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Información legal" />
                    </ListItem>
                </List>
            </Box>

            {/* Main Content */}
            <Box className="content">
                <Typography variant="h4" className="content-title">
                    Datos de cuenta
                </Typography>

                {/* Formulario de datos */}
                <Box component="form" className="form">
                    <TextField label="Nombre" variant="outlined" fullWidth className="form-field" />
                    <TextField label="Apellido" variant="outlined" fullWidth className="form-field" />
                    <TextField label="Fecha de nacimiento" variant="outlined" fullWidth className="form-field" />
                    <TextField label="Código institucional" variant="outlined" fullWidth className="form-field" />

                    <Button variant="contained" color="primary" className="form-button">
                        Actualizar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Ajustes;
