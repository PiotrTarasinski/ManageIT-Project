'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usersProjects', [
      {
        id: '8b70903a-e682-47ec-a05d-110d739cd662',
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: '38184a13-4273-499a-af73-f5a053cdb589',
        permissions: 'User'
      },
      {
        id: 'd2015be7-2231-49a1-8fbf-deb6f523c069',
        created_at: new Date(2019, 12, 16),
        updated_at: new Date(2019, 12, 1),
        user_id: '114a2cdb-dd92-4093-af17-52e221683330',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        permissions: 'User'
      },
      {
        id: '8fe394c7-2489-4c5c-a034-ad8eca0f4c15',
        created_at: new Date(2017, 10, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: '1816c6a0-1f5a-46f8-adb6-076221975695',
        permissions: 'User'
      },
      {
        id: '0e8c0a97-7e58-47f6-b658-4e837bfb9241',
        created_at: new Date(2019, 11, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        permissions: 'Admin'
      },
      {
        id: '0253f8a9-d3df-4172-8ff6-c1505b7d8af1',
        created_at: new Date(2010, 9, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        permissions: 'User'
      },
      {
        id: '0a86a33a-cd91-42e0-b875-041c8b7a096d',
        created_at: new Date(2019, 10, 12),
        updated_at: new Date(2019, 12, 1),
        user_id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        permissions: 'User'
      },
      {
        id: 'fa0916ed-3600-48f3-8295-7217e512a264',
        created_at: new Date(2019, 12, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: '544dda84-8986-405c-8135-b0da3b956f0c',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        permissions: 'User'
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