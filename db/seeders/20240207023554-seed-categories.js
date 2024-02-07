"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Electronics",
        },
        {
          name: "Kitchenware",
        },
        {
          name: "Toys & Games",
        },
        {
          name: "Health & Beauty",
        },
        {
          name: "Office Products",
        },
        {
          name: "Travel",
        },
        {
          name: "Musical Instruments",
        },
        {
          name: "Clothing, Shoes & Jewelry",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
