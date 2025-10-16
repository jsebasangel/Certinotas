const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

const TipoDocumento = require("../models/tipo_documento");
const EXAlumno = require("../models/EXAlumno");
const BaseMaterias = require("../models/BaseMaterias");
const Curso = require("../models/Curso");
const Materias = require("../models/Materias");

const cargaMasiva = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "uploads", req.file.filename);

    let rows = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        try {
          let materias = [];
          let exalumnosCreados = [];

          for (let row of rows) {
            // ✅ Validar campos esenciales mínimos
            if (
              !row.Numero ||
              !row.nombre_Exa ||
              !row.Apellido_Exa ||
              !row.Nombre_Materia ||
              !row.Nota
            ) continue;

            // 1️⃣ Buscar o crear tipo de documento
            const [tipoDoc] = await TipoDocumento.findOrCreate({
              where: { Nombre_Tipo: row.Tip_Documento },
              defaults: { Nombre_Tipo: row.Tip_Documento },
            });

            // 2️⃣ Buscar o crear exalumno
            const [exalumno] = await EXAlumno.findOrCreate({
              where: { Numero_Documento: row.Numero },
              defaults: {
                Numero_Documento: row.Numero,
                Nombre: row.nombre_Exa,
                Apellido: row.Apellido_Exa,
                Correo_Electronico: row.Correo_Electronico || null,
                Telefono: row.Telefono || null,
                Direccion: row.Direccion || null,
                Fecha_Nacimiento: row.Fecha_Nacimiento || null,
                Tipo_documento: tipoDoc.Tipo_documento,
                Numero: row.Numero,
                Lugar_Expedicion: row.Lugar_Expedicion || null,
              },
            });

            // 3️⃣ Buscar o crear base de materia (ya sin COD_Materia ni year)
            const [materiaBase] = await BaseMaterias.findOrCreate({
              where: { Nombre: row.Nombre_Materia },
              defaults: {
                Nombre: row.Nombre_Materia,
                Creditos: row.Creditos || 0,
              },
            });

            // 4️⃣ Buscar o crear curso (mantiene lógica con year si existe en CSV)
            const [curso] = await Curso.findOrCreate({
              where: { Nombre_Curso: row.Nombre_Curso },
              defaults: {
                Nombre_Curso: row.Nombre_Curso,
                Descripcion: row.Descripcion || null,
                year: row.Year || null,
              },
            });

            // 5️⃣ Agregar a lista para inserción en "Materias"
            materias.push({
              ID_EXAlumno: exalumno.ID_EXAlumno,
              ID_Base_Materia: materiaBase.ID_Base_Materia,
              ID_Curso: curso.ID_Curso,
              Nota: parseFloat(row.Nota),
              Estado_Aprobacion: parseFloat(row.Nota) >= 3.0 ? "Aprobado" : "Reprobado",
            });

            // 6️⃣ Guardar info para mostrar en el frontend
            exalumnosCreados.push({
              Identificacion: exalumno.Numero_Documento,
              Correo_Electronico:exalumno.Correo_Electronico,
              Telefono:exalumno.Telefono,
              Nombre: exalumno.Nombre,
              Apellido: exalumno.Apellido,
              Materia: materiaBase.Nombre,
              Nota: row.Nota,
            });
          }

          // 7️⃣ Inserción masiva de materias (sin duplicar)
          await Materias.bulkCreate(materias, { ignoreDuplicates: true });

          return res.status(200).json({
            message: "Carga masiva completada con éxito 🚀",
            totalRegistros: materias.length,
            exalumnos: exalumnosCreados,
          });

        } catch (err) {
          console.error("❌ Error en carga masiva:", err);
          return res.status(500).json({ error: "Error en la carga masiva" });
        }
      });
  } catch (error) {
    console.error("❌ Error general:", error);
    return res.status(500).json({ error: "Error general en la carga masiva" });
  }
};

module.exports = cargaMasiva;
