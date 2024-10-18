import React from 'react';
import useFetchMaterias from '../../hooks/useFetchMaterias';
import TopEmocionesNegativas from './topEmocionesNegativas'; 
import './styles.css'; // Asegúrate de que los estilos están enlazados

const ListaMateriasTop = () => {
  const materias = useFetchMaterias(null);

  return (
    <div className="lista-materias-container">
      <h2 className="lista-materias-titulo">Top de emociones negativas</h2>
      <div className="lista-materias">
        {materias.map((materia) => (
          <div key={materia.id}>
            <TopEmocionesNegativas materiaId={materia.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaMateriasTop;
