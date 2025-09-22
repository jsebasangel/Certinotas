// ActaPDF.ts
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { crearRegistro } from "./RegistroPDF";

(pdfMake as any).vfs = (pdfFonts as any).vfs;

interface TipoDocumento {
  Tipo_Documento: string;
  Numero: string;
  Lugar_Expedicion: string;
}


interface Exalumno {
  ID_EXAlumno?: string;
  Nombre?: string;
  Apellido?: string;
  tipoDocumento?: TipoDocumento;
}

// Función para convertir logo a base64
const fetchImageAsBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};

let logoBase64 = "";

// === Acta de Grado ===
const createPDF3 = async (
  Exalumno: Exalumno,
  curso: any
): Promise<void> => {
  const response = await axios.get(
    `http://localhost:3000/api/exalumnos/${Exalumno.ID_EXAlumno}`
  );
  const data = response.data;

  if (!logoBase64) {
    logoBase64 = await fetchImageAsBase64("/assets/images/descarga.png");
  }

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  const documentDefinition: any = {
    content: [
      { image: logoBase64, width: 140, height: 20, alignment: "center" },
      {
        text: "COLEGIO SANTO TOMÁS DE AQUINO",
        style: "header",
        alignment: "center",
      },
      {
        text: "Decano de los colegios de Colombia\nBogotá\nDOMINICOS",
        alignment: "center",
      },
      {
        text: "ACTA DE GRADO",
        style: "header",
        alignment: "center",
        margin: [0, 20, 0, 20],
      },
      {
        text: `En la ciudad de Bogotá D.C., a los ${day} días del mes de ${month.toUpperCase()} del año ${year}, reunidos en las instalaciones del Colegio Santo Tomás de Aquino, se procede a otorgar el presente Acta de Grado.`,
        margin: [0, 0, 0, 20],
        alignment: "justify",
      },
      {
        text: `Se deja constancia que el estudiante ${data.Nombre} ${data.Apellido}, identificado con ${data.tipoDocumento?.Tipo_Documento}: ${data.tipoDocumento?.Numero} de ${data.tipoDocumento?.Lugar_Expedicion}, ha cumplido con todos los requisitos académicos y administrativos establecidos por la institución y por el Ministerio de Educación Nacional, y ha aprobado satisfactoriamente el grado ${curso.Descripcion}, correspondiente al año ${curso.year}.`,
        margin: [0, 0, 0, 20],
        alignment: "justify",
      },
      {
        text: `En consecuencia, se registra en el libro de Actas de Grado del Colegio Santo Tomás de Aquino y se le confiere el título correspondiente.`,
        margin: [0, 0, 0, 20],
        alignment: "justify",
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "____________________________",
                alignment: "center",
                margin: [0, 40, 0, 5],
              },
              { text: "Firma del Rector", alignment: "center" },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "____________________________",
                alignment: "center",
                margin: [0, 40, 0, 5],
              },
              { text: "Firma del Secretario Académico", alignment: "center" },
            ],
          },
        ],
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      subheader: { fontSize: 14, bold: true },
    },
  };

  // === 1. Descargar PDF
  pdfMake
    .createPdf(documentDefinition)
    .download(`Acta_Grado_${Exalumno.Nombre}.pdf`);

  // === 2. Guardar registro en la BD
  const user = localStorage.getItem("usuario");
  const registroPayload = {
    nom_Usuario: user || 'user',
    Fecha_creacion: new Date().toISOString().split("T")[0],
    Id_estudiante: Number(Exalumno.ID_EXAlumno),
    Descripcion: "Acta de grado",
    Nom_estudiante: `${data.Nombre} ${data.Apellido}`,
  };

  await crearRegistro(registroPayload);
};

export { createPDF3 };
