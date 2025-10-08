const express = require("express");
const multer = require("multer");
const path = require("path");
const cargaMasiva = require("../controllers/CargaController.js"); // ✅ función de carga

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

/**
 * @swagger
 * /carga-masiva:
 *   post:
 *     summary: Carga masiva de datos desde un archivo CSV
 *     tags: [CargaMasiva]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo CSV a cargar
 *     responses:
 *       200:
 *         description: Archivo procesado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Carga masiva completada exitosamente"
 *       400:
 *         description: Error al procesar el archivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Solo se permiten archivos CSV"
 */
router.post("/carga-masiva", upload.single("file"), cargaMasiva);

module.exports = router;
