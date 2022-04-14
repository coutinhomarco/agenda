'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Contact', [{
      name: 'Marco Coutinho',
      email: "marco@gmail.com",
      phoneNumber: "1234567890",
      userId: 1,
    }, {
      name: 'Ana lúcia',
      email: "analucia@outlook.com",
      phoneNumber: "987654321",
      userId: 1,},
      {
        name: 'Bruno Rodrigues',
        email: "brunorodrigues@yahoo.com",
        phoneNumber: "98765432511",
        userId: 2,},
  ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Contact', null, {});
  }
};
