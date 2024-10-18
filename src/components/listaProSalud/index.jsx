import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider, Alert } from '@mui/material';
import Loading from '../loading';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../context/AuthContext';
import './styles.css';

export default function ListaProSalud() {
    const { data: proSalud, loading, error, sendRequest } = useHttp();
    const { authData, logout, isTokenExpired } = useContext(AuthContext);

    // Fetch proSalud data
    useEffect(() => {
        const proSaludUrl = 'http://localhost:3001/api/v1/proSalud';
        
        if (authData && isTokenExpired()) {
            logout();
        } else {
            sendRequest(proSaludUrl, 'GET', null);
        }
    }, [authData, isTokenExpired, logout, sendRequest]);


    return (
        <div>
            {/* Title */}
            <Typography variant="h6" gutterBottom className="listaEstudiantes-title">
                Contacto
            </Typography>
            <Divider className="listaEstudiantes-divider" />
            <Typography variant="h1" gutterBottom className="lista-Subtitle">
                Ponte en contacto con algún profesional de salud si lo necesitas
            </Typography>
            {/* Loading indicator */}
            {loading && (
                <Loading />
            )}

            {/* Error message */}
            {error && (
                <Alert severity="error" className="error-message">
                    Ocurrió un error al cargar los datos de ProSalud: {error.message}
                </Alert>
            )}

            {/* ProSalud List Table */}
            {!error && proSalud && (
                <TableContainer component={Paper} className="tableEmociones-container">
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="header-cell">Nombre</TableCell>
                                <TableCell className="header-cell">Correo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proSalud.map((pro) => (
                                <TableRow key={pro.id} className="table-row">
                                    <TableCell className="table-cell">
                                        {`${pro.nombres} ${pro.apellidos}`}
                                    </TableCell>
                                    <TableCell className="table-cell">{pro.user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
