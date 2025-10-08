// routes/baseMateriaRoutes.js
const express = require('express');
const router = express.Router();
const baseMateriaController = require('../controllers/BaseMateriasController');

/**
 * @swagger
 * /base-materias:
 *   get:
 *     summary: Obtener todas las materias base
 *     tags: [base-materias]
 *     description: Retorna una lista completa de todas las materias base registradas en el sistema.
 *     responses:
 *       200:
 *         description: Lista de materias base obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Base_Materia:
 *                     type: integer
 *                     example: 10
 *                   COD_Materia:
 *                     type: integer
 *                     example: 321
 *                   Creditos:
 *                     type: integer
 *                     example: 3
 *                   Nombre:
 *                     type: string
 *                     example: Tecnología e Informática
 *                   year:
 *                     type: string
 *                     format: date-time
 *                     example: "2012-01-01 00:00:00"
 */
router.get('/', baseMateriaController.getAllBaseMaterias);

/**
 * @swagger
 * /base-materias/{id}:
 *   get:
 *     summary: Obtener una materia base por ID
 *     tags: [base-materias]
 *     description: Retorna la información de una materia base específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia base a consultar
 *     responses:
 *       200:
 *         description: Materia base obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_Base_Materia:
 *                   type: integer
 *                   example: 11
 *                 COD_Materia:
 *                   type: integer
 *                   example: 125
 *                 Creditos:
 *                   type: integer
 *                   example: 2
 *                 Nombre:
 *                   type: string
 *                   example: Ciencia Política
 *                 year:
 *                   type: string
 *                   format: date-time
 *                   example: "2012-01-01 00:00:00"
 *       404:
 *         description: Materia base no encontrada
 */
router.get('/:id', baseMateriaController.getBaseMateriaById);


/**
 * @swagger
 * /base-materias/base-materias/codigo/{cod_materia}:
 *   get:
 *     summary: Obtener una materia base por su código
 *     tags: [base-materias]
 *     description: Retorna la información de una materia base según su código.
 *     parameters:
 *       - in: path
 *         name: cod_materia
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de la materia a consultar
 *     responses:
 *       200:
 *         description: Materia base obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_Base_Materia:
 *                   type: integer
 *                   example: 11
 *                 COD_Materia:
 *                   type: integer
 *                   example: 125
 *                 Creditos:
 *                   type: integer
 *                   example: 2
 *                 Nombre:
 *                   type: string
 *                   example: Ciencia Política
 *                 year:
 *                   type: string
 *                   format: date-time
 *                   example: "2012-01-01 00:00:00"
 *       404:
 *         description: Materia base no encontrada
 */
router.get('/base-materias/codigo/:cod_materia', baseMateriaController.getBaseMateriaByCodigo);
/**
 * @swagger
 * /base-materias:
 *   post:
 *     summary: Crear una nueva materia base
 *     tags: [base-materias]
 *     description: Permite crear una nueva materia base con su código, nombre, créditos y año.
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_Base_Materia:
 *                   type: integer
 *                   example: 11
 *                 COD_Materia:
 *                   type: string
 *                   example: "125"
 *                 Nombre:
 *                   type: string
 *                   example: "Ciencia Política"
 *                 Creditos:
 *                   type: integer
 *                   example: 2
 *                 year:
 *                   type: string
 *                   format: date-time
 *                   example: "2012-01-01 00:00:00"
 *     responses:
 *       201:
 *         description: Materia base creada exitosamente
 *         content:

 */
router.post('/', baseMateriaController.createBaseMateria);
/**
 * @swagger
 * /base-materias/{id}:
 *   put:
 *     summary: Actualizar una materia base por ID
 *     tags: [base-materias]
 *     description: Permite actualizar los datos de una materia base existente, incluyendo código, nombre, créditos y año.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia base a actualizar
 *     requestBody:
 *       required: true
 *       content:
*           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID_Base_Materia:
 *                   type: integer
 *                   example: 11
 *                 COD_Materia:
 *                   type: string
 *                   example: "125"
 *                 Nombre:
 *                   type: string
 *                   example: "Ciencia Política"
 *                 Creditos:
 *                   type: integer
 *                   example: 2
 *                 year:
 *                   type: string
 *                   format: date-time
 *                   example: "2012-01-01 00:00:00"
 *     responses:
 *       200:
 *         description: Materia base actualizada correctamente
 *         content:
 
 *       404:
 *         description: Materia base no encontrada
 */
router.put('/:id', baseMateriaController.updateBaseMateria);


/**
 * @swagger
 * /base-materias/{id}:
 *   delete:
 *     summary: Eliminar una materia base por ID
 *     tags: [base-materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia base a eliminar
 *     responses:
 *       200:
 *         description: Materia base eliminada correctamente
 *       404:
 *         description: Materia base no encontrada
 */
router.delete('/:id', baseMateriaController.deleteBaseMateria);
/**
 * @swagger
 * /base-materias/NombreMaterias/Materia:
 *   get:
 *     summary: Obtener nombres distintos de materias
 *     tags: [base-materias]
 *     description: Retorna una lista de nombres de materias distintas registradas en la base de materias.
 *     responses:
 *       200:
 *         description: Lista de nombres de materias distintos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Base_Materia:
 *                     type: integer
 *                     example: 11
 *                   COD_Materia:
 *                     type: integer
 *                     example: 125
 *                   Creditos:
 *                     type: integer
 *                     example: 2
 *                   Nombre:
 *                     type: string
 *                     example: "Ciencia Política"
 *                   year:
 *                     type: string
 *                     format: date-time
 *                     example: "2012-01-01 00:00:00"
 */
router.get('/NombreMaterias/Materia', baseMateriaController.getDistinctMaterias);


module.exports = router;

