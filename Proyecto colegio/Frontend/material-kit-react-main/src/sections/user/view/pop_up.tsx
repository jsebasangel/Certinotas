// PopUp.tsx
import axios from 'axios';
import './popup.css';
import React, { useState,useEffect  } from 'react';
import { Button } from '@mui/material';
import { createPDF } from 'src/utils/GenPDF'; // Ajusta la ruta según la ubicación de tu archivo
import { createPDF2 } from 'src/utils/GenPDF2';
import { createPDF3 } from 'src/utils/GenPDF3';

const PopUp = ({ onClose, idExAlumno}: { onClose: () => void; idExAlumno: string }) => {
    type Curso = {
        ID_Curso: string,
        Nombre_Curso: string;
        Descripcion: string;
        year: number
      };
    const [cursos, setCursos] = useState<Curso[]>([]);
    useEffect(() => {
    const grades = async (idExalumno: string) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/materias/cursos-aprobados/${idExalumno}`);
          const data = response.data;
          setCursos(data);
        } catch (error) {
          console.error('Error al obtener las descripciones:', error);
          setCursos([]);
        }
      };
  
      if (idExAlumno) {
        grades(idExAlumno);
      }
    }, [idExAlumno]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCurso, setSelectedCurso] = useState(0);
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('');
  useEffect(() => {
    if (showSecondSelect && cursos.length > 0) {
      setSelectedGrade(cursos[0].Nombre_Curso);
    }
  }, [cursos, showSecondSelect]);
  // Opciones base
const baseOptions = [
  'Seleccione una opción',
  'Certificado de Notas',
  'Certificado de Graduación Curso'
];

// Validación del curso (último del array)
const isUndecimo =
  cursos.length > 0 &&
  cursos[cursos.length - 1].Descripcion === '(11o) UNDÉCIMO';

// Si es UNDÉCIMO agregamos la tercera opción
const options = isUndecimo
  ? [...baseOptions, 'Certificado de acta de grado']
  : baseOptions;
  
  

  const handleFirstSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    if (e.target.value === 'Certificado de Notas') {
      setShowSecondSelect(true);
    } 
     else if (e.target.value === 'Certificado de Graduación Curso') {
      setShowSecondSelect(true);
    }
     else if (e.target.value === 'Certificado de acta de grado') {
      setShowSecondSelect(true);
    }
    else {
      setShowSecondSelect(false);
      setSelectedGrade('');
    }
   
    
  };

  const handleSecondSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(e.target.value);
    setSelectedCurso(e.target.selectedIndex)
  };
  const handleEdit = () => {
      if (selectedOption === 'Certificado de Notas') {
      createPDF({ ID_EXAlumno: idExAlumno }, selectedGrade);
    } else if (selectedOption === 'Certificado de Graduación Curso') {
      createPDF2({ ID_EXAlumno: idExAlumno }, cursos[selectedCurso]); // aquí llamas la nueva función
    }
    else if (selectedOption === 'Certificado de acta de grado') {
      createPDF3({ ID_EXAlumno: idExAlumno },cursos[selectedCurso]); // aquí llamas la nueva función
    }
    else {
      alert('Opción no implementada:', selectedOption);
    }};
  return (
    <>
      {/* Fondo oscuro que cubre toda la pantalla */}
      <div className="popup-overlay" onClick={onClose}></div>
  
      {/* Contenedor del popup */}
      <div className="popup-container">
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Formulario de Certificados</h3>
  
        <label htmlFor="selectOption">Selecciona una opción:</label>
        <select
          id="selectOption"
          value={selectedOption}
          onChange={handleFirstSelectChange}
          className="styled-select"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
  
        {showSecondSelect && (
          <>
            <label htmlFor="selectGrade">Selecciona el grado:</label>
            <select
              id="selectGrade"
              value={selectedGrade}
              onChange={handleSecondSelectChange}
              className="styled-select"
            >
              {cursos.map((curso: any, index: number) => (
                <option key={index} value={curso.Nombre_Curso}>{curso.Descripcion}</option>
              ))}
            </select>
          </>
        )}
  
        {/* Botones */}
        <div className="popup-buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: 4,
              },
            }}
          >
            Certificado
          </Button>
  
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 500,
              fontSize: '0.95rem',
              borderColor: '#f44336',
              color: '#f44336',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#ffe6e6',
                borderColor: '#d32f2f',
              },
            }}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </>
  );
};

export default PopUp;
