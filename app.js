require('dotenv').config();
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weatherRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
