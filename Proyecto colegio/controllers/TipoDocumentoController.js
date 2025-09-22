const TipoDocumento = require('../models/tipo_documento');

// Obtener todos los tipos de documento
exports.getAllTipoDocumentos = async (req, res) => {
    try {
        const tipoDocumentos = await TipoDocumento.findAll();
        res.json(tipoDocumentos);
    } catch (error) {
        console.error('Error al obtener tipos de documento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un tipo de documento por ID
exports.getTipoDocumentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({ message: 'TipoDocumento no encontrado' });
        }
        res.json(tipoDocumento);
    } catch (error) {
        console.error('Error al obtener tipo de documento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo tipo de documento
exports.createTipoDocumento = async (req, res) => {
    try {
        const { ID_Documento, Tipo_Documento, Numero, Lugar_Expedicion } = req.body;
        const nuevoTipoDocumento = await TipoDocumento.create({ ID_Documento, Tipo_Documento, Numero, Lugar_Expedicion });
        res.status(201).json(nuevoTipoDocumento);
    } catch (error) {
        console.error('Error al crear tipo de documento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un tipo de documento existente
exports.updateTipoDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const { Tipo_Documento, Numero, Lugar_Expedicion } = req.body;
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({ message: 'TipoDocumento no encontrado' });
        }
        tipoDocumento.Tipo_Documento = Tipo_Documento;
        tipoDocumento.Numero = Numero;
        tipoDocumento.Lugar_Expedicion = Lugar_Expedicion;
        await tipoDocumento.save();
        res.json(tipoDocumento);
    } catch (error) {
        console.error('Error al actualizar tipo de documento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un tipo de documento por ID
exports.deleteTipoDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({ message: 'TipoDocumento no encontrado' });
        }
        await tipoDocumento.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar tipo de documento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
