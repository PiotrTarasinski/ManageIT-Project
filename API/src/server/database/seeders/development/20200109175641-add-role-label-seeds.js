'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roleLabels', [
      {
        id: '26eedec7-8790-4147-b284-39905123683d',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        name: 'Chuj kurwa',
        color: 'red'
      },
      {
        id: 'ff0f1487-ece2-4ef4-a7ea-105c59301e85',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        created_at: new Date(2019, 12, 16),
        updated_at: new Date(2019, 12, 1),
        name: 'Back End',
        color: 'green'
      },
      {
        id: 'b11d3e43-2bb9-4176-a1fc-d33720eaa090',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        created_at: new Date(2017, 10, 1),
        updated_at: new Date(2019, 12, 1),
        name: 'Front End',
        color: 'blue'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};