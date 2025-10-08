import { useState, useCallback } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { Iconify } from 'src/components/iconify';
const BACKEND_URL = import.meta.env.VITE_BACKEND;

// ----------------------------------------------------------------------

export type UserProps = {
  idEstudiante: string;
  id: string; // ID_Documento
  nombre: string;
  apellido: string;
  fecha: string;
  telefono: string;
  correo: string;
  avatarUrl: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
    onUpdateRow: (updatedRow: UserProps) => void; 
};

export function UserTableRow({ row, selected, onSelectRow,onUpdateRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState(row);

  // Para el popup de confirmación
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleOpenDialog = () => {
    setFormValues(row); // recarga los valores del estudiante
    setOpenDialog(true);
    handleClosePopover();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ID_EXAlumno: parseInt(formValues.idEstudiante, 10),
        Nombre: formValues.nombre,
        Apellido: formValues.apellido,
        Fecha_Nacimiento: formValues.fecha,
        Direccion: "cra 46 No 134a 15", // <- opcional, podrías meter otro input
        Telefono: formValues.telefono,
        Correo_Electronico: formValues.correo,
      };

      await axios.put(
        `${BACKEND_URL}/api/exalumnos/${formValues.idEstudiante}`,
        payload
      );
        onUpdateRow({
        ...row,
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        fecha: formValues.fecha,
        telefono: formValues.telefono,
        correo: formValues.correo,
      });
      setSnackbar({
        open: true,
        message: '✅ Estudiante actualizado correctamente',
        severity: 'success',
      });

      handleCloseDialog();
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      setSnackbar({
        open: true,
        message: '❌ Error al actualizar el estudiante',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt={row.nombre} src={row.avatarUrl} />
            {row.nombre} {row.apellido}
          </Box>
        </TableCell>
        <TableCell>{row.fecha}</TableCell>
        <TableCell>{row.telefono}</TableCell>
        <TableCell>{row.correo}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Menú contextual */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleOpenDialog}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Pop-up de edición */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Editar Estudiante</DialogTitle>
        <DialogContent dividers>
<TextField
  margin="dense"
  label="Número de Documento"
  name="id"
  value={formValues.id}

  fullWidth
  InputProps={{
    readOnly: true,
  }}
/>

          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Apellido"
            name="apellido"
            value={formValues.apellido}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Fecha de Nacimiento"
            name="fecha"
            type="date"
            value={formValues.fecha}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Teléfono"
            name="telefono"
            value={formValues.telefono}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Correo Electrónico"
            name="correo"
            value={formValues.correo}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
