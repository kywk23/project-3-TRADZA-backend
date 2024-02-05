"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listings_trades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listings_trades.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      listingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "listings",
          key: "id",
        },
      },
      tradeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "trades",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "listings_trades",
      underscored: true,
    }
  );
  return listings_trades;
};
