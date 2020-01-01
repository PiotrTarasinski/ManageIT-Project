'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', [
      {
        id: '38184a13-4273-499a-af73-f5a053cdb589',
      created_at: new Date(2012, 12, 14),
      updated_at: new Date(2019, 12, 1),
      name: '456 Numero Testo',
      state: 'In Development',
      lead_id: '9c620dc5-ec2f-43b1-9b1e-92c7ce01a45f',
      active_sprint_id: '38184a13-4273-499a-af73-f5a053cdb589'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};