import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function Loading() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="5vh">
            <CircularProgress />
        </Box>
    );
}