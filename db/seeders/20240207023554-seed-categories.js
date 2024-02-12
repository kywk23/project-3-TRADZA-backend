"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "electronics",
        },
        {
          name: "kitchenware",
        },
        {
          name: "toys_games",
        },
        {
          name: "healthy_beauty",
        },
        {
          name: "office_products",
        },
        {
          name: "travel",
        },
        {
          name: "musical_instruments",
        },
        {
          name: "clothing_shoes_jewelry",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
