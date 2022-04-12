module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'userId',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Contact.associate = (models) => {
    Contact.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return Contact;
};
