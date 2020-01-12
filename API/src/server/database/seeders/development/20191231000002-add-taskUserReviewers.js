'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taskUserReviewers', [
      {
        task_sprint_id: 'f6a3c1d1-3a77-486b-a088-a2e8c1423388',
        user_id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_sprint_id: '31b594f7-21ae-4db8-8507-28e69b2505ab',
        user_id: '114a2cdb-dd92-4093-af17-52e221683330',
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