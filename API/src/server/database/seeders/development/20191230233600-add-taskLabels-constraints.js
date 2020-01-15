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
      },
      {
        task_id: '33ecdd10-9906-4e89-8da2-397c9a3a0be4',
        label_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      }, //
      {
        task_id: 'e3d3959b-5c27-4968-bc35-cfae45f32b2d',
        label_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '0c67d41b-628a-4844-9382-40789c0152d7',
        label_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '6ff68e93-feea-4deb-8a85-7e8964dea981',
        label_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        label_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: '6e4e354c-bed4-4d7d-ae14-cd25defd434c',
        label_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: 'ac79344f-9a4c-4b04-849e-31c9dfd3c5d4',
        label_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: 'ccdb3656-1c1b-4dc4-a456-92692f67e2ea',
        label_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      },
      {
        task_id: 'b7f75f87-5223-4080-81a0-b14a18163d57',
        label_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};