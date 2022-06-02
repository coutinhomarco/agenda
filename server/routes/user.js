const express = require('express');

const router = express.Router();
const User = require('../controllers/User');
const { validateToken } = require('../middleware/auth');
const userValidate = require('../middleware/userValidate');

router.post('/register', userValidate.validateName, userValidate.validateUserData, userValidate.validateCreate, User.create);
router.post('/', userValidate.validateUserData, userValidate.validateLogin, User.login);
router.delete('/', validateToken, User.destroy);

module.exports = router;
