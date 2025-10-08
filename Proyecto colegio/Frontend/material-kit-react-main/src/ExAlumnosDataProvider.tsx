// 📁 src/ExAlumnosDataProvider.ts
// -----------------------------------------------------------------------------
// Este hook personalizado `useExAlumnosData` se encarga de consumir el servicio
// del backend para obtener el listado de exalumnos desde la API. Facilita la
// gestión del estado y el manejo de carga (loading) en componentes React que
// requieran esta información.
// -----------------------------------------------------------------------------

import axios from 'axios';
import { useEffect, useState } from 'react';

// 🔧 URL del backend obtenida desde las variables de entorno
// Esto permite cambiar la ruta del servidor sin modificar el código fuente.
const BACKEND_URL = import.meta.env.VITE_BACKEND;

/**
 * 🎓 Hook personalizado para obtener datos de exalumnos desde el backend.
 * 
 * @returns {Object} Un objeto con dos propiedades:
 * - `datos2`: Array con la información de los exalumnos recibida desde la API.
 * - `loading`: Booleano que indica si los datos aún se están cargando.
 * 
 * 📌 Ejemplo de uso:
 * ```tsx
 * const { datos2, loading } = useExAlumnosData();
 * 
 * if (loading) return <p>Cargando datos...</p>;
 * return <ExAlumnosTable data={datos2} />;
 * ```
 */
export function useExAlumnosData() {
  // 📊 Estado para almacenar la lista de exalumnos
  const [datos2, setData] = useState<any[]>([]);
  
  // ⏳ Estado para indicar si la petición aún está en proceso
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * 🧠 useEffect: Se ejecuta automáticamente al montar el componente.
   * Realiza la solicitud HTTP al backend para obtener los datos de exalumnos.
   */
  useEffect(() => {
    // 📡 Petición GET a la API del backend
    axios
      .get(`${BACKEND_URL}/api/exalumnos`)
      .then((res) => {
        // ✅ Guardamos la respuesta en el estado `datos2`
        // Es importante asegurarse que `res.data` tenga la estructura esperada.
        setData(res.data);
      })
      .catch((error) => {
        // ❌ Manejamos cualquier error en la petición y lo mostramos en consola
        console.error('Error al obtener exalumnos:', error);
      })
      .finally(() => {
        // ⏱️ Independientemente del resultado, indicamos que la carga terminó
        setLoading(false);
      });
  }, []); // 🔁 [] asegura que se ejecute solo una vez al montar el componente

  // 📤 Retornamos el estado para ser utilizado en otros componentes
  return { datos2, loading };
}
