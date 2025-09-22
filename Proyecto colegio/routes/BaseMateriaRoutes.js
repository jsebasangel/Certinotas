const express = require('express');
const router = express.Router();
const baseMateriaController = require('../controllers/BaseMateriasController');

router.get('/', baseMateriaController.getAllBaseMaterias);
router.get('/:id', baseMateriaController.getBaseMateriaById);
router.get('/base-materias/codigo/:cod_materia', baseMateriaController.getBaseMateriaByCodigo); // Nueva ruta
router.post('/', baseMateriaController.createBaseMateria);
router.put('/:id', baseMateriaController.updateBaseMateria);
router.delete('/:id', baseMateriaController.deleteBaseMateria);
router.get('/NombreMaterias/Materia', baseMateriaController.getDistinctMaterias);


module.exports = router;
