'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taskUserAssigns', [
      {
        task_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        user_id: 'fd179a7c-3059-4286-9e8e-52a133460709',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        user_id: 'bab49418-7c3b-4dec-8120-c41648ff18cb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        user_id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
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