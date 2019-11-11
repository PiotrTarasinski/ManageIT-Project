'use strict';
const fixtures = require('../development');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([...fixtures.map(item => queryInterface.bulkInsert(item.model, [item.data]))]);
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
