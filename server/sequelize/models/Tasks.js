module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Tasks',
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Contact',
          key: 'contactId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        unique: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      taskStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      taskEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'Tasks',
    },
  );

  Task.associate = (models) => {
    Task.belongsTo(
      models.Contact,
      { foreignKey: 'contactId', as: 'contact' },
    );
    Task.belongsTo(
      models.User,
      { foreignKey: 'userId', as: 'user' },
    );
  };

  return Task;
};
