import { useState } from "react";
import { crearRegistro } from "src/utils/RegistroPDF";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import jsPDF from "jspdf";

export default function CertificadoGraduacionPage() {
  const [formValues, setFormValues] = useState({
    nombre: "JUAN DAVID ROBAYO BAUTISTA",
    documento: "94041604922",
    tipoDocumento: "T.I.",
    ciudad: "BOGOTÁ",
    grado: "(9o) NOVENO",
    anio: "2009",
    fecha: "2025-09-16",
    rector: "María Gómez",
    secretario: "Carlos Ramírez",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
// === 2. Guardar registro en la BD
  const user = localStorage.getItem("usuario");
  const registroPayload = {
    nom_Usuario: user || 'user',
    Fecha_creacion: new Date().toISOString().split("T")[0],
    Id_estudiante: Number(formValues.documento),
    Descripcion: "Certificado de Graduación Curso",
    Nom_estudiante: `${formValues.nombre}`,
  };

  await crearRegistro(registroPayload);
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(14);

    doc.text("CERTIFICADO DE GRADUACIÓN DE CURSO", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(
      `Que ${formValues.nombre}, identificado con ${formValues.tipoDocumento}: ${formValues.documento} de ${formValues.ciudad}, ha cursado y aprobado satisfactoriamente en este plantel el grado ${formValues.grado} correspondiente al año ${formValues.anio}.`,
      20,
      40,
      { maxWidth: 170 }
    );

    doc.text(
      `Por lo tanto, se le reconoce como graduado en conformidad con las disposiciones vigentes.`,
      20,
      70,
      { maxWidth: 170 }
    );

    doc.text(
      `Dado en Bogotá D.C. a los ${new Date(formValues.fecha).getDate()} días del mes de ${new Date(formValues.fecha).toLocaleDateString("es-ES", { month: "long" }).toUpperCase()} de ${new Date(formValues.fecha).getFullYear()}`,
      20,
      100,
      { maxWidth: 170 }
    );

    doc.text(`Firma del Rector`, 20, 130);
    doc.text(`Rector: ${formValues.rector}`, 20, 140);

    doc.text(`Firma del Secretario`, 20, 160);
    doc.text(`Secretario Académico: ${formValues.secretario}`, 20, 170);

    doc.save(`Certificado_Graduacion_${formValues.nombre}.pdf`);
  };

  return (
    <Box display="flex" gap={4} p={4}>
      {/* Formulario */}
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Formulario Certificado de Graduación
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="Nombre del Estudiante"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Tipo Documento"
            name="tipoDocumento"
            value={formValues.tipoDocumento}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Número Documento"
            name="documento"
            value={formValues.documento}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Ciudad"
            name="ciudad"
            value={formValues.ciudad}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Grado"
            name="grado"
            value={formValues.grado}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Año"
            name="anio"
            value={formValues.anio}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            type="date"
            label="Fecha"
            name="fecha"
            value={formValues.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Rector"
            name="rector"
            value={formValues.rector}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Secretario Académico"
            name="secretario"
            value={formValues.secretario}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Guardar Certificado (PDF)
          </Button>
        </form>
      </Box>

      {/* Previsualización */}
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Previsualización del Certificado
        </Typography>
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#fafafa" }}>
          <Typography variant="h6" align="center">
            CERTIFICADO DE GRADUACIÓN DE CURSO
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Que <b>{formValues.nombre}</b>, identificado con{" "}
            <b>{formValues.tipoDocumento}: {formValues.documento}</b> de{" "}
            <b>{formValues.ciudad}</b>, ha cursado y aprobado satisfactoriamente en este
            plantel el grado <b>{formValues.grado}</b> correspondiente al año{" "}
            <b>{formValues.anio}</b>.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Por lo tanto, se le reconoce como graduado en conformidad con las
            disposiciones vigentes.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Dado en Bogotá D.C. a los{" "}
            <b>{new Date(formValues.fecha).getDate()}</b> días del mes de{" "}
            <b>
              {new Date(formValues.fecha).toLocaleDateString("es-ES", {
                month: "long",
              }).toUpperCase()}
            </b>{" "}
            de <b>{new Date(formValues.fecha).getFullYear()}</b>.
          </Typography>
          <Typography variant="body1" sx={{ mt: 4 }}>
            Firma del Rector
          </Typography>
          <Typography variant="body1">
            Rector: <b>{formValues.rector}</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Firma del Secretario
          </Typography>
          <Typography variant="body1">
            Secretario Académico: <b>{formValues.secretario}</b>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
