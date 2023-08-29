const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const config = require('../config')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('src/swagger.yaml');

const certificatesRouter = require('./api/routes/certificates');
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();
app.use(cors());
const port = config.port;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', certificatesRouter); // Prefix all routes with '/api'
app.use(errorHandler); // This should be after your routes

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
