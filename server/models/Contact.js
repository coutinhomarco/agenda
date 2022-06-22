const {
  Contact, UserContact, User,
} = require('../sequelize/models');

const create = async ({ name, email, phoneNumber }) => {
  const contact = await Contact.create({
    name, email, phoneNumber,
  });
  return contact;
};

const destroy = async ({ contactId }) => {
  await Contact.destroy({
    where: {
      contactId,
    },
  });
};

const findAll = async ({ userId }) => {
  const allContacts = await User.findAll({
    where: { userId },
    include: [
      {
        model: Contact, as: 'contact', through: UserContact, required: true, attribute: ['contact'],
      },
    ],
  });
  return allContacts;
};

const findOne = async ({ contactId }) => {
  const contact = await Contact.findOne({ where: { contactId } });
  return contact;
};

module.exports = {
  create, destroy, findAll, findOne,
};
