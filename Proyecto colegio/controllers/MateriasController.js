const Materias = require('../models/Materias');
const Curso = require('../models/Curso');
const BaseMateria = require('../models/BaseMaterias');
const EXAlumno = require('../models/EXAlumno');
const { QueryTypes, Op, fn, col } = require('sequelize');
const sequelize = require('../config/database');

/* =========================================================================
   CONTROLADORES ACTUALIZADOS PARA LA GESTIÓN DE MATERIAS
   ========================================================================= */

// ------------------------------------------------------------------------
// 1. Obtener conteo de exalumnos por curso (solo los que aprobaron)
// ------------------------------------------------------------------------
exports.getConteoExAlumnosPorCurso = async (req, res) => {
  try {
    const { idCurso } = req.query;
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

    res.json(resultado[0]);
  } catch (error) {
    console.error("Error al contar exalumnos por curso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ------------------------------------------------------------------------
// 2. Obtener nombres de materias por año específico
// ------------------------------------------------------------------------
exports.getMateriasPorAnio = async (req, res) => {
  try {
    const { year } = req.query;
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
          colegio.base_materia bm ON m.ID_Base_Materia = bm.ID_Base_Materia
      WHERE 
          c.year = :year
      GROUP BY 
          c.year, bm.Nombre
      ORDER BY 
          bm.Nombre ASC;
    `;

    const materias = await sequelize.query(sql, {
      replacements: { year },
      type: QueryTypes.SELECT
    });

    res.json(materias);
  } catch (error) {
    console.error("Error al obtener materias por año:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ------------------------------------------------------------------------
// 3. Obtener promedios, notas mínimas y máximas por año
// ------------------------------------------------------------------------
exports.getPromediosNotasPorAño = async (req, res) => {
  try {
    const sql = `
      SELECT 
          c.year AS Año,
          AVG(m.Nota) AS Promedio_Nota,
          MIN(m.Nota) AS Nota_Mínima,
          MAX(m.Nota) AS Nota_Máxima,
          COUNT(*) AS Total_Registros
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
      type: QueryTypes.SELECT
    });

    res.json(resultados);
  } catch (error) {
    console.error("Error al obtener promedios de notas por año:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ------------------------------------------------------------------------
// 4. Obtener todas las materias con información relacionada
// ------------------------------------------------------------------------
exports.getAllMaterias = async (req, res) => {
  try {
    const materias = await Materias.findAll({
      include: [
        { model: Curso, as: 'curso', attributes: ['Nombre_Curso', 'Descripcion', 'year'] },
        { model: BaseMateria, as: 'baseMateria', attributes: ['Nombre', 'COD_Materia', 'Creditos'] },
        { model: EXAlumno, as: 'exalumno', attributes: ['Nombre', 'Apellido', 'Numero_Documento'] }
      ]
    });
    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 5. Obtener materias por ID_EXAlumno
// ------------------------------------------------------------------------
exports.getMateriasByExAlumnoId = async (req, res) => {
  try {
    const { id_exalumno } = req.params;

    const materias = await Materias.findAll({
      where: { ID_EXAlumno: id_exalumno },
      include: [
        { model: Curso, as: 'curso', attributes: ['Nombre_Curso', 'Descripcion', 'year'] },
        { model: BaseMateria, as: 'baseMateria', attributes: ['Nombre', 'Creditos'] }
      ]
    });

    if (materias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron materias para el exalumno' });
    }

    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias por exalumno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 6. Obtener cursos distintos cursados por un exalumno
// ------------------------------------------------------------------------
exports.getDistinctApprovedCourses = async (req, res) => {
  try {
    const { id_exalumno } = req.params;

    const cursosAprobados = await sequelize.query(
      `SELECT DISTINCT c.Nombre_Curso, c.year, c.Descripcion
       FROM colegio.materias m
       JOIN colegio.curso c ON m.ID_Curso = c.ID_Curso
       WHERE m.ID_EXAlumno = :id_exalumno AND m.Nota >= 60`,
      {
        replacements: { id_exalumno },
        type: QueryTypes.SELECT
      }
    );

    res.json(cursosAprobados);
  } catch (error) {
    console.error('Error al obtener cursos aprobados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 7. Crear una nueva materia (registro compuesto)
// ------------------------------------------------------------------------
exports.createMateria = async (req, res) => {
  try {
    const { ID_EXAlumno, ID_Curso, ID_Base_Materia, Estado_Aprobacion, Nota } = req.body;

    const nuevaMateria = await Materias.create({
      ID_EXAlumno,
      ID_Curso,
      ID_Base_Materia,
      Estado_Aprobacion,
      Nota
    });

    res.status(201).json(nuevaMateria);
  } catch (error) {
    console.error('Error al crear materia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 8. Actualizar una materia (usando clave compuesta)
// ------------------------------------------------------------------------
exports.updateMateria = async (req, res) => {
  try {
    const { ID_EXAlumno, ID_Curso, ID_Base_Materia } = req.params;
    const { Estado_Aprobacion, Nota } = req.body;

    const materia = await Materias.findOne({
      where: { ID_EXAlumno, ID_Curso, ID_Base_Materia }
    });

    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    materia.Estado_Aprobacion = Estado_Aprobacion;
    materia.Nota = Nota;

    await materia.save();
    res.json(materia);
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 9. Eliminar una materia (usando clave compuesta)
// ------------------------------------------------------------------------
exports.deleteMateria = async (req, res) => {
  try {
    const { ID_EXAlumno, ID_Curso, ID_Base_Materia } = req.params;

    const materia = await Materias.findOne({
      where: { ID_EXAlumno, ID_Curso, ID_Base_Materia }
    });

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
