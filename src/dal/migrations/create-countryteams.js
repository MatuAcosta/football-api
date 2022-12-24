'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Teams", {
      type: "FOREIGN KEY",
      fields: ["country_id"], // field name of the foreign key
      name: "fk_player_countryid",
      references: {
        table: "Countries", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.removeConstraint(
      "Teams", // Source model
      "fk_player_countryid" // key to remove
    );
  }
};