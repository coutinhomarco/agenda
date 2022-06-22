module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tasks', [
      {
        userContactId: 1,
        title: 'Buy milk',
        description: 'Buy milk for the family',
        status: 0,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
      },
      {
        userContactId: 2,
        title: 'Buy food for the dinner',
        description: 'Buy food for the dinner',
        status: 0,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
