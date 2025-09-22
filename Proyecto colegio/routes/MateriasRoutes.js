// routes/materiasRoutes.js
const express = require('express');
const router = express.Router();
const MateriasController = require('../controllers/MateriasController');

router.get('/', MateriasController.getAllMaterias);
router.get('/:id', MateriasController.getMateriaById);
router.get('/exalumno/:id_exalumno', MateriasController.getMateriasByExAlumnoId);
router.get('/certificado/:id_exalumno/:nombre_curso', MateriasController.getMateriasByExAlumnoIdAndCursoName);
router.get('/cursos-aprobados/:id_exalumno', MateriasController.getDistinctApprovedCourses); // Nueva ruta
router.post('/', MateriasController.createMateria);
router.put('/:id', MateriasController.updateMateria);
router.delete('/:id', MateriasController.deleteMateria);
router.get("/conteo/conteo", MateriasController.getConteoExAlumnosPorCurso);

module.exports = router;
