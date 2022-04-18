
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', 
    [
      {
        name: 'John Doe',
        email: 'test@medium.com',
        password: '12345678',
      },
      {
        name: 'John Travolta',
        email: 'test2@medium.com',
        password: '12345678',
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};