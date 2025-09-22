const crypto = require('crypto');
const bcrypt = require('bcryptjs'); // Para encriptar la contraseña
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const { Console } = require('console');


// ----------------------------
// LOGIN
// ----------------------------
exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // 1️⃣ Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2️⃣ Comparar contraseñas
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3️⃣ Si todo bien → devolver usuario sin la contraseña
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.idUsuarios,
        correo: usuario.correo,
        nombre: usuario.Nombre,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { Nombre, correo, password } = req.body;

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      Nombre,
      correo,
      password
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, correo, password } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.Nombre = Nombre;
      usuario.correo = correo;
      usuario.password = password;

      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      res.status(204).json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Buscar un usuario por correo
exports.getUsuarioByCorreo = async (req, res) => {
  try {
    const { correo } = req.params;
    const usuario = await Usuario.findOne({ where: { correo } });

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado con el correo proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario por correo', error });
  }
};

/**
 * Restablecer contraseña con token
 * Ruta: PUT /api/usuarios/reset-password
 * Body: { token, id, newPassword }
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token, id, newPassword } = req.body;

    if (!token || !id || !newPassword) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Buscar usuario por id
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que exista token guardado
    if (!usuario.reset_token_hash || !usuario.reset_expires) {
      return res.status(400).json({ message: 'No existe un token válido para este usuario' });
    }

    // Verificar que no esté vencido
    if (usuario.reset_expires < new Date()) {
      return res.status(400).json({ message: 'El token ha expirado' });
    }

    // Hashear el token recibido y compararlo con el guardado
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    if (tokenHash !== usuario.reset_token_hash) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Guardar nueva contraseña y limpiar los campos del token
    usuario.password = hashedPassword;
    usuario.reset_token_hash = null;
    usuario.reset_expires = null;
    await usuario.save();

    return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    console.error('Error resetPassword:', error);
    return res.status(500).json({
      message: 'Error al restablecer la contraseña',
      error: error.message || error,
    });
  }
};


/**
 * Generar token de recuperación, guardarlo en la tabla usuarios (reset_token_hash, reset_expires)
 * y enviar correo al usuario con la URL de recuperación.
 *
 * Ruta sugerida: POST /api/usuarios/:id/forgot-password
 */
exports.sendResetPassword = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar usuario por id
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar token seguro y su hash
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Calcular expiración (por ejemplo 1 hora)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar hash y expiración en la misma fila de usuarios (columnas reset_token_hash, reset_expires)
    usuario.reset_token_hash = tokenHash;
    usuario.reset_expires = expiresAt;
    await usuario.save();

    // Construir la URL de recuperación (frontend)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3039/'; // ajusta según tu entorno
    const resetUrl = `${frontendUrl}/ResetPassword?token=${token}&id=${id}`;

    // Configurar transporter de nodemailer (usar variables de entorno)
    const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ⚠️ Solo en desarrollo
  },
});

    // Contenido del email
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"No Reply" <no-reply@example.com>',
      to: usuario.correo,
      subject: 'Recuperación de contraseña',
      text: `Hola ${usuario.Nombre},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n\n${resetUrl}\n\nEste enlace expirará en 1 hora.\n\nSi no solicitaste el restablecimiento, puedes ignorar este correo.`,
      html: `<p>Hola ${usuario.Nombre},</p>
             <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>
             <p>Este enlace expirará en 1 hora.</p>
             <p>Si no solicitaste el restablecimiento, puedes ignorar este correo.</p>`,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Correo de recuperación enviado' });
  } catch (error) {
    console.error('Error sendResetPassword:', error);
    return res.status(500).json({
      message: 'Error al generar token y enviar correo',
      error: error.message || error,
    });
  }
};
