'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taskUserAssigns', [
      {
        task_sprint_id: 'f6a3c1d1-3a77-486b-a088-a2e8c1423388',
        user_id: 'fd179a7c-3059-4286-9e8e-52a133460709',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_sprint_id: 'f6a3c1d1-3a77-486b-a088-a2e8c1423388',
        user_id: 'bab49418-7c3b-4dec-8120-c41648ff18cb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_sprint_id: '3b8b8a93-b548-44c7-98a3-7216e6ed3c83',
        user_id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_sprint_id: '3b8b8a93-b548-44c7-98a3-7216e6ed3c83',
        user_id: '544dda84-8986-405c-8135-b0da3b956f0c',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      }
    ]);
    // return new Promise((resolve, reject) => {
    //   resolve(
    //     fixtures.map(item => queryInterface.bulkInsert(item.model, [item.data]))
    //   );
    // });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};