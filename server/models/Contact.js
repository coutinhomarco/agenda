const {
  Contact, UserContact, User,
} = require('../sequelize/models');

const create = async ({ name, email, phoneNumber }, next) => {
  try {
    const contact = await Contact.create({
      name, email, phoneNumber,
    });
    return contact;
  } catch (error) {
    next(error);
  }
};

const destroy = async ({ contactId }, next) => {
  try {
    await Contact.destroy({
      where: {
        contactId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const findAll = async ({ userId }, next) => {
  try {
    const allContacts = await User.findAll({
      where: { userId },
      include: [
        {
          model: Contact, as: 'contact', through: UserContact, required: true, attribute: ['contact'],
        },
      ],
    });
    return allContacts;
  } catch (error) {
    next(error);
  }
};

const findOne = async ({ contactId }, next) => {
  try {
    const contact = await Contact.findOne({ where: { contactId } });
    return contact;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create, destroy, findAll, findOne,
};
