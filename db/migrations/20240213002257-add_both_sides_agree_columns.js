"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("trades", "initiator_agreed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    await queryInterface.addColumn("trades", "acceptor_agreed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("trades", "initiatorAgreed");
    await queryInterface.removeColumn("trades", "acceptorAgreed");
  },
};
