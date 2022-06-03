const { Tasks } = require('../sequelize/models');

const create = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const { info } = req;
    let task = await Tasks.findOne({ where: { contactId, userId } });
    if (task) return res.status(409).json({ message: 'Task with this contact already exists' });
    task = await Tasks.create({ ...info });
    return res.status(201).json({ message: 'Task created', data: task });
  } catch (error) {
    next(error);
  }
};

// const update (req, res, next) => {
//     //IMPLEMENTA
// }

const findOne = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const task = await Tasks.findOne({ where: { contactId, userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { contactId, userId } = req.ids;
    const task = await Tasks.findOne({ where: { contactId, userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Tasks.destroy();
    return res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = { create, findOne, destroy };
