module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tasks', [
      {
        userContactId: 1,
        title: 'Buy milk',
        description: 'Buy milk for the family',
        status: 0,
        tag: 1,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
      },
      {
        userContactId: 2,
        title: 'Buy food for the dinner',
        description: 'Buy food for the dinner',
        status: 0,
        tag: 1,
        taskStartDate: new Date(),
        taskEndDate: new Date(),
      },
      {
        userContactId: 3,
        title: 'Buy food for the lunch',
        description: 'Buy food for the lunch',
        status: 2,
        tag: 1,
        taskStartDate: new Date('2022-06-21 9:48:27'),
        taskEndDate: new Date('2022-06-21 10:13:36'),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
