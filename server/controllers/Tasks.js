const { Tasks } = require('../sequelize/models/Tasks');

const create = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const { title, description, status } = req.body;
    const { contactId } = req.params;
    await Tasks.create({
      contactId,
      userId,
      title,
      description,
      status,
    });
    return res.status(201).json({ message: 'Task created' });
  } catch (error) {
    next(error);
  }
};

export default { create };
