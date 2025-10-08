const express = require('express');
const swaggerDocs = require('./config/swagger'); // Importa el archivo de configuración
const sequelize = require('./config/database');
const tipoDocumentoRoutes = require('./routes/TipoDocumentoRoutes');
const cursoRoutes = require('./routes/CursoRoutes');
const EXAlumnoRoutes = require('./routes/EXAlumnoRoutes');
const baseMateriaRoutes = require('./routes/BaseMateriaRoutes');
const MateriasRoutes = require('./routes/MateriasRoutes');
const CertificadoRoutes = require('./routes/CertificadoRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const registroRoutes = require("./routes/RegistroRoutes");
const cargaMasiva = require("./routes/CargaMasivaRoute");

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // Importa el paquete cors


app.use(cors({
  origin: '*',               // Permite cualquier dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Permite todos los métodos
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite cabeceras comunes
  credentials: false         // No necesitas cookies o credenciales
}));
app.use(express.json());
app.use('/api/tipo_documento', tipoDocumentoRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/exalumnos', EXAlumnoRoutes);
app.use('/api/materias', MateriasRoutes);
app.use('/api/certificados', CertificadoRoutes);
app.use('/api/base-materias', baseMateriaRoutes);
app.use('/api/Usuario', UsuarioRoutes);
app.use('/api/Registro', registroRoutes);
app.use('/api/carga', cargaMasiva);

// Swagger
swaggerDocs(app);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => console.error('Error al sincronizar los modelos:', err));
