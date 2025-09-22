// routes/cursoRoutes.js
const CursoController = require('../controllers/CursoController');
const express = require('express');
const router = express.Router();



// Nueva ruta para buscar por nombre
router.get('/buscar/nombre', CursoController.getCursosPorNombreYAño);

module.exports = router;
router.get('/', CursoController.getAllCursos);
router.get('/:id', CursoController.getCursoById);
router.post('/', CursoController.createCurso);
router.put('/:id', CursoController.updateCurso);
router.delete('/:id', CursoController.deleteCurso);
router.get("/cantidad/estudiantes", CursoController.getCantidadEstudiantesPorAnio);

module.exports = router;
