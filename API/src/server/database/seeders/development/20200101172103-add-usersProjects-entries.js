'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usersProjects', [
      {
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: '38184a13-4273-499a-af73-f5a053cdb589',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false

      },
      {
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: '114a2cdb-dd92-4093-af17-52e221683330',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false

      },
      {
        created_at: new Date(2017, 10, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: '1816c6a0-1f5a-46f8-adb6-076221975695',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false
      },
      {
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false
      },
      {
        created_at: new Date(2010, 9, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: '114a2cdb-dd92-4093-af17-52e221683330',
        project_id: '38184a13-4273-499a-af73-f5a053cdb589',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false
      },
      {
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false
      },
      {
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: '544dda84-8986-405c-8135-b0da3b956f0c',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        is_moderator: true,
        is_admin: false,
        is_supervisor: false
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