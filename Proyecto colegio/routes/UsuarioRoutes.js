const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

// Ruta para crear un nuevo usuario
router.post('/', usuarioController.createUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para actualizar un usuario
router.put('/:id', usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);
//Ruta para buscar por correo
router.get('/correo/:correo', usuarioController.getUsuarioByCorreo);
//ruta para servicio de correo cambio de password
router.post('/:id/forgot-password', usuarioController.sendResetPassword);
//ruta para cambiar password
router.put('/pass/reset-password', usuarioController.resetPassword);
//ruta para login
router.post("/login", usuarioController.login);


module.exports = router;
