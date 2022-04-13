'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Contact', [{
      name: 'John Doe',
      email: "John@gmai.com",
      phoneNumber: "1234567890",
      userId: 1,
    }], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Contact', null, {});
  }
};
