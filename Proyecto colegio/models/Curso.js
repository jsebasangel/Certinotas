const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo Curso
const Curso = sequelize.define('Curso', {
    ID_Curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre_Curso: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true  // Este campo es opcional
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true  // Este campo es opcional
    }
}, {
    tableName: 'curso',  // Nombre de la tabla en la base de datos
    timestamps: false
});

module.exports = Curso;
