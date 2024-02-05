"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trade_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.trade);
      this.belongsTo(models.message);
    }
  }
  trade_room.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tradeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "trades",
          key: "id",
        },
      },
      messageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "messages",
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
      modelName: "trade_room",
      underscored: true,
    }
  );
  return trade_room;
};
