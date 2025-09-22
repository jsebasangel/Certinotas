const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de configurar tu conexión a la base de datos

const Usuario = sequelize.define('Usuario', {
  idUsuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true, // Valida que sea un email
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

   reset_token_hash: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
   reset_expires: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  tableName: 'Usuarios',
  timestamps: false // Si no usas createdAt y updatedAt en la tabla
});

module.exports = Usuario;
