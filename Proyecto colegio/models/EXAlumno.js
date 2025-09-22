// models/EXAlumno.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoDocumento = require('./tipo_documento');

const EXAlumno = sequelize.define('EXAlumno', {
    ID_EXAlumno: {
        type: DataTypes.DOUBLE,
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
        type: DataTypes.DOUBLE,
        allowNull: true,
        references: {
            model: 'TipoDocumento',  // Nombre del modelo referenciado
            key: 'ID_Documento'      // Clave a la que hace referencia
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
        allowNull: true  // Este campo es opcional
    },
    Direccion: {
        type: DataTypes.STRING(255),
        allowNull: true  // Este campo es opcional
    },
    Telefono: {
        type: DataTypes.STRING(255),
        allowNull: true  // Este campo es opcional
    },
    Correo_Electronico: {
        type: DataTypes.STRING(100),
        allowNull: true  // Este campo es opcional
    }
}, {
    tableName: 'exalumno',  // Asegúrate de que el nombre de la tabla esté en minúsculas
    timestamps: false
});

// Definir la relación
EXAlumno.belongsTo(TipoDocumento, { foreignKey: 'ID_Documento', as: 'tipoDocumento' });

module.exports = EXAlumno;
