// routes/exAlumnoRoutes.js
const express = require('express');
const router = express.Router();
const EXAlumnoController = require('../controllers/EXAlumnoController');


router.get('/', EXAlumnoController.getAllEXAlumnos);
router.get('/:id', EXAlumnoController.getEXAlumnoById);
router.post('/', EXAlumnoController.createEXAlumno);
router.put('/:id', EXAlumnoController.updateEXAlumno);
router.delete('/:id', EXAlumnoController.deleteEXAlumno);
router.get('/nombre/nombre', EXAlumnoController.searchExAlumnoByName);

module.exports = router;
