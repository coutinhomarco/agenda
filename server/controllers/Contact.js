const {
  Contact, UserContact, User,
} = require('../sequelize/models');

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
    const a = await User.findAll({
      where: { userId },
      include: [
        {
          model: Contact, as: 'contact', through: UserContact, required: true, attribute: ['contact'],
        },
      ],
    });
    return res.status(200).json(a);
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
