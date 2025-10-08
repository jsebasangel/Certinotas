// routes/tipoDocumentoRoutes.js
const express = require('express');
const router = express.Router();
const TipoDocumentoController = require('../controllers/TipoDocumentoController');

/**
 * @swagger
 * tags:
 *   name: tipo_documento
 *   description: Gestión de tipos de documento
 */

/**
/**
 * @swagger
 * /tipo_documento:
 *   get:
 *     summary: Obtener todos los tipos de documento
 *     tags: [tipo_documento]
 *     responses:
 *       200:
 *         description: Lista de tipos de documento obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Tipo_Documento:
 *                     type: string
 *                     example: "CC"
 *                   Numero:
 *                     type: string
 *                     example: "1019126544"
 *                   Lugar_Expedicion:
 *                     type: string
 *                     example: "Bogota D.C"
 */
router.get('/', TipoDocumentoController.getAllTipoDocumentos);

/**
 * @swagger
 * /tipo_documento/{id}:
 *   get:
 *     summary: Obtener un tipo de documento por ID
 *     tags: [tipo_documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento
 *     responses:
 *       200:
 *         description: Tipo de documento obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Tipo_Documento:
 *                     type: string
 *                     example: "CC"
 *                   Numero:
 *                     type: string
 *                     example: "1019126544"
 *                   Lugar_Expedicion:
 *                     type: string
 *                     example: "Bogota D.C"
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.get('/:id', TipoDocumentoController.getTipoDocumentoById);

/**
 * @swagger
 * /tipo_documento:
 *   post:
 *     summary: Crear un nuevo tipo de documento
 *     tags: [tipo_documento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Tipo_Documento:
 *                     type: string
 *                     example: "CC"
 *                   Numero:
 *                     type: string
 *                     example: "1019126544"
 *                   Lugar_Expedicion:
 *                     type: string
 *                     example: "Bogota D.C"
 *     responses:
 *       201:
 *         description: Tipo de documento creado exitosamente
 *         content:
 *           
 */
router.post('/', TipoDocumentoController.createTipoDocumento);

/**
 * @swagger
 * /tipo_documento/{id}:
 *   put:
 *     summary: Actualizar un tipo de documento por ID
 *     tags: [tipo_documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Documento:
 *                     type: integer
 *                     example: 10
 *                   Tipo_Documento:
 *                     type: string
 *                     example: "CC"
 *                   Numero:
 *                     type: string
 *                     example: "1019126544"
 *                   Lugar_Expedicion:
 *                     type: string
 *                     example: "Bogota D.C"
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado correctamente
 *         content:
 *           
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.put('/:id', TipoDocumentoController.updateTipoDocumento);


/**
 * @swagger
 * /tipo_documento/{id}:
 *   delete:
 *     summary: Eliminar un tipo de documento por ID
 *     tags: [tipo_documento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de documento a eliminar
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado correctamente
 *       404:
 *         description: Tipo de documento no encontrado
 */
router.delete('/:id', TipoDocumentoController.deleteTipoDocumento);

module.exports = router;
