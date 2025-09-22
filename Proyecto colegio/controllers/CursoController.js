const { Op } = require("sequelize");
const Curso = require('../models/Curso');
const sequelize = require("../config/database"); // importa tu instancia de Sequelize


exports.getCantidadEstudiantesPorAnio = async (req, res) => {
    try {
        const [resultados] = await sequelize.query(`
            SELECT 
                c.year,
                COUNT(DISTINCT m.ID_EXAlumno) AS cantidad_estudiantes
            FROM curso c
            JOIN materias m ON c.ID_Curso = m.ID_Curso
            JOIN exalumno e ON e.ID_EXAlumno = m.ID_EXAlumno
            GROUP BY c.year
            ORDER BY c.year;
        `);

        res.json(resultados);
    } catch (error) {
        console.error("Error al obtener cantidad de estudiantes por año:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
// Buscar cursos por nombre (ej: que contenga '11')
exports.getCursosPorNombreYAño = async (req, res) => {
    try {
        const { nombre, year } = req.query; 
        // ejemplo: /cursos/nombre?nombre=11&year=2009

        if (!nombre) {
            return res.status(400).json({ message: 'Debe proporcionar un nombre o patrón de búsqueda' });
        }

        // Construir condición dinámica
        let condiciones = {
            Nombre_Curso: { [Op.like]: `%${nombre}%` }
        };

        if (year) {
            condiciones.year = year; // aquí asume que la columna se llama "year"
        }

        const cursos = await Curso.findAll({
            where: condiciones
        });

        res.json(cursos);
    } catch (error) {
        console.error('Error al buscar cursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.json(cursos);
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un curso por ID
exports.getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        console.error('Error al obtener curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo curso
exports.createCurso = async (req, res) => {
    try {
        const { Nombre_Curso, Descripcion, Año } = req.body;
        const nuevoCurso = await Curso.create({ Nombre_Curso, Descripcion, Año });
        res.status(201).json(nuevoCurso);
    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un curso existente
exports.updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre_Curso, Descripcion, Año } = req.body;
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        curso.Nombre_Curso = Nombre_Curso;
        curso.Descripcion = Descripcion;
        curso.Año = Año;
        await curso.save();
        res.json(curso);
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



// Eliminar un curso por ID
exports.deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        await curso.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
