module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Contact',
      [{
        name: 'Justin Bieber',
        email: 'justin@gmail.com',
        phoneNumber: '1234567890',
        userId: 1,
      },
      {
        name: 'Danny Carey',
        email: 'octopus@toolband.com',
        phoneNumber: '987654321',
        userId: 1,
      },
      {
        name: 'Robert Downey Jr.',
        email: 'downeyjr@yahoo.com',
        phoneNumber: '98765432511',
        userId: 2,
      },
      {
        name: 'Tupac Shakur',
        email: 'tupac@gmail.com',
        phoneNumber: '987654321',
        userId: 2,
      },
      {
        name: 'Neymar Jr',
        email: 'meninoney@gmail.com',
        phoneNumber: '987654321',
        userId: 1,
      },
      {
        name: 'William Dafoe',
        email: 'williamdafoe@outlook.com',
        phoneNumber: '987654321',
        userId: 2,
      },
      {
        name: 'Givanildo',
        email: 'hulkparaiba@outlook.com',
        phoneNumber: '987654321',
        userId: 1,
      },
      {
        name: 'Jorge',
        email: 'jorge@lateral.com',
        phoneNumber: '987654321',
        userId: 1,
      },
      {
        name: 'Matias Zaracho',
        email: 'zaracho@galodoido.com',
        phoneNumber: '987654321',
        userId: 1,
      },
      ],

      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Contact', null, {});
  },
};
