'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'profileImage', {
          type: Sequelize.STRING,
          after: 'lastName'
        }, {transaction : t}),
      ])
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.sequelize.transaction( t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'profileImage', { transaction : t}),
      ])
    });
  }
};
