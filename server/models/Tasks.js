/* eslint-disable max-len */
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

const findAll = async ({ userId }) => {
  const tasks = await UserContact.findAll({ userId });
  return tasks;
};

module.exports = {
  create, findOne, destroy, update, findAll,
};
