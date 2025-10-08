// src/ExAlumnosDataProvider.ts
import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND;

export function useExAlumnosData() {
  const [datos2, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/exalumnos`)
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
