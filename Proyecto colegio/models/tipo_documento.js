// models/TipoDocumento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoDocumento = sequelize.define('TipoDocumento', {
    ID_Documento: {
        type: DataTypes.DOUBLE,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Tipo_Documento: {
        type: DataTypes.STRING(10),
        allowNull: false
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
    tableName: 'tipo_documento',  // Nombre de la tabla
    timestamps: false
});

module.exports = TipoDocumento;
