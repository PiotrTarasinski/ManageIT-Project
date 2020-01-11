'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('backlogs', [
      {
        id: '0109c153-e720-4de9-931d-38c1e0efdc4e',
        created_at: new Date(2019, 12, 1, 15),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        content: 'Szymko created a new task: Cześć Pioter.'
      },
      {
        id: '7b4d4303-499b-4034-a11d-f6cae8f2ed57',
        created_at: new Date(2019, 12, 1, 14),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        content: 'Szymko added user Pioter to the project.'
      },
      {
        id: 'f463f92c-3446-41d0-9073-5be8f876fd08',
        created_at: new Date(2019, 12, 16, 15),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        content: 'Szymko removed user Pioter from the project.'
      },
      {
        id: '2243a118-4c6a-421f-ba58-2622fc354dc9',
        created_at: new Date(2017, 10, 1),
        updated_at: new Date(2019, 12, 1),
        user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
        project_id: 'a6a02365-7052-4236-8894-ac594da9c108',
        content: 'Szymko created this project.'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(fixtures.reverse().map(item => queryInterface.bulkDelete(item.model, null)));
  }
};