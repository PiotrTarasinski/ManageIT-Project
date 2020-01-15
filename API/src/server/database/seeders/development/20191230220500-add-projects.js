'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', [
      {
        id: 'a6a02365-7052-4236-8894-ac594da9c108',
        created_at: new Date(2012, 12, 4),
        updated_at: new Date(2019, 12, 1),
        name: 'Zathin',
        state: 'Completed',
        lead_id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
        active_sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        identifier: 'ENV'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};