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

const destroy = async (req, res, next) => {
  try {
    const {userId} = req.tokenData;
    const user = await User.findOne({where:{userId}});
    if (!user) return res.status(404).json({message: 'User not found'});
    await User.destroy({
      where: {
        userId,
      },
    });
    return res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const {user} = req
    if (user.dataValues.password !== password) return res.status(401).json({message: 'Invalid credentials'});
    const userDetails = {
      email, userId:user.dataValues.userId, name: user.dataValues.name
    }
    const token = generateToken(userDetails);
    return res.status(200).json({token, message: "User logged in successfully", userDetails});
  } catch (error) {
    next(error);
  }
};

module.exports = {create, login, destroy}