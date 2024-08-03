const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cat Facts API',
            version: '1.0.0',
            description: 'API для получения случайных фактов о кошках',
        },
    },
    apis: ['./index.js'], // Путь к файлам с аннотациями Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
