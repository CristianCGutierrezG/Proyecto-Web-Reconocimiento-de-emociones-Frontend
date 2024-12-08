import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Menu from "../../../../components/menu";
import Ajustes from "../../../../components/ajustes";
import "./styles.css"; // Importar el archivo CSS externo

export default function Configuracion() {
  const { authData, recoverToken } = useContext(AuthContext);
  const [expirationTime, setExpirationTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = async () => {
    if (!authData || !authData.token) {
      setErrorMessage("No hay token disponible");
      return;
    }

    try {
      await recoverToken();
      const decodedToken = jwtDecode(authData.token);
      const expirationTimeInMillis = decodedToken.exp * 1000;
      const expirationDate = new Date(expirationTimeInMillis);
      setExpirationTime(expirationDate.toLocaleString());
    } catch (error) {
      setErrorMessage("Error al recuperar el token");
    }
  };

  return (
    <div className="app-container">
      <Menu />
      <div className="main-area">
        <Ajustes />
      </div>
    </div>
  );
}
