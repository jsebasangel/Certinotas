// models/TipoDocumento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoDocumento = sequelize.define('TipoDocumento', {
  Tipo_documento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Nombre_Tipo: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  tableName: 'tipo_documento',  // Nombre de la tabla en la base de datos
  timestamps: false             // No usa columnas createdAt ni updatedAt
});

module.exports = TipoDocumento;
