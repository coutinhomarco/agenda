const { Tasks } = require('../sequelize/models');

const create = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const { title, description, status } = req.body;
    const { contactId } = req.params;
    const info = {
      title,
      description,
      status,
      contactId: Number(contactId),
      userId,
    };
    const fodase = await Tasks.create({ ...info });
    return res.status(201).json({ message: 'Task created', data: fodase });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { userId } = req.tokenData;
    const task = await Tasks.findOne({ where: { contactId, userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findOne };
