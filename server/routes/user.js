const express = require('express')
const router = express.Router()
const User = require('../controllers/User.js');
const {validateToken} = require('../middleware/auth.js');
const userValidate = require('../middleware/userValidate.js');

router.post('/register',userValidate.validateName ,userValidate.validateUserData, userValidate.validateCreate, User.create);
router.post('/',userValidate.validateUserData ,userValidate.validateLogin, User.login);
router.delete('/', validateToken, User.destroy);

module.exports = router