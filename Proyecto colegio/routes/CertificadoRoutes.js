// routes/certificadoRoutes.js
const express = require('express');
const router = express.Router();
const CertificadoController = require('../controllers/CertificadoController');

router.get('/', CertificadoController.getAllCertificados);
router.get('/:id', CertificadoController.getCertificadoById);
router.post('/', CertificadoController.createCertificado);
router.put('/:id', CertificadoController.updateCertificado);
router.delete('/:id', CertificadoController.deleteCertificado);
router.get("/cantidad/certificados", CertificadoController.getCantidadCertificadosPorAnio);

module.exports = router;
