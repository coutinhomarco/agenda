module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Contact',
      [{
        name: 'Justin Bieber',
        email: 'justin@gmail.com',
        phoneNumber: '1234567890',

      },
      {
        name: 'Danny Carey',
        email: 'octopus@toolband.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Robert Downey Jr.',
        email: 'downeyjr@yahoo.com',
        phoneNumber: '98765432511',

      },
      {
        name: 'Tupac Shakur',
        email: 'tupac@gmail.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Neymar Jr',
        email: 'meninoney@gmail.com',
        phoneNumber: '987654321',

      },
      {
        name: 'William Dafoe',
        email: 'williamdafoe@outlook.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Givanildo',
        email: 'hulkparaiba@outlook.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Jorge',
        email: 'jorge@lateral.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Matias Zaracho',
        email: 'zaracho@galodoido.com',
        phoneNumber: '987654321',

      },
      {
        name: 'Juan Pablo',
        email: 'pablojuan@yahoo.com',
        phoneNumber: '987654321',
      }
      ],

      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Contact', null, {});
  },
};
