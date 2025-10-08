import { useState, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
const BACKEND_URL = import.meta.env.VITE_BACKEND;
console.log(BACKEND_URL);
export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 👉 Login: ahora se hace la validación en el backend
  const handleSignIn = useCallback(async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/Usuario/login`, {
        correo: email,
        password: passwordInput,
      });

      // ✅ Guardar datos mínimos en localStorage
      localStorage.setItem("usuario", response.data.usuario.correo);
      localStorage.setItem("username", response.data.usuario.nombre);

      setSnackbar({
        open: true,
        message: 'Inicio de sesión correcto',
        severity: 'success',
      });

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Usuario o Contraseña incorrecta',
        severity: 'error',
      });
    }
  }, [router, email, passwordInput]);

  // 👉 Forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      setSnackbar({
        open: true,
        message: 'Por favor ingresa tu correo',
        severity: 'warning',
      });
      return;
    }

    try {
      // 1️⃣ Consultar si el usuario existe
      const usuarioResponse = await axios.get(
        `${BACKEND_URL}/api/Usuario/correo/${email}`
      );

      if (!usuarioResponse.data?.idUsuarios) {
        setSnackbar({
          open: true,
          message: 'Usuario no encontrado',
          severity: 'error',
        });
        return;
      }

      const id = usuarioResponse.data.idUsuarios;

      // 2️⃣ Enviar correo de recuperación
      await axios.post(`${BACKEND_URL}/api/Usuario/${id}/forgot-password`);

      setSnackbar({
        open: true,
        message: 'Correo de recuperación enviado',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error en forgot password:', error);
      setSnackbar({
        open: true,
        message: 'No se pudo enviar el correo de recuperación',
        severity: 'error',
      });
    }
  };

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue=""
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link
        component="button"
        variant="body2"
        color="inherit"
        sx={{ mb: 1.5 }}
        onClick={handleForgotPassword}
      >
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error" | "info" | "warning"}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
