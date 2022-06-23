const { User } = require('../sequelize/models');

const create = async ({ name, email, password }) => {
  await User.create({ name, email, password });
};

const destroy = async ({ userId }) => {
  await User.destroy({
    where: {
      userId,
    },
  });
};

const findOne = async ({ userId }) => {
  const user = await User.findOne({ where: { userId } });
  return user;
};

const findAll = async () => User.findAll({ attributes: ['userId', 'name', 'email'] });

module.exports = {
  create, destroy, findOne, findAll,
};
