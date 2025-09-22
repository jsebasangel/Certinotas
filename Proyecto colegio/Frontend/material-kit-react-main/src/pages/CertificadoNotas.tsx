import { useState, useEffect } from "react";
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
  MenuItem,
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

  const [opcionesMaterias, setOpcionesMaterias] = useState<string[]>([]);

  // Traer materias del backend según el año
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/base-materias/NombreMaterias/Materia?year=${formValues.anio}`);
        const data = await res.json();
        setOpcionesMaterias(data.map((m: any) => m.Nombre));
      } catch (error) {
        console.error("Error cargando materias:", error);
      }
    };
    fetchMaterias();
  }, [formValues.anio]);

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
    const defaultMateria = opcionesMaterias.length > 0 ? opcionesMaterias[0] : "";
    setMaterias([...materias, { nombre: defaultMateria, nota: 0 }]);
  };

  const removeMateria = (index: number) => setMaterias(materias.filter((_, i) => i !== index));

  const calcularPromedio = () => {
    if (materias.length === 0) return 0;
    const sum = materias.reduce((acc, m) => acc + m.nota, 0);
    return (sum / materias.length).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promedio = calcularPromedio();

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
    doc.text(`Grado ${formValues.grado} - Año ${formValues.anio}`, 20, 55);

    // --- Tabla de materias ---
    const startY = 70;
    const colX = [25, 130]; // posición X de columnas: Materia y Nota
    const rowHeight = 8;

    // Cabecera
    doc.setFont(undefined, "bold");
    doc.rect(colX[0]-2, startY-6, 170, rowHeight, "S"); // rectángulo cabecera
    doc.text("Materia", colX[0], startY);
    doc.text("Nota", colX[1], startY);
    doc.setFont(undefined, "normal");

    // Filas de materias
    materias.forEach((m, i) => {
      const y = startY + rowHeight + i*rowHeight;
      doc.rect(colX[0]-2, y-6, 170, rowHeight, "S"); // borde de la fila
      doc.text(m.nombre, colX[0], y);
      doc.text(m.nota.toFixed(2), colX[1], y);
    });

    let y = startY + rowHeight + materias.length * rowHeight + 10;
    doc.text(`Promedio: ${promedio}`, 20, y);
    y += 15;
    doc.text(`Comportamiento Escolar: ${formValues.comportamiento}`, 20, y);

    y += 30;
    const fecha = new Date(formValues.fecha);
    doc.text(
      `Dado en Bogotá D.C. a los ${fecha.getDate()} días del mes de ${fecha.toLocaleDateString(
        "es-ES",
        { month: "long" }
      ).toUpperCase()} de ${fecha.getFullYear()}`,
      20,
      y
    );

    // --- Firmas en la misma fila ---
    y += 30;
    const firmaWidth = 80; // ancho de línea
    const espacio = 10; // espacio entre líneas
    const startX1 = 40;
    const startX2 = startX1 + firmaWidth + espacio;

    // Líneas
    doc.line(startX1, y, startX1 + firmaWidth, y);
    doc.line(startX2, y, startX2 + firmaWidth, y);

    // Texto debajo de líneas
    doc.text(`Firma del Rector: ${formValues.rector}`, startX1, y + 8);
    doc.text(`Firma del Secretario: ${formValues.secretario}`, startX2, y + 8);

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
          {/* Campos básicos */}
          <TextField fullWidth margin="dense" label="Nombre" name="nombre" value={formValues.nombre} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Tipo Documento" name="tipoDocumento" value={formValues.tipoDocumento} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Documento" name="documento" value={formValues.documento} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Ciudad" name="ciudad" value={formValues.ciudad} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Grado" name="grado" value={formValues.grado} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Año" name="anio" value={formValues.anio} onChange={handleChange} />
          <TextField fullWidth margin="dense" type="date" label="Fecha" name="fecha" value={formValues.fecha} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField fullWidth margin="dense" label="Rector" name="rector" value={formValues.rector} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Secretario" name="secretario" value={formValues.secretario} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Comportamiento" name="comportamiento" value={formValues.comportamiento} onChange={handleChange} />

          {/* Materias */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Materias
          </Typography>
          {materias.map((m, i) => (
            <Box key={i} display="flex" gap={1} alignItems="center">
              <TextField
                select
                margin="dense"
                label="Materia"
                value={m.nombre}
                onChange={(e) => handleMateriaChange(i, "nombre", e.target.value)}
                sx={{ flex: 1 }}
              >
                {opcionesMaterias.map((opcion) => (
                  <MenuItem key={opcion} value={opcion}>
                    {opcion}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                label="Nota"
                type="number"
                value={m.nota}
                onChange={(e) => handleMateriaChange(i, "nota", e.target.value)}
                sx={{ width: 100 }}
              />
              <IconButton color="error" onClick={() => removeMateria(i)}>
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={addMateria} sx={{ mt: 1 }}>
            Agregar Materia
          </Button>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
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
            Que <b>{formValues.nombre}</b> con <b>{formValues.tipoDocumento}: {formValues.documento}</b> de <b>{formValues.ciudad}</b>, cursó y aprobó en este plantel los estudios que a continuación se relacionan:
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
            Dado en Bogotá D.C. a los <b>{new Date(formValues.fecha).getDate()}</b> días del mes de <b>{new Date(formValues.fecha).toLocaleDateString("es-ES", { month: "long" }).toUpperCase()}</b> de <b>{new Date(formValues.fecha).getFullYear()}</b>.
          </Typography>

          <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
            <Box textAlign="center">
              <Box sx={{ borderBottom: "1px solid #000", width: 120, mx: "auto" }} />
              Firma del Rector: <b>{formValues.rector}</b>
            </Box>
            <Box textAlign="center">
              <Box sx={{ borderBottom: "1px solid #000", width: 120, mx: "auto" }} />
              Firma del Secretario: <b>{formValues.secretario}</b>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
