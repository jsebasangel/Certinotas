// routes/RegistroRoutes.js
const express = require("express");
const router = express.Router();
const RegistroController = require("../controllers/RegistroController");
// routes/RegistroRoutes.js
/**
 * @swagger
 * /registros:
 *   post:
 *     summary: Crear un nuevo registro
 *     tags: [Registros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_ExAlumno:
 *                 type: integer
 *                 description: ID del exalumno asociado al registro
 *               ID_Curso:
 *                 type: integer
 *                 description: ID del curso relacionado
 *               Fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro
 *               Observacion:
 *                 type: string
 *                 description: Observación o detalle del registro
 *             example:
 *               ID_ExAlumno: 10
 *               ID_Curso: 4
 *               Fecha: 2025-10-06
 *               Observacion: "Registro de asistencia"
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idRegistro:
 *                     type: integer
 *                     description: ID del registro creado
 *                   nom_Usuario:
 *                     type: string
 *                     description: Correo del usuario que creó el registro
 *                   Fecha_creacion:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del registro
 *                   Id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado
 *                   Descripcion:
 *                     type: string
 *                     description: Tipo o descripción del registro
 *                   Nom_estudiante:
 *                     type: string
 *                     description: Nombre completo del estudiante
 *             example:
 *               - idRegistro: 3
 *                 nom_Usuario: "jangelg@unbosque.edu.co"
 *                 Fecha_creacion: "2025-10-07T00:00:00.000Z"
 *                 Id_estudiante: 10
 *                 Descripcion: "Certificado de Notas"
 *                 Nom_estudiante: "Juan Pérez"
 */
router.post("/", RegistroController.createRegistro);

/**
 * @swagger
 * /registros:
 *   get:
 *     summary: Obtener todos los registros
 *     tags: [Registros]
 *     responses:
 *       200:
 *         description: Lista de registros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idRegistro:
 *                     type: integer
 *                     description: ID único del registro
 *                   nom_Usuario:
 *                     type: string
 *                     description: Correo del usuario que creó el registro
 *                   Fecha_creacion:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se creó el registro
 *                   Id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado al registro
 *                   Descripcion:
 *                     type: string
 *                     description: Descripción o tipo de registro
 *                   Nom_estudiante:
 *                     type: string
 *                     description: Nombre completo del estudiante
 *             example:
 *               - idRegistro: 3
 *                 nom_Usuario: "jangelg@unbosque.edu.co"
 *                 Fecha_creacion: "2025-10-07T00:00:00.000Z"
 *                 Id_estudiante: 10
 *                 Descripcion: "Certificado de Notas"
 *                 Nom_estudiante: "Juan Pérez"
 */
router.get("/", RegistroController.getRegistros);

/**
 * @swagger
 * /registros/{id}:
 *   get:
 *     summary: Obtener un registro por ID
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro a consultar
 *     responses:
 *       200:
 *         description: Registro obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idRegistro:
 *                   type: integer
 *                   description: ID único del registro
 *                 nom_Usuario:
 *                   type: string
 *                   description: Correo del usuario que creó el registro
 *                 Fecha_creacion:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora en que se creó el registro
 *                 Id_estudiante:
 *                   type: integer
 *                   description: ID del estudiante asociado al registro
 *                 Descripcion:
 *                   type: string
 *                   description: Descripción o tipo del registro
 *                 Nom_estudiante:
 *                   type: string
 *                   description: Nombre completo del estudiante
 *             example:
 *               idRegistro: 3
 *               nom_Usuario: "jangelg@unbosque.edu.co"
 *               Fecha_creacion: "2025-10-07T00:00:00.000Z"
 *               Id_estudiante: 10
 *               Descripcion: "Certificado de Notas"
 *               Nom_estudiante: "Juan Pérez"
 *       404:
 *         description: Registro no encontrado
 */
router.get("/:id", RegistroController.getRegistroById);

/**
 * @swagger
 * /registros/{id}:
 *   put:
 *     summary: Actualizar un registro por ID
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_ExAlumno:
 *                 type: integer
 *                 description: ID del exalumno asociado
 *               ID_Curso:
 *                 type: integer
 *                 description: ID del curso relacionado
 *               Fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro
 *               Observacion:
 *                 type: string
 *                 description: Observación o comentario del registro
 *             example:
 *               ID_ExAlumno: 10
 *               ID_Curso: 4
 *               Fecha: 2025-10-06
 *               Observacion: "Asistencia actualizada"
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idRegistro:
 *                   type: integer
 *                   description: ID del registro actualizado
 *                 nom_Usuario:
 *                   type: string
 *                   description: Correo del usuario que realizó la actualización
 *                 Fecha_creacion:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación o actualización del registro
 *                 Id_estudiante:
 *                   type: integer
 *                   description: ID del estudiante asociado
 *                 Descripcion:
 *                   type: string
 *                   description: Descripción o tipo del registro
 *                 Nom_estudiante:
 *                   type: string
 *                   description: Nombre completo del estudiante
 *             example:
 *               idRegistro: 3
 *               nom_Usuario: "jangelg@unbosque.edu.co"
 *               Fecha_creacion: "2025-10-07T00:00:00.000Z"
 *               Id_estudiante: 10
 *               Descripcion: "Certificado de Notas"
 *               Nom_estudiante: "Juan Pérez"
 *       404:
 *         description: Registro no encontrado
 */
router.put("/:id", RegistroController.updateRegistro);


/**
 * @swagger
 * /registros/{id}:
 *   delete:
 *     summary: Eliminar un registro por ID
 *     tags: [Registros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       404:
 *         description: Registro no encontrado
 */
router.delete("/:id", RegistroController.deleteRegistro);

module.exports = router;


