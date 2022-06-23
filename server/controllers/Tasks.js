/* eslint-disable max-len */

const UserContact = require('../models/UserContact');
const Tasks = require('../models/Tasks');

const create = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const {
      info: {
        title, description, status, taskStartDate, taskEndDate, tag,
      },
    } = req;
    const userContact = await UserContact.findOne({ userId, contactId }, ['userContactId']);
    const userContactId = userContact?.dataValues?.userContactId;
    if (!userContact) return res.status(404).json({ message: 'Contact is not related to User' });
    const task = await Tasks.create({
      title, description, status, userContactId, taskStartDate, taskEndDate, tag,
    });
    return res.status(201).json({ message: 'Task created', data: { ...task, userId, contactId } });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const userContact = await UserContact.findOne({ userId, contactId }, ['userContactId']);
    const userContactId = userContact?.dataValues?.userContactId;
    const {
      title, description, status, taskId,
    } = req.body;
    const task = await Tasks.findOne({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      userContactId,
      taskId,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await Tasks.update({
      title,
      description,
      status,
      userContactId,
      taskId,
    });
    const taskUpdated = await Tasks.findOne({
      attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
      userContactId,
      taskId,
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
    const userContact = await UserContact.findOne({ userId, contactId }, ['userContactId']);
    const userContactId = userContact?.dataValues?.userContactId;
    const [task] = await Tasks.findAll({ userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Tasks.destroy({ userContactId, taskId: task?.dataValues?.task?.dataValues?.taskId });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const tasks = await UserContact.findAll({ userId });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const findByQuery = async (req, res, next) => {
  try {
    const { q } = req.query;
    const tasks = findByQuery({ q });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, findOne, destroy, update, findAll, findByQuery,
};
