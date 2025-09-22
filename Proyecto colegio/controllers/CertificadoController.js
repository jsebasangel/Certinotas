const Certificado = require('../models/Registro');
const sequelize = require("../config/database"); // importa tu instancia de Sequelize
//certificados emitidos por año
exports.getCantidadCertificadosPorAnio = async (req, res) => {
    try {
        const [resultados] = await sequelize.query(`
            SELECT 
                YEAR(c.Fecha_creacion) AS anio,
                COUNT(c.idRegistro) AS cantidad_certificados
            FROM registro c
            GROUP BY YEAR(c.Fecha_creacion)
            ORDER BY anio;

        `);

        res.json(resultados);
    } catch (error) {
        console.error("Error al obtener cantidad de certificados por año:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
// Obtener todos los certificados
exports.getAllCertificados = async (req, res) => {
    try {
        const certificados = await Certificado.findAll();
        res.json(certificados);
    } catch (error) {
        console.error('Error al obtener certificados:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un certificado por ID
exports.getCertificadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const certificado = await Certificado.findByPk(id);
        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        res.json(certificado);
    } catch (error) {
        console.error('Error al obtener certificado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo certificado
exports.createCertificado = async (req, res) => {
    try {
        const { Fecha_Emision, Detalles, ID_EXAlumno, ID_Curso } = req.body;
        const nuevoCertificado = await Certificado.create({ Fecha_Emision, Detalles, ID_EXAlumno, ID_Curso });
        res.status(201).json(nuevoCertificado);
    } catch (error) {
        console.error('Error al crear certificado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un certificado existente
exports.updateCertificado = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha_Emision, Detalles, ID_EXAlumno, ID_Curso } = req.body;
        const certificado = await Certificado.findByPk(id);
        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        certificado.Fecha_Emision = Fecha_Emision;
        certificado.Detalles = Detalles;
        certificado.ID_EXAlumno = ID_EXAlumno;
        certificado.ID_Curso = ID_Curso;
        await certificado.save();
        res.json(certificado);
    } catch (error) {
        console.error('Error al actualizar certificado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un certificado por ID
exports.deleteCertificado = async (req, res) => {
    try {
        const { id } = req.params;
        const certificado = await Certificado.findByPk(id);
        if (!certificado) {
            return res.status(404).json({ message: 'Certificado no encontrado' });
        }
        await certificado.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar certificado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
