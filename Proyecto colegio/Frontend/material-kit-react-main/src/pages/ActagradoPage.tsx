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

export default function ActaDeGradoPage() {
  const [formValues, setFormValues] = useState({
    numeroActa: "001",
    nombre: "Juan Sebastián Angel",
    documento: "123456789",
    grado: "11° Undécimo",
    fecha: "2025-09-16",
    secretario: "Carlos Ramírez",
    rector: "María Gómez",
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
    Descripcion: "Acta de grado",
    Nom_estudiante: `${formValues.nombre}`,
  };

  await crearRegistro(registroPayload);
    // Crear PDF
    const doc = new jsPDF();

    doc.setFont("times", "normal");
    doc.setFontSize(14);

    doc.text(`ACTA DE GRADO N.° ${formValues.numeroActa}`, 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(
      `En la ciudad de Bogotá, a los ${formValues.fecha}, el Colegio Santo Tomás de Aquino certifica que:`,
      20,
      40,
      { maxWidth: 170 }
    );

    doc.text(
      `El estudiante ${formValues.nombre}, identificado con documento N.° ${formValues.documento}, ha cumplido con todos los requisitos académicos exigidos por el plan de estudios y se le otorga el título correspondiente al grado ${formValues.grado}.`,
      20,
      60,
      { maxWidth: 170 }
    );

    doc.text(`En constancia, firman:`, 20, 90);

    doc.text(`Secretario Académico: ${formValues.secretario}`, 20, 110);
    doc.text(`Rector: ${formValues.rector}`, 20, 130);

    // Descargar el PDF
    doc.save(`Acta_Grado_${formValues.numeroActa}.pdf`);
  };

  return (
    <Box display="flex" gap={4} p={4}>
      {/* Formulario */}
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Formulario Acta de Grado
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="Número de Acta"
            name="numeroActa"
            value={formValues.numeroActa}
            onChange={handleChange}
          />
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
            label="Documento"
            name="documento"
            value={formValues.documento}
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
            type="date"
            label="Fecha de Grado"
            name="fecha"
            value={formValues.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Secretario Académico"
            name="secretario"
            value={formValues.secretario}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Rector"
            name="rector"
            value={formValues.rector}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Guardar Acta (PDF)
          </Button>
        </form>
      </Box>

      {/* Previsualización */}
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Previsualización del Acta
        </Typography>
        <Paper elevation={3} sx={{ p: 3, bgcolor: "#fafafa" }}>
          <Typography variant="h6" align="center">
            ACTA DE GRADO N.° {formValues.numeroActa}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            En la ciudad de Bogotá, a los <b>{formValues.fecha}</b>, el Colegio
            Santo Tomás de Aquino certifica que:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            El estudiante <b>{formValues.nombre}</b>, identificado con documento
            N.° <b>{formValues.documento}</b>, ha cumplido con todos los
            requisitos académicos exigidos por el plan de estudios y se le
            otorga el título correspondiente al grado{" "}
            <b>{formValues.grado}</b>.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            En constancia, firman:
          </Typography>
          <Typography variant="body1" sx={{ mt: 4 }}>
            Secretario Académico: <b>{formValues.secretario}</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Rector: <b>{formValues.rector}</b>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
