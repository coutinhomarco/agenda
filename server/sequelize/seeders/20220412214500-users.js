
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', 
    [
      {
        name: 'John Doe',
        email: 'test@medium.com',
        password: '9ff7b641722c30acdc058f2499d97dd8',
      },
      {
        name: 'John Travolta',
        email: 'test2@medium.com',
        password: '082b66a712e3efe31385f3158e057496',
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};