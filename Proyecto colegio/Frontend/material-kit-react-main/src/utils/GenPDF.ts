// GenPDF.ts
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { crearRegistro } from "./RegistroPDF";

(pdfMake as any).vfs = (pdfFonts as any).vfs;

// Interfaces para tipado
interface TipoDocumento {
  Tipo_Documento: string;
  Numero: string;
  Lugar_Expedicion: string;
}

interface Curso {
  Nombre_Curso: string;
  year: string;
}

interface Materia {
  Nombre: string;
  Nota: string;
  Curso: Curso;
}

interface Exalumno {
  ID_EXAlumno?: string;
  Nombre?: string;
  Apellido?: string;
  tipoDocumento?: TipoDocumento;
}

// Función para convertir una imagen a Base64
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

let logoBase64 = ""; // Imagen en base64

// Obtener materias desde la API
const fetchMaterias = async (
  Exalumno: Exalumno,
  selectedGrade: string
): Promise<Materia[]> => {
  try {
    await axios.get(
      `http://localhost:3000/api/materias/cursos-aprobados/${Exalumno.ID_EXAlumno}`
    );

    const materiasResponse = await axios.get(
      `http://localhost:3000/api/materias/certificado/${Exalumno.ID_EXAlumno}/${selectedGrade}`
    );

    return materiasResponse.data;
  } catch (error) {
    console.error("Error fetching materias:", error);
    return [];
  }
};

// Función principal para crear el PDF y guardar en la BD
const createPDF = async (
  Exalumno: any,
  selectedGrade: string,
): Promise<void> => {
  const response = await axios.get(
    `http://localhost:3000/api/exalumnos/${Exalumno.ID_EXAlumno}`
  );
  const data = response.data;

  if (!logoBase64) {
    logoBase64 = await fetchImageAsBase64("/assets/images/descarga.png");
  }

  const materias = await fetchMaterias(Exalumno, selectedGrade);
  const materiasTableBody: any[] = [
    [{ text: "Materia", bold: true }, { text: "Nota", bold: true }],
  ];

  let suma = 0;
  let tam = 0;

  materias.forEach((materia) => {
    materiasTableBody.push([materia.Nombre, materia.Nota]);
    suma += parseFloat(materia.Nota);
    tam++;
  });

  const promedio = tam > 0 ? suma / tam : 0;
  const firstMateria = materias[0]?.Curso ?? {
    Nombre_Curso: "Desconocido",
    year: "Desconocido",
  };

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
        text: "CERTIFICAN:",
        style: "header",
        alignment: "center",
        margin: [0, 10, 0, 10],
      },
      {
        text: `Que ${data.Nombre} ${data.Apellido} con ${data.tipoDocumento?.Tipo_Documento}: ${data.tipoDocumento?.Numero} de ${data.tipoDocumento?.Lugar_Expedicion}, cursó y aprobó en este plantel los estudios que a continuación se relacionan:`,
        margin: [0, 10, 0, 10],
      },
      {
        text: `Grado ${firstMateria.Nombre_Curso} ${firstMateria.year}`,
        margin: [0, 10, 0, 10],
      },
      {
        table: {
          widths: ["*", "auto"],
          body: materiasTableBody,
        },
        margin: [0, 0, 0, 20],
      },
      {
        text: `Promedio: ${promedio.toFixed(2)}`,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      { text: "Comportamiento Escolar", bold: true, margin: [0, 20, 0, 10] },
      {
        text: "Calificación: 10.0 (DIEZ CERO)",
        margin: [0, 0, 0, 20],
      },
      {
        text: "=================================================================================================================================================",
        margin: [0, 0, 0, 10],
      },
      {
        text: `Dado en Bogotá D.C. A LOS ${day} DÍAS DEL MES DE ${month.toUpperCase()} DE ${year}`,
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Firma del Rector",
                alignment: "center",
                margin: [0, 20, 0, 5],
              },
              {
                text: "CC 6028153 de Villa Hermosa, Tolima",
                alignment: "center",
                margin: [0, 0, 0, 5],
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
                margin: [0, 20, 0, 5],
              },
              {
                text: "CC 1030523920 de Bogotá D.C.",
                alignment: "center",
                margin: [0, 0, 0, 5],
              },
              { text: "Secretaria", alignment: "center" },
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
    .download(`Certificado_Del_Estudiante_${Exalumno.Nombre}.pdf`);

  // === 2. Guardar registro en la BD con el formato correcto
  const user = localStorage.getItem("usuario");
  const registroPayload = {
    nom_Usuario: user || 'user',
    Fecha_creacion: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    Id_estudiante: Number(Exalumno.ID_EXAlumno),
    Descripcion: "Certificado de Notas",
    Nom_estudiante: `${data.Nombre} ${data.Apellido}`,
  };

  await crearRegistro(registroPayload);

};

export { createPDF };
