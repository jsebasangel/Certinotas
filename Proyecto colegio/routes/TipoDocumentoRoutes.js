// routes/tipoDocumentoRoutes.js
const express = require('express');
const router = express.Router();
const TipoDocumentoController = require('../controllers/TipoDocumentoController');

router.get('/', TipoDocumentoController.getAllTipoDocumentos);
router.get('/:id', TipoDocumentoController.getTipoDocumentoById);
router.post('/', TipoDocumentoController.createTipoDocumento);
router.put('/:id', TipoDocumentoController.updateTipoDocumento);
router.delete('/:id', TipoDocumentoController.deleteTipoDocumento);

module.exports = router;
