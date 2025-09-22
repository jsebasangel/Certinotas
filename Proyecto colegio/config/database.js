const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('colegio', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 3306 
});

sequelize.authenticate()
    .then(() => console.log('Conexión establecida con la base de datos.'))
    .catch(err => console.error('Error de conexión a la base de datos:', err));

module.exports = sequelize;
