'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        contactId: 1,
        userId: 1,
        title: 'Buy milk',
        description: 'Buy milk for the family',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});

  }
};
