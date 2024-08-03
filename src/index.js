const express = require('express');
const catFactsRoutes = require('./routes/catFactsRoutes');
const swaggerSetup = require('./swagger/swagger');

const app = express();
const port = 3000;

app.use('/', catFactsRoutes);
swaggerSetup(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
