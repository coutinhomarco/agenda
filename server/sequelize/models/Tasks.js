module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Tasks',
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userContactId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'UserContact',
          key: 'userContactId',
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
      tag: {
        type: Sequelize.INTEGER,
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

  return Task;
};
