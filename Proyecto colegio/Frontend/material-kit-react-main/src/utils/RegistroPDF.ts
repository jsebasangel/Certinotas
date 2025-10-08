import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND;

// Tipo de datos para el Registro
export interface Registro {
  nom_Usuario: string;
  Fecha_creacion: string;
  Id_estudiante: number;
  Descripcion: string;
  Nom_estudiante: string;
}

/**
 * Función para crear un registro en la base de datos
 * @param registro Datos del registro a guardar
 */
export const crearRegistro = async (registro: Registro): Promise<void> => {
  try {
    await axios.post(`${BACKEND_URL}/api/Registro", registro`);
    console.log("Registro guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el registro:", error);
    throw error;
  }
};
