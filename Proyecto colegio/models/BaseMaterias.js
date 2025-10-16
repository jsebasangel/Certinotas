const { DataTypes } = require('sequelize'); 
const sequelize = require('../config/database');

const BaseMateria = sequelize.define('base_materia', {
    ID_Base_Materia: {
        type: DataTypes.DOUBLE,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Creditos: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    Nombre: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
}, {
    tableName: 'base_materia',
    timestamps: false
});

module.exports = BaseMateria;
