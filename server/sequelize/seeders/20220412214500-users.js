module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'User',
    [
      {
        name: 'Marco Coutinho',
        email: 'marco@gmail.com',
        password: '12345678',
      },
      {
        name: 'John Travolta',
        email: 'travolta@gmail.com',
        password: '12345678',
      },
      {
        name: 'John Cena',
        email: 'johncena@wwe.com',
        password: '12345678',
      },
    ],

    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
