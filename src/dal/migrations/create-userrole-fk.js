'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("user_roles", {
      type: "FOREIGN KEY",
      fields: ["user_id"], // field name of the foreign key
      name: "fk_user_userid",
      references: {
        table: "Users", // Target model
        field: "id", // key in Target model
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("user_roles", {
        type: "FOREIGN KEY",
        fields: ["role_id"], // field name of the foreign key
        name: "fk_user_roleid",
        references: {
          table: "Roles", // Target model
          field: "id", // key in Target model
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "user_roles", // Source model
      "fk_user_userid" // key to remove
    );
    return await queryInterface.removeConstraint(
        "user_roles", // Source model
        "fk_user_roleid" // key to remove
      );
  }
};