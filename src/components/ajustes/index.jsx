import React from 'react';
import { Box, Typography, TextField, Button, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ComputerIcon from '@mui/icons-material/Computer';

const Ajustes = () => {
    return (
        <Box display="flex" height="100vh" bgcolor="#F5F5F5">
            {/* Sidebar */}
            <Box width="25%" bgcolor="#B0BEC5" p={3} display="flex" flexDirection="column" alignItems="center">
                {/* Avatar and Info */}
                <Avatar
                    alt="User Avatar"
                    src="/path-to-avatar.jpg"
                    sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" align="center">
                    Entidad
                </Typography>
                <Typography variant="subtitle2" align="center" color="textSecondary">
                    correo entidad
                </Typography>

                {/* Navigation Menu */}
                <List component="nav">
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText primary="IA" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Información legal" />
                    </ListItem>
                </List>
            </Box>

            {/* Main Content */}
            <Box flexGrow={1} p={5} display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" color="primary" gutterBottom>
                    Datos de cuenta
                </Typography>

                {/* Formulario de datos */}
                <Box component="form" width="60%" display="flex" flexDirection="column" gap={2}>
                    <TextField label="Nombre" variant="outlined" fullWidth />
                    <TextField label="Apellido" variant="outlined" fullWidth />
                    <TextField label="Fecha de nacimiento" variant="outlined" fullWidth />
                    <TextField label="Código institucional" variant="outlined" fullWidth />

                    <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-end', mt: 2 }}>
                        Actualizar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Ajustes;
