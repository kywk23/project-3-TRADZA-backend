"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listing_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.listing);
      this.belongsTo(models.category);
    }
  }
  listing_category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      listing_id: {
        // allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "listings",
          key: "id",
        },
      },
      category_id: {
        // allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "listing_category",
      underscored: true,
    }
  );
  return listing_category;
};
