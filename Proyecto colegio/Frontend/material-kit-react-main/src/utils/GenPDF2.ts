// GenPDF.ts
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

// === Certificado de Graduación ===
const createPDF2 = async (
  Exalumno: Exalumno,
 curso:any
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
        text: "CERTIFICADO DE GRADUACIÓN DE CURSO",
        style: "header",
        alignment: "center",
        margin: [0, 20, 0, 20],
      },
      {
        text: `Que ${data.Nombre} ${data.Apellido}, identificado con ${data.tipoDocumento?.Tipo_Documento}: ${data.tipoDocumento?.Numero} de ${data.tipoDocumento?.Lugar_Expedicion}, ha cursado y aprobado satisfactoriamente en este plantel el grado ${curso.Descripcion} correspondiente al año ${curso.year}.`,
        margin: [0, 10, 0, 20],
        alignment: "justify",
      },
      {
        text: "Por lo tanto, se le reconoce como graduado en conformidad con las disposiciones vigentes.",
        margin: [0, 0, 0, 20],
        alignment: "justify",
      },
      {
        text: `Dado en Bogotá D.C. a los ${day} días del mes de ${month.toUpperCase()} de ${year}`,
        margin: [0, 0, 0, 20],
        alignment: "center",
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Firma del Rector",
                alignment: "center",
                margin: [0, 40, 0, 5],
              },
              { text: "Rector", alignment: "center" },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "Firma del Secretario",
                alignment: "center",
                margin: [0, 40, 0, 5],
              },
              { text: "Secretario Académico", alignment: "center" },
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
    .download(`Certificado_Graduacion_${Exalumno.Nombre}.pdf`);

  // === 2. Guardar registro en la BD
  const user = localStorage.getItem("usuario");
  const registroPayload = {
    nom_Usuario: user || 'user',
    Fecha_creacion: new Date().toISOString().split("T")[0],
    Id_estudiante: Number(Exalumno.ID_EXAlumno),
    Descripcion: "Certificado de Graduación Curso",
    Nom_estudiante: `${data.Nombre} ${data.Apellido}`,
  };

  await crearRegistro(registroPayload);
};

export { createPDF2 };