const {User} = require('../sequelize/models');
const {generateToken} = require('../middleware/auth.js');

const create = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    await User.create({name, email, password});
    return res.status(201).json({message: "User created successfully"});
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    const token = generateToken({password, email});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({token, message: "User logged in successfully"});
  } catch (error) {
    next(error);
  }
};

module.exports = {create, login}