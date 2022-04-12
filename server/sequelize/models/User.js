module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(
      models.Contact,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return User;
};
