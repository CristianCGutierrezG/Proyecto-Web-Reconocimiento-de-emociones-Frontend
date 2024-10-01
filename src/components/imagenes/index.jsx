import React, { useRef, useState, useEffect, useContext, useMemo } from 'react';
import useHttp from '../../hooks/useHttp';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const CameraCapture = () => {
    const { authData, isTokenExpired} = useContext(AuthContext);
    const { data , sendRequest, error } = useHttp();
    const headers = useMemo(() => {
        if (authData && authData.token) {
            return {
                'Authorization': `Bearer ${authData.token}`,
                'api': 'PEJC2024'
            };
        }
        return {};
    }, [authData]);

    // Manejo de la inscripción de un estudiante
    const handleEmotion = async (emotion) => {
        const url = 'http://localhost:3001/api/v1/emociones';
        const body = {
            emocion: emotion
        };

        try {
            await sendRequest(url, 'POST', body, headers);
        } catch (error) {
            Swal.fire('Error', 'No se pudo guardar la emocion.', 'error');
        }
    };

    useEffect(() => {
        if (data) {
            console.log("logrado")
        }
        if (error) {
            console.log(error)
        }
    }, [data, error]);

    // Referencias para el video y el canvas
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    // Inicializar la cámara cuando el componente se monta
    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error al acceder a la cámara:', err);
            }
        };

        initCamera();

        // Limpiar la cámara cuando el componente se desmonta
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Convertir base64 a archivo Blob
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    // Función para capturar la imagen desde el video y enviarla al backend
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Obtener imagen en formato base64
            const dataUrl = canvas.toDataURL('image/png');

            // Actualizar el estado con la imagen capturada
            setCapturedImage(dataUrl);

            // Convertir base64 a archivo Blob
            const file = dataURLtoFile(dataUrl, 'captured_image.png');

            // Crear FormData para enviar el archivo
            const formData = new FormData();
            formData.append('file', file, 'captured_image.png');

            // Enviar la imagen al backend
            fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                handleEmotion(data.emocion)
                console.log('Imagen enviada con éxito:', data.emocion);
            })
            .catch(error => {
                console.error('Error al enviar la imagen:', error);
            });
        }
    };

    const styles = {
        cameraContainer: {
            padding: '10px',  // Añadir padding alrededor de la cámara
            backgroundColor: '#F8F9FA',  // Fondo claro para hacer contraste
            borderRadius: '8px',  // Bordes redondeados
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Sombra para darle profundidad
        },
    }

    // Hook para capturar la foto cada 60 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            capturePhoto(); // Captura la foto automáticamente cada 60 segundos
        }, 15000); // 60000ms = 60 segundos

        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.cameraContainer}>
            <video ref={videoRef} width="auto" height="300" autoPlay playsInline></video>
            <br />
            {/* Botón para capturar la imagen */}
            <button onClick={capturePhoto}>Capturar Foto</button>
            <br />
            {/* Canvas (oculto) para capturar la imagen */}
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default CameraCapture;
