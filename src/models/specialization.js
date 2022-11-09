const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("specialization", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    generalDescription: {
      type: DataTypes.TEXT,
    },
    availableDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    specialities: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
  })
    /* name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pricing: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  }); */
};
