import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone'; // Cambiamos el icono a teléfono
import { Link } from 'react-router-dom';
import './styles.css'; // Importamos el archivo CSS

const CardList = ({ data }) => { 
    return (
        <div className="card-list">
            {data.map((card, index) => ( // Usar data pasada como prop
                <Link to={card.url} key={index} className="card-link">
                    <Card className="card-item">
                        <CardContent className="card-content">
                            {card.icon}
                            <Typography variant="h6" className="card-title">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" className="card-text">
                                {card.text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default CardList;
