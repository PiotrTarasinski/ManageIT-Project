'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasksSprints', [
      {
        id: '3b8b8a93-b548-44c7-98a3-7216e6ed3c83',
        task_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'To do'
      },
      {
        id: 'b35bc55a-9798-4351-87b1-589c6ba92434',
        task_id: '6ff68e93-feea-4deb-8a85-7e8964dea981',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'To do',
        },
      {
        id: '7c8d7ec5-9d69-4dc0-b662-d04df510bc27',
        task_id: '0c67d41b-628a-4844-9382-40789c0152d7',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'To do',
        },
      {
        id: '00eba8c3-4a7f-4f43-b89d-40819771305e',
        task_id: '33ecdd10-9906-4e89-8da2-397c9a3a0be4',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'In progress',
        },
      {
        id: '31b594f7-21ae-4db8-8507-28e69b2505ab',
        task_id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'In progress',
        },
      {
        id: 'f6a3c1d1-3a77-486b-a088-a2e8c1423388',
        task_id: '410d159a-c736-4a41-abc8-22cf049885bb',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'In progress',
        },
      {
        id: '33488802-9113-4b3e-ad3b-5309e603ce66',
        task_id: '6e4e354c-bed4-4d7d-ae14-cd25defd434c',
        sprint_id: '4783c6f9-1e63-4958-968e-7dd6a5b02915',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'In progress',
      },
      {
        id: '16d20b84-49d3-4c43-b857-378239e34361',
        task_id: '6e4e354c-bed4-4d7d-ae14-cd25defd434c',
        sprint_id: '4783c6f9-1e63-4958-968e-7dd6a5b02915',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 3,
        state: 'In progress',
      },
      {
        id: '4feec0c4-38a9-4aed-8c6e-5f2d5746f200',
        task_id: 'ac79344f-9a4c-4b04-849e-31c9dfd3c5d4',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'To review / test',
        },
      {
        id: 'bbf1eed9-d597-4d18-aa92-185943509b39',
        task_id: 'b7f75f87-5223-4080-81a0-b14a18163d57',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'Done',
        },
      {
        id: '9ab5e216-5846-4b8d-b7f4-8303a888ac5c',
        task_id: '51b517ab-812f-4809-bcc3-006860768098',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'Done',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  },
};
