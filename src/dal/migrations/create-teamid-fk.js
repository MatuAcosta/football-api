'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Players", {
      type: "FOREIGN KEY",
      fields: ["team_id"], // field name of the foreign key
      name: "fk_player_teamid",
      references: {
        table: "Teams", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.removeConstraint(
      "Players", // Source model
      "fk_player_teamid" // key to remove
    );
  }
};