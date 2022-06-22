/* eslint-disable max-len */
const {
  Tasks, UserContact,
  User,
} = require('../sequelize/models');

const create = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const {
      info: {
        title, description, status, taskStartDate, taskEndDate,
      },
    } = req;
    const userContact = await UserContact.findOne({ where: { userId, contactId }, attributes: ['userContactId'] });
    const userContactId = userContact?.dataValues?.userContactId;
    if (!userContact) return res.status(404).json({ message: 'Contact is not related to User' });
    const task = await Tasks.create({
      title, description, status, userContactId, taskStartDate, taskEndDate,
    });
    return res.status(201).json({ message: 'Task created', data: [task] });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const userContact = await UserContact.findOne({ where: { userId, contactId }, attributes: ['userContactId'] });
    const userContactId = userContact?.dataValues?.userContactId;
    const { title, description, status } = req.body;
    const task = await Tasks.findOne({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      where: { userContactId },
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Tasks.update({
      title, description, status,
    }, { where: { userContactId } });
    const taskUpdated = await Tasks.findOne({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      where: { userContactId },
    });

    return res.status(200).json({ message: 'Task updated', data: taskUpdated });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const userContact = await UserContact.findOne({ where: { userId, contactId }, attributes: ['userContactId'] });
    const userContactId = userContact?.dataValues?.userContactId;
    const task = await Tasks.findOne({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      where: { userContactId },
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const userContact = await UserContact.findOne({ where: { userId, contactId }, attributes: ['userContactId'] });
    const userContactId = userContact?.dataValues?.userContactId;
    const task = await Tasks.findAll({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      where: { userContactId },
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Tasks.destroy({ where: { userContactId } });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const tasks = await UserContact.findAll({
      where: { userId },
      include: [
        {
          model: Tasks,
          as: 'task',
          required: true,
          attributes: ['taskId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'email'] },
        },
      ],
    });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, findOne, destroy, update, findAll,
};
