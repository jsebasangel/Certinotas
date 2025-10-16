const TipoDocumento = require('../models/TipoDocumento');

/* =========================================================================
   CONTROLADORES ACTUALIZADOS PARA TIPO DE DOCUMENTO
   ========================================================================= */

// ------------------------------------------------------------------------
// 1. Obtener todos los tipos de documento
// ------------------------------------------------------------------------
exports.getAllTipoDocumentos = async (req, res) => {
  try {
    const tipoDocumentos = await TipoDocumento.findAll({
      attributes: ['Tipo_documento', 'Nombre_Tipo']
    });
    res.json(tipoDocumentos);
  } catch (error) {
    console.error('Error al obtener tipos de documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 2. Obtener un tipo de documento por ID
// ------------------------------------------------------------------------
exports.getTipoDocumentoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoDocumento = await TipoDocumento.findByPk(id, {
      attributes: ['Tipo_documento', 'Nombre_Tipo']
    });

    if (!tipoDocumento) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    res.json(tipoDocumento);
  } catch (error) {
    console.error('Error al obtener tipo de documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 3. Crear un nuevo tipo de documento
// ------------------------------------------------------------------------
exports.createTipoDocumento = async (req, res) => {
  try {
    const { Nombre_Tipo } = req.body;

    // Validación básica
    if (!Nombre_Tipo) {
      return res.status(400).json({ message: 'El campo Nombre_Tipo es obligatorio' });
    }

    const nuevoTipoDocumento = await TipoDocumento.create({ Nombre_Tipo });
    res.status(201).json(nuevoTipoDocumento);
  } catch (error) {
    console.error('Error al crear tipo de documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 4. Actualizar un tipo de documento existente
// ------------------------------------------------------------------------
exports.updateTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre_Tipo } = req.body;

    const tipoDocumento = await TipoDocumento.findByPk(id);
    if (!tipoDocumento) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    tipoDocumento.Nombre_Tipo = Nombre_Tipo || tipoDocumento.Nombre_Tipo;

    await tipoDocumento.save();
    res.json(tipoDocumento);
  } catch (error) {
    console.error('Error al actualizar tipo de documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// ------------------------------------------------------------------------
// 5. Eliminar un tipo de documento
// ------------------------------------------------------------------------
exports.deleteTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoDocumento = await TipoDocumento.findByPk(id);

    if (!tipoDocumento) {
      return res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }

    await tipoDocumento.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar tipo de documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
