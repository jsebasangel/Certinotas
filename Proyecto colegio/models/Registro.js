// models/Registro.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/database'); // Ajusta la ruta a tu config

const Registro = sequelize.define("Registro", {
  idRegistro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_Usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_creacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  Id_estudiante: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Nom_estudiante: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "Registro",
  timestamps: false
});

module.exports = Registro;
