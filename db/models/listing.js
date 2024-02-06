"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.user_display_picture);
      this.belongsToMany(models.trade, { through: "listings_trades" });
      this.belongsToMany(models.category, { through: "listing_category" });
      this.belongsToMany(models.user, { through: "wishlist" });
    }
  }
  listing.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      numberOfLikes: {
        type: DataTypes.INTEGER,
      },
      conditions: {
        type: DataTypes.STRING,
      },
      listingStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
      modelName: "listing",
      underscored: true,
    }
  );
  return listing;
};
