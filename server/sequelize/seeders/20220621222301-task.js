module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tasks', [
      {
        userContactId: 1,
        title: 'Buy milk',
        description: 'Buy milk for the family',
        status: 0,
        tag: 1,
        taskStartDate: new Date('2022-06-29 14:45'),
        taskEndDate: new Date('2022-06-29 15:45'),
      },
      {
        userContactId: 2,
        title: 'Make tests for the front-end',
        description: 'Create unit tests',
        status: 0,
        tag: 3,
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
      },
      {
        userContactId: 4,
        title: 'Build a new portfolio',
        description: 'create a new web dev portfolio',
        status: 0,
        tag: 3,
        taskStartDate: new Date('2022-06-25 9:48:27'),
        taskEndDate: new Date('2022-06-25 10:13:36'),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
