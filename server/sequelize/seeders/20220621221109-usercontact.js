module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserContact', [
      {
        contactId: 1,
        userId: 1,
      },
      {
        contactId: 2,
        userId: 1,
      },
      {
        contactId: 5,
        userId: 1,
      },
      {
        contactId: 3,
        userId: 1,
      },
      {
        contactId: 4,
        userId: 2,
      },
      {
        contactId: 1,
        userId: 2,
      },
      {
        contactId: 2,
        userId: 2
      },
      {
        contactId: 6,
        userId: 1,
      },
      {
        contactId: 4,
        userId: 1,
      }

    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserContact', null, {});
  },
};
