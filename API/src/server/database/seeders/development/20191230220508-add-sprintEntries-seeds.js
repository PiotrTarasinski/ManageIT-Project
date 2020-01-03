'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sprintEntries', [
      {
        id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'To do',
        type: 'Task',
        identifier: 'ENV',
        title: 'Create login from HTML template.',
        points: 3,
        priority: 'High'
      },
      {
        id: '6ff68e93-feea-4deb-8a85-7e8964dea981',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'To do',
        type: 'Improvement',
        identifier: 'ENV',
        title: 'Add token validation.',
        points: 8,
        priority: 'Normal'
      },
      {
        id: '0c67d41b-628a-4844-9382-40789c0152d7',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'To do',
        type: 'Idea',
        identifier: 'ENV',
        title: 'Add remember me to login form.',
        points: 1,
        priority: 'Low'
      },
      {
        id: 'e3d3959b-5c27-4968-bc35-cfae45f32b2d',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 3,
        state: 'To do',
        type: 'Bug',
        identifier: 'ENV',
        title: 'Register form invalid email pass validation.',
        points: 5,
        priority: 'Normal'
      },
      {
        id: '33ecdd10-9906-4e89-8da2-397c9a3a0be4',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'In progress',
        type: 'Bug',
        identifier: 'ENV',
        title: 'DatePicker wrong date format',
        points: 3,
        priority: 'Normal'
      },
      {
        id: '30462277-2a80-4bcc-b291-80a8fac5548b',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'In progress',
        type: 'Idea',
        identifier: 'ENV',
        title: 'To not let existentail crisis kick in.',
        points: 5,
        priority: 'Normal'
      },
      {
        id: '410d159a-c736-4a41-abc8-22cf049885bb',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'In progress',
        type: 'Task',
        identifier: 'ENV',
        title: 'Take care of chancla flying onscreen.',
        points: 1,
        priority: 'Low'
      },
      {
        id: '6e4e354c-bed4-4d7d-ae14-cd25defd434c',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 3,
        state: 'In progress',
        type: 'Bug',
        identifier: 'ENV',
        title: 'Sidebar not visibilante on firefox.',
        points: 4,
        priority: 'Normal'
      },
      {
        id: 'ac79344f-9a4c-4b04-849e-31c9dfd3c5d4',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'To review / test',
        type: 'Idea',
        identifier: 'ENV',
        title: 'Add tooltips on sidemenu.',
        points: 4,
        priority: 'Normal'
      },
      {
        id: 'ccdb3656-1c1b-4dc4-a456-92692f67e2ea',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'To review / test',
        type: 'Task',
        identifier: 'ENV',
        title: 'Rzucić studia.',
        points: 16,
        priority: 'High'
      },
      {
        id: 'b7f75f87-5223-4080-81a0-b14a18163d57',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 0,
        state: 'Done',
        type: 'Task',
        identifier: 'ENV',
        title: 'Create register form template.',
        points: 6,
        priority: 'High'
      },
      {
        id: '51b517ab-812f-4809-bcc3-006860768098',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 1,
        state: 'Done',
        type: 'Task',
        identifier: 'ENV',
        title: 'Suicide attempt.',
        points: 6,
        priority: 'Normal'
      },
      {
        id: '7b551970-a795-45fc-be29-3fa91601a213',
        sprint_id: '38184a13-4273-499a-af73-f5a053cdb589',
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        index: 2,
        state: 'Done',
        type: 'Task',
        identifier: 'Bug',
        title: 'Fix little pee-pee.',
        points: 12,
        priority: 'High'
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