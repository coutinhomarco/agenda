const { User } = require('../sequelize/models');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  next();
}
const validateUserData = async (req, res, next) => {
  const regex = /[\w]+@[\w]+.com/i;
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (!regex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }
  next();
}

const validateCreate = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

const validateLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {validateCreate, validateLogin, validateUserData, validateName};