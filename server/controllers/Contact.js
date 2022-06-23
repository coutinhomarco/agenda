const Contact = require('../models/Contact');
const UserContact = require('../models/UserContact');
const { UserContact: userContactSequelize } = require('../sequelize/models');

const create = async (req, res, next) => {
  try {
    const {
      name, email, phoneNumber, userId,
    } = req.body;
    const contact = await Contact.create({
      name, email, phoneNumber,
    });
    await UserContact.create({ userId, contactId: contact.contactId });
    const returnedObject = { ...contact, userId };
    return res.status(201).json({ message: 'Contact created successfully', data: returnedObject });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { userId } = req.tokenData;
    const contact = await Contact.findOne({ contactId });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    await Contact?.destroy({ contactId });
    await userContactSequelize?.destroy({ where: { contactId, userId } });
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const allContacts = await Contact.findAll({ userId });
    return res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ contactId });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, destroy, findAll, findOne,
};
