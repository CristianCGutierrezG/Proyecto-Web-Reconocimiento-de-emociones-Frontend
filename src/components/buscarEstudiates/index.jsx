import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Divider, TextField } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import useHttp from '../../hooks/useHttp';
import {AuthContext} from '../../context/AuthContext';
import "./styles.css";

export default function BuscarEstudiante() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const { data: estudiantes, sendRequest } = useHttp();
    const { authData, logout, isTokenExpired } = useContext(AuthContext);
    const navigate = useNavigate();

    // Authorization headers with API Key
    const headers = useMemo(() => {
        if (authData && authData.token) {
            return {
                'Authorization': `Bearer ${authData.token}`,
                'api': 'PEJC2024',
            };
        }
        return {};
    }, [authData]);

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(1);
        setOffset(0);
    };

    // Fetch data when the search term changes
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const searchUrl = `http://localhost:3001/api/v1/estudiantes/buscar/${searchTerm}?limit=${limit}&offset=${offset}`;

            if (authData && isTokenExpired()) {
                logout();
            } else {
                sendRequest(searchUrl, 'GET', null, headers);
            }
        }
    }, [searchTerm, page, offset, limit, headers, authData, isTokenExpired, logout, sendRequest]);

    console.log(estudiantes)
    const handleEmocionClick = (estudianteId) => {
        navigate(`/emociones/estudiante/${estudianteId}`);
    };

    return (
        <div>
            {/* Search Bar */}
            <TextField
                label="Buscar estudiante"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
                margin="normal"
            />

            {/* Title */}
            <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
                Estudiantes
            </Typography>
            <Divider className="listaEstudiantes-divider" />

            {/* Student List Table */}
            <TableContainer component={Paper} className="tableEmociones-container">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="header-cell">Estudiante</TableCell>
                            <TableCell className="header-cell">Código</TableCell>
                            <TableCell className="header-cell">Emoción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estudiantes && estudiantes.map((estudiante) => (
                            <TableRow key={estudiante.id} className="table-row">
                                <TableCell className="table-cell">
                                    {`${estudiante.nombres} ${estudiante.apellidos}`}
                                </TableCell>
                                <TableCell className="table-cell">{estudiante.codigoInstitucional}</TableCell>
                                <TableCell className="table-cell">
                                    <IconButton
                                        onClick={() => handleEmocionClick(estudiante.id)}
                                        className="emoji-icon"
                                    >
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
