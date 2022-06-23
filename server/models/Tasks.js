/* eslint-disable max-len */
const { Op } = require('sequelize');
const {
  Tasks,
} = require('../sequelize/models');
const UserContact = require('./UserContact');

const create = async (info) => {
  const {
    title, description, status, userContactId, taskStartDate, taskEndDate, tag,
  } = info;
  const task = await Tasks.create({
    title, description, status, userContactId, taskStartDate, taskEndDate, tag,
  });
  return task;
};

const update = async ({
  title, description, status, userContactId, taskId,
}) => {
  await Tasks.update({
    title, description, status,
  }, { where: { userContactId, taskId } });
};

const findOne = async ({ userContactId, attributes, taskId }) => {
  const task = await Tasks.findOne({
    attributes: [...attributes],
    where: { userContactId, taskId },
  });
  return task;
};

const destroy = async ({ userContactId, taskId }) => {
  await Tasks.destroy({ where: { userContactId, taskId } });
};

const findAll = async ({ userId, userContactId }) => {
  const tasks = await UserContact.findAll({ userId, userContactId });
  return tasks;
};

const findByQuery = async ({ q }) => {
  const tasks = await Tasks.findAll({
    attributes: ['taskId', 'userContactId', 'title', 'description', 'status', 'taskStartDate', 'taskEndDate'],
    where: {
      title: { [Op.like]: `%${q}%` },
    },
  });
  return tasks;
};

module.exports = {
  create, findOne, destroy, update, findAll, findByQuery,
};
