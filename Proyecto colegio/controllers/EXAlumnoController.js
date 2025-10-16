const EXAlumno = require('../models/EXAlumno');
const TipoDocumento = require('../models/tipo_documento');
const { Op } = require('sequelize');

/* =========================================================================
   CONTROLADORES ACTUALIZADOS PARA EXALUMNOS
   ========================================================================= */

// ------------------------------------------------------------------------
// 1. Obtener todos los exalumnos con su tipo de documento
// ------------------------------------------------------------------------
exports.getAllEXAlumnos = async (req, res) => {
  try {
    const exalumnos = await EXAlumno.findAll({
      include: [
        {
          model: TipoDocumento,
          as: 'tipoDocumento',
          attributes: ['Tipo_documento', 'Nombre_Tipo']
        }
      ]
    });
    res.json(exalumnos);
  } catch (error) {
    console.error('Error al obtener exalumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 2. Obtener un exalumno por ID (con tipo de documento)
// ------------------------------------------------------------------------
exports.getEXAlumnoById = async (req, res) => {
  try {
    const { id } = req.params;
    const exalumno = await EXAlumno.findByPk(id, {
      include: [
        {
          model: TipoDocumento,
          as: 'tipoDocumento',
          attributes: ['Tipo_documento', 'Nombre_Tipo']
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

// ------------------------------------------------------------------------
// 3. Crear un nuevo exalumno
// ------------------------------------------------------------------------
exports.createEXAlumno = async (req, res) => {
  try {
    const {
      Tipo_documento,  // 👈 campo actualizado
      Numero_Documento,
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Direccion,
      Telefono,
      Correo_Electronico
    } = req.body;

    const nuevoEXAlumno = await EXAlumno.create({
      Tipo_documento,
      Numero_Documento,
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Direccion,
      Telefono,
      Correo_Electronico
    });

    res.status(201).json(nuevoEXAlumno);
  } catch (error) {
    console.error('Error al crear exalumno:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 4. Actualizar un exalumno existente
// ------------------------------------------------------------------------
exports.updateEXAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Tipo_documento,  // 👈 actualizado
      Numero_Documento,
      Nombre,
      Apellido,
      Fecha_Nacimiento,
      Direccion,
      Telefono,
      Correo_Electronico
    } = req.body;

    const exalumno = await EXAlumno.findByPk(id);
    if (!exalumno) {
      return res.status(404).json({ message: 'EXAlumno no encontrado' });
    }

    exalumno.Tipo_documento = Tipo_documento;
    exalumno.Numero_Documento = Numero_Documento;
    exalumno.Nombre = Nombre;
    exalumno.Apellido = Apellido;
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

// ------------------------------------------------------------------------
// 5. Eliminar un exalumno
// ------------------------------------------------------------------------
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

// ------------------------------------------------------------------------
// 6. Buscar exalumnos por apellido
// ------------------------------------------------------------------------
exports.searchExAlumnoByName = async (req, res) => {
  try {
    const { Apellido } = req.query;

    const exAlumnos = await EXAlumno.findAll({
      include: [
        {
          model: TipoDocumento,
          as: 'tipoDocumento',
          attributes: ['Tipo_documento', 'Nombre_Tipo']
        }
      ],
      where: {
        Apellido: {
          [Op.like]: `%${Apellido || ''}%`
        }
      }
    });

    res.status(200).json(exAlumnos);
  } catch (error) {
    console.error('Error al buscar exalumnos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
