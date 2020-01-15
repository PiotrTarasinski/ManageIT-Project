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
        id: '818a799a-159d-4d46-bce2-11952861d1a7',
        task_id: '7af94690-9b07-49ed-8507-768cabae3ceb',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 3,
        state: 'To do',
      },
      {
        id: '4c368fcf-19d3-45f4-ba49-19e961412c34',
        task_id: '19c9fd43-fb6f-4147-b413-37ccbba64c6c',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 4,
        state: 'To do',
      },
      {
        id: 'f96cef2b-5610-4d3f-9fe3-cdfd3f786dc9',
        task_id: '78d96a37-54f2-4cc7-8649-92390b733cd2',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 5,
        state: 'To do',
      },
      {
        id: '3b9a56da-d262-4376-bdfe-36cd6f90b9b0',
        task_id: '9845e626-ad78-4761-8662-0663926e3cc5',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 6,
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
        }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  },
};
