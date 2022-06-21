module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    Contact.belongsToMany(
      models.Tasks,
      { foreignKey: 'tasksId', as: 'task', through: 'Tasks' },
    );
  };

  return Contact;
};
