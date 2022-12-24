'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATE
      },
      position: {
        type: Sequelize.STRING
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      country_id:{
        type: Sequelize.INTEGER,
        allowNull:true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};
//20221223212937-create-player.js