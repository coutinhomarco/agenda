module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'userId',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Contact',
  });

  Contact.associate = (models) => {
    Contact.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return Contact;
};
