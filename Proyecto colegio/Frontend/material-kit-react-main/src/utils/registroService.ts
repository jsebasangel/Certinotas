// services/registroService.ts
import axios from "axios";

export const getRegistros = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/registros");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo registros:", error);
    return [];
  }
};
