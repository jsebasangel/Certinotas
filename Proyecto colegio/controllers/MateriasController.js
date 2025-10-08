const Materias = require('../models/Materias');
const Curso = require('../models/Curso'); // Importa el modelo Curso para las asociaciones
const { QueryTypes } = require('sequelize');
const { Op, fn, col } = require("sequelize");
const sequelize = require('../config/database'); // Importa la instancia de sequelize

exports.getConteoExAlumnosPorCurso = async (req, res) => {
    try {
        const { idCurso } = req.query; 
        // ejemplo: /materias/conteo?idCurso=7

        if (!idCurso) {
            return res.status(400).json({ message: "Debe proporcionar un ID_Curso" });
        }

        const resultado = await Materias.findAll({
            attributes: [
                [fn("COUNT", fn("DISTINCT", col("ID_EXAlumno"))), "totalExAlumnos"]
            ],
            where: {
                ID_Curso: idCurso,
                Nota: { [Op.gte]: 60 }
            }
        });

        res.json(resultado[0]); // devuelve el objeto con el total
    } catch (error) {
        console.error("Error al contar exalumnos por curso:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
// Obtener nombres de materias por año
exports.getMateriasPorAnio = async (req, res) => {
  try {
    const { year } = req.query; // Ej: /api/materias/nombres?year=2012

    if (!year) {
      return res.status(400).json({ message: "Debe proporcionar un año" });
    }

    const sql = `
      SELECT 
          c.year AS Año,
          bm.Nombre AS Nombre_Materia
      FROM 
          colegio.materias m
      JOIN 
          colegio.curso c ON m.ID_Curso = c.ID_Curso
      JOIN 
          colegio.base_materia bm ON m.COD_Materias = bm.COD_Materia
      WHERE 
          c.year = :year
      GROUP BY 
          c.year, bm.Nombre
      ORDER BY 
          bm.Nombre ASC;
    `;

    const materias = await sequelize.query(sql, {
      replacements: { year },
      type: sequelize.QueryTypes.SELECT
    });

    res.json(materias);
  } catch (error) {
    console.error("Error al obtener materias por año:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getPromediosNotasPorAño = async (req, res) => {
  try {
    const sql = `
      SELECT 
          c.year AS Año,
          AVG(m.Nota) AS Promedio_Nota,
          MIN(m.Nota) AS Nota_Mínima,
          MAX(m.Nota) AS Nota_Máxima,
          COUNT(m.ID_Materias) AS Total_Materias
      FROM 
          colegio.materias m
      JOIN 
          colegio.curso c ON m.ID_Curso = c.ID_Curso
      GROUP BY 
          c.year
      ORDER BY 
          c.year ASC;
    `;
    const resultados = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    });

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener promedios de notas por año:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener todas las materias
exports.getAllMaterias = async (req, res) => {
    try {
        const materias = await Materias.findAll({
            include: [{
                model: Curso,
                attributes: ['Nombre_Curso', 'Descripcion', 'year'] // Incluye información del curso
            }]
        });
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener materias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener una materia por ID
exports.getMateriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materias.findByPk(id, {
            include: [{
                model: Curso,
                attributes: ['Nombre_Curso', 'Descripcion', 'year'] // Incluye información del curso
            }]
        });
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json(materia);
    } catch (error) {
        console.error('Error al obtener materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener materias por ID_EXAlumno
exports.getMateriasByExAlumnoId = async (req, res) => {
    try {
        const { id_exalumno } = req.params; // Obtén el ID_EXAlumno de los parámetros de la solicitud
        const materias = await Materias.findAll({
            where: {
                id_exalumno: id_exalumno
            },
            include: [{
                model: Curso,
                attributes: ['Nombre_Curso', 'Descripcion', 'year'] // Incluye información del curso
            }]
        });
        if (materias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias para el exalumno' });
        }
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener materias por ID_EXAlumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Buscar materias por ID_EXAlumno y Nombre_Curso
exports.getMateriasByExAlumnoIdAndCursoName = async (req, res) => {
    try {
        const { id_exalumno, nombre_curso } = req.params; // Obtén los parámetros de consulta

        if (!id_exalumno || !nombre_curso) {
            return res.status(400).json({ message: 'ID_EXAlumno y Nombre_Curso son requeridos' });
        }

        const materias = await Materias.findAll({
            where: {
                id_exalumno: id_exalumno
            },
            include: [{
                model: Curso,
                attributes: ['Nombre_Curso','year','Descripcion'],
                where: {
                    Nombre_Curso: nombre_curso
                }
            }]
        });

        if (materias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias para el exalumno y el curso especificado' });
        }
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener materias por ID_EXAlumno y Nombre_Curso:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener nombres de cursos aprobados por ID_EXAlumno
exports.getDistinctApprovedCourses = async (req, res) => {
    try {
        const { id_exalumno } = req.params; // Obtén el ID_EXAlumno de los parámetros de la solicitud

        if (!id_exalumno) {
            return res.status(400).json({ message: 'ID_EXAlumno es requerido' });
        }

        const cursosAprobados = await sequelize.query(
            `SELECT DISTINCT (c.Nombre_Curso), c.year, c.Descripcion
             FROM colegio.materias m
             JOIN colegio.curso c ON m.ID_Curso = c.ID_Curso
             WHERE m.ID_EXAlumno = :id_exalumno`,
            {
                replacements: { id_exalumno: id_exalumno },
                type: QueryTypes.SELECT
            }
        );
        res.json(cursosAprobados);
    } catch (error) {
        console.error('Error al obtener nombres de cursos aprobados:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Crear una nueva materia
exports.createMateria = async (req, res) => {
    try {
        const { ID_Curso, id_exalumno, Creditos, Fecha_Inscripcion, Nombre, Estado_Aprobacion, Nota } = req.body;

        // Crear la materia
        const nuevaMateria = await Materias.create({
            ID_Curso,
            id_exalumno, // Ajustado para que coincida con el modelo
            Creditos,
            Fecha_Inscripcion,
            Nombre,
            Estado_Aprobacion,
            Nota
        });

        res.status(201).json(nuevaMateria);
    } catch (error) {
        console.error('Error al crear materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar una materia existente
exports.updateMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Curso, id_exalumno, Creditos, Fecha_Inscripcion, Nombre, Estado_Aprobacion, Nota } = req.body;
        const materia = await Materias.findByPk(id);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        materia.ID_Curso = ID_Curso;
        materia.id_exalumno = id_exalumno; // Ajustado para que coincida con el modelo
        materia.Creditos = Creditos;
        materia.Fecha_Inscripcion = Fecha_Inscripcion;
        materia.Nombre = Nombre;
        materia.Estado_Aprobacion = Estado_Aprobacion;
        materia.Nota = Nota;
        await materia.save();
        res.json(materia);
    } catch (error) {
        console.error('Error al actualizar materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una materia por ID
exports.deleteMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materias.findByPk(id);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        await materia.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
