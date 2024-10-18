import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// El prop "IconComponent" será el ícono que pasemos como componente
const CustomCard = ({ title, IconComponent, text, url }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <Link to={url} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            {/* Aquí se renderiza el ícono dinámicamente */}
            <IconComponent sx={{ fontSize: 80, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {text}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CustomCard;
