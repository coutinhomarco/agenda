const { User } = require('../sequelize/models');

const create = async ({ name, email, password }, next) => {
  try {
    await User.create({ name, email, password });
  } catch (error) {
    next(error);
  }
};

const destroy = async ({ userId }, next) => {
  try {
    await User.destroy({
      where: {
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async ({ userId }, next) => {
  try {
    const user = await User.findOne({ where: { userId } });
    return user;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, destroy, findOne,
};
