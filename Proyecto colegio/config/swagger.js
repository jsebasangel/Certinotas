// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CertiNotas',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de notas y certificados',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Cambia si usas otra URL o puerto
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Rutas donde se documentarán los endpoints
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📚 Swagger Docs disponibles en: http://localhost:3000/api-docs');
};

module.exports = swaggerDocs;
