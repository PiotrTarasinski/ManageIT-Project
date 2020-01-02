'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sprintEntries', [
      {
        id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test',
        description: 'Henlo',
        points: 8,
        priority: 'HIGH'
      },
      {
        id: '6ff68e93-feea-4deb-8a85-7e8964dea981',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test2',
        description: 'Henlo',
        points: 8,
        priority: 'HIGH'
      },
      {
        id: '0c67d41b-628a-4844-9382-40789c0152d7',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 3,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test3',
        description: 'Henlo',
        points: 8,
        priority: 'HIGH'
      },
      {
        id: 'e3d3959b-5c27-4968-bc35-cfae45f32b2d',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 4,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test4',
        description: 'Henlo',
        points: 8,
        priority: 'HIGH'
      },
      {
        id: '33ecdd10-9906-4e89-8da2-397c9a3a0be4',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 5,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test5',
        description: 'Henlo',
        points: 8,
        priority: 'HIGH'
      },
      {
        id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 6,
        state: 'IN_PROGRESS',
        type: 'IDEA',
        title: 'Test',
        description: 'To not let existentail crisis kick in.',
        points: 6,
        priority: 'NORMAL'
      },
      {
        id: '410d159a-c736-4a41-abc8-22cf049885bb',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'IN_PROGRESS',
        type: 'BUG',
        title: 'Test',
        description: 'Take care of chancla flying onscreen.',
        points: 1,
        priority: 'LOW'
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