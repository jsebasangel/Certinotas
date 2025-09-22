import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type FormValues = {
  nombre: string;
  apellido: string;
  fecha: string;
  documento: string;
};

export default function GenPDF4() {
  const [open, setOpen] = useState(false);

  // Simulamos los valores (luego puedes pasarlos por props o desde tu tabla)
  const [formValues] = useState<FormValues>({
    nombre: "Julian",
    apellido: "Angel",
    fecha: "12/09/1991",
    documento: "1000",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Botón para abrir la vista previa */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Previsualizar Certificado
      </Button>

      {/* Diálogo con la previsualización */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Vista Previa - Acta de Grado</DialogTitle>
        <DialogContent dividers>
          <div style={{ padding: "20px", fontSize: "16px", lineHeight: "1.8" }}>
            <p>
              El presente documento certifica que el estudiante{" "}
              <b>
                {formValues.nombre} {formValues.apellido}
              </b>
              , identificado con documento N.°{" "}
              <b>{formValues.documento}</b>, culminó
              satisfactoriamente sus estudios el día{" "}
              <b>{formValues.fecha}</b> y recibió el título correspondiente.
            </p>
            <br />
            <p>
              En constancia de lo anterior, se firma en la ciudad de Bogotá D.C.
            </p>
            <br />
            <p style={{ textAlign: "right" }}>
              __________________________ <br />
              <b>Secretario Académico</b>
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cerrar
          </Button>
          <Button variant="contained" color="primary">
            Generar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
