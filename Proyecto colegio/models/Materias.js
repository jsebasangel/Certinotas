// models/Materias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importamos los modelos relacionados
const EXAlumno = require('./EXAlumno');
const Curso = require('./Curso');
const BaseMateria = require('./BaseMaterias');

const Materias = sequelize.define('Materias', {
  ID_EXAlumno: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    references: {
      model: 'exalumno',
      key: 'ID_EXAlumno'
    }
  },
  ID_Curso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    references: {
      model: 'curso',
      key: 'ID_Curso'
    }
  },
  ID_Base_Materia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    references: {
      model: 'base_materia',
      key: 'ID_Base_Materia'
    }
  },
  Estado_Aprobacion: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Nota: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
}, {
  tableName: 'materias',
  timestamps: false
});

// 🔗 Relaciones con las demás tablas
Materias.belongsTo(EXAlumno, {
  foreignKey: 'ID_EXAlumno',
  as: 'exalumno',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Materias.belongsTo(Curso, {
  foreignKey: 'ID_Curso',
  as: 'curso',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Materias.belongsTo(BaseMateria, {
  foreignKey: 'ID_Base_Materia',
  as: 'baseMateria',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

module.exports = Materias;
