// routes/cursoRoutes.js
const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Endpoints para la gestión de cursos
 */
/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Curso:
 *                     type: integer
 *                     example: 4
 *                   Nombre_Curso:
 *                     type: string
 *                     example: 11M
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                   year:
 *                     type: integer
 *                     example: 2012
 */
router.get('/', CursoController.getAllCursos);


/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso a obtener
 *     responses:
 *       200:
 *         description: Curso obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Curso:
 *                     type: integer
 *                     example: 4
 *                   Nombre_Curso:
 *                     type: string
 *                     example: 11M
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                   year:
 *                     type: integer
 *                     example: 2012
 *       404:
 *         description: Curso no encontrado
 */
router.get('/:id', CursoController.getCursoById);


/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre_Curso:
 *                 type: string
 *                 example: 11M
 *               Descripcion:
 *                 type: string
 *                 example: "(11o) UNDÉCIMO"
 *               year:
 *                 type: integer
 *                 example: 2012
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Curso:
 *                     type: integer
 *                     example: 4
 *                   Nombre_Curso:
 *                     type: string
 *                     example: 11M
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                   year:
 *                     type: integer
 *                     example: 2012
 */
router.post('/', CursoController.createCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualizar un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 ID_Curso:
 *                   type: integer
 *                   example: 4
 *                 Nombre_Curso:
 *                   type: string
 *                   example: 11M
 *                 Descripcion:
 *                   type: string
 *                   example: "(11o) UNDÉCIMO"
 *                 year:
 *                   type: integer
 *                   example: 2012
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Curso:
 *                     type: integer
 *                     example: 4
 *                   Nombre_Curso:
 *                     type: string
 *                     example: 11M
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                   year:
 *                     type: integer
 *                     example: 2012
 *       404:
 *         description: Curso no encontrado
 */
router.put('/:id', CursoController.updateCurso);


/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Eliminar un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *       404:
 *         description: Curso no encontrado
 */
router.delete('/:id', CursoController.deleteCurso);
/**
 * @swagger
 * /cursos/buscar/nombre:
 *   get:
 *     summary: Buscar cursos por nombre y año
 *     tags: [Cursos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre del curso a buscar
 *       - in: query
 *         name: año
 *         required: false
 *         schema:
 *           type: integer
 *         description: Año del curso (opcional)
 *     responses:
 *       200:
 *         description: Lista de cursos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Curso:
 *                     type: integer
 *                     example: 4
 *                   Nombre_Curso:
 *                     type: string
 *                     example: 11M
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                   year:
 *                     type: integer
 *                     example: 2012
 *       404:
 *         description: No se encontraron cursos con los criterios especificados
 */
router.get('/buscar/nombre', CursoController.getCursosPorNombreYAño);

/**
 * @swagger
 * /cursos/cantidad/estudiantes:
 *   get:
 *     summary: Obtener la cantidad de estudiantes por año
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de años con la cantidad de estudiantes inscritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   year:
 *                     type: integer
 *                     example: 2011
 *                   cantidad_estudiantes:
 *                     type: integer
 *                     example: 1
 */
router.get('/cantidad/estudiantes', CursoController.getCantidadEstudiantesPorAnio);



module.exports = router;

