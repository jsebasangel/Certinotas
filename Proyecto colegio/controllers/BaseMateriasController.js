const BaseMateria = require('../models/BaseMaterias');
const { QueryTypes } = require('sequelize');
const sequelize = require("../config/database"); // importa tu instancia de Sequelize



// Obtener nombres distintos de materias por año (opcional)
exports.getDistinctMaterias = async (req, res) => {
    try {
        const { year } = req.query; // Ej: /api/materias?year=2009
        let sql = 'SELECT DISTINCT Nombre FROM colegio.base_materia';
        if (year) {
            sql += ` WHERE year='${year}'`;
        }

        const materias = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

        res.json(materias); // Devuelve [{ Nombre: 'Materia1' }, { Nombre: 'Materia2' }, ...]
    } catch (error) {
        console.error('Error al obtener nombres distintos de materias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Obtener todas las materias base
exports.getAllBaseMaterias = async (req, res) => {
    try {
        const baseMaterias = await BaseMateria.findAll();
        res.json(baseMaterias);
    } catch (error) {
        console.error('Error al obtener las materias base:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener una materia base por ID
exports.getBaseMateriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const baseMateria = await BaseMateria.findByPk(id);
        if (!baseMateria) {
            return res.status(404).json({ message: 'Materia base no encontrada' });
        }
        res.json(baseMateria);
    } catch (error) {
        console.error('Error al obtener la materia base:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Obtener una materia base por COD_Materia
exports.getBaseMateriaByCodigo = async (req, res) => {
    try {
        const { cod_materia } = req.params; // Obtén el COD_Materia de los parámetros de la solicitud

        // Busca la materia base usando COD_Materia
        const baseMateria = await BaseMateria.findOne({
            where: { COD_Materia: cod_materia }
        });

        if (!baseMateria) {
            return res.status(404).json({ message: 'Materia base no encontrada' });
        }

        res.json(baseMateria);
    } catch (error) {
        console.error('Error al obtener la materia base por COD_Materia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear una nueva materia base
exports.createBaseMateria = async (req, res) => {
    try {
        const { COD_Materia, Nombre, Creditos, year } = req.body;

        // Crear la nueva materia base
        const nuevaBaseMateria = await BaseMateria.create({
            COD_Materia,
            Nombre,
            Creditos,
            year
        });

        res.status(201).json(nuevaBaseMateria);
    } catch (error) {
        console.error('Error al crear la materia base:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar una materia base existente
exports.updateBaseMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { COD_Materia, Nombre, Creditos, year } = req.body;

        const baseMateria = await BaseMateria.findByPk(id);
        if (!baseMateria) {
            return res.status(404).json({ message: 'Materia base no encontrada' });
        }

        baseMateria.COD_Materia = COD_Materia;
        baseMateria.Nombre = Nombre;
        baseMateria.Creditos = Creditos;
        baseMateria.year = year;

        await baseMateria.save();
        res.json(baseMateria);
    } catch (error) {
        console.error('Error al actualizar la materia base:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar una materia base por ID
exports.deleteBaseMateria = async (req, res) => {
    try {
        const { id } = req.params;

        const baseMateria = await BaseMateria.findByPk(id);
        if (!baseMateria) {
            return res.status(404).json({ message: 'Materia base no encontrada' });
        }

        await baseMateria.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la materia base:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
