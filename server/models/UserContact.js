const { UserContact } = require('../sequelize/models');
const {
  // User,
  Tasks,
} = require('../sequelize/models');

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

const findAll = async ({ userId, userContactId }) => {
  if (userContactId) {
    const tasksWitWhere = await UserContact.findAll({
      where: { userId, userContactId },
      include: [
        {
          model: Tasks,
          as: 'task',
          required: true,
          attributes: ['taskId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate', 'tag'],
        },
      ],
    });

    return tasksWitWhere;
  }
  const tasks = await UserContact.findAll({
    where: { userId },
    include: [
      {
        model: Tasks,
        as: 'task',
        required: true,
        attributes: ['taskId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate', 'tag'],
      },
    ],
  });
  return tasks;
};

module.exports = { create, findOne, findAll };
