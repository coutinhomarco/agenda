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
        userId: 2,
      }, {
        name: 'João da Silva',
        email: "joaodasilva@gmail.com",
        phoneNumber: "987654321",
        userId: 2,
      }, {
        name: 'Maria da Silva',
        email: "mariazinha@gamil.com",
        phoneNumber: "987654321",
        userId: 1,
      }, {
        name: 'William Dafoe',
        email: "williamdafoe@outlook.com"
        ,
        phoneNumber: "987654321",
        userId: 2,
      }, {
        name: 'Givanildo',
        email: "hulkparaiba@outlook.com",
        phoneNumber: "987654321",
        userId: 1,
      }
  ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Contact', null, {});
  }
};
