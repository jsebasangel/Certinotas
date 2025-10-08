// services/registroService.ts
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND;

export const getRegistros = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/registros`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo registros:", error);
    return [];
  }
};
