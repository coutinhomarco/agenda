require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { errorHandler } = require('./middleware/index');
const { user, contact, tasks } = require('./routes/index');

const app = express();

const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/user', user);
app.use('/contact', contact);

app.use('/tasks', tasks);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
