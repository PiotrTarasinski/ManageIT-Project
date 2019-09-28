'use strict';
const fixtures = require('../development');
const PQueue = require('p-queue');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {

      const queue = new PQueue({
        concurrency: 1,
        autoStart: false
      });

      fixtures.map(item => {
        queue.add(() => queryInterface.bulkInsert(item.model, [item.data]))
          .then(() => {
            console.log('=== Inserted ===');
            console.log(item);
            console.log('=================');
          })
          .catch((err) => {
            console.error('=== Inserting Error ===');
            console.error(item);
            console.error('=================');

            reject(err);
          });

      });

      queue.onEmpty().then(() => resolve());

      queue.start();

    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      fixtures.reverse().map(
        item => queryInterface.bulkDelete(item.model, null)
      )
    );
  }
};
