import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Snackbar, Alert } from "@mui/material";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const id = searchParams.get("id") || ""; // 👈 lo sacamos de la URL también

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Las contraseñas no coinciden",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.put("http://localhost:3000/api/Usuario/pass/reset-password", {
        token,
        id,
        newPassword: password,
      });

      setSnackbar({
        open: true,
        message: response.data.message || "Contraseña actualizada correctamente",
        severity: "success",
      });

      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error al actualizar contraseña:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error al actualizar la contraseña",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Restablecer Contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Guardar
        </Button>
      </form>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error" | "info"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
