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
        task_sprint_id: '31b594f7-21ae-4db8-8507-28e69b2505ab',
        user_id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_sprint_id: '31b594f7-21ae-4db8-8507-28e69b2505ab',
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
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