import { useState } from "react";
import { crearRegistro } from "src/utils/RegistroPDF";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import jsPDF from "jspdf";

export default function CertificadoNotasPage() {
  const [formValues, setFormValues] = useState({
    nombre: "JUAN DAVID ROBAYO BAUTISTA",
    documento: "94041604922",
    tipoDocumento: "T.I.",
    ciudad: "BOGOTÁ",
    grado: "903",
    anio: "2009",
    fecha: "2025-09-16",
    rector: "Carlos López",
    secretario: "Ana Martínez",
    comportamiento:"10.0",
  });

  const [materias, setMaterias] = useState([
    { nombre: "Disciplina", nota: 80 },
    { nombre: "Cuidado del entorno", nota: 75 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleMateriaChange = (
    index: number,
    field: "nombre" | "nota",
    value: string
  ) => {
    const newMaterias = [...materias];
    if (field === "nota") {
      newMaterias[index][field] = parseFloat(value) || 0;
    } else {
      newMaterias[index][field] = value;
    }
    setMaterias(newMaterias);
  };

  const addMateria = () => {
    setMaterias([...materias, { nombre: "", nota: 0 }]);
  };

  const removeMateria = (index: number) => {
    setMaterias(materias.filter((_, i) => i !== index));
  };

  const calcularPromedio = () => {
    if (materias.length === 0) return 0;
    const sum = materias.reduce((acc, m) => acc + m.nota, 0);
    return (sum / materias.length).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promedio = calcularPromedio();
    // === 2. Guardar registro en la BD
      const user = localStorage.getItem("usuario");
      const registroPayload = {
        nom_Usuario: user || 'user',
        Fecha_creacion: new Date().toISOString().split("T")[0],
        Id_estudiante: Number(formValues.documento),
        Descripcion: "Certificado de Notas",
        Nom_estudiante: `${formValues.nombre}`,
      };
    
      await crearRegistro(registroPayload);

    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(14);

    doc.text("CERTIFICADO DE NOTAS", 105, 20, { align: "center" });
    doc.setFontSize(12);

    doc.text(
      `Que ${formValues.nombre} con ${formValues.tipoDocumento}: ${formValues.documento} de ${formValues.ciudad}, cursó y aprobó en este plantel los estudios que a continuación se relacionan:`,
      20,
      40,
      { maxWidth: 170 }
    );

    doc.text(
      `Grado ${formValues.grado} - Año ${formValues.anio}`,
      20,
      55
    );

    // Tabla de materias
    let y = 70;
    materias.forEach((m, i) => {
      doc.text(`${m.nombre}: ${m.nota.toFixed(2)}`, 25, y + i * 8);
    });

    y += materias.length * 8 + 10;
    doc.text(`Promedio: ${promedio}`, 20, y);

    y += 15;
    doc.text(
      `Comportamiento Escolar: ${formValues.comportamiento}`,
      20,
      y
    );

    y += 20;
    const fecha = new Date(formValues.fecha);
    doc.text(
      `Dado en Bogotá D.C. a los ${fecha.getDate()} días del mes de ${fecha.toLocaleDateString(
        "es-ES",
        { month: "long" }
      ).toUpperCase()} de ${fecha.getFullYear()}`,
      20,
      y
    );

    y += 20;
    doc.text(`Firma del Rector: ${formValues.rector}`, 20, y);
    y += 15;
    doc.text(`Firma del Secretario: ${formValues.secretario}`, 20, y);

    doc.save(`Certificado_Notas_${formValues.nombre}.pdf`);
  };

  return (
    <Box display="flex" gap={4} p={4}>
      {/* Formulario */}
      <Box flex={1}>
        <Typography variant="h5" gutterBottom>
          Formulario Certificado de Notas
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth margin="dense" label="Nombre" name="nombre"
            value={formValues.nombre} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Tipo Documento" name="tipoDocumento"
            value={formValues.tipoDocumento} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Documento" name="documento"
            value={formValues.documento} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Ciudad" name="ciudad"
            value={formValues.ciudad} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Grado" name="grado"
            value={formValues.grado} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Año" name="anio"
            value={formValues.anio} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" type="date" label="Fecha"
            name="fecha" value={formValues.fecha}
            onChange={handleChange} InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth margin="dense" label="Rector" name="rector"
            value={formValues.rector} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Secretario" name="secretario"
            value={formValues.secretario} onChange={handleChange}
          />
          <TextField
            fullWidth margin="dense" label="Comportamiento" name="comportamiento"
            value={formValues.comportamiento} onChange={handleChange}
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Materias
          </Typography>
          {materias.map((m, i) => (
            <Box key={i} display="flex" gap={1} alignItems="center">
              <TextField
                margin="dense"
                label="Materia"
                value={m.nombre}
                onChange={(e) =>
                  handleMateriaChange(i, "nombre", e.target.value)
                }
              />
              <TextField
                margin="dense"
                label="Nota"
                type="number"
                value={m.nota}
                onChange={(e) =>
                  handleMateriaChange(i, "nota", e.target.value)
                }
              />
              <IconButton color="error" onClick={() => removeMateria(i)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={addMateria}
            sx={{ mt: 1 }}
          >
            Agregar Materia
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
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
            CERTIFICADO DE NOTAS
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Que <b>{formValues.nombre}</b> con{" "}
            <b>{formValues.tipoDocumento}: {formValues.documento}</b> de{" "}
            <b>{formValues.ciudad}</b>, cursó y aprobó en este plantel los
            estudios que a continuación se relacionan:
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Grado <b>{formValues.grado}</b> - Año <b>{formValues.anio}</b>
          </Typography>

          <Table size="small" sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Materia</TableCell>
                <TableCell>Nota</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materias.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.nombre}</TableCell>
                  <TableCell>{m.nota}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Promedio: <b>{calcularPromedio()}</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Comportamiento Escolar: <b>{formValues.comportamiento}</b>
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
            Firma del Rector: <b>{formValues.rector}</b>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Firma del Secretario: <b>{formValues.secretario}</b>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
