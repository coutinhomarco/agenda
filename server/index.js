require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');
const express = require('express');
const userValidate = require('./middleware/userValidate.js');
const {create, login} = require('./controllers/User.js');
const app = express();

app.use(express.json());
app.use(errorHandler);

app.post('/register',userValidate.validateName ,userValidate.validateUserData, userValidate.validateCreate, create);
app.post('/login', userValidate.validateLogin, login);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
