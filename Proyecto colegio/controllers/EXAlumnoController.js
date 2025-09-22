const EXAlumno = require('../models/EXAlumno');
const TipoDocumento = require('../models/tipo_documento');
const { Op } = require('sequelize');

// Obtener todos los exalumnos con información del tipo de documento
exports.getAllEXAlumnos = async (req, res) => {
    try {
        const exalumnos = await EXAlumno.findAll({
            include: [
                {
                    model: TipoDocumento,
                    as: 'tipoDocumento'
                }
            ]
        });
        res.json(exalumnos);
    } catch (error) {
        console.error('Error al obtener exalumnos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un exalumno por ID con información del tipo de documento
exports.getEXAlumnoById = async (req, res) => {
    try {
        const { id } = req.params;
        const exalumno = await EXAlumno.findByPk(id, {
            include: [
                {
                    model: TipoDocumento,
                    as: 'tipoDocumento'
                }
            ]
        });
        if (!exalumno) {
            return res.status(404).json({ message: 'EXAlumno no encontrado' });
        }
        res.json(exalumno);
    } catch (error) {
        console.error('Error al obtener exalumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo exalumno
exports.createEXAlumno = async (req, res) => {
    try {
        const { ID_Documento, Nombre, Fecha_Nacimiento, Direccion, Telefono, Correo_Electronico } = req.body;
        const nuevoEXAlumno = await EXAlumno.create({ ID_Documento, Nombre, Fecha_Nacimiento, Direccion, Telefono, Correo_Electronico });
        res.status(201).json(nuevoEXAlumno);
    } catch (error) {
        console.error('Error al crear exalumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un exalumno existente
exports.updateEXAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { ID_Documento, Nombre, Apellido ,Fecha_Nacimiento, Direccion, Telefono, Correo_Electronico } = req.body;
        const exalumno = await EXAlumno.findByPk(id);
        if (!exalumno) {
            return res.status(404).json({ message: 'EXAlumno no encontrado' });
        }
        exalumno.ID_Documento = ID_Documento;
        exalumno.Nombre = Nombre;
        exalumno.Apellido=Apellido;
        exalumno.Fecha_Nacimiento = Fecha_Nacimiento;
        exalumno.Direccion = Direccion;
        exalumno.Telefono = Telefono;
        exalumno.Correo_Electronico = Correo_Electronico;
        await exalumno.save();
        res.json(exalumno);
    } catch (error) {
        console.error('Error al actualizar exalumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un exalumno por ID
exports.deleteEXAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const exalumno = await EXAlumno.findByPk(id);
        if (!exalumno) {
            return res.status(404).json({ message: 'EXAlumno no encontrado' });
        }
        await exalumno.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar exalumno:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
//////
exports.searchExAlumnoByName = async (req, res) => {
    try {
        const {Apellido} = req.query; // Obtener el apellido desde los parámetros de la consulta
  
        // Buscar exalumnos cuyo apellido contenga la búsqueda (consulta parcial)
        const exAlumnos = await EXAlumno.findAll({
            include: [
                {
                    model: TipoDocumento,
                    as: 'tipoDocumento'
                }
            ],
            where:
             {
                Apellido: {
                    [Op.like]: `%${Apellido}%`, // Buscar coincidencias parciales
                    
                },
            },
        });
  
        return res.status(200).json(exAlumnos);
    } catch (error) {
        console.error('Error al buscar exalumnos:', error);
        return res.status(500).json({ error: 'Error al buscar exalumnos' });
    }
  };
  
  