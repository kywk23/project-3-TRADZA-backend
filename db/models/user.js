"use strict";
const { Model, HasMany } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.listing);
      this.belongsToMany(models.listing, { through: "wishlist" });
      this.hasMany(models.trade, {
        as: "Initiator",
        foreignKey: "listingInitiator",
      });
      this.hasMany(models.trade, {
        as: "Acceptor",
        foreignKey: "listingAcceptor",
      });
      this.hasMany(models.address);
      this.hasMany(models.message, {
        as: "Sender",
        foreignKey: "senderId"
      });
      this.hasMany(models.review);
<<<<<<< HEAD
      this.hasMany(models.user_display_picture, {
        as: "user",
        foreignKey: "userId",
      });
=======
      this.hasMany(models.user_display_picture);
>>>>>>> main
    }
  }
  user.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      mobileNumber: {
        type: DataTypes.INTEGER,
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
      modelName: "user",
      underscored: true,
    }
  );
  return user;
};
