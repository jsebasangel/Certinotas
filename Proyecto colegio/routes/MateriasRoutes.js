// routes/materiasRoutes.js
const express = require('express');
const router = express.Router();
const MateriasController = require('../controllers/MateriasController');

/**
 * @swagger
 * tags:
 *   name: Materias
 *   description: Endpoints relacionados con la gestión de materias, notas y estadísticas.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         Nombre_Curso:
 *           type: string
 *           example: "11M"
 *         Descripcion:
 *           type: string
 *           example: "(11o) UNDÉCIMO"
 *         year:
 *           type: integer
 *           example: 2012
 *     Materia:
 *       type: object
 *       properties:
 *         ID_Materias:
 *           type: integer
 *           example: 16
 *         ID_exalumno:
 *           type: integer
 *           example: 10
 *         ID_Curso:
 *           type: integer
 *           example: 4
 *         COD_Materias:
 *           type: integer
 *           example: 321
 *         Estado_Aprobacion:
 *           type: string
 *           nullable: true
 *           example: null
 *         Nombre:
 *           type: string
 *           example: "Tecnología e Informática"
 *         Nota:
 *           type: number
 *           format: float
 *           example: 4.5
 *         Curso:
 *           $ref: '#/components/schemas/Curso'
 */

/**
 * @swagger
 * /materias:
 *   get:
 *     summary: Obtener todas las materias registradas
 *     description: Devuelve un arreglo con todas las materias, incluyendo información del curso al que pertenecen.
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de todas las materias registradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', MateriasController.getAllMaterias);

/**
 * @swagger
 * /materias/{id}:
 *   get:
 *     summary: Obtener una materia por su ID
 *     description: Retorna la información detallada de una materia específica incluyendo sus datos de curso.
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la materia que se desea consultar
 *     responses:
 *       200:
 *         description: Información de la materia solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       400:
 *         description: ID inválido o no proporcionado
 *       404:
 *         description: No se encontró ninguna materia con el ID especificado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', MateriasController.getMateriasByExAlumnoId);


/**
 * @swagger
 * /materias/exalumno/{id_exalumno}:
 *   get:
 *     summary: Obtener materias cursadas por un exalumno
 *     description: Devuelve un arreglo con todas las materias asociadas a un exalumno específico, incluyendo detalles del curso.
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id_exalumno
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del exalumno cuyas materias se desean consultar
 *     responses:
 *       200:
 *         description: Lista de materias cursadas por el exalumno
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       400:
 *         description: El ID del exalumno no fue proporcionado o no es válido
 *       404:
 *         description: No se encontraron materias asociadas al exalumno especificado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/exalumno/:id_exalumno', MateriasController.getMateriasByExAlumnoId);
/**
 * @swagger
 * /materias/certificado/{id_exalumno}/{nombre_curso}:
 *   get:
 *     summary: Obtener materias aprobadas de un exalumno filtradas por nombre de curso
 *     description: Devuelve todas las materias que cursó un exalumno específico en un curso determinado, incluyendo información del curso y las notas obtenidas.
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id_exalumno
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del exalumno
 *       - in: path
 *         name: nombre_curso
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre exacto del curso (por ejemplo, "11M")
 *     responses:
 *       200:
 *         description: Lista de materias aprobadas por el exalumno en el curso especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 *       400:
 *         description: Parámetros faltantes o inválidos
 *       404:
 *         description: No se encontraron materias para el exalumno en el curso especificado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/certificado/:id_exalumno/:nombre_curso', MateriasController.getDistinctApprovedCourses);
/**
 * @swagger
 * /materias/cursos-aprobados/{id_exalumno}:
 *   get:
 *     summary: Obtener lista de cursos aprobados por un exalumno
 *     description: Devuelve una lista única de los cursos que un exalumno ha aprobado, incluyendo el nombre del curso, el año y su descripción.
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id_exalumno
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del exalumno
 *     responses:
 *       200:
 *         description: Lista de cursos aprobados por el exalumno
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Nombre_Curso:
 *                     type: string
 *                     example: "11M"
 *                     description: Nombre del curso aprobado
 *                   year:
 *                     type: integer
 *                     example: 2012
 *                     description: Año en el que se aprobó el curso
 *                   Descripcion:
 *                     type: string
 *                     example: "(11o) UNDÉCIMO"
 *                     description: Descripción del curso
 *       400:
 *         description: Parámetros faltantes o inválidos
 *       404:
 *         description: No se encontraron cursos aprobados para el exalumno especificado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/cursos-aprobados/:id_exalumno', MateriasController.getDistinctApprovedCourses);


/**
 * @swagger
 * /materias:
 *   post:
 *     summary: Crear una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Materias:
 *                 type: integer
 *                 example: 16
 *               ID_exalumno:
 *                 type: integer
 *                 example: 10
 *               ID_Curso:
 *                 type: integer
 *                 example: 4
 *               COD_Materias:
 *                 type: string
 *                 example: "321"
 *               Estado_Aprobacion:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               Nombre:
 *                 type: string
 *                 example: "Tecnología e Informática"
 *               Nota:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *              
 *     responses:
 *       201:
 *         description: Materia creada exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', MateriasController.createMateria);


/**
 * @swagger
 * /materias/{id}:
 *   put:
 *     summary: Actualizar una materia por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia que se desea actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Materias:
 *                 type: integer
 *                 example: 16
 *               ID_exalumno:
 *                 type: integer
 *                 example: 10
 *               ID_Curso:
 *                 type: integer
 *                 example: 4
 *               COD_Materias:
 *                 type: string
 *                 example: "321"
 *               Estado_Aprobacion:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               Nombre:
 *                 type: string
 *                 example: "Tecnología e Informática"
 *               Nota:
 *                 type: number
 *                 format: float
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Materia actualizada correctamente
 *       400:
 *         description: Datos inválidos o incompletos
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', MateriasController.updateMateria);


/**
 * @swagger
 * /materias/{id}:
 *   delete:
 *     summary: Eliminar una materia por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la materia a eliminar
 *     responses:
 *       200:
 *         description: Materia eliminada exitosamente
 */
router.delete('/:id', MateriasController.deleteMateria);
/**
 * @swagger
 * /materias/conteo/conteo:
 *   get:
 *     summary: Contar exalumnos por curso con nota >= 60
 *     tags: [Materias]
 *     parameters:
 *       - in: query
 *         name: idCurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso del cual se desea obtener el conteo de exalumnos aprobados
 *     responses:
 *       200:
 *         description: Total de exalumnos que aprobaron el curso especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExAlumnos:
 *                   type: integer
 *                   description: Número total de exalumnos con nota mayor o igual a 60 en ese curso
 *                   example: 0
 *       400:
 *         description: Parámetros inválidos o faltantes
 *       500:
 *         description: Error interno del servidor
 */
router.get('/conteo/conteo', MateriasController.getConteoExAlumnosPorCurso);

/**
 * @swagger
 * /materias/promedio/promedio:
 *   get:
 *     summary: Obtener promedio de notas por año
 *     tags: [Materias]
 *     description: Devuelve el promedio de notas, la nota mínima, la nota máxima y el total de materias registradas agrupadas por año.
 *     responses:
 *       200:
 *         description: Lista con estadísticas de materias por año
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Año:
 *                     type: integer
 *                     description: Año académico al que pertenecen las materias
 *                     example: 2012
 *                   Promedio_Nota:
 *                     type: number
 *                     format: float
 *                     description: Promedio de las notas en el año
 *                     example: 4.08
 *                   Nota_Mínima:
 *                     type: number
 *                     format: float
 *                     description: Nota más baja registrada en el año
 *                     example: 3.8
 *                   Nota_Máxima:
 *                     type: number
 *                     format: float
 *                     description: Nota más alta registrada en el año
 *                     example: 4.5
 *                   Total_Materias:
 *                     type: integer
 *                     description: Número total de materias evaluadas en el año
 *                     example: 5
 *       500:
 *         description: Error interno del servidor
 */
router.get('/promedio/promedio', MateriasController.getPromediosNotasPorAño);

/**
 * @swagger
 * /materias/materias/nombres:
 *   get:
 *     summary: Obtener nombres de materias por año
 *     tags: [Materias]
 *     description: Retorna una lista con los nombres de todas las materias registradas en un año específico.
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año académico por el cual filtrar las materias
 *         example: 2012
 *     responses:
 *       200:
 *         description: Lista de materias correspondientes al año especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Año:
 *                     type: integer
 *                     description: Año académico al que pertenece la materia
 *                     example: 2012
 *                   Nombre_Materia:
 *                     type: string
 *                     description: Nombre de la materia registrada en ese año
 *                     example: Ciencia Política
 *       400:
 *         description: Parámetro 'year' faltante o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/materias/nombres', MateriasController.getMateriasPorAnio);


module.exports = router;
