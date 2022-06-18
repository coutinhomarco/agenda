const { Contact } = require('../sequelize/models');

const create = async (req, res, next) => {
  try {
    const {
      name, email, phoneNumber, userId,
    } = req.body;
    const contact = await Contact.create({
      name, email, phoneNumber, userId,
    });
    return res.status(201).json({ message: 'Contact created successfully', data: contact });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ where: { contactId } });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    await Contact.destroy({
      where: {
        contactId,
      },
    });
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const contacts = await Contact.findAll({ where: { userId } });
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ where: { contactId } });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, destroy, findAll, findOne,
};
