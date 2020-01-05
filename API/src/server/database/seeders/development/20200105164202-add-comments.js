'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        id: 'e31e307b-5e58-49be-8eaa-3511356fd14e',
        created_at: new Date(2019, 12, 1, 12),
        updated_at: new Date(2019, 12, 1, 12),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        sprint_entry_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        content: 'Cześć Pioter'
      },
      {
        id: 'a6a315c7-f964-450d-90d4-2ba97f7fd2ef',
        created_at: new Date(2019, 12, 1, 13),
        updated_at: new Date(2019, 12, 1, 13),
        user_id: '544dda84-8986-405c-8135-b0da3b956f0c',
        sprint_entry_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        content: 'Cześć Szumik'
      },
      {
        id: '8f8a1ce6-9fc7-4132-b354-f555682c79b9',
        created_at: new Date(2019, 12, 1, 14),
        updated_at: new Date(2019, 12, 1, 14),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        sprint_entry_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        content: 'Jak sie masz w tym studiu?'
      },
      {
        id: '37eee81a-1a80-4898-bef8-6de2bf9756da',
        created_at: new Date(2019, 12, 1, 15),
        updated_at: new Date(2019, 12, 1, 15),
        user_id: '544dda84-8986-405c-8135-b0da3b956f0c',
        sprint_entry_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        content: 'A masz ochotę na zamach bombowy?'
      },
      {
        id: '2cd0aab0-385c-4ade-bf78-ace4bdf2ac35',
        created_at: new Date(2019, 12, 1, 16),
        updated_at: new Date(2019, 12, 1, 16),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        sprint_entry_id: '873a9c4b-ec2f-4297-90f5-370cc4c2a865',
        content: 'No przecie!'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};