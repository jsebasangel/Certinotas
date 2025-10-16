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
            // ✅ Validar campos esenciales
            if (
              !row.Numero ||
              !row.nombre_Exa ||
              !row.Apellido_Exa ||
              !row.Nombre_Materia ||
              !row.Cod_Materia ||
              !row.Nota
            ) continue;

            // 1️⃣ Buscar o crear tipo de documento
            let [tipoDoc] = await TipoDocumento.findOrCreate({
              where: { Nombre_Tipo: row.Tip_Documento },
              defaults: { Nombre_Tipo: row.Tip_Documento },
            });

            // 2️⃣ Buscar o crear exalumno
            let [exalumno] = await EXAlumno.findOrCreate({
              where: { Numero_Documento: row.Numero },
              defaults: {
                Numero_Documento: row.Numero,
                Nombre: row.nombre_Exa,
                Apellido: row.Apellido_Exa,
                Correo_Electronico: row.Correo_Electronico,
                Telefono: row.Telefono,
                Direccion: row.Direccion,
                Fecha_Nacimiento: row.Fecha_Nacimiento,
                ID_Documento: tipoDoc.Tipo_documento,
                Numero: row.Numero, // número de documento del exalumno
                Lugar_Expedicion: row.Lugar_Expedicion, // lugar donde se expidió
              },
            });

            // 3️⃣ Buscar o crear base de materia
            let [materiaBase] = await BaseMaterias.findOrCreate({
              where: { COD_Materia: row.Cod_Materia },
              defaults: {
                COD_Materia: row.Cod_Materia,
                Nombre: row.Nombre_Materia,
                Creditos: row.Creditos,
                year: row.Year,
              },
            });

            // 4️⃣ Buscar o crear curso
            let [curso] = await Curso.findOrCreate({
              where: { Nombre_Curso: row.Nombre_Curso, year: row.Year },
              defaults: {
                Nombre_Curso: row.Nombre_Curso,
                Descripcion: row.Descripcion,
                year: row.Year,
              },
            });

            // 5️⃣ Agregar a lista para inserción en "Materias"
            materias.push({
              ID_EXAlumno: exalumno.ID_EXAlumno,
              ID_Base_Materia: materiaBase.ID_Base_Materia,
              ID_Curso: curso.ID_Curso,
              Nota: parseFloat(row.Nota),
              Estado_Aprobacion: row.Nota >= 3.0 ? "Aprobado" : "Reprobado",
            });

            // 6️⃣ Guardar info básica para mostrar en frontend
            exalumnosCreados.push({
              Identificacion: row.Numero,
              Nombre: exalumno.Nombre,
              Apellido: exalumno.Apellido,
              Materia: materiaBase.Nombre,
              Nota: row.Nota,
            });
          }

          // 7️⃣ Inserción masiva de materias
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
