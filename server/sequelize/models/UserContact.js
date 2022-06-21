module.exports = (sequelize) => {
  const UserContact = sequelize.define('UserContact', {
  }, {
    timestamps: false,
    tableName: 'UserContact',
  });

  UserContact.associate = (models) => {
    models.Contact.belongsToMany(models.User, {
      as: 'users',
      through: UserContact,
      foreignKey: 'contactId',
      otherKey: 'userId',
    });
    models.User.belongsToMany(models.Contact, {
      as: 'contacts',
      through: UserContact,
      foreignKey: 'userId',
      otherKey: 'contactId',
    });
  };

  return UserContact;
};
