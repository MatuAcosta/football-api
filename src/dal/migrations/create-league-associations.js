'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Teams", {
      type: "FOREIGN KEY",
      fields: ["league_id"], // field name of the foreign key
      name: "fk_team_leagueid",
      references: {
        table: "Leagues", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("Leagues", {
        type: "FOREIGN KEY",
        fields: ["country_id"], // field name of the foreign key
        name: "fk_league_countryid",
        references: {
          table: "Countries", // Target model
          field: "id", // key in Target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Teams", // Source model
      "fk_team_leagueid" // key to remove
    );
    return await queryInterface.removeConstraint(
        "Leagues", // Source model
        "fk_league_countryid" // key to remove
      );    
  }
};