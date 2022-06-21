module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(
      models.Tasks,
      { foreignKey: 'taskId', as: 'task' },
    );
  };

  return User;
};
