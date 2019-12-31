'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labels', [
      {
        id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        name: 'Front End',
        color: 'red'
      },
      {
        id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        name: 'Back End',
        color: 'grey'
      },
      {
        id: '410d159a-c736-4a41-abc8-22cf049885bb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        name: 'Bag End',
        color: 'green'
      },
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