// Importamos el objeto DataTypes desde Sequelize. 
// DataTypes contiene los tipos de datos que podemos usar para definir las columnas de nuestras tablas.
const { DataTypes } = require('sequelize');

// Importamos la instancia de conexión a la base de datos configurada en el archivo database.js
const sequelize = require('../config/database');

// Importamos el modelo 'Curso' para poder establecer relaciones (asociaciones) más adelante.
const Curso = require('./Curso'); 

// Definición del modelo 'Materias' que representará la tabla 'materias' en la base de datos.
// sequelize.define(nombreModelo, atributos, opciones)
const Materias = sequelize.define('Materias', {
    
    // Campo ID_Materias: clave primaria, valor único e incremental para cada registro.
    ID_Materias: {
        type: DataTypes.INTEGER,      // Tipo de dato entero
        primaryKey: true,             // Define este campo como clave primaria
        autoIncrement: true,          // Incrementa automáticamente con cada nuevo registro
        allowNull: false              // No se permite que este campo sea nulo
    },

    // Campo ID_exalumno: referencia al exalumno asociado con la materia
    ID_exalumno: {
        type: DataTypes.DOUBLE,       // Tipo numérico con decimales (puede representar IDs largos)
        allowNull: true,              // Puede ser nulo si no hay relación directa
        references: {
            model: 'ID_xalumno',      // Modelo o tabla a la que hace referencia (nombre de la tabla relacionada)
            key: 'ID_EXAlumno'        // Columna referenciada en esa tabla
        }
    },

    // Campo ID_Curso: referencia al curso al que pertenece la materia
    ID_Curso: {
        type: DataTypes.INTEGER,      // Tipo entero para representar el ID del curso
        allowNull: true,              // Puede ser nulo si no hay relación
        references: {
            model: 'curso',           // Tabla relacionada (debe coincidir con el nombre real en la BD)
            key: 'ID_Curso'           // Columna de referencia en la tabla 'curso'
        }
    },

    // Campo COD_Materias: referencia al código de la materia en la tabla Base_Materia
    COD_Materias: {
        type: DataTypes.INTEGER,      // Tipo entero que almacena el código de la materia
        allowNull: true,              // Puede ser nulo
        references: {
            model: 'Base_Materia',    // Tabla donde se encuentra la definición base de la materia
            key: 'COD_Materia'        // Clave correcta de referencia en la tabla 'Base_Materia'
        }
    },

    // Campo Estado_Aprobacion: indica si la materia fue aprobada, reprobada, etc.
    Estado_Aprobacion: {
        type: DataTypes.STRING(50),   // Cadena de texto con longitud máxima de 50 caracteres
        allowNull: true               // Puede ser nulo si aún no se ha definido el estado
    },

    // Campo Nombre: almacena el nombre de la materia
    Nombre: {
        type: DataTypes.STRING(50),   // Cadena de texto (máx. 50 caracteres)
        allowNull: true               // Puede ser nulo si no se quiere guardar el nombre directamente aquí
    },

    // Campo Nota: almacena la calificación obtenida en la materia
    Nota: {
        type: DataTypes.DOUBLE,       // Número decimal para permitir notas con decimales
        allowNull: true               // Puede ser nulo si la materia aún no ha sido evaluada
    }

}, {
    // Nombre real de la tabla en la base de datos
    tableName: 'materias',

    // Desactiva los campos automáticos createdAt y updatedAt
    timestamps: false
});

// Establecemos la relación entre Materias y Curso.
// belongsTo indica que cada registro de Materias pertenece a un registro de Curso.
// Esto permite acceder a los datos del curso asociado desde la instancia de Materias.
Materias.belongsTo(Curso, { foreignKey: 'ID_Curso' });

// Exportamos el modelo Materias para que pueda ser utilizado en otros archivos del proyecto
module.exports = Materias;
