require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');
const express = require('express');
const {validateToken} = require('./middleware/auth.js');
const userValidate = require('./middleware/userValidate.js');
const contactValidate = require('./middleware/contactValidate.js');
const {create: createUser, login, destroy: destroyUser} = require('./controllers/User.js');
const {create: createContact, destroy:destroyContact} = require('./controllers/Contact.js');
const app = express();

app.use(express.json());
app.use(errorHandler);

app.post('/register',userValidate.validateName ,userValidate.validateUserData, userValidate.validateCreate, createUser);
app.post('/login', userValidate.validateLogin, login);
app.delete('/user', validateToken, destroyUser);

app.post('/contact', validateToken,contactValidate.validateContactData, createContact);
app.delete('/contact/:contactId',  destroyContact);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
