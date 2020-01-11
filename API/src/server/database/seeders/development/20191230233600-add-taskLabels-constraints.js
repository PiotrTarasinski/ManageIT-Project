'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taskLabels', [
      {
        task_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        label_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        label_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        label_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        label_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};