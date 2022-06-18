module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tasks', [
      {
        contactId: 1,
        userId: 1,
        title: 'Buy milk',
        description: 'Buy milk for the family',
        status: 0,
        createdAt: new Date(),
        taskStartDate: new Date(),
        taskEndDate: new Date(),
        updatedAt: new Date(),

      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
