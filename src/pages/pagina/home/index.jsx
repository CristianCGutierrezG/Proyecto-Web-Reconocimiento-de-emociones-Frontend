import Menu from '../../../components/menu';
import Header from '../../../components/header/header';
import RecognitionArea from '../../../components/areaReconocimiento/areaReconocimiento';
import { Height } from '@mui/icons-material';

const styles = {
    appContainer: {
        display: 'flex',   // Alinea los componentes horizontalmente
        height: '100vh',   // Hace que el contenedor ocupe toda la altura de la pantalla
    },
    sidebar: {
        width: '20%',      // El menú izquierdo ocupa el 20% del ancho
        backgroundColor: '#E8EAF6',
        minHeight: '100vh', // Asegura que el menú ocupe toda la altura de la pantalla
        padding: '20px',
        boxSizing: 'border-box', // Para incluir el padding en el ancho
    },
    mainArea: {
        width: '80%',       // El área principal ocupa el 80% del ancho
        padding: '5%',
        display: 'flex',    // Hace que el contenido dentro de mainArea sea flexible
        flexDirection: 'column', // Alinea los elementos internos verticalmente
        alignItems: 'center',
        position: 'relative',    // Para colocar el botón de información en la esquina
        backgroundColor: '#677C99',
    }
};

export default function Home() {
    return (
        <div style={styles.appContainer}>
            <Menu style={styles.sidebar}></Menu>
            <div style={styles.mainArea}>
                <Header></Header>
                <RecognitionArea></RecognitionArea>
            </div>
        </div>
    )
}