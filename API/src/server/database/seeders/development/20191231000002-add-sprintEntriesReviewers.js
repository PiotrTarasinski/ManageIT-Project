'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sprintEntryUserReviewer', [
      {
        sprint_entry_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        user_id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
        createdAt: new Date(2018, 12, 1),
        updatedAt: new Date(2019, 12, 1),
      },
      {
        sprint_entry_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        user_id: '114a2cdb-dd92-4093-af17-52e221683330',
        createdAt: new Date(2018, 12, 1),
        updatedAt: new Date(2019, 12, 1),
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