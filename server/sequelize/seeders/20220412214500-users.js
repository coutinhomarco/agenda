module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'User',
    [
      {
        name: 'Marco Coutinho',
        email: 'marco@gmail.com',
        password: '12345678',
      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
