const { UserContact } = require('../sequelize/models');
const { User, Tasks } = require('../sequelize/models');

const create = async ({ userId, contactId }) => {
  const userContact = await UserContact.create({
    userId, contactId,
  });
  return userContact;
};

const findOne = async ({ userId, contactId }, attributes) => {
  if (attributes) {
    const userContact = await UserContact.findOne({
      where: { userId, contactId },
      attributes: [...attributes],
    });
    return userContact;
  }
  const userContact = await UserContact.findOne({
    where: { userId, contactId },
  });
  return userContact;
};

const findAll = async ({ userId }) => {
  const tasks = await UserContact.findAll({
    where: { userId },
    include: [
      {
        model: Tasks,
        as: 'task',
        required: true,
        attributes: ['taskId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate', 'tag'],
      },
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'email'] },
      },
    ],
  });
  return tasks;
};

module.exports = { create, findOne, findAll };
