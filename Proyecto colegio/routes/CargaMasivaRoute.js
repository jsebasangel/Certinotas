const express = require("express");
const multer = require("multer");
const path = require("path");

const cargaMasiva = require("../controllers/CargaController.js"); // ✅ ahora es función

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Solo aceptar CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos CSV"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Ruta
router.post("/carga-masiva", upload.single("file"), cargaMasiva);

module.exports = router;
