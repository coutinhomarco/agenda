module.exports = (sequelize) => {
  const UserContact = sequelize.define('UserContact', {
  }, {
    timestamps: false,
    tableName: 'UserContact',
  });

  UserContact.associate = (models) => {
    models.Contact.belongsToMany(models.User, {
      as: 'user',
      through: UserContact,
      foreignKey: 'contactId',
      otherKey: 'userId',
    });
    models.User.belongsToMany(models.Contact, {
      as: 'contact',
      through: UserContact,
      foreignKey: 'userId',
      otherKey: 'contactId',
    });

    models.UserContact.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });

    models.User.hasMany(models.UserContact, {
      as: 'UserContact',
      foreignKey: 'userContactId',
    });
    models.UserContact.hasOne(models.Tasks, {
      as: 'task',
      foreignKey: 'userContactId',
    });
    models.Tasks.belongsTo(
      models.UserContact,
      { foreignKey: 'userContactId' },
    );
  };

  return UserContact;
};
