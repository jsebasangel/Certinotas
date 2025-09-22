// src/ExAlumnosDataProvider.ts
import axios from 'axios';
import { useEffect, useState } from 'react';


export function useExAlumnosData() {
  const [datos2, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/exalumnos')
      .then((res) => {
        setData(res.data); // asegúrate que la estructura sea compatible
      })
      .catch((error) => {
        console.error('Error al obtener exalumnos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { datos2, loading };
}
