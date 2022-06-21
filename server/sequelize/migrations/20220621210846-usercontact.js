module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserContact', {
      userContactId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contactId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contact',
          key: 'contactId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('UserContact');
  },
};
