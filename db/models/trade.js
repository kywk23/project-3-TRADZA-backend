"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: "Initiator",
        foreignKey: "listingInitiator",
      });
      this.belongsTo(models.user, {
        as: "Acceptor",
        foreignKey: "listingAcceptor",
      });
      this.belongsToMany(models.listing, { through: "listings_trades" });
      this.belongsToMany(models.message, { through: "trade_room" });
    }
  }
  trade.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      listingInitiator: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      listingAcceptor: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      tradeCompletionDate: {
        type: DataTypes.DATE,
      },
      tradeStatus: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: "trade",
      underscored: true,
    }
  );
  return trade;
};
