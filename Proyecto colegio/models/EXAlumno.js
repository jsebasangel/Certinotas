// models/EXAlumno.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoDocumento = require('./TipoDocumento');

const EXAlumno = sequelize.define('EXAlumno', {
  ID_EXAlumno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Numero_Documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  ID_Documento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tipo_documento',   // Nombre de la tabla referenciada
      key: 'Tipo_documento'      // Clave primaria referenciada
    }
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Fecha_Nacimiento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Direccion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Telefono: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Correo_Electronico: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Numero: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Lugar_Expedicion: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'exalumno',
  timestamps: false
});

// 🔗 Relación con TipoDocumento
EXAlumno.belongsTo(TipoDocumento, {
  foreignKey: 'ID_Documento',
  as: 'tipoDocumento',  // Alias para acceder desde consultas con include
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

module.exports = EXAlumno;
