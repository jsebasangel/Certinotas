// routes/exAlumnoRoutes.js
const express = require('express');
const router = express.Router();
const EXAlumnoController = require('../controllers/EXAlumnoController');

/**
 * @swagger
 * tags:
 *   name: ExAlumnos
 *   description: Endpoints relacionados con la gestión de exalumnos
 */
/**
 * @swagger
 * /exalumnos:
 *   get:
 *     summary: Obtener todos los exalumnos
 *     tags: [ExAlumnos]
 *     description: Retorna una lista completa de todos los exalumnos registrados en el sistema junto con su información de documento.
 *     responses:
 *       200:
 *         description: Lista de exalumnos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_EXAlumno:
 *                     type: integer
 *                     example: 10
 *                   Numero_Documento:
 *                     type: string
 *                     example: "1019126544"
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Nombre:
 *                     type: string
 *                     example: "Juan"
 *                   Apellido:
 *                     type: string
 *                     example: "Pérez"
 *                   Fecha_Nacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-10-05"
 *                   Direccion:
 *                     type: string
 *                     example: "Calle 1 #10-20"
 *                   Telefono:
 *                     type: string
 *                     example: "3001112222"
 *                   Correo_Electronico:
 *                     type: string
 *                     example: "jperez@mail.com"
 *                   tipoDocumento:
 *                     type: object
 *                     properties:
 *                       ID_Documento:
 *                         type: integer
 *                         example: 10
 *                       Tipo_Documento:
 *                         type: string
 *                         example: "CC"
 *                       Numero:
 *                         type: string
 *                         example: "1019126544"
 *                       Lugar_Expedicion:
 *                         type: string
 *                         example: "Bogota D.C"
 */
router.get('/', EXAlumnoController.getAllEXAlumnos);


/**
 * @swagger
 * /exalumnos/{id}:
 *   get:
 *     summary: Obtener un exalumno por su ID
 *     tags: [ExAlumnos]
 *     description: Retorna la información detallada de un exalumno específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del exalumno a consultar
 *     responses:
 *       200:
 *         description: Información del exalumno obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_EXAlumno:
 *                     type: integer
 *                     example: 10
 *                   Numero_Documento:
 *                     type: string
 *                     example: "1019126544"
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Nombre:
 *                     type: string
 *                     example: "Juan"
 *                   Apellido:
 *                     type: string
 *                     example: "Pérez"
 *                   Fecha_Nacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-10-05"
 *                   Direccion:
 *                     type: string
 *                     example: "Calle 1 #10-20"
 *                   Telefono:
 *                     type: string
 *                     example: "3001112222"
 *                   Correo_Electronico:
 *                     type: string
 *                     example: "jperez@mail.com"
 *       404:
 *         description: Exalumno no encontrado
 */
router.get('/:id', EXAlumnoController.getEXAlumnoById);


/**
 * @swagger
 * /exalumnos:
 *   post:
 *     summary: Crear un nuevo exalumno
 *     tags: [ExAlumnos]
 *     description: Registra un nuevo exalumno en el sistema con toda su información personal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Numero_Documento:
 *                 type: string
 *                 example: "1019126544"
 *               ID_Documento:
 *                 type: integer
 *                 example: 10
 *               Nombre:
 *                 type: string
 *                 example: "Juan"
 *               Apellido:
 *                 type: string
 *                 example: "Pérez"
 *               Fecha_Nacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-10-05"
 *               Direccion:
 *                 type: string
 *                 example: "Calle 1 #10-20"
 *               Telefono:
 *                 type: string
 *                 example: "3001112222"
 *               Correo_Electronico:
 *                 type: string
 *                 example: "jperez@mail.com"
 *     responses:
 *       201:
 *         description: Exalumno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_EXAlumno:
 *                     type: integer
 *                     example: 10
 *                   Numero_Documento:
 *                     type: string
 *                     example: "1019126544"
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Nombre:
 *                     type: string
 *                     example: "Juan"
 *                   Apellido:
 *                     type: string
 *                     example: "Pérez"
 *                   Fecha_Nacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-10-05"
 *                   Direccion:
 *                     type: string
 *                     example: "Calle 1 #10-20"
 *                   Telefono:
 *                     type: string
 *                     example: "3001112222"
 *                   Correo_Electronico:
 *                     type: string
 *                     example: "jperez@mail.com"
 */
router.post('/', EXAlumnoController.createEXAlumno);

/**
 * @swagger
 * /exalumnos/{id}:
 *   put:
 *     summary: Actualizar información de un exalumno
 *     tags: [ExAlumnos]
 *     description: Actualiza todos los datos personales de un exalumno existente en el sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del exalumno a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Numero_Documento:
 *                 type: string
 *                 example: "1019126544"
 *               ID_Documento:
 *                 type: integer
 *                 example: 10
 *               Nombre:
 *                 type: string
 *                 example: "Juan"
 *               Apellido:
 *                 type: string
 *                 example: "Pérez"
 *               Fecha_Nacimiento:
 *                 type: string
 *                 format: date
 *                 example: "1990-10-05"
 *               Direccion:
 *                 type: string
 *                 example: "Calle 1 #10-20"
 *               Telefono:
 *                 type: string
 *                 example: "3001112222"
 *               Correo_Electronico:
 *                 type: string
 *                 example: "jperez@mail.com"
 *     responses:
 *       200:
 *         description: Exalumno actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_EXAlumno:
 *                     type: integer
 *                     example: 10
 *                   Numero_Documento:
 *                     type: string
 *                     example: "1019126544"
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Nombre:
 *                     type: string
 *                     example: "Juan"
 *                   Apellido:
 *                     type: string
 *                     example: "Pérez"
 *                   Fecha_Nacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-10-05"
 *                   Direccion:
 *                     type: string
 *                     example: "Calle 1 #10-20"
 *                   Telefono:
 *                     type: string
 *                     example: "3001112222"
 *                   Correo_Electronico:
 *                     type: string
 *                     example: "jperez@mail.com"
 *       404:
 *         description: Exalumno no encontrado
 */
router.put('/:id', EXAlumnoController.updateEXAlumno);



/**
 * @swagger
 * /exalumnos/{id}:
 *   delete:
 *     summary: Eliminar un exalumno
 *     tags: [ExAlumnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del exalumno a eliminar
 *     responses:
 *       200:
 *         description: Exalumno eliminado exitosamente
 *       404:
 *         description: Exalumno no encontrado
 */
router.delete('/:id', EXAlumnoController.deleteEXAlumno);
/**
 * @swagger
 * /exalumnos/nombre/nombre:
 *   get:
 *     summary: Buscar exalumnos por nombre
 *     tags: [ExAlumnos]
 *     description: Permite buscar uno o varios exalumnos por su nombre o parte del mismo.
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o fragmento del nombre del exalumno a buscar
 *     responses:
 *       200:
 *         description: Lista de exalumnos que coinciden con el criterio de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_EXAlumno:
 *                     type: integer
 *                     example: 10
 *                   Numero_Documento:
 *                     type: string
 *                     example: "1019126544"
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Nombre:
 *                     type: string
 *                     example: "Juan"
 *                   Apellido:
 *                     type: string
 *                     example: "Pérez"
 *                   Fecha_Nacimiento:
 *                     type: string
 *                     format: date
 *                     example: "1990-10-05"
 *                   Direccion:
 *                     type: string
 *                     example: "Calle 1 #10-20"
 *                   Telefono:
 *                     type: string
 *                     example: "3001112222"
 *                   Correo_Electronico:
 *                     type: string
 *                     example: "jperez@mail.com"
 *       404:
 *         description: No se encontraron exalumnos con ese nombre
 */
router.get('/nombre/nombre', EXAlumnoController.searchExAlumnoByName);


module.exports = router;
