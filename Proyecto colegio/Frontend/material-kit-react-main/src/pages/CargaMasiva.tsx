import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const BACKEND_URL = import.meta.env.VITE_BACKEND;

const CargaDataPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [exalumnos, setExalumnos] = useState([]);

  // Manejar archivo seleccionado
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Subir CSV al backend
  const handleUpload = async () => {
    if (!file) {
      setMessage("Por favor selecciona un archivo CSV");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/carga/carga-masiva`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Datos cargados exitosamente");
        setExalumnos(result.exalumnos || []);
      } else {
        setMessage(`❌ Error: ${result.error || "No se pudo cargar"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Carga Masiva de Datos
      </Typography>

      {/* Card para subir CSV */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "#f5f5f5" }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          alignItems="center"
        >
          {/* Input oculto y botón estilizado */}
          <label htmlFor="file-upload" style={{ flex: 1 }}>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{
                borderRadius: "50px",
                minWidth: 180,
                height: 45,
                textTransform: "none",
              }}
              disabled={loading}
            >
              {file ? file.name : "Seleccionar CSV"}
            </Button>
          </label>

          {/* Botón para subir archivo */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading || !file}
            sx={{ minWidth: 150, height: 45 }}
          >
            {loading ? "Cargando..." : "Cargar CSV"}
          </Button>
        </Box>

        {/* Mensaje de estado */}
        {message && (
          <Typography
            mt={2}
            color={message.startsWith("✅") ? "green" : "error"}
          >
            {message}
          </Typography>
        )}
      </Paper>

      {/* Tabla de exalumnos */}
      {exalumnos.length > 0 && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Exalumnos Cargados
          </Typography>
          <Table>
            <TableHead sx={{ bgcolor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "black" }}>ID</TableCell>
                <TableCell sx={{ color: "black" }}>Nombre</TableCell>
                <TableCell sx={{ color: "black" }}>Apellido</TableCell>
                <TableCell sx={{ color: "black" }}>Documento</TableCell>
                <TableCell sx={{ color: "black" }}>Correo</TableCell>
                <TableCell sx={{ color: "black" }}>Materia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exalumnos.map((exa, index) => (
                <TableRow key={index} hover>
                  <TableCell>{exa.Identificacion}</TableCell>
                  <TableCell>{exa.Nombre}</TableCell>
                  <TableCell>{exa.Apellido}</TableCell>
                  <TableCell>{exa.Telefono}</TableCell>
                  <TableCell>{exa.Correo_Electronico}</TableCell>
                  <TableCell>{exa.Materia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default CargaDataPage;
