module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserContact', [
      {
        contactId: 1,
        userId: 1,
      },

    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserContact', null, {});
  },
};
