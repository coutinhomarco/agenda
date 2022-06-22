const { UserContact } = require('../sequelize/models');

const create = async ({ userId, contactId }, next) => {
  try {
    const userContact = await UserContact.create({
      userId, contactId,
    });
    return userContact;
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
