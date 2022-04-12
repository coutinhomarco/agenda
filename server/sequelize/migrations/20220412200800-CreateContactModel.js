module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contact', {
      contactId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'User',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Contact');
  },
};
