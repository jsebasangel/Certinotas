const fs = require("fs");
const path = require("path");   // 🔹 aquí corriges, antes tenías `const path = "path";`
const csvParser = require("csv-parser");
const tipo_documento = require("../models/tipo_documento");
const EXAlumno = require("../models/EXAlumno");
const BaseMaterias = require("../models/BaseMaterias");
const Curso = require("../models/Curso");
const Materias = require("../models/Materias");

const cargaMasiva = async (req, res) => {
  try {
    
    const filePath = path.join(process.cwd(), "uploads", req.file.filename); // archivo CSV cargado

    let rows = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        try {
          let materias = [];
          let exalumnosCreados = [];
          
for (let row of rows) {
  // ✅ Validar campos obligatorios
  if (
    !row.ID_Documento || 
    !row.nombre_Exa || 
    !row.Apellido_Exa || 
    !row.Nombre_Materia || 
    !row.Cod_Materia || 
    !row.Nota
  ) {
    continue; // salta al siguiente registro
  }            // 1. Verificar/crear tipo de documento
            console.log("➡️ Tipo documento recibido:", row.Numero, row.Tip_Documento);
            let tipoDoc = await tipo_documento.findOrCreate({
              where: { Numero: row.Numero },
              defaults: { Numero: row.Numero, Tipo_Documento: row.Tip_Documento },
            });

            // 2. Crear exalumno si no existe
              console.log("➡️ Datos EXAlumno recibidos:", {
              Numero_Documento: row.Numero,
         Nombre: row.nombre_Exa,
        Apellido: row.Apellido_Exa,
        Correo_Electronico: row.Correo_Electronico,
                Telefono: row.Telefono,
                Direccion: row.Direccion,
                Fecha_Nacimiento: row.Fecha_Nacimiento,
                ID_Documento: tipoDoc[0].ID_Documento,
      });
            let [exalumno] = await EXAlumno.findOrCreate({
              where: {  Numero_Documento: row.Numero },
              defaults: {
                Nombre: row.nombre_Exa,
                Apellido: row.Apellido_Exa,
                Correo_Electronico: row.Correo_Electronico,
                Telefono: row.Telefono,
                Direccion: row.Direccion,
                Fecha_Nacimiento: row.Fecha_Nacimiento,
                ID_Documento: tipoDoc[0].ID_Documento,
              },
            });

            // 3. Crear o buscar materia base
             console.log("➡️ Materia recibida:", {
        Nombre: row.Nombre_Materia,
        Cod: row.Cod_Materia,
        Year: row.Year,
        Creditos: row.Creditos,
      });
            console.log(row.Nombre_Materia+ 'verificar valor')
            let materiaBase = await BaseMaterias.findOrCreate({
              where: { Nombre: row.Nombre_Materia, year:row.Year},
              defaults: {
                Nombre: row.Nombre_Materia,
                COD_Materia: row.Cod_Materia,
                year: row.Year,
                Creditos: row.Creditos,
              },
            });

 // 4. Crear o buscar curso
      console.log("➡️ Curso recibido:", {
        Nombre_Curso: row.Nombre_Curso,
        Descripcion: row.Descripcion,
        Year: row.Year,
      });            let curso = await Curso.findOrCreate({
              where: { Nombre_Curso: row.Nombre_Curso,year:row.Year },
              defaults: {
                Nombre_Curso: row.Nombre_Curso,
                Descripcion: row.Descripcion,
                year: row.Year,
              },
            });

            // 5. Preparar la inserción de materias
            materias.push({
              ID_exalumno: exalumno.ID_EXAlumno,
              COD_Materias: materiaBase[0].COD_Materia,
              ID_Curso: curso[0].ID_Curso,
              Nota: row.Nota,
              Nombre:materiaBase[0].Nombre,
            });
             // 🔹 Guardar solo lo necesario para el front
            exalumnosCreados.push({
              Identificacion: row.Numero,
              Nombre: exalumno.Nombre,
              Apellido: exalumno.Apellido,
              Telefono: exalumno.Telefono,
              Correo_Electronico: exalumno.Correo_Electronico,
              Materia:materiaBase[0].Nombre,
            });
          }
          

          // 6. BulkCreate de materias
          await Materias.bulkCreate(materias, { ignoreDuplicates: true });

          return res.status(200).json({
            message: "Carga masiva completada con éxito 🚀",
            totalRegistros: materias.length,
            exalumnos: exalumnosCreados, // 🔹 Para el frontend
          });
        } catch (err) {
          console.error("Error en carga masiva:", err);
          return res.status(500).json({ error: "Error en la carga masiva" });
        }
      });
  } catch (error) {
    console.error("Error general:", error);
    return res.status(500).json({ error: "Error general en la carga masiva" });
  }
};

module.exports = cargaMasiva; // 🔹 Exporta solo la función
