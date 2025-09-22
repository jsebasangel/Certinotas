const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curso = require('./Curso'); // Asegúrate de importar el modelo Curso

const Materias = sequelize.define('Materias', {
    ID_Materias: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ID_exalumno: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        references: {
            model: 'ID_xalumno',
            key: 'ID_EXAlumno'
        }
    },
    ID_Curso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'curso',
            key: 'ID_Curso'
        }
    },
    COD_Materias: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Base_Materia',
            key: 'COD_Materia' // Cambiado a 'COD_Materia' que es la clave correcta en Base_Materia
        }
    },
    Estado_Aprobacion: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Nombre: {
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

// Definir la asociación con el modelo Curso (con ID_Curso)
Materias.belongsTo(Curso, { foreignKey: 'ID_Curso' });

module.exports = Materias;
