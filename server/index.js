require('dotenv').config();
const express = require('express');
const { errorHandler} = require('./middleware/index.js');
const {user, contact} = require('./routes/index.js');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/user', user);
app.use('/contact', contact);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
