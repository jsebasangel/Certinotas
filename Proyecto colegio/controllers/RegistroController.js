// controllers/RegistroController.js
const Registro = require("../models/Registro");

// Crear registro
exports.createRegistro = async (req, res) => {
  try {
    const registro = await Registro.create(req.body);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los registros
exports.getRegistros = async (req, res) => {
  try {
    const registros = await Registro.findAll();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
exports.getRegistroById = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar registro
exports.updateRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });

    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar registro
exports.deleteRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });

    await registro.destroy();
    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
