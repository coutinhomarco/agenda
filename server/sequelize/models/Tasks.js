module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Tasks', {
        contactId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Contact',
            key: 'contactId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        type: DataTypes.ENUM('pending', 'in-progress', 'done'),
        allowNull: false,
        },
        createdAt: {
        allowNull: false,
        type: DataTypes.DATE
        },
        updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
        },
    });
    
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
}